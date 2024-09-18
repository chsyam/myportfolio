import styles from "./Navbar.module.css"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { BsGlobe2 } from "react-icons/bs";

export default function Navbar({ username }) {
    const router = useRouter();
    const [showEditBanner, setShowEditBanner] = useState(true);
    useEffect(() => {
        if (router.asPath.includes("edit")) {
            setShowEditBanner(false);
        }
    }, [router])

    const logoutHandler = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload();
    }

    return (
        <div>
            {
                username && showEditBanner &&
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
                    {username ? username : "myPortfolio.com"}
                </div>
                {
                    username ? (
                        <div className="flex justify-center align-middle gap-5 font-semibold text-md">
                            <div className="cursor-pointer text-xl">
                                <BsGlobe2 />
                            </div>
                            <div
                                className="cursor-pointer"
                                onClick={() => logoutHandler()}
                            >Logout</div>
                        </div>
                    ) : (
                        <div className="flex justify-center align-middle gap-5 font-semibold text-md">
                            <div
                                className="cursor-pointer"
                                onClick={() => router.push("/login")}
                            >Login</div>
                            <div
                                className="cursor-pointer"
                                onClick={() => router.push("/signup")}
                            >Signup</div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}