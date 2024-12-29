import Head from 'next/head';
import "./../styles/globals.css";
import { useRouter } from 'next/router';
import Layout from './../components/Layout/layout';
import UserNavbar from '@/components/Navbar/Header';

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const getTitle = () => {
        if (router.pathname.includes("dashboard"))
            return "Dashboard | ProfolioSpace";
        else if (router.pathname.includes("login"))
            return "Login | ProfolioSpace";
        else if (router.pathname.includes("signup"))
            return "Register | ProfolioSpace";
        else if (router.pathname === "/")
            return "Home | ProfolioSpace";
        else if (router.pathname.includes("blogs"))
            return `Blogs | ProfolioSpace`;
        else if (!pageProps.foundDomain && router.pathname !== "/")
            return "Oh no🤭 Page not found | ProfolioSpace"
        else
            return `${pageProps.data?.fullName} 's portfolio | ProfolioSpace`;

    };

    return (
        <Layout>
            <Head>
                <meta name="google-adsense-account" content="ca-pub-9035732498574241"></meta>
                <title>{getTitle()}</title>
            </Head>
            {
                (router.pathname.includes("dashboard") || router.pathname.includes("login") || router.pathname.includes("signup")) && (
                    <UserNavbar username={pageProps.userInfo?.username} />
                )
            }
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;