import UserNavbar from '@/components/Navbar/Header';
import Layout from './../components/Layout/layout';
import "./../styles/globals.css";
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
    console.log(pageProps)
    const router = useRouter();
    console.log(router.pathname)
    return (
        <Layout>
            {
                router.pathname.includes("dashboard") && (
                    <UserNavbar username={pageProps.userInfo?.username} />
                )
            }
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;