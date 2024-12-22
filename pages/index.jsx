"use client";
import Link from "next/link";
import CountUp from "react-countup";
import { Card } from "@mui/material";
import { decrypt } from "./api/auth/lib";
import LinkedIn from "@/components/Images/Icons/LinkedIn";
import { Users, Briefcase, Globe, ArrowRight, LayoutTemplate } from "lucide-react";

export default function Home() {
    const stats = [
        { label: "Global Users", value: 50000, icon: Users },
        { label: "Templates", value: 2, icon: LayoutTemplate },
    ];

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

    const recentUpdates = [
        {
            name: "Sarah Chen",
            role: "UX Designer",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
        },
        {
            name: "Alex Rivera",
            role: "Full Stack Developer",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
        },
        {
            name: "Emma Wilson",
            role: "Graphic Designer",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
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

            {/* Stats Section */}
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

            {/* Features Section */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">
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
                    <h2 className="text-3xl font-bold text-center mb-12">Recent Portfolio Updates</h2>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                        {recentUpdates.map((update, index) => (
                            <Card key={index} className="p-6 rounded-md">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={update.image}
                                        alt={update.name}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{update.name}</h3>
                                        <p className="text-sm text-muted-foreground">{update.role}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
    if (!payload || payload === null || payload === undefined) {
        res.setHeader('Set-Cookie', [
            'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;',
        ]);
        return {
            props: {
                login: false
            }
        }
    } else {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
        }
    }
}