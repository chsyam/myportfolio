import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import template1 from "./../public/templates/template-1.png";
import template2 from "./../public/templates/template-2.png";

export default function Templates({ portfolioKey, portfolioData, }) {
    const [templateSelectStatus, setTemplateSelectStatus] = useState(false);
    const [templateSelected, setTemplateSelected] = useState(portfolioData?.template || '1');

    useEffect(() => {
        console.log("template selected", portfolioData?.template)
        if (portfolioData?.template) {
            setTemplateSelected(portfolioData?.template);
        }
    }, [portfolioData]);

    const handleTemplateSelect = async () => {
        setTemplateSelectStatus(true);
        let newPortfolioData = { ...portfolioData, template: templateSelected };

        let response;
        if (portfolioKey) {
            response = await fetch(`https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/portfolio/${portfolioKey}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPortfolioData),
            });
        } else {
            response = await fetch(`https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/portfolio.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPortfolioData),
            });
        }

        const result = await response.json();
        console.log('Update successful:', result);
        if (result) {
            console.log("saved to database. successfully...!")
            alert("saved to database. successfully...!")
            window.location.reload();
        } else {
            alert("something went wrong while updating");
            window.location.reload();
        }
        setTemplateSelectStatus(false);
    }

    const templatesList = [
        {
            label: '1',
            img: template1,
        }, {
            label: '2',
            img: template2,
        }
    ]

    return (
        <div className="w-[100%] border-x-2 border-b-2 border-[#E3E3E3] px-6 py-2">
            <div className="text-xl font-normal my-4">
                Select a template
            </div>
            <div className="my-4">
                <RadioGroup
                    row={true}
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={(e) => setTemplateSelected(e.target.value)}
                    className="gap-6"
                    value={templateSelected}
                >
                    {
                        templatesList.map((template, index) => {
                            return (
                                <FormControlLabel
                                    key={index}
                                    value={template.label}
                                    control={<Radio />}
                                    label={
                                        <img width={350} height={350} src={template.img.src} alt={template.label} className="rounded-md border-2 border-gray-700 shadow-lg" />
                                    }
                                />
                            )
                        })
                    }
                </RadioGroup>
            </div>
            <div className={`bg-[#4d3e5b] text-[#fff] rounded-md py-[10px] px-[20px] text-[16px] cursor-pointer my-10 w-fit`}
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