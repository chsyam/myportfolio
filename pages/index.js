import Intoduction from "./../components/Introduction/Introduction";
import Navbar from "./../components/Navbar/Navbar";
import TechStack from "./../components/TechStack/TechStack";
import styles from "./../styles/Dashboard.module.css"

export default function Home({ objId, data }) {
    console.log(objId, data);

    return (
        <div className={styles.dashboard}>
            <Navbar portfolioData={data} />
            <Intoduction portfolioData={data} />
            <TechStack portfolioData={data} />
        </div>
    );
}

export async function getServerSideProps() {
    const response = await fetch('https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/portfolio.json');
    const data = await response.json();

    const key = Object.keys(data).find((objId) => data[objId].username === 'chsyamkumar.in');
    console.log(key, data[key]);

    return {
        props: {
            objId: key,
            data: data[key]
        }
    }
}