import axios from "axios";
import styles from "./../../styles/Dashboard.module.css"
import { decrypt } from "../api/auth/lib";
import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";

export default function Home({ data }) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={styles.dashboard}>
            <Box sx={{ border: 1, borderColor: 'divider', width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
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
            <div className="flex w-[100%] border">
                <div className="grow p-6">
                    <form>
                        <div className={styles.inputField}>
                            <label>Full Name</label><br />
                            <input name="fullName" placeholder="enter nice looking name" />
                        </div>
                        <div className={styles.inputField}>
                            <label>Job Title</label>
                            <input
                                type="text"
                                name="workTitle"
                                placeholder="enter Fancy work title"
                            />
                        </div>
                        <div className={styles.inputField}>
                            <label>Bio</label>
                            <textarea
                                name="description"
                                style={{ minHeight: '150px' }}
                                type="text"
                                placeholder="enter your bio briefly"
                            ></textarea>
                        </div>
                    </form>
                </div>
                <div className="grow p-6">
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { req, res } = context;
    const token = req?.cookies['token']
    const payload = await decrypt(token)
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
                    userId: payload.userId
                }
            }
        }
        return {
            props: {
                data: data[key],
                username: data[key].username,
                userId: payload.userId
            }
        }
    }
    catch (error) {
        console.log(error);
        return {
            props: {
                data: emptyPortfolioData,
                username: payload.username,
                userId: payload.userId
            }
        }
    }
}