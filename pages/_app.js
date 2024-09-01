import Layout from '@/components/Layout/Layout';
import styles from "./../styles/globals.css"

function MyApp({ Component, pageProps }) {
    return (
        <Layout username={pageProps.username} >
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;