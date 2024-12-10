import GitHub from "@/components/Images/Icons/Github";
import styles from "./../templateStyles/Enduser.module.css";
import LinkedIn from "@/components/Images/Icons/LinkedIn";
import Twitter from "@/components/Images/Icons/Twitter";
import Instagram from "@/components/Images/Icons/Instagram";
import Facebook from "@/components/Images/Icons/Facebook";
import Email from "@/components/Images/Icons/Email";
import YouTube from "@/components/Images/Icons/Youtube";

export default function ConnectWithMe({ portfolioData }) {
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
        <div className={styles.skillsContainer}>
            {
                portfolioData?.platformLinks && Object.keys(portfolioData?.platformLinks || {}).length > 0 && (
                    <div className="text-center text-xl font-medium my-2 text-[#4D3E5B]">
                        Connect with me here
                    </div>
                )
            }
            <div className={styles.platforms}>
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
        </div >
    );
}