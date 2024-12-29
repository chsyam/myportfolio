import Head from 'next/head';
import "./../styles/globals.css";
import { useRouter } from 'next/router';
import Layout from './../components/Layout/layout';
import UserNavbar from '@/components/Navbar/Header';
import Script from 'next/script';

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
                <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9035732498574241"
                    crossorigin="anonymous"></Script>
            </Head>
            {
                (router.pathname.includes("dashboard") || router.pathname.includes("login") || router.pathname.includes("signup")) && (
                    <UserNavbar username={pageProps.userInfo?.username} />
                )
            }
            <Component {...pageProps} />

            <ins className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-9035732498574241"
                data-ad-slot="1656184874"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({ });
            </script>
        </Layout>
    );
}

export default MyApp;