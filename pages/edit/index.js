import styles from "./../../styles/EditPage.module.css"
import { useEffect, useState } from "react";
import { MdUpdate } from "react-icons/md";
import { FaEdit, FaUserAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { storage } from "./../../components/firebaseConfig/FirebaseConfig";
import { getDownloadURL, uploadBytesResumable, ref as storageRef } from "firebase/storage";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { decrypt } from "../api/auth/lib";

export default function Home({ objId, data, userId }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [skillSearchTerm, setSkillSearchTerm] = useState("");
    const [filteredPlatforms, setFilteredPlatforms] = useState([]);
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [file, setFile] = useState(null);
    const [selfie, setSelfie] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [selfieProgess, setSelfieProgess] = useState(0);
    const [selfieError, setSelfieError] = useState("");
    const [iframeSrc, setIframeSrc] = useState("http://localhost:3000/dashboard");

    const platformLinks = [
        { name: "LinkedIn", link: '' },
        { name: "Instagram", link: '' },
        { name: "GitHub", link: '' },
        { name: "X", link: '' },
        { name: "Facebook", link: '' }
    ]

    const skillsList = [
        { name: "React JS", type: 'technical' },
        { name: "Node.js", type: 'technical' },
        { name: "Express", type: 'technical' },
        { name: "MongoDB", type: 'technical' },
        { name: "MySQL", type: 'technical' }
    ]

    const [portfolioData, setPortfolioData] = useState({
        username: "",
        userId: userId,
        workTitle: "",
        description: "",
        resumeURL: "",
        selfieURL: "",
        platformLinks: {},
        skills: []
    })

    useEffect(() => {
        setPortfolioData({
            ...data, userId: userId
        });
    }, [data])

    const handlePlatformClick = (platform) => {
        setPortfolioData({
            ...portfolioData, platformLinks: {
                ...portfolioData.platformLinks, [platform.name]: platform.link
            }
        })
    }

    const handleSkillClick = (skill) => {
        let skillsByName = portfolioData.skills.filter(item => item.name === skill.name);
        if (skillsByName.length === 0) {
            setPortfolioData({
                ...portfolioData, skills: [...portfolioData.skills, skill]
            })
        }
    }

    const handleTrashClick = (platform) => {
        let filterPlatformLinks = {};
        Object.keys(portfolioData.platformLinks).forEach(key => {
            if (key !== platform) {
                filterPlatformLinks[key] = portfolioData.platformLinks[key]
            }
        })
        setPortfolioData({
            ...portfolioData, platformLinks: filterPlatformLinks
        })
    }

    const handleSkillTrash = (skill) => {
        let filterSkills = portfolioData.skills.filter(item => item.name !== skill);
        setPortfolioData({
            ...portfolioData, skills: filterSkills
        })
    }

    useEffect(() => {
        let filterPlatforms = platformLinks.filter(platform =>
            platform.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPlatforms(filterPlatforms)
    }, [searchTerm])

    useEffect(() => {
        let filterSkills = skillsList.filter(skill =>
            skill.name.toLowerCase().includes(skillSearchTerm.toLowerCase())
        );
        setFilteredSkills(filterSkills)
    }, [skillSearchTerm])

    const handleLink = (name, value) => {
        setPortfolioData({
            ...portfolioData,
            platformLinks: {
                ...portfolioData.platformLinks,
                [name]: value
            }
        })
    }

    const handleReloadIframe = () => {
        setIframeSrc("");
        setTimeout(() => {
            setIframeSrc("https://myportfolio-henna-six.vercel.app/");
        }, 0);
    }
    console.log("objectId", objId);
    let response;
    const handleSubmit = async () => {
        if (objId) {
            response = await fetch(`https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/portfolio/${objId}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(portfolioData),
            });
        } else {
            response = await fetch(`https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/portfolio.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(portfolioData),
            });
        }

        const result = await response.json();
        console.log('Update successful:', result);
        if (result) {
            console.log("handleReloadIframe")
            handleReloadIframe();
        } else {
            alert("something went wrong while updating")
        }
    }

    const handleChange = (name, value) => {
        setPortfolioData({
            ...portfolioData,
            [name]: value
        })
    }

    const handleFileUpload = () => {
        if (!file) return;
        const fileRef = storageRef(storage, `resumes/${file.name}`);
        const uploadTask = uploadBytesResumable(fileRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error("Error uploading file:", error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setPortfolioData({
                        ...portfolioData,
                        resumeURL: url
                    })
                });
            }
        );
    }

    const handleSelfieUpload = () => {
        if (!selfie) return;
        if (selfie?.type.includes("image")) {
            console.log("image validated")
        } else {
            setSelfieError("Please upload a valid image of type .jpeg/.jpg/.png")
            return;
        }
        const fileRef = storageRef(storage, `selfies/${selfie.name}`);
        const uploadTask = uploadBytesResumable(fileRef, selfie);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setSelfieProgess(progress);
            },
            (error) => {
                console.error("Error uploading file:", error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setPortfolioData({
                        ...portfolioData,
                        selfieURL: url
                    })
                });
            }
        );
    }

    return (
        <div className={styles.editPageView}>
            <div className={styles.editPage}>
                <div className={styles.editBlock}>
                    <div className={styles.header}>
                        <div className={styles.title}>Personal Website</div>
                        <div className={styles.updateButton} onClick={() => handleSubmit()}>
                            <MdUpdate style={{ fontSize: '25px' }} /> Update
                        </div>
                    </div>
                </div>
                <div className={styles.editBlock}>
                    <div className={styles.header}>Photo</div>
                    <label htmlFor="file-upload" className={styles.photoLabel}>
                        <div className={styles.userIcon}>
                            {
                                (portfolioData.selfieURL === "") ? (
                                    <FaUserAlt />
                                ) : (
                                    <Image
                                        alt="user image"
                                        src={`${portfolioData.selfieURL}`}
                                        style={{ borderRadius: "50%" }}
                                        height="150" width="150"
                                        priority={true}
                                    />
                                )
                            }
                        </div>
                        <div className={styles.labelText}>
                            <FaEdit />Add Photo
                        </div>
                        {selfie ? selfie?.name : ""}
                    </label>
                    <div
                        onClick={() => handleSelfieUpload()}
                        className={styles.updateButton}
                    >Upload</div>
                    <input style={{ display: 'none' }}
                        onChange={(event) => setSelfie(event.target.files[0])}
                        id="file-upload" type="file"
                    />
                    {
                        (selfieProgess > 0 && selfieProgess < 100) && (
                            <div className={styles.uploadStatus}>
                                <div>{`0%`}</div>
                                <div><progress value={selfieProgess} max="100" /></div>
                                <div>{`${Math.round(selfieProgess)}%`}</div>
                            </div>
                        )
                    }
                </div>
                <div className={styles.editBlock}>
                    <div className={styles.header}>Name</div>
                    <div className={styles.inputField}>
                        <input
                            name="username"
                            value={portfolioData.username || ""}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            type="text"
                            placeholder="Enter your name"
                        />
                    </div>
                </div>
                <div className={styles.editBlock}>
                    <div className={styles.header}>Job Title</div>
                    <div className={styles.inputField}>
                        <input
                            type="text"
                            name="workTitle"
                            value={portfolioData.workTitle || ""}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            placeholder="Enter your work title"
                        />
                    </div>
                </div>
                <div className={styles.editBlock}>
                    <div className={styles.header}>Intro text</div>
                    <div className={styles.inputField}>
                        <textarea
                            name="description"
                            rows={5}
                            type="text"
                            value={portfolioData.description || ""}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            placeholder="Enter your intro briefly"
                        ></textarea>
                    </div>
                </div>
                <div className={styles.editBlock}>
                    <div className={styles.header}>Resume</div>
                    <label htmlFor="resume-upload" className={styles.photoLabel}>
                        <div className={styles.resumeIcon}>
                            {portfolioData.resumeURL === '' ? "No file selected" : (
                                <Link style={{ textDecoration: "none" }} href={`${portfolioData.resumeURL}`} target="_blank">previous resume</Link>
                            )}
                        </div>
                        <div className={styles.labelText}>
                            <FaEdit /> Resume
                        </div>
                        {file ? file?.name : ""}
                    </label>
                    <div
                        onClick={() => { handleFileUpload() }}
                        className={styles.updateButton}
                    >Upload</div>
                    <input style={{ display: 'none' }}
                        onChange={(event) => setFile(event.target.files[0])}
                        id="resume-upload" type="file"
                    />
                    {
                        (uploadProgress > 0 && uploadProgress < 100) && (
                            <div className={styles.uploadStatus}>
                                <div>{`0%`}</div>
                                <div><progress value={uploadProgress} max="100" /></div>
                                <div>{`${Math.round(uploadProgress)}%`}</div>
                            </div>
                        )
                    }
                </div>
                <div className={styles.editBlock}>
                    <div className={styles.header}>Networking Sites</div>
                    <div className={styles.addedPlatformsSection}>
                        {
                            Object.keys(portfolioData.platformLinks).map((key, index) => {
                                return (
                                    <div key={index} className={styles.addedPlatform}>
                                        <div>{key}</div>
                                        <div className={styles.inputLink}>
                                            <input type="text"
                                                placeholder="Enter link"
                                                name={`${key}`}
                                                value={portfolioData.platformLinks[key]}
                                                onChange={(e) => { handleLink(key, e.target.value) }}
                                            />
                                            <div
                                                onClick={() => handleTrashClick(key)} className={styles.deleteButton}
                                            >
                                                <MdDeleteOutline />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.searchBar}>
                        <div style={{ fontSize: '24px', paddingTop: '10px' }}><IoSearch /></div>
                        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search for a platform" />
                    </div>
                    <div className={`${styles.inputField} ${styles.platformLinks}`}>
                        {
                            filteredPlatforms.map((platform, index) => {
                                return (
                                    <div onClick={() => handlePlatformClick(platform)} key={index} className={styles.platform}>
                                        <div style={{ paddingTop: '3px' }}><FaPlus /></div>
                                        <div>{platform.name}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles.editBlock}>
                    <div className={styles.header}>Skills</div>
                    <div className={styles.addedSkillSection}>
                        {
                            portfolioData.skills.map((skill, index) => {
                                return (
                                    <div key={index} className={styles.addedSkill}>
                                        <div>{skill?.name}</div>
                                        <div
                                            onClick={() => handleSkillTrash(skill?.name)}
                                            className={styles.deleteButton}
                                        >
                                            <MdDeleteOutline />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.searchBar}>
                        <div style={{ fontSize: '24px', paddingTop: '10px' }}><IoSearch /></div>
                        <input value={skillSearchTerm} onChange={(e) => setSkillSearchTerm(e.target.value)} type="text" placeholder="Search for a skill" />
                    </div>
                    <div className={`${styles.inputField} ${styles.skillItems}`}>
                        {
                            filteredSkills.map((skill, index) => {
                                return (
                                    <div onClick={() => handleSkillClick(skill)} key={index} className={styles.platform}>
                                        <div style={{ paddingTop: '3px' }}><FaPlus /></div>
                                        <div>{skill.name}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {/* <div className={styles.renderView}>
                <iframe
                    src={iframeSrc}
                    width="100%"
                    height="100%"
                    style={{
                        transform: 'scale(0.7)',
                        transformOrigin: '0 0',
                        width: '125%',
                        height: '100%',
                    }}
                />
            </div> */}
        </div>
    );
}

export async function getServerSideProps(context) {
    const { req, res } = context;
    const token = req?.cookies['token']
    const payload = await decrypt(token)

    if (!payload || payload === null || payload === undefined) {
        res.setHeader('Set-Cookie', [
            'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;',
        ]);

        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    const emptyPortfolioData = {
        username: '',
        userId: '',
        workTitle: '',
        selfieURL: '',
        description: '',
        resumeURL: '',
        platformLinks: {},
        skills: [],
    }
    try {
        const response = await axios.get('https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/portfolio.json');
        const data = response.data;
        const key = Object.keys(data).find((objId) => data[objId].userId === payload.userId);
        if (key === undefined) {
            return {
                props: {
                    objId: '',
                    data: emptyPortfolioData,
                    userId: payload.userId,
                }
            }
        }
        return {
            props: {
                objId: key,
                data: data[key],
                userId: payload.userId
            }
        }
    }
    catch (error) {
        console.log(error);
        return {
            props: {
                objId: '',
                data: emptyPortfolioData,
                userId: payload.userId
            }
        }
    }
}