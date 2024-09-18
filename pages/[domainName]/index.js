import axios from "axios";
import { useRouter } from "next/router";

export default function EndUserView() {
    const router = useRouter();
    const { domainName } = router.query;

    return (
        <div>
            User's view {domainName}
        </div>
    );
}

export async function getServerSideProps(context) {
    const { req, res } = context;

    try {
        const { domainName } = context.params
        const response = await axios.get('https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/endUserNames.json');
        const data = response.data
        console.log("data", data)
    }
    catch (error) {
        console.log(error)
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
                    username: '',
                    userId: ''
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
                username: '',
                userId: ''
            }
        }
    }
}