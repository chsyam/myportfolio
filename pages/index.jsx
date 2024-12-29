"use client";
import axios from "axios";
import Link from "next/link";
import dynamic from "next/dynamic";
import CountUp from "react-countup";
import { Card } from "@mui/material";
import { decrypt } from "./api/auth/lib";
import { useEffect, useState } from "react";
import LinkedIn from "@/components/Images/Icons/LinkedIn";
import { Users, Globe, ArrowRight, LayoutTemplate, Camera, CircleUserRound } from "lucide-react";

const AdScenceComponent = dynamic(() => import('./../components/AdScenceComponent'), { ssr: false });

export default function Home({ usersList, portfoliosList }) {
    const [recentPortfolioChanges, setRecentPortfolioChanges] = useState([]);

    const stats = [
        { label: "Global Users", value: Object.keys(usersList).length || 100, icon: Users },
        { label: "Templates", value: 2, icon: LayoutTemplate },
    ];

    useEffect(() => {
        const sortedPortfolios = Object.values(portfoliosList)?.sort((a, b) =>
            new Date(b.lastUpdatedOn) - new Date(a.lastUpdatedOn)
        );

        // console.log("sortedPortfolios", sortedPortfolios);
        setRecentPortfolioChanges(sortedPortfolios?.slice(0, 3));
    }, [])

    const features = [
        {
            title: "Professional Templates",
            description: "Choose from a variety of professionally designed templates to showcase your work."
        },
        {
            title: "Easy Customization",
            description: "Customize your portfolio with drag-and-drop ease and real-time preview."
        },
        {
            title: "Social Integration",
            description: "Connect all your social media profiles and showcase your online presence."
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <div
                            className="text-4xl font-medium tracking-tight sm:text-6xl text-[#4d325b]"
                            style={{
                                textShadow: '4px 4px 8px rgba(0,0,0,0.4)',
                            }}
                        >
                            ProfolioSpace
                        </div>
                        <div
                            className="mt-6 text-lg leading-8 text-muted-foreground"
                        >
                            Your professional portfolio, beautifully crafted and easily shared.
                            Stand out in the digital world with a stunning portfolio website.
                        </div>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link href="/signup">
                                <div className="bg-[#4d3e5b] text-white px-4 py-2 rounded-md flex flex-nowrap gap-1 items-center justify-center">
                                    Get Started
                                    <ArrowRight size={28} />
                                </div>
                            </Link>
                            <Link href="/login">
                                <div className="border-2 border-[#4d3e5b] text-[#4d325b] font-medium text-xl px-4 py-2 rounded-md">
                                    Sign In
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>


            <div className="bg-muted py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                        {stats.map((stat, index) => (
                            <Card key={index} className="p-6 text-center rounded-md">
                                <stat.icon color="#000" className="mx-auto h-8 w-8 text-primary" />
                                <div className="my-3 text-3xl text-[#4d325b] font-semibold">
                                    <CountUp start={0} end={stat.value} duration={1} />
                                </div>
                                <p className="font-medium text-[18px] text-muted-foreground">{stat.label}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full border border-gray-100">
                <AdScenceComponent />
            </div>

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-medium text-center mb-12 text-[#4D3E5B]">
                        Why Choose ProfolioSpace?
                    </h2>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <Card key={index} className="p-6 rounded-md">
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Updates Section */}
            <div className="bg-muted py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-3xl font-medium text-center mb-12 text-[#4D3E5B]">
                        Recent portfolio updates
                    </div>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                        {recentPortfolioChanges.map((update, index) => (
                            <Card
                                key={index}
                                className="p-6 rounded-md cursor-pointer"
                                onClick={() => window.open(`https://profoliospace.in/${update.webAddress}`, "_blank")}
                            >
                                <div className="flex items-center space-x-4">
                                    {
                                        update?.selfieURL ? (
                                            <img
                                                src={update.selfieURL}
                                                alt={update.fullName}
                                                className="h-12 w-12 rounded-full object-cover  shadow-xl shadow-stone-400"
                                            />
                                        ) : (
                                            <div className="h-12 w-12 rounded-full">
                                                <CircleUserRound className="h-12 w-12" strokeWidth={1} color="gray" />
                                            </div>
                                        )
                                    }

                                    <div>
                                        <h3 className="font-semibold">{update.fullName}</h3>
                                        <p className="text-sm text-muted-foreground">{update.workTitle}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                    <div className="flex justify-between items-center">
                        <p className="text-muted-foreground">
                            © 2024 ProfolioSpace. All rights reserved.
                        </p>
                        <div className="flex gap-1">
                            <Link href="https://chsyamkumar.in"
                                target="_blank"
                                className="text-muted-foreground hover:text-primary"
                            >
                                <Globe size={26} color="blue" />
                            </Link>
                            <Link
                                href="https://www.linkedin.com/in/chsyamkumar/"
                                target="_blank"
                                className="text-muted-foreground hover:text-primary"
                            >
                                <LinkedIn height="26" />
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { req, res } = context;
    const token = req?.cookies['token']
    const payload = await decrypt(token)
    let users = {};
    let portfolios = {};

    if (payload) {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
        }
    } else {
        res.setHeader('Set-Cookie', [
            'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;',
        ]);

        try {
            const usersResponse = await axios.get('https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/users.json');
            users = usersResponse.data || {};

            const portfoliosResponse = await axios.get('https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/portfolio.json');
            portfolios = portfoliosResponse.data || {};

            return {
                props: {
                    usersList: users,
                    portfoliosList: portfolios,
                }
            }
        }
        catch (error) {
            console.log(error);
            return {
                props: {
                    usersList: [],
                    portfoliosList: [],
                }
            }
        }
    }
}