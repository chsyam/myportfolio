import axios from "axios";
import Intoduction from "./../../components/Introduction/Introduction";
import TechStack from "./../../components/TechStack/TechStack";
import styles from "./../../styles/Dashboard.module.css"
import { decrypt } from "../api/auth/lib";

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
    const token = req?.cookies['token']
    const payload = await decrypt(token)
    if (!payload || payload === null || payload === undefined) {
        res.setHeader('Set-Cookie', [
            'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;',
        ]);

        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    const emptyPortfolioData = {
        username: '',
        userId: '',
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
        const key = Object.keys(data).find((objId) => data[objId].userId === payload.userId);
        if (key === undefined) {
            return {
                props: {
                    data: emptyPortfolioData,
                    username: payload.username,
                    userId: payload.userId
                }
            }
        }
        return {
            props: {
                data: data[key],
                username: data[key].username,
                userId: payload.userId
            }
        }
    }
    catch (error) {
        console.log(error);
        return {
            props: {
                data: emptyPortfolioData,
                username: payload.username,
                    userId: payload.userId
            }
        }
    }
}