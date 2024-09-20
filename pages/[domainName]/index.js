import Intoduction from "@/components/Introduction/Introduction";
import TechStack from "@/components/TechStack/TechStack";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./../../styles/Dashboard.module.css"

export default function EndUserView({ data }) {
    const router = useRouter();
    const { domainName } = router.query;
    console.log("end-user domain address =>", domainName)

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
    let domainName = "";
    let userId = '';
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
        domainName = context.params["domainName"]
    } catch (error) {
        console.log(error)
    }

    try {
        const response = await axios.get('https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/endUserWebAddress.json');
        const data = response.data
        if (data === null) {
            return {
                props: {
                    data: emptyPortfolioData,
                    domainName: domainName,
                    username: '',
                }
            }
        }
        let userDomainObject = {}
        const allObjects = Object.keys(data)
        if (allObjects.length === 0) {
            return {
                props: {
                    data: emptyPortfolioData,
                    domainName: domainName,
                    username: '',
                }
            }
        } else {
            for (let i = 0; i < allObjects.length; i++) {
                console.log(data[allObjects[i]].webAddress, domainName)
                if (data[allObjects[i]].webAddress === domainName) {
                    userDomainObject = data[allObjects[i]]
                    break;
                }
            }
        }

        console.log("userDomainObject", userDomainObject)
        if (userDomainObject) {
            userId = userDomainObject['userId']
        } else {
            return {
                props: {
                    data: emptyPortfolioData,
                    domainName: domainName,
                    username: '',
                }
            }
        }
    }
    catch (error) {
        console.log(error)
    }

    try {
        const response = await axios.get('https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/portfolio.json');
        const data = response.data;
        if (data === null) {
            return {
                props: {
                    data: emptyPortfolioData,
                    domainName: domainName,
                    username: '',
                }
            }
        }
        const objId = Object.keys(data).find((objId) => data[objId].userId === userId);
        if (objId === undefined) {
            return {
                props: {
                    data: emptyPortfolioData,
                    domainName: domainName,
                    username: '',
                }
            }
        }
        console.log(objId, data[objId])
        return {
            props: {
                data: data[objId],
                domainName: domainName,
                username: data[objId].username,
            }
        }
    }
    catch (error) {
        console.log(error);
        return {
            props: {
                data: emptyPortfolioData,
                domainName: domainName,
                username: '',
            }
        }
    }
}