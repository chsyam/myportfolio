import bcrypt from "bcryptjs"
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
    const { username, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 5);
    const userId = uuidv4();
    const newUser = {
        userId: userId,
        username: username,
        email: email,
        password: hashedPassword,
        isVerified: false,
        portfolioId: ""
    }

    const getWebAddress = (username) => {
        console.log("username", username)
        return username.replace(/[^a-zA-Z-]/g, '').toLowerCase();
    }
    console.log(getWebAddress(username))
    console.log(username)
    const newPortfolioData = {
        username: '',
        userId: '',
        webAddress: getWebAddress(username),
        workTitle: '',
        selfieURL: '',
        description: '',
        resumeURL: '',
        platformLinks: {},
        skills: [],
    }
    console.log(newPortfolioData)

    try {
        const response = await fetch(`https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/users.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });
        return res.status(200).json({
            userId: userId, hashedPassword: hashedPassword, messgae: "User saved succesfully"
        });
    } catch (error) {
        console.log("error fetching api details", error);
        return res.status(500).json({
            data: null, message: 'Something went wrong'
        });
    }
}