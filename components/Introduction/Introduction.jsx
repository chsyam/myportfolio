import GitHub from "../Images/Icons/Github";
import LinkedIn from "../Images/Icons/LinkedIn";
import styles from "./Introduction.module.css";
import WavingHand from "./../../components/Images/waving_hand.png";
import Image from "next/image";
import Link from "next/link";

export default function Intoduction() {
    const platformLinks = {
        resumeURL: 'https://firebasestorage.googleapis.com/v0/b/personal-space-700e7.appspot.com/o/resume.pdf?alt=media&token=8f4d908b-4c3c-4134-a55e-d3e625c4d3b6',
        linkedInURL: 'https://www.linkedin.com/in/chsyamkumar/',
        githubURL: 'https://github.com/chsyam',
    }

    return (
        <div className={`${styles.introduction}`}>
            <div className={styles.summaryPart}>
                <div className={`${styles.workTitle}`}>
                    Web Developer
                </div>
                <div className={styles.summary}>
                    Hi
                    <Image style={{ margin: '0 10px 0 5px' }} src={WavingHand} alt="Waving Hand" width={25} height={25} />
                    I'm Syam Kumar. A passionate Front-end Developer based in Hyderabad, India.📍
                </div>
                <div className={styles.platformLinks}>
                    <div className={styles.resumeButton}>
                        <Link href={`${platformLinks.resumeURL}`} target="_blank">
                            Resume
                        </Link>
                    </div>
                    <div className={styles.techPlatforms} onClick={() => { window.open(platformLinks.linkedInURL, "_blank") }}>
                        <LinkedIn />
                    </div>
                    <div className={styles.techPlatforms} onClick={() => { window.open(platformLinks.githubURL, "_blank") }} >
                        <GitHub />
                    </div>
                </div>
            </div>
            <div className={styles.imagePart}>
            </div>
        </div>
    )
}