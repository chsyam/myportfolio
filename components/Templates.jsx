import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Save } from "lucide-react";
import { Selfie } from "./../components/Images/my_selfie.jpg"

export default function Templates() {
    const templateList = [
        {

        }
    ]

    const handleSubmit = () => {
        console.log("saved to database. successfully...!")
    }

    const handleTemplateSelect = () => {
        console.log("template selected")
    }

    return (
        <div className="w-[100%] border-x-2 border-b-2 border-[#E3E3E3] px-6 py-1">
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
                        <img src={"https://firebasestorage.googleapis.com/v0/b/educationforjobs-storage.appspot.com/o/selfies%2Fits%20me.jpg?alt=media&token=d6696358-ad9d-4e45-b470-1da6b9be0c1a"} alt="template1" className="rounded-2xl w-[250px] h-[250px]" />
                    } />
                    <FormControlLabel value="template-2" control={<Radio />} label={
                        <img src={"https://firebasestorage.googleapis.com/v0/b/educationforjobs-storage.appspot.com/o/selfies%2Fits%20me.jpg?alt=media&token=d6696358-ad9d-4e45-b470-1da6b9be0c1a"} alt="template1" className="rounded-2xl w-[250px] h-[250px]" />
                    } />
                </RadioGroup>
            </div>
            <div className="bg-[#4d3e5b] text-[#fff] rounded-md py-[10px] px-[20px] text-[16px] flex items-center justify-center flex-nowrap gap-2 cursor-pointer my-6 w-fit"
                onClick={() => handleSubmit()}
            >
                <Save /> save changes
            </div>
        </div >
    )
}