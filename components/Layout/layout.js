import { useEffect, useState } from "react";
import Navbar from "./../Navbar/Navbar";
import { useRouter } from "next/router";

const Layout = ({ username, children }) => {
    const router = useRouter();
    const [showNavbar, setShowNavbar] = useState(true);
    const [endUserView, setEndUserView] = useState(true);

    useEffect(() => {
        if (router.asPath.includes("edit")) {
            setShowNavbar(false);
        }
        if (router.asPath.includes("end-user")) {
            setEndUserView(false);
        }
    }, [router])

    return (
        <>
            {
                showNavbar &&
                <Navbar username={username} />
            }
            {children}
        </>
    );
};

export default Layout;