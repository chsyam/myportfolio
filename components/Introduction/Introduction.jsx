import GitHub from "../Images/Icons/Github";
import LinkedIn from "../Images/Icons/LinkedIn";
import styles from "./Introduction.module.css";
import WavingHand from "./../../components/Images/waving_hand.png";
import Image from "next/image";
import Link from "next/link";
import Instagram from "../Images/Icons/Instagram";
import Facebook from "../Images/Icons/Facebook";
import X from "../Images/Icons/X";

export default function Intoduction({ portfolioData }) {
    const platformLinks = {
        resumeURL: 'https://firebasestorage.googleapis.com/v0/b/personal-space-700e7.appspot.com/o/resume.pdf?alt=media&token=8f4d908b-4c3c-4134-a55e-d3e625c4d3b6',
        linkedInURL: 'https://www.linkedin.com/in/chsyamkumar/',
        githubURL: 'https://github.com/chsyam',
    }

    const iconMap = {
        LinkedIn: <LinkedIn />,
        GitHub: <GitHub />,
        Instagram: <Instagram />,
        Facebook: <Facebook />,
        X: <X />
    }

    const imageStyles = (imageURL) => {
        return {
            width: "400px",
            height: "400px",
            borderRadius: '60 % 40 % 30 % 70 % / 60% 30% 70% 40%',
            backgroundImage: 'linear-gradient(45deg, #08aeea, #2af598, 100%)',
            border: '3px solid #000',
            background: `url("${imageURL}") no-repeat`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            backgroundBlendMode: 'multiply',
        }
    }


    return (
        <div className={`${styles.introduction}`}>
            <div className={styles.summaryPart}>
                {
                    portfolioData?.workTitle ? (
                        <div className={styles.workTitle}>
                            <div className={styles.titleText}>
                                {portfolioData?.workTitle}
                            </div>
                        </div>
                    ) : ""
                }
                <div className={styles.summary}>
                    {portfolioData?.description ? portfolioData?.description + " 📍" : ""}
                </div>
                <div className={styles.platformLinks}>
                    {
                        portfolioData?.resumeURL !== "" &&
                        <div className={styles.resumeButton}>
                            <Link href={`${portfolioData?.resumeURL}`} target="_blank">
                                Resume
                            </Link>
                        </div>
                    }
                    {
                        portfolioData?.platformLinks && Object.keys(portfolioData?.platformLinks)?.length !== 0 && Object.keys(portfolioData?.platformLinks)?.map((platform, index) => {
                            return (
                                <div
                                    key={index}
                                    className={styles.techPlatforms}
                                    onClick={() => {
                                        window.open(portfolioData?.platformLinks[platform], "_blank")
                                    }}
                                >
                                    {iconMap[platform]}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                portfolioData.selfieURL !== "" &&
                <div className={styles.imagePart} style={imageStyles(portfolioData.selfieURL)} />
            }
        </div >
    )
}