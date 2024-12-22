import React, { useEffect, useState } from "react";
import styles from "./../styles/Dashboard.module.css";
import { Box, Divider, LinearProgress, Typography } from "@mui/material";
import { CircleUserRound, CornerDownLeft, Pencil, Plus, Save, Search, Trash2, Upload } from "lucide-react";
import { storage } from "./../components/firebaseConfig/FirebaseConfig";
import { getDownloadURL, uploadBytesResumable, ref as storageRef } from "firebase/storage";
import Image from "next/image";
import Link from "next/link";

export default function ProfileDetailsForm({ portfolioData, setPortfolioData, handleSubmit, formSubmitStatus }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [skillSearchTerm, setSkillSearchTerm] = useState("");
    const [filteredPlatforms, setFilteredPlatforms] = useState([]);
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [selfieProgess, setSelfieProgess] = useState(0);
    const [selfieError, setSelfieError] = useState("");
    const [file, setFile] = useState(null);
    const [selfie, setSelfie] = useState(null);

    const platformLinks = [
        { name: "LinkedIn", link: '' },
        { name: "Instagram", link: '' },
        { name: "GitHub", link: '' },
        { name: "Twitter", link: '' },
        { name: "Facebook", link: '' }
    ]

    const skillsList = [
        { name: "React JS", type: 'technical' },
        { name: "Node.js", type: 'technical' },
        { name: "Express", type: 'technical' },
        { name: "MongoDB", type: 'technical' },
        { name: "MySQL", type: 'technical' }
    ]

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

    const handleChange = (name, value) => {
        setPortfolioData({
            ...portfolioData,
            [name]: value
        })
    }

    const handleLink = (name, value) => {
        setPortfolioData({
            ...portfolioData,
            platformLinks: {
                ...portfolioData.platformLinks,
                [name]: value
            }
        })
    }

    const handlePlatformClick = (platform) => {
        setPortfolioData({
            ...portfolioData, platformLinks: {
                ...portfolioData.platformLinks, [platform.name]: platform.link
            }
        })
    }

    const handleSkillClick = (skill) => {
        let skillsByName = portfolioData.skills?.filter(item => item.name === skill.name);
        if (!skillsByName || skillsByName?.length === 0) {
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
                setFile(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setPortfolioData({
                        ...portfolioData,
                        resumeURL: url
                    });
                    setFile(null);
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
                setSelfie(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setPortfolioData({
                        ...portfolioData,
                        selfieURL: url
                    });
                    setSelfie(null);
                });
            }
        );
    }

    const handleAddingSkill = (skillTerm) => {
        let skill = { name: skillTerm, type: '' };
        skillTerm.length > 0 && handleSkillClick(skill);
        setSkillSearchTerm("");
    }

    const resumeTrashHandler = () => {
        setPortfolioData({
            ...portfolioData, resumeURL: ""
        });
        setUploadProgress(0);
        setFile(null);
    }

    const selfieTrashHandler = () => {
        setPortfolioData({
            ...portfolioData, selfieURL: ""
        })
        setSelfieProgess(0);
        setSelfie(null);
    }

    return (
        <div>
            <div className="w-[100%] sm:border-x-2 sm:border-b-2 sm:border-gray-400">
                <div className="px-2 py-1 sm:px-6">
                    <div className={styles.inputField}>
                        <label>Full Name</label><br />
                        <input
                            name="username"
                            value={portfolioData.username || ""}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            type="text"
                            placeholder="enter nice looking name..."
                        />
                    </div>
                    <Divider />
                    <div className={styles.inputField}>
                        <label>Job Title</label><br />
                        <input
                            type="text"
                            name="workTitle"
                            value={portfolioData.workTitle || ""}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            placeholder="enter Fancy work title..."
                        />
                    </div>
                    <Divider />
                    <div className={styles.inputField}>
                        <label>Bio</label><br />
                        <textarea
                            name="description"
                            style={{ minHeight: '120px' }}
                            type="text"
                            value={portfolioData.description || ""}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                            placeholder="enter your bio briefly..."
                        ></textarea>
                    </div>
                    <Divider />
                    <div className={styles.inputField}>
                        <label>Photo</label>
                        <div className="flex items-center flex-wrap">
                            <label htmlFor="file-upload" className={styles.photoLabel}>
                                <div className={styles.userIcon}>
                                    {
                                        (portfolioData.selfieURL === "") ? (
                                            <CircleUserRound size={150} strokeWidth={1} color="gray" />
                                        ) : (
                                            <Image
                                                alt="user image"
                                                src={`${portfolioData.selfieURL}`}
                                                height={125} width={125}
                                                priority={true}
                                                style={{ boxShadow: '0 25px 25px rgb(0, 0, 0, 0.3)' }}
                                            />
                                        )
                                    }
                                </div>
                                <div className={styles.labelText}>
                                    <Pencil />Edit Photo
                                </div>
                            </label>
                            <div className="cursor-pointer" onClick={() => selfieTrashHandler()}>
                                <Trash2 color="red" />
                            </div>
                        </div>
                        <div className="flex gap-4 justify-left flex-wrap">
                            <div className="my-auto">
                                {selfie ? selfie?.name : ""}
                            </div>
                            {
                                (selfie && selfieProgess === 0) &&
                                <div
                                    onClick={() => handleSelfieUpload()}
                                    className={styles.updateButton}
                                >
                                    <Upload />Upload
                                </div>
                            }
                        </div>
                        <input style={{ display: 'none' }}
                            onChange={(event) => {
                                setSelfie(event.target.files[0]);
                                setSelfieProgess(0);
                            }}
                            id="file-upload" type="file"
                        />
                        {
                            (selfieProgess > 0 && selfieProgess !== 0) && (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', marginTop: '20px' }}>
                                    <Box sx={{ width: '250px', mr: 1 }}>
                                        <LinearProgress sx={{ height: '10px', borderRadius: '10px' }} variant="determinate" value={Math.round(selfieProgess)} />
                                    </Box>
                                    <Box sx={{ minWidth: 35 }}>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {`${Math.round(selfieProgess)}%`}
                                        </Typography>
                                    </Box>
                                </Box>
                            )
                        }
                        {
                            selfieProgess === 100 && (
                                <div className="text-gray-400 mt-2">
                                    (please save the portfolio before refreshing the page)
                                </div>
                            )
                        }
                    </div>
                    <Divider />
                    <div className={styles.inputField}>
                        <label>Resume</label>
                        <div className="flex items-center flex-wrap">
                            <label htmlFor="resume-upload" className={styles.photoLabel}>
                                <div className={styles.resumeIcon}>
                                    {portfolioData.resumeURL === '' ? "No file selected" : (
                                        <Link
                                            className="hover:underline hover:underline-offset-4 text-blue-500"
                                            href={`${portfolioData.resumeURL}`}
                                            target="_blank"
                                        >
                                            previous resume
                                        </Link>
                                    )}
                                </div>
                                <div className={styles.labelText}>
                                    <Pencil size={20} /> Edit Resume
                                </div>
                            </label>
                            <div className="cursor-pointer" onClick={() => resumeTrashHandler()}>
                                <Trash2 color="red" />
                            </div>
                        </div>
                        <div className="flex gap-4 justify-left flex-wrap">
                            <div className="my-auto">
                                {file ? file?.name : ""}
                            </div>
                            {
                                (file && uploadProgress === 0) &&
                                <div
                                    onClick={() => { handleFileUpload() }}
                                    className={styles.updateButton}
                                ><Upload />Upload</div>
                            }
                        </div>
                        <input style={{ display: 'none' }}
                            onChange={(event) => {
                                setFile(event.target.files[0]);
                                setUploadProgress(0);
                            }}
                            id="resume-upload" type="file"
                        />
                        {
                            (uploadProgress > 0 && uploadProgress <= 100) && (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', marginTop: '20px' }}>
                                    <Box sx={{ width: '250px', mr: 1 }}>
                                        <LinearProgress variant="determinate" value={Math.round(uploadProgress)} />
                                    </Box>
                                    <Box sx={{ minWidth: 35 }}>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {`${Math.round(uploadProgress)}%`}
                                        </Typography>
                                    </Box>
                                </Box>
                            )
                        }
                        {
                            uploadProgress === 100 && (
                                <div className="text-gray-400 mt-2">
                                    (please save the portfolio before refreshing the page)
                                </div>
                            )
                        }
                    </div>
                    <Divider />
                    <div className={styles.inputField}>
                        <label>Social Media</label><br />
                        <div className="mb-5">
                            {
                                Object.keys(portfolioData.platformLinks || {}).map((key, index) => {
                                    return (
                                        <div key={index} className={styles.addedPlatform}>
                                            <div className="">{key}</div>
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
                                                    <Trash2 />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.searchBar}>
                            <Search />
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                type="text"
                                placeholder="Search for a platform"
                            />
                        </div>
                        <div className={styles.platformLinks}>
                            {
                                filteredPlatforms.map((platform, index) => {
                                    return (
                                        <div onClick={() => handlePlatformClick(platform)} key={index} className={styles.platform}>
                                            <Plus />
                                            {platform.name}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <Divider />
                    <div className={styles.inputField}>
                        <label>Skills</label><br />
                        <div className="flex justify-left items-center flex-wrap gap-4 mb-3">
                            {
                                portfolioData.skills?.map((skill, index) => {
                                    return (
                                        <div key={index} className={styles.addedSkill}>
                                            <div>{skill?.name}</div>
                                            <div
                                                onClick={() => handleSkillTrash(skill?.name)}
                                                className={styles.deleteButton}
                                            >
                                                <Trash2 size={22} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="text-sm text-gray-400 mb-4">
                            Don't include special characters except dot(.) hyphen(-).
                            After entering skill Click enter or click on
                        </div>
                        <div className={styles.searchBar}>
                            <input
                                value={skillSearchTerm}
                                onChange={(e) => setSkillSearchTerm(e.target.value)}
                                type="text"
                                placeholder="Enter skills Next.js, MySQL, etc."
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleAddingSkill(skillSearchTerm)
                                    }
                                }}
                            />
                            <div
                                className="p-[10px] rounded-full bg-[#d2d2d2] cursor-pointer"
                                onClick={() => handleAddingSkill(skillSearchTerm)}
                            >
                                <CornerDownLeft size={24} strokeWidth={3} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`bg-[#4d3e5b] text-[#fff] rounded-md p-[10px] text-[16px] cursor-pointer my-6 ml-3 w-fit`}
                onClick={() => handleSubmit()}
                style={{
                    opacity: formSubmitStatus ? 0.7 : 1,
                    pointerEvents: formSubmitStatus ? 'none' : 'auto',
                }}
            >
                {
                    formSubmitStatus ? (
                        <div className="flex justify-center items-center flex-nowrap gap-4">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            saving....
                        </div>
                    ) : (
                        <div className="flex items-center justify-center flex-nowrap gap-1">
                            <Save /> save changes
                        </div>
                    )
                }
            </div>
        </div >
    );
}