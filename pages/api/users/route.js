import bcrypt from "bcryptjs"
import { v4 as uuidv4 } from "uuid";

export default async function signupHandler(formData) {
    const hashedPassword = await bcrypt.hash(formData.password, 5);
    const newUser = {
        userId: uuidv4(),
        username: formData.username,
        email: formData.email,
        password: hashedPassword,
        isVerified: false,
        portfolioId: ""
    }

    try {
        const response = await fetch(`https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/users.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });
        return response;
    } catch (error) {
        console.log("error fetching api details", error);
        return null;
    }
}