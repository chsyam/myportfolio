import Navbar from "./components/Navbar";
import About from "./components/About";
import Skills from "./components/Skills";

export default function Template({ portfolioData }) {
    return (
        <div className="template">
            <Navbar username={portfolioData?.username} resumeURL={portfolioData?.resumeURL} />
            <div className="pt-20">
                <About portfolioData={portfolioData} />
                <Skills portfolioData={portfolioData} />
            </div>
        </div>
    )
}