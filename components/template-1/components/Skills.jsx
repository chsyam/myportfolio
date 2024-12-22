import styles from "./../styles/Enduser.module.css";

export default function Skills({ portfolioData }) {
    return (
        <div className={styles.skillsContainer}>
            {
                portfolioData?.skills && portfolioData?.skills?.length !== 0 && (
                    <div className="text-2xl sm:text-3xl font-medium my-8 text-center text-gray-800">
                        Skills & Expertise
                    </div>
                )
            }
            <div className={styles.skills}>
                {
                    portfolioData?.skills && portfolioData?.skills?.map((skill, index) => {
                        return (
                            <div key={index} className="bg-[#4D3E5B] text-white px-3 py-2 sm:px-6 sm:py-3 rounded-lg">
                                {skill?.name}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}