import ConnectWithMe from "./components/ConnectWithMe";
import Introduction from "./components/Introduction";
import EndUserNavbar from "./components/Navbar";
import Skills from "./components/Skills";

export default function Template({ portfolioData }) {
    return (
        <div className="min-h-screen bg-slate-200">
            <EndUserNavbar username={portfolioData?.username} resumeURL={portfolioData?.resumeURL} />
            <div className="pt-20">
                <Introduction portfolioData={portfolioData} />
                <Skills portfolioData={portfolioData} />
                <ConnectWithMe portfolioData={portfolioData} />
            </div>
        </div>
    );
}