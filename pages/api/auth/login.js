import axios from "axios";
import bcrypt from "bcryptjs"
import { encrypt } from "./lib";
import jwt from 'jsonwebtoken'

export default async function loginHandler(req, res) {
    const { email, password } = { email: req.body['email'], password: req.body['password'] };
    try {
        const response = await axios.get(`https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/users.json`);
        const users = response.data;
        console.log(users);
        const userObjId = Object.keys(users).find(key => users[key].email === email);
        console.log("user", userObjId)
        if (users[userObjId]) {
            const isAuthenticated = await bcrypt.compare(password, users[userObjId].password);
            if (isAuthenticated) {
                console.log("user =>", users[userObjId]);
                const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
                const session = await encrypt({
                    username: users[userObjId]?.username,
                    email: users[userObjId]?.email,
                    userId: users[userObjId]?.userId,
                    expires: expires
                });

                const token = jwt.sign({
                    userId: users[userObjId]?.userId,
                    username: users[userObjId]?.username,
                    email: users[userObjId]?.email,
                    userObjId: userObjId,
                }, process.env.JWT_SECRET, {
                    expiresIn: '1440m',
                })
                console.log(token)
                return res.status(200).json({ token: token, message: 'Login successful' });
            } else {
                console.log("Invalid Credentials...!");
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            console.log("user not found", "Invalid Credentials...!");
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log("error fetching api details", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}