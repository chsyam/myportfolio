import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Globe, Save } from "lucide-react";
import Link from "next/link";

export default function Domain() {
    const handleSubmit = () => {
        console.log("saved to database. successfully...!")
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
            <div className="bg-[#4d3e5b] text-[#fff] rounded-md py-[10px] px-[20px] text-[16px] flex items-center justify-center flex-nowrap gap-2 cursor-pointer my-6 w-fit"
                onClick={() => handleSubmit()}
            >
                <Save /> save changes
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