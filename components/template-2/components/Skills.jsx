export default function Skills({ portfolioData }) {
    return (
        <section id="tech" className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {
                    portfolioData?.skills && portfolioData?.skills?.length !== 0 && (
                        <div className="text-3xl font-medium my-8 text-center text-gray-800">
                            Skills & Expertise
                        </div>
                    )
                }
                <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
                    {portfolioData?.skills?.map((tech) => (
                        <div key={tech.name} className="bg-gray-600/70 px-4 py-2 rounded-md">
                            <div className="text-center">
                                <span className="font-medium">{tech.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}