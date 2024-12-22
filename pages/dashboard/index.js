import axios from "axios";
import Domain from "@/components/Domain";
import { decrypt } from "../api/auth/lib";
import { useEffect, useState } from "react";
import Templates from "@/components/Templates";
import { Box, Tab, Tabs } from "@mui/material";
import styles from "./../../styles/Dashboard.module.css";
import ProfileDetailsForm from "@/components/ProfileDetailsForm";

export default function Home({ portfolioKey, data, userInfo }) {
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
        username: userInfo?.username,
        userId: userInfo?.userId,
        webAddress: userInfo?.webAddress,
        workTitle: "",
        description: "",
        resumeURL: "",
        selfieURL: "",
        platformLinks: {},
        skills: [],
        template: '1'
    })

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        localStorage.setItem("tabIndex", newValue);
    };

    useEffect(() => {
        setPortfolioData({
            ...data, platformLinks: data?.platformLinks || {}, skills: data?.skills || []
        });
    }, [data])

    useEffect(() => {
        if (portfolioData.skills === "") {
            setPortfolioData({
                ...portfolioData,
                skills: []
            })
        }
        if (portfolioData.platformLinks === "") {
            setPortfolioData({
                ...portfolioData,
                platformLinks: {}
            })
        }
    }, [portfolioData])

    const handleSubmit = async () => {
        setFormSubmitStatus(true);
        console.log("portfolioData", portfolioData);
        let response;
        if (portfolioKey) {
            response = await fetch(`https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/portfolio/${portfolioKey}.json`, {
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
            <Box sx={{ border: 2, borderColor: 'divider', width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    sx={{ bgcolor: '#FFF' }}
                >
                    <Tab
                        sx={{ textTransform: 'none', fontSize: '18px', fontFamily: 'Poppins' }} label="Profile"
                    />
                    <Tab
                        sx={{ textTransform: 'none', fontSize: '18px', fontFamily: 'Poppins' }} label="Templates"
                    />
                    <Tab
                        sx={{ textTransform: 'none', fontSize: '18px', fontFamily: 'Poppins' }} label="Domain"
                    />
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
                        <Templates portfolioKey={portfolioKey} portfolioData={portfolioData} />
                    </div>
                )
            }
            {
                value === 2 && (
                    <Domain portfolioKey={portfolioKey} portfolioData={portfolioData} setPortfolioData={setPortfolioData} />
                )
            }
        </div>
    );
}

export async function getServerSideProps(context) {
    const { req, res } = context;
    const token = req?.cookies['token']
    const userInfo = await decrypt(token)
    console.log("payload", userInfo);
    if (!userInfo || userInfo === null || userInfo === undefined) {
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
        fullName: userInfo?.username || "",
        username: userInfo?.username || "",
        userId: userInfo?.userId || "",
        webAddress: userInfo?.username || "",
        workTitle: '',
        selfieURL: '',
        description: '',
        resumeURL: '',
        platformLinks: {},
        skills: [],
        template: '1'
    }

    try {
        const response = await axios.get('https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/portfolio.json');
        const data = response.data
        const key = Object.keys(data).find((objId) => data[objId].userId === userInfo.userId);
        if (key === undefined) {
            return {
                props: {
                    data: emptyPortfolioData,
                    userInfo: userInfo
                }
            }
        }
        return {
            props: {
                portfolioKey: key,
                data: data[key],
                userInfo: userInfo
            }
        }
    }

    catch (error) {
        console.log(error);
        return {
            props: {
                data: emptyPortfolioData,
                userInfo: userInfo
            }
        }
    }
}