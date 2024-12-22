import GitHub from "@/components/Images/Icons/Github";
import LinkedIn from "@/components/Images/Icons/LinkedIn";
import Twitter from "@/components/Images/Icons/Twitter";
import Instagram from "@/components/Images/Icons/Instagram";
import Facebook from "@/components/Images/Icons/Facebook";
import Email from "@/components/Images/Icons/Email";
import YouTube from "@/components/Images/Icons/Youtube";
import styles from "./../styles/Enduser.module.css";

export default function About({ portfolioData }) {
    const platformIcons = {
        "github": <GitHub />,
        "linkedin": <LinkedIn />,
        "twitter": <Twitter />,
        "instagram": <Instagram />,
        "facebook": <Facebook />,
        "email": <Email />,
        "youtube": <YouTube />
    }

    return (
        <section id="about" className="pt-12 sm:pt-20 pb-2 px-4">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2 space-y-8">
                    <div>
                        <div className="text-3xl sm:text-5xl font-semibold leading-tight">
                            Hi, I'm {portfolioData?.fullName}
                        </div>
                        <div className="text-2xl sm:text-3xl font-medium my-3 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                            {portfolioData?.workTitle}
                        </div>
                    </div>
                    <p className="text-gray-600 text-md sm:text-[18px] leading-relaxed">
                        {portfolioData?.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                        {
                            Object.keys(portfolioData?.platformLinks || {}).map((platform, index) => (
                                <div key={index}
                                    className={styles.platform}
                                    onClick={
                                        () => window.open(portfolioData?.platformLinks[platform] || "", "_blank")
                                    }
                                >
                                    {
                                        platformIcons[platform?.toLowerCase()]
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div >
                    <div className="relative">
                        <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg">
                            <img
                                src={`${portfolioData?.selfieURL}`}
                                alt="Jane Smith"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}