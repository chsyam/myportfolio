import axios from "axios";
import Intoduction from "./../../components/Introduction/Introduction";
import TechStack from "./../../components/TechStack/TechStack";
import styles from "./../../styles/Dashboard.module.css"

export default function Home({ data }) {

    return (
        <div className={styles.dashboard}>
            <Intoduction portfolioData={data} />
            {
                data.skills && data.skills.length !== 0 &&
                <TechStack portfolioData={data} />
            }
        </div>
    );
}

export async function getServerSideProps() {
    
    const emptyPortfolioData = {
        username: '',
        workTitle: '',
        selfieURL: '',
        description: '',
        resumeURL: '',
        platformLinks: {},
        skills: [],
    }
    try {
        const response = await axios.get('https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/portfolio.json');
        const data = response.data
        const key = Object.keys(data).find((objId) => data[objId].username === 'chsyamkumar.in');
        if (key === undefined) {
            return {
                props: {
                    data: emptyPortfolioData,
                    username: ''
                }
            }
        }
        return {
            props: {
                data: data[key],
                username: data[key].username
            }
        }
    }
    catch (error) {
        console.log(error);
        return {
            props: {
                data: emptyPortfolioData,
                username: ''
            }
        }
    }
}