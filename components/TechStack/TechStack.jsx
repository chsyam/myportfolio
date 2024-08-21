import CSS from "../Images/Icons/Css";
import Html from "../Images/Icons/Html";
import NextJS from "../Images/Icons/NextJS";
import ReactJS from "../Images/Icons/React";
import styles from "./TechStack.module.css";
import SQL from "../Images/Icons/SQL";
import Python from "../Images/Icons/Python";
import Java from "../Images/Icons/Java";
import SpringBoot from "../Images/Icons/SpringBoot";

export default function TechStack() {
    return (
        <div className={styles.techStackSection}>
            <div className={styles.sectionTitle}>
                Tech stack
            </div>
            <div className={styles.skillsList}>
                <Html height="60px" width="60px" />
                <CSS height="60px" width="60px" />
                <ReactJS height="60px" width="60px" />
                <NextJS height="60px" width="60px" />
                <SQL height="60px" width="60px" />
                <Python heigh="60px" width="60px" />
                <Java heigh="60px" width="60px" />
                <SpringBoot heigh="60px" width="60px" />
            </div>
        </div>
    );
}