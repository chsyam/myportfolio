import { Download } from "lucide-react";

export default function Navbar({ username, resumeURL }) {
    return (
        <nav className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent cursor-pointer"
                        onClick={() => window.location.reload()}
                    >
                        {username ? username : ""}
                    </span>
                    <button className="text-xl bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent cursor-pointer flex gap-2 font-semibold flex-nowrap"
                        onClick={() => window.open(resumeURL, "_blank")}
                    >
                        <Download color="#C47EF2" strokeWidth={3} />
                        Resume
                    </button>
                </div>
            </div>
        </nav>
    );
}