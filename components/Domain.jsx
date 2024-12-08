import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Globe, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Domain() {
    const [domainSubmitStatus, setDomainSubmitStatus] = useState(false);
    const handleSubmit = () => {
        setDomainSubmitStatus(true);
        console.log("saved to database. successfully...!");
        setDomainSubmitStatus(false);
    }

    return (
        <div className="w-[100%] border-x-2 border-b-2 border-[#E3E3E3] px-6 py-1">
            <div className="text-xl font-normal my-4">
                Change your domain address
            </div>
            <div className="flex flex-wrap gap-8 my-4 bg-[#FFF] p-8 items-center rounded-md">
                <div className="text-left">
                    <span className="text-[16px] text-gray-500">hostname (you can't edit it)</span>
                    <div className="border py-2 px-4 my-2 rounded-md cursor-not-allowed">
                        {window.location.protocol + "//" + window.location.host + "/"}
                    </div>
                </div>
                <div className="text-left flex-grow">
                    <span className="text-[16px] text-gray-500">
                        endpoint (you can change it)
                    </span>
                    <div>
                        <input className="w-full border bg-[#f3f4f6] py-2 px-4 my-2 rounded-md"
                        />
                    </div>
                </div>
            </div>
            <div className={`bg-[#4d3e5b] text-[#fff] rounded-md py-[10px] px-[20px] text-[16px] cursor-pointer my-6 w-fit`}
                onClick={() => handleSubmit()}
                style={{
                    opacity: domainSubmitStatus ? 0.7 : 1,
                    pointerEvents: domainSubmitStatus ? 'none' : 'auto',
                }}
            >
                {
                    domainSubmitStatus ? (
                        <div className="flex justify-center items-center flex-nowrap gap-4">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            saving....
                        </div>
                    ) : (
                        <div className="flex items-center justify-center flex-nowrap gap-4">
                            <Save /> save changes
                        </div>
                    )
                }
            </div>
            <div className="my-4 flex gap-2 flex-wrap">
                To visit your portfolio, click here
                <Link
                    target="_blank"
                    href={`${window.location.protocol + "//" + window.location.host + "/"}`}
                >
                    <Globe color="blue" />
                </Link>
            </div>
        </div>
    )
}