import styles from "./../../styles/Dashboard.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { decrypt } from "../api/auth/lib";
import { Box, Tab, Tabs } from "@mui/material";
import ProfileDetailsForm from "@/components/ProfileDetailsForm";
import Templates from "@/components/Templates";
import Domain from "@/components/Domain";

export default function Home({ objId, data, userId, webAddress }) {
    const [value, setValue] = useState(0);
    const [formSubmitStatus, setFormSubmitStatus] = useState(false);

    useEffect(() => {
        let tabIndex = localStorage.getItem("tabIndex");
        if (tabIndex) {
            setValue(parseInt(tabIndex));
        }
        localStorage.setItem("tabIndex", value);
    }, [])

    const [portfolioData, setPortfolioData] = useState({
        username: "",
        userId: userId,
        webAddress: webAddress,
        workTitle: "",
        description: "",
        resumeURL: "",
        selfieURL: "",
        platformLinks: {},
        skills: []
    })

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        localStorage.setItem("tabIndex", newValue);
    };

    useEffect(() => {
        setPortfolioData({
            ...data, userId: userId, webAddress: webAddress
        });
    }, [data])

    const handleSubmit = async () => {
        setFormSubmitStatus(true);
        console.log("portfolioData", portfolioData);
        let response;
        if (objId) {
            response = await fetch(`https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/portfolio/${objId}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(portfolioData),
            });
        } else {
            response = await fetch(`https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/portfolio.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(portfolioData),
            });
        }

        const result = await response.json();
        console.log('Update successful:', result);
        if (result) {
            console.log("saved to database. successfully...!")
            alert("saved to database. successfully...!")
            window.location.reload();
        } else {
            alert("something went wrong while updating");
            window.location.reload();
        }
        setFormSubmitStatus(false);
    }

    return (
        <div className={styles.dashboard}>
            <Box sx={{ border: 1, borderColor: 'divider', width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    sx={{ bgcolor: '#FFF' }}
                >
                    <Tab sx={{ bgcolor: '#FFF' }} label="Profile" />
                    <Tab sx={{ bgcolor: '#FFF' }} label="Templates" />
                    <Tab sx={{ bgcolor: '#FFF' }} label="Domain" />
                </Tabs>
            </Box>
            {
                value === 0 && (
                    <ProfileDetailsForm portfolioData={portfolioData} setPortfolioData={setPortfolioData} handleSubmit={handleSubmit} formSubmitStatus={formSubmitStatus} />
                )
            }
            {
                value === 1 && (
                    <div>
                        <Templates />
                    </div>
                )
            }
            {
                value === 2 && (
                    <Domain objId={objId} portfolioData={portfolioData} setPortfolioData={setPortfolioData} />
                )
            }
        </div>
    );
}

export async function getServerSideProps(context) {
    const { req, res } = context;
    const token = req?.cookies['token']
    const payload = await decrypt(token)
    console.log("payload", payload);
    if (!payload || payload === null || payload === undefined) {
        res.setHeader('Set-Cookie', [
            'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;',
        ]);

        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    const emptyPortfolioData = {
        username: '',
        userId: '',
        webAddress: payload?.webAddress || "",
        workTitle: '',
        selfieURL: '',
        description: '',
        resumeURL: '',
        platformLinks: {},
        skills: [],
    }

    try {
        const response = await axios.get('https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/portfolio.json');
        const data = response.data
        const key = Object.keys(data).find((objId) => data[objId].userId === payload.userId);
        if (key === undefined) {
            return {
                props: {
                    data: emptyPortfolioData,
                    username: payload.username,
                    userId: payload.userId,
                    webAddress: payload.webAddress || ""
                }
            }
        }
        return {
            props: {
                data: data[key],
                username: data[key].username,
                userId: payload.userId,
                webAddress: payload.webAddress || ""
            }
        }
    }

    catch (error) {
        console.log(error);
        return {
            props: {
                data: emptyPortfolioData,
                username: payload.username,
                userId: payload.userId,
                webAddress: payload.webAddress || ""
            }
        }
    }
}