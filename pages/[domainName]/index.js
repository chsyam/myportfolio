import Intoduction from "@/components/Introduction/Introduction";
import TechStack from "@/components/TechStack/TechStack";
import axios from "axios";
import Template from "@/components/template-1";

export default function EndUserView({ data, domainName }) {
    console.log(`fetching data for ${domainName}`);

    return (
        <div>
            <Template portfolioData={data} />
        </div>
    );
}

export async function getServerSideProps(context) {
    const { req, res } = context;
    let domainName = "";
    const emptyPortfolioData = {
        fullName: "",
        username: '',
        userId: '',
        workTitle: '',
        selfieURL: '',
        description: '',
        resumeURL: '',
        platformLinks: {},
        skills: [],
        webAddress: "",
    }

    try {
        domainName = context.params["domainName"]
        console.log(domainName);
    } catch (error) {
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
                }
            }
        }
        const objId = Object.keys(data).find((objId) => data[objId].webAddress === domainName);
        if (objId === undefined) {
            return {
                props: {
                    data: emptyPortfolioData,
                    domainName: domainName,
                }
            }
        }
        return {
            props: {
                data: data[objId],
                domainName: domainName,
            }
        }
    }
    catch (error) {
        console.log(error);
        return {
            props: {
                data: emptyPortfolioData,
                domainName: domainName,
            }
        }
    }
}