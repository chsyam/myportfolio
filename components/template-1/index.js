import ConnectWithMe from "./templateComponents/ConnectWithMe";
import Introduction from "./templateComponents/Introduction";
import EndUserNavbar from "./templateComponents/Navbar";
import Skills from "./templateComponents/Skills";
import styles from "./templateStyles/Enduser.module.css";

export default function Template({ portfolioData }) {
    return (
        <div className={styles.mainContainer}>
            <EndUserNavbar username={portfolioData?.username} resumeURL={portfolioData?.resumeURL} />
            <div className={styles.contentContainer}>
                <Introduction portfolioData={portfolioData} />
                <Skills portfolioData={portfolioData} />
                <ConnectWithMe portfolioData={portfolioData} />
            </div>
        </div>
    );
}