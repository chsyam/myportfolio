import styles from "./Navbar.module.css"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Navbar({ username }) {
    const router = useRouter();
    const [showEditBanner, setShowEditBanner] = useState(true);
    useEffect(() => {
        if (router.asPath.includes("edit")) {
            setShowEditBanner(false);
        }
    }, [router])

    return (
        <div>
            {
                showEditBanner &&
                <div
                    className={styles.editBanner}
                    onClick={() => window.location.href = "/edit"}
                >
                    <span>
                        You can edit the template here
                    </span>
                    <FaExternalLinkAlt />
                </div>
            }
            <div className={styles.navbar}>
                <div
                    className={styles.navbar__logo}
                    onClick={() => { window.open("https://www.chsyamkumar.in/", "_blank"); }}
                >
                    {username}
                </div>
            </div>
        </div>
    );
}