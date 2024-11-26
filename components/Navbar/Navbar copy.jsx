import { Button } from "@mui/material/Button";
import styles from "./Navbar.module.css"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar({ username }) {
    const router = useRouter();
    const { domainName } = router.query;
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
            {/* {
                username && showEditBanner && domainName === undefined &&
                <div
                    className={styles.editBanner}
                    onClick={() => window.location.href = "/edit"}
                >
                    <span>
                        You can edit the template here
                    </span>
                    <FaExternalLinkAlt />
                </div>
            } */}
            <div className={styles.navbar}>
                <div
                    className="text-2xl font-semibold cursor-pointer"
                    onClick={() => { window.open("https://www.chsyamkumar.in/", "_blank"); }}
                >
                    {username ? username : "myPortfolio.com"}
                </div>
                {
                    domainName === undefined && (
                        username ? (
                            <div className="flex justify-center align-middle gap-5">
                                {/* <div onClick={() => router.push("/domain")} className="cursor-pointer text-xl">
                                    <BsGlobe2 />
                                </div> */}
                                <Button onClick={() => logoutHandler()}>
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="flex justify-center align-middle gap-5 font-semibold text-xl">
                                <Button variant="outlined" size="medium"
                                // onClick={() => router.push("/login")}
                                >
                                    Login
                                </Button>
                                <Button variant="contained" size="medium"
                                // onClick={() => router.push("/signup")}
                                >
                                    Signup
                                </Button>
                            </div>
                        )
                    )
                }
            </div>
        </div >
    );
}