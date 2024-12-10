import styles from "./../templateStyles/Enduser.module.css";

export default function Skills({ portfolioData }) {
    return (
        <div className={styles.skillsContainer}>
            {
                portfolioData?.skills && portfolioData?.skills?.length !== 0 && (
                    <div className="text-center text-3xl font-medium my-6 text-[#4D3E5B]">
                        skills
                    </div>
                )
            }
            <div className={styles.skills}>
                {
                    portfolioData?.skills && portfolioData?.skills?.map((skill, index) => {
                        return (
                            <div key={index} className={styles.skillItem}>
                                <div className="skillName">{skill?.name}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}