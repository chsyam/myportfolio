import { useEffect, useState } from "react";
import Navbar from "./../Navbar/Navbar";
import { useRouter } from "next/router";

const Layout = ({ username, children }) => {
    return (
        <>
            {/* <Navbar username={username} /> */}
            {children}
        </>
    );
};

export default Layout;