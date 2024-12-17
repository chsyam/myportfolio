import { ArrowDownToLine } from "lucide-react";

export default function Introduction({ portfolioData }) {
    return (
        <section className="max-w-6xl mx-auto px-4 py-20">
            <div className="flex flex-col md:flex-row items-center gap-12">
                {
                    portfolioData?.selfieURL && (
                        <div className="w-64 h-64 rounded-full overflow-hidden shadow-lg">
                            <img
                                className="w-full h-full object-cover"
                                alt="Profile"
                                src={`${portfolioData.selfieURL}`}
                            />
                        </div>
                    )
                }
                <div className="flex-1">
                    <div className="text-4xl font-semibold text-gray-800 mb-4">
                        {portfolioData?.fullName}
                    </div>
                    <div className="text-xl text-gray-600 mb-6">
                        {portfolioData?.workTitle}
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        {portfolioData?.description}
                    </p>
                </div>
            </div>
        </section>
    )
}