import Link from "next/link";
import styles from "./Signup.module.css";
import { useEffect, useState } from "react";

export default function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [validationStatus, setValidationStatus] = useState({
        usernameStatus: false,
        emailStatus: false,
        passwordStatus: false,
        confirmPasswordStatus: false,
    })

    const validationErrors = {
        usernameError: "Name must be at least 3 characters long.",
        emailError: "Please enter a valid email address.",
        passwordError: `Password must:
            - Be at least 8 characters long
            - Contain at least one uppercase letter
            - Contain at least one lowercase letter
            - Contain at least one number
            - Contain at least one special character`,
        confirmPasswordError: "Passwords do not match.",
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleUsernameValidation = () => {
        const username = formData.username.trim();
        if (username !== "" && username.length < 3) return false;
        return true;
    }


    const handleEmailValidation = () => {
        const email = formData.email.trim();
        if (email !== "" && !validateEmail(email)) return false;
        return true;
    }

    const handlePasswordValidation = () => {
        const password = formData.password.trim();
        if (password !== "" && !validatePassword(password)) return false;
        return true;
    }

    const handleConfirmPasswordValidation = () => {
        const confirmPassword = formData.confirmPassword.trim();
        const password = formData.password.trim();
        if (confirmPassword !== "" && confirmPassword !== password) return false;
        return true;
    }

    useEffect(() => {
        const res = handleUsernameValidation();
        setValidationStatus({
            ...validationStatus,
            usernameStatus: !res,
        })
    }, [formData.username])

    useEffect(() => {
        const res = handleEmailValidation();
        setValidationStatus({
            ...validationStatus,
            emailStatus: !res,
        })
    }, [formData.email])

    useEffect(() => {
        const res = handlePasswordValidation();
        console.log(res, formData.password)
        setValidationStatus({
            ...validationStatus,
            passwordStatus: !res,
        })
    }, [formData.password])

    useEffect(() => {
        const res = handleConfirmPasswordValidation();
        setValidationStatus({
            ...validationStatus,
            confirmPasswordStatus: !res,
        })
    }, [formData.confirmPassword, formData.password])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleDataValidation = () => {
        return (
            formData.username === "" ||
            formData.email === "" ||
            formData.password === "" ||
            formData.confirmPassword === "" ||
            !handleUsernameValidation() ||
            !handleEmailValidation() ||
            !handlePasswordValidation() ||
            !handleConfirmPasswordValidation()
        );
    }

    const handleSignup = (e) => {
        e.preventDefault();
        if (handleDataValidation()) {
            setValidationStatus({
                ...validationStatus,
                usernameStatus: (formData.username === "" || !handleUsernameValidation()) ? true : false,
                emailStatus: (formData.email === "" || !handleEmailValidation()) ? true : false,
                passwordStatus: (formData.password === "" || !handlePasswordValidation()) ? true : false,
                confirmPasswordStatus: (formData.confirmPassword === "" || !handleConfirmPasswordValidation()) ? true : false,
            })
            return;
        }
        console.log(formData)
    }

    return (
        <div className={styles.formSection}>
            <form className={styles.form} onSubmit={(e) => handleSignup(e)}>
                <div className={styles.heading}>
                    <div className={styles.title}>Create an account</div>
                    <div className={styles.sectionInfo}>Enter your information to get started</div>
                </div>
                <div className={styles.formElement}>
                    <label htmlFor="username">Full Name</label><br />
                    <input value={formData.username} onChange={(e) => handleInputChange(e)} type="text" name="username" id="username" placeholder="John Doe" />
                    <p className={styles.fieldError}>
                        {validationStatus.usernameStatus && validationErrors.usernameError}
                    </p>
                </div>
                <div className={styles.formElement}>
                    <label htmlFor="email">Email</label><br />
                    <input value={formData.email} type="email" onChange={(e) => handleInputChange(e)} name="email" id="email" placeholder="john@example.com" />
                    <p className={styles.fieldError}>
                        {validationStatus.emailStatus && validationErrors.emailError}
                    </p>
                </div>
                <div className={styles.formElement}>
                    <label htmlFor="password">Password</label><br />
                    <input value={formData.password} onChange={(e) => handleInputChange(e)} type="password" name="password" id="password" placeholder="Enter password" />
                    <div className={styles.fieldError}>
                        {validationStatus.passwordStatus && validationErrors.passwordError}
                    </div>
                </div>
                <div className={styles.formElement}>
                    <label htmlFor="confirmPassword">Confirm Password</label><br />
                    <input value={formData.confirmPassword} onChange={(e) => handleInputChange(e)} type="password" name="confirmPassword" id="confirmPassword" placeholder="Re-type your password to confirm" />
                    <p className={styles.fieldError}>
                        {validationStatus.confirmPasswordStatus && validationErrors.confirmPasswordError}
                    </p>
                </div>
                <div className={styles.submitButton}>
                    <button type="submit">Sign up</button>
                    <p className={styles.havingAccount}>Already have an account? <Link href="/login">Login</Link></p>
                </div>
            </form>
        </div>
    );
}