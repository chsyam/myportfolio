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

export async function getServerSideProps(context) {
    const { req, res } = context;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1Yjk2NjJhYS0xY2IwLTQxMTgtYmFiOC1kYzE5NmNiY2ZjY2QiLCJpYXQiOjE3MjU0ODA5NzYsImV4cCI6MTcyNTQ4MTAzNn0.JHD69B-BbckN2Qh3WItRkTkZjlWQh3k0fLeX_P9Rwm4' // req.cookies["token"];

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

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