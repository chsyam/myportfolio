import styles from "./Login.module.css"
import Link from "next/link";

export default function Login() {
    return (
        <div className={styles.formSection}>
            <form className={styles.form}>
                <div className={styles.heading}>
                    <div className={styles.title}>Login to your account</div>
                    <div className={styles.sectionInfo}>Enter your information to get started</div>
                </div>
                <p className={styles.fieldError}>sample error for the above field</p>
                <div className={styles.formElement}>
                    <label htmlFor="email">Email</label><br />
                    <input name="email" id="email" placeholder="john@example.com" />
                </div>
                <div className={styles.formElement}>
                    <label htmlFor="password">Password</label><br />
                    <input type="password" name="password" id="password" placeholder="Enter password" />
                </div>
                <div className={styles.submitButton}>
                    <button type="submit">Sign up</button>
                    <p className={styles.havingAccount}>Don't have an account? <Link href="/signup">Signup</Link></p>
                </div>
            </form>
        </div>
    );
}