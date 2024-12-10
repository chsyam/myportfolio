import styles from "./../templateStyles/Enduser.module.css";

export default function Introduction({ portfolioData }) {
    const imageStyles = (imageURL) => {
        return {
            width: "250px",
            height: "250px",
            borderRadius: '60 % 40 % 30 % 70 % / 60% 30% 70% 40%',
            backgroundImage: 'linear-gradient(45deg, #08aeea, #2af598, 100%)',
            border: '1px solid #000',
            background: `url("${imageURL}") no-repeat`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            backgroundBlendMode: 'multiply',
        }
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.content}>
                <div className="text-3xl font-medium my-1">
                    {
                        portfolioData?.workTitle
                    }
                </div>
                <div className="text-md text-[#827f7f] my-2 text-justify hyphens-auto">
                    {
                        portfolioData?.description
                    }
                </div>
            </div>
            {
                portfolioData?.selfieURL && (
                    <div className="flex-grow  max-w-[40%] flex justify-center">
                        <div className={styles.imagePart} style={imageStyles(portfolioData.selfieURL)} />
                    </div>
                )
            }
        </div>
    )
}