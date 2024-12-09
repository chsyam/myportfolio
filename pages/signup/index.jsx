"use client";
import Link from "next/link";
import styles from "./Signup.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CircularProgress, Divider } from "@mui/material";

export default function Signup({ usersData }) {
    const router = useRouter();
    const [signupStatus, setSignupStatus] = useState(false);
    const [formError, setFormError] = useState("");
    const [formSuccess, setFormSuccess] = useState("");
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        webAddress: "",
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'username') {
            let webAddress = value.replace(/[^a-zA-Z-]/g, '').toLowerCase();
            setFormData({
                ...formData,
                [name]: value,
                webAddress: webAddress
            });
        }
    }

    const handleSignup = async (e) => {
        setSignupStatus(true);
        e.preventDefault();
        try {
            const response = await fetch('./../api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response === null) {
                setFormError("Error registering user. Please try again later");
                setFormSuccess("");
            } else if (response.ok) {
                setFormError("");
                setFormSuccess("User registered successfully");
                try {
                    const googleSheetResponse = await fetch('./../api/users/userToSheets', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            fullName: formData.fullName,
                            username: formData.username,
                            email: formData.email,
                            password: data?.hashedPassword,
                            userId: data?.userId
                        })
                    })
                    console.log(googleSheetResponse)
                } catch (error) {
                    console.log("error appending user details to google sheet", error)
                }
                setTimeout(() => {
                    window.location.replace('/login');
                }, 200);
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
        setSignupStatus(false);
    }

    return (
        <form className={styles.formContainer} onSubmit={handleSignup}>
            <div className="text-center my-[20px]">
                <span className="text-2xl font-normal">
                    Create an account
                </span>
                <br />
                <span className="text-sm text-[#707070]">
                    Enter your information to get started
                </span>
            </div>
            <Divider />
            <div className={styles.formGroup}>
                <div className={styles.formElement}>
                    <label className="text-md text-[#000]" htmlFor="fullName">
                        Full Name
                    </label><br />
                    <input value={formData.fullName} onChange={(e) => handleInputChange(e)} type="text" name="fullName" id="fullName" placeholder="John Doe" />
                </div>
                <div className={styles.formElement}>
                    <label className="text-md text-[#000]" htmlFor="username">
                        Username
                    </label><br />
                    <input value={formData.username} onChange={(e) => handleInputChange(e)} type="text" name="username" id="username" placeholder="johnDoe" />
                </div>
            </div>
            <div className={styles.formGroup}>
                <div className={styles.formElement}>
                    <label className="text-md text-[#000]" htmlFor="email">
                        Email
                    </label><br />
                    <input
                        value={formData.email} type="email"
                        onChange={(e) => handleInputChange(e)} name="email" id="email" placeholder="john@example.com" />
                </div>
            </div>
            <div className={styles.formGroup}>
                <div className={styles.formElement}>
                    <label className="text-md text-[#000]" htmlFor="password">
                        Password
                    </label><br />
                    <input value={formData.password} onChange={(e) => handleInputChange(e)} type="password" name="password" id="password" placeholder="Enter password" />
                </div>
                <div className={styles.formElement}>
                    <label className="text-md text-[#000]" htmlFor="confirmPassword">
                        Confirm Password
                    </label><br />
                    <input value={formData.confirmPassword} onChange={(e) => handleInputChange(e)} type="password" name="confirmPassword" id="confirmPassword" placeholder="Re-type your password to confirm" />
                </div>
            </div>
            <div className={styles.submitButton}>
                <button type="submit"
                    style={{
                        cursor: signupStatus ? 'not-allowed' : 'pointer',
                        pointerEvents: signupStatus ? 'none' : 'auto',
                    }}
                >
                    {signupStatus && <CircularProgress size={16} color="white" sx={{ strokeWidth: 3 }} />}
                    <span className="pl-2">{!signupStatus && 'signup'}</span>
                </button>
                <p className="text-sm my-4">
                    Already have an account?
                    <Link className="text-blue-500 ml-2 font-medium hover:underline" href="/login">Login</Link>
                </p>
            </div>
        </form>
    );
}

export async function getServerSideProps() {
    try {
        const response = await fetch('https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/users.json');
        let usersData = await response.json();
        if (usersData === undefined || usersData === null) {
            usersData = [];
        }
        return {
            props: {
                usersData: usersData
            }
        }
    } catch (error) {
        console.log("error fetching api details", error);
        return {
            props: {
                usersData: []
            }
        }
    }
}