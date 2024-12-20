import React, { useState } from "react";
import { ChevronDown, User } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";

export default function UserNavbar({ username }) {
    const [showProfile, setShowProfile] = useState(false);
    const [mouseEnter, setMouseEnter] = useState(false);

    const handleClickOutside = () => {
        setShowProfile(false);
    };

    return (
        <nav className={`relative z-50 bg-[#4D3E5B]`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center space-x-2">
                        <span className="text-3xl text-white font-medium drop-shadow-2xl"
                            style={{
                                textShadow: '4px 4px 6px rgba(0,0,0,0.3)',
                                letterSpacing: '1px'
                            }}
                        >
                            profolioSpace
                        </span>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <button
                                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={() => {
                                    setShowProfile(!showProfile);
                                }}
                                onMouseEnter={() => setMouseEnter(true)}
                                onMouseLeave={() => setMouseEnter(false)}
                            >
                                <User
                                    className="h-6 w-6"
                                    color={`${mouseEnter ? 'black' : 'white'}`}
                                />
                                <span
                                    className={`text-md font-semibold ${mouseEnter ? 'text-black' : 'text-white'}`}
                                >
                                    {username}
                                </span>
                                <ChevronDown
                                    className="h-4 w-4"
                                    color={`${mouseEnter ? 'black' : 'white'}`}
                                />
                            </button>
                            {showProfile && <ProfileDropdown />}
                        </div>
                    </div>
                </div>
            </div>
            {showProfile && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={handleClickOutside}
                />
            )}
        </nav>
    );
}