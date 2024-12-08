import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Save } from "lucide-react";
import { useState } from "react";

export default function Templates() {
    const [templateSelectStatus, setTemplateSelectStatus] = useState(false);
    const handleTemplateSelect = () => {
        setTemplateSelectStatus(true);
        console.log("template selected")
        setTemplateSelectStatus(false);
    }

    return (
        <div className="w-[100%] border-x-2 border-b-2 border-[#E3E3E3] px-6 py-2">
            <div className="text-xl font-normal my-4">
                Select a template
            </div>
            <div>
                <RadioGroup
                    row={true}
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="template-1"
                    name="row-radio-buttons-group"
                    onChange={(e) => console.log(e.target.value)}
                    className="gap-6"
                >
                    <FormControlLabel value="template-1" control={<Radio />} label={
                        <img width={200} height={200} src={"https://firebasestorage.googleapis.com/v0/b/educationforjobs-storage.appspot.com/o/selfies%2Fits%20me.jpg?alt=media&token=d6696358-ad9d-4e45-b470-1da6b9be0c1a"} alt="template1" className="rounded-2xl" />
                    } />
                    <FormControlLabel value="template-2" control={<Radio />} label={
                        <img width={200} height={200} src={"https://firebasestorage.googleapis.com/v0/b/educationforjobs-storage.appspot.com/o/selfies%2Fits%20me.jpg?alt=media&token=d6696358-ad9d-4e45-b470-1da6b9be0c1a"} alt="template1" className="rounded-2xl" />
                    } />
                </RadioGroup>
            </div>
            <div className={`bg-[#4d3e5b] text-[#fff] rounded-md py-[10px] px-[20px] text-[16px] cursor-pointer my-6 w-fit float-right`}
                onClick={() => handleTemplateSelect()}
                style={{
                    opacity: templateSelectStatus ? 0.7 : 1,
                    pointerEvents: templateSelectStatus ? 'none' : 'auto',
                }}
            >
                {
                    templateSelectStatus ? (
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
        </div >
    )
}