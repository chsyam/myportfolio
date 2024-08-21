import Intoduction from "./../components/Introduction/Introduction";
import Navbar from "./../components/Navbar/Navbar";
import TechStack from "./../components/TechStack/TechStack";
import styles from "./../styles/Dashboard.module.css"

export default function Home() {
    return (
        <div className={styles.dashboard}>
            <Navbar />
            <Intoduction />
            <TechStack />
        </div>
    );
}