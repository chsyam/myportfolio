import { Button } from "@mui/material";
import styles from "./Navbar.module.css"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LogIn, LogOut } from "lucide-react";

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
                            <Button variant="outlined" size="medium" color="error"
                                startIcon={<LogOut />}
                                onClick={() => logoutHandler()}
                            >Logout</Button>
                        </div>
                    ) : (
                        <div className="flex justify-center align-middle gap-5 font-semibold text-xl">
                            <Button variant="outlined" size="medium"
                                startIcon={<LogIn />}
                                onClick={() => router.push("/login")}
                            >
                                Login
                            </Button>
                            <Button variant="contained" size="medium"
                                onClick={() => router.push("/signup")}
                            >
                                Signup
                            </Button>
                        </div>
                    )
                )
            }
        </div>
    );
}