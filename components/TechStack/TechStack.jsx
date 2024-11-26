import CSS from "../Images/Icons/Css";
import Html from "../Images/Icons/Html";
import NextJS from "../Images/Icons/NextJS";
import ReactJS from "../Images/Icons/React";
import styles from "./TechStack.module.css";
import SQL from "../Images/Icons/SQL";
import Python from "../Images/Icons/Python";
import Java from "../Images/Icons/Java";
import SpringBoot from "../Images/Icons/SpringBoot";

export default function TechStack({ portfolioData }) {
    return (
        <div className={styles.techStackSection}>
            <div className={styles.sectionTitle}>
                Skills
            </div>
            <div className={styles.skillsList}>
                <table>
                    <tbody>
                        <tr>
                            {/* <td>
                                <div className={styles.skillType}>
                                    Technical Skills
                                </div>
                            </td> */}
                            <td className={styles.skillsTD}>
                                {
                                    portfolioData.skills.map((skill, index) => {
                                        return skill.type === "technical" && (
                                            <div className={styles.skillCell} key={index}>
                                                {skill.name}
                                            </div>
                                        )
                                    })
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}