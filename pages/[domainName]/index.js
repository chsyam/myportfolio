import axios from "axios";
import dynamic from "next/dynamic";

export default function EndUserView({ data, domainName, foundDomain }) {
    console.log(`fetching data for ${domainName}`);
    const Template = dynamic(() => import(`@/components/template-${data?.template || 1}`), {
        ssr: false,
    });

    return (
        <div>
            {
                foundDomain ? (
                    <Template portfolioData={data} />
                ) : (
                    <div className="text-center mt-[15%] select-none px-4">
                        <div className="text-2xl font-semibold">
                            Page not found 🤭
                        </div>
                        <div className="my-4 text-[18px] text-gray-600">
                            We are very sorry, but we couldn't find this particular page (
                            <span className="text-black font-semibold">/{domainName}</span>
                            ).
                        </div>
                        <div className="my-4 text-[18px] text-gray-600">
                            Please check whether you entered it correctly.
                        </div>
                        <div className="my-4 text-[18px] text-gray-600">
                            Meanwhile, visit our site to explore more.
                            <a href="https://www.profoliospace.in/" className="text-blue-700 font-semibold hover:underline underline-offset-4 ml-2">
                                profoliospace.in
                            </a>
                        </div>
                    </div>
                )
            }

        </div >
    );
}

export async function getServerSideProps(context) {
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
        template: '1'
    }

    try {
        domainName = context.params["domainName"]
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
                    foundDomain: false
                }
            }
        }
        const objId = Object.keys(data).find((objId) => data[objId].webAddress === domainName);
        if (objId === undefined) {
            return {
                props: {
                    data: emptyPortfolioData,
                    domainName: domainName,
                    foundDomain: false
                }
            }
        }
        return {
            props: {
                data: data[objId],
                domainName: domainName,
                foundDomain: true
            }
        }
    }
    catch (error) {
        console.log(error);
        return {
            props: {
                data: emptyPortfolioData,
                domainName: domainName,
                foundDomain: false
            }
        }
    }
}