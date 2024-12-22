import Link from "next/link";
import styles from "./Login.module.css"
import { useEffect, useState } from "react";
import { CircularProgress, Divider } from "@mui/material";

export default function Login() {
    const [loginStatus, setLoginStatus] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [loginSuccess, setLoginSuccess] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        setLoginStatus(true);
        e.preventDefault();
        console.log(formData);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            console.log(response);
            if (response === null) {
                setLoginSuccess("");
                setLoginError("Invalid Credentials..!");
            }
            else if (response.status === 200) {
                setLoginError("");
                setLoginSuccess("Login successfull");
                const { token } = await response.json()
                document.cookie = `token=${token}; path=/`
                setTimeout(() => {
                    window.location.href = "/dashboard"
                }, 200);
            } else {
                setLoginError("Something went wrong while login. Please try again later");
            }
        } catch (error) {
            setLoginError("Something went wrong while login. Please try again later");
            console.log(error);
        }
        setLoginStatus(false);
    }

    return (
        <div className="flex justify-center p-4 mt-12">
            <div className="w-full max-w-md">
                <div className="space-y-1 mb-[25px]">
                    <div className="text-3xl font-semibold">Welcome back</div>
                    <div className="text-[#64748B]">
                        Enter your email and password to access your portfolio
                    </div>
                </div>
                <Divider />
                <div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {
                            loginError && (
                                <div className={styles.fieldError}>
                                    {loginError}
                                </div>
                            )
                        }
                        {
                            loginSuccess && (
                                <div className={styles.fieldSuccess}>
                                    {loginSuccess}
                                </div>
                            )
                        }
                        <div className={styles.formElement}>
                            <label className="text-md text-[#000]" htmlFor="email">
                                Email
                            </label><br />
                            <input
                                value={formData.email}
                                onChange={handleChange} name="email" id="email" placeholder="john@example.com" />
                        </div>
                        <div className={styles.formElement}>
                            <label className="text-md text-[#000]" htmlFor="password">Password</label><br />
                            <input
                                value={formData.password}
                                onChange={handleChange} type="password" name="password" id="password" placeholder="Enter password" />
                        </div>
                        <div className={styles.submitButton}>
                            <button type="submit"
                                style={{
                                    cursor: loginStatus ? 'not-allowed' : 'pointer',
                                    pointerEvents: loginStatus ? 'none' : 'auto',
                                }}
                            >
                                {loginStatus && <CircularProgress size={16} color="white" sx={{ strokeWidth: 3 }} />}
                                <span className="pl-2">{!loginStatus && "Login"}</span>
                            </button>
                            <p className="text-sm my-4">
                                Don't have an account?
                                <Link className="text-blue-500 ml-2 font-medium hover:underline" href="/signup">Register</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}