import styles from "./../styles/Dashboard.module.css"
import HomePage from "@/components/homePage/HomePage";
import { decrypt } from "./api/auth/lib";

export default function Home({ login }) {
    return (
        <div className={styles.dashboard}>
            <HomePage />
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
            props: {
                login: false
            }
        }
    } else {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
        }
    }
}