import { useRouter } from 'next/router';
import { Button } from "@mui/material";
import styles from "./../styles/Navbar.module.css"
import { ArrowDownToLine } from 'lucide-react';

export default function EndUserNavbar({ username, resumeURL }) {
    const router = useRouter();

    return (
        <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-10">
            <nav className='max-w-6xl mx-auto px-4 py-4 flex justify-between items-center'>
                <div className="text-xl font-semibold text-[#4D3E5B] cursor-pointer"
                    onClick={() => window.location.reload()}
                >
                    {username ? username : ""}
                </div>

                <div className="flex gap-6">
                    {
                        resumeURL && (
                            <a
                                href={`${resumeURL}`}
                                target="_blank"
                                className="flex w-fit flex-nowrap gap-2 bg-[#4D3E5B] text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                <ArrowDownToLine />
                                Resume
                            </a>
                        )
                    }
                </div>
            </nav>
        </header>
    );
}