import styles from "./Navbar.module.css"

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar__logo} onClick={() => { window.open("https://www.chsyamkumar.in/", "_blank"); }}>
                chsyamkumar.in
            </div>
        </nav>
    );
}