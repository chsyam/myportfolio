import axios from "axios";
import bcrypt from "bcryptjs"
import { encrypt } from "../lib";
import Cookies from "js-cookie";

export default async function loginHandler(formData) {
    const { email, password } = formData;
    try {
        const response = await axios.get(`https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/users.json`);
        const users = response.data;
        const user = Object.values(users).find(user => user.email === email);
        if (user) {
            const isAuthenticated = await bcrypt.compare(password, user.password);
            if (isAuthenticated) {
                const expires = new Date(Date.now() + 4 * 60 * 60 * 1000);
                const session = await encrypt({
                    username: user?.username,
                    email: user?.email,
                    userId: user?.userId,
                    expires: expires
                });
                Cookies.set('session', session, { expires: expires })
                return response;
            } else {
                console.log("Invalid Credentials...!");
                return null;
            }
        } else {
            console.log("user not found", "Invalid Credentials...!");
            return null;
        }
        return response;
    } catch (error) {
        console.log("error fetching api details", error);
        return null;
    }
}