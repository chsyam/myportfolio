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
                <div className="flex flex-wrap justify-center gap-8">
                    {portfolioData?.skills?.map((tech) => (
                        <div key={tech.name} className="flex-1 bg-gray-800/50 p-6 rounded-lg">
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