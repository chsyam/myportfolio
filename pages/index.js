import axios from "axios";
import Intoduction from "./../components/Introduction/Introduction";
import Navbar from "./../components/Navbar/Navbar";
import TechStack from "./../components/TechStack/TechStack";
import styles from "./../styles/Dashboard.module.css"
import Layout from "@/components/Layout/Layout";

export default function Home({ objId, data, response }) {
    const apiHandler = async () => {
        try {
            const response = await axios.get('https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/portfolio.json');
            console.log(response.data)
        }
        catch (error) {
            console.log(error);
        }
    }

    apiHandler();

    return (
        <div className={styles.dashboard}>
            <Intoduction portfolioData={data} />
            <TechStack portfolioData={data} />
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const response = await axios.get('https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/portfolio.json');
        const data = response.data

        const key = Object.keys(data).find((objId) => data[objId].username === 'chsyamkumar.in');
        console.log(key, data[key]);
        console.log(key)
        if (key === undefined) {
            return {
                props: {
                    objId: [],
                    data: {}
                }
            }
        }
        return {
            props: {
                objId: key,
                data: data[key],
            }
        }
    }
    catch (error) {
        console.log(error);
        return {
            props: {
                objId: [],
                data: {}
            }
        }
    }
}