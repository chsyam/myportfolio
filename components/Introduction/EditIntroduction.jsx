import GitHub from "../Images/Icons/Github";
import LinkedIn from "../Images/Icons/LinkedIn";
import styles from "./EditIntroduction.module.css";
import WavingHand from "./../../components/Images/waving_hand.png";
import Image from "next/image";
import Link from "next/link";
import { GrEdit } from "react-icons/gr";
import { GiCancel } from "react-icons/gi";
import { FaSave } from "react-icons/fa";
import editStyles from "./EditIntroduction.module.css"
import { useEffect, useState } from "react";

export default function EditIntoduction({ formData, setFormData }) {
    const platformLinks = {
        resumeURL: 'https://firebasestorage.googleapis.com/v0/b/personal-space-700e7.appspot.com/o/resume.pdf?alt=media&token=8f4d908b-4c3c-4134-a55e-d3e625c4d3b6',
        linkedInURL: 'https://www.linkedin.com/in/chsyamkumar/',
        githubURL: 'https://github.com/chsyam',
    }
    const [editIntroduction, setEditIntroduction] = useState(false);
    const [introFormData, setIntroFormData] = useState({
        workTitle: "",
        description: "",
        resumeURL: "",
        linkedInHandle: "",
        instagramHandle: "",
        githubHandle: "",
        twitterHandle: "",
        facebookHandle: "",
    })

    useEffect(() => {
        setIntroFormData({
            ...introFormData,
            workTitle: formData.workTitle,
            description: formData.description,
            resumeURL: formData.resumeURL,
            linkedInHandle: formData.linkedInHandle,
            instagramHandle: formData.instagramHandle,
            githubHandle: formData.githubHandle,
            twitterHandle: formData.twitterHandle,
            facebookHandle: formData.facebookHandle,
        })
    }, [formData])

    return (
        <div className={`${styles.introduction}`}>
            {
                editIntroduction ? (
                    <div className={styles.summaryPart}>
                        <div className={`${styles.workTitle}`}>
                            {formData.workTitle}
                        </div>
                        <div className={styles.summary}>
                            {formData.description}
                        </div>
                        <div className={styles.platformLinks}>
                            <div className={styles.resumeButton}>
                                <Link href={`${platformLinks.resumeURL}`} target="_blank">
                                    Resume
                                </Link>
                            </div>
                            <div className={styles.techPlatforms} onClick={() => { window.open(platformLinks.linkedInURL, "_blank") }}>
                                <LinkedIn />
                            </div>
                            <div className={styles.techPlatforms} onClick={() => { window.open(platformLinks.githubURL, "_blank") }} >
                                <GitHub />
                            </div>
                        </div>
                        <div className={editStyles.editButton}
                            onClick={() => { setEditIntroduction(!editIntroduction) }}
                        >
                            <GrEdit />
                        </div>
                    </div>
                ) : (
                    <div className={styles.formEditSection}>
                        <div>
                            <label>Enter your work title</label><br />
                            <input name="workTitle" value={introFormData.workTitle} onChange={(e) => {
                                setIntroFormData({
                                    ...introFormData,
                                    workTitle: e.target.value
                                })
                            }} />
                        </div>
                        <div>
                            <label>Something about you</label><br />
                            <textarea rows={3} cols={20} name="description" value={introFormData.description} onChange={(e) => {
                                setIntroFormData({
                                    ...introFormData,
                                    description: e.target.value
                                })
                            }} />
                        </div>
                        <div>
                            <label>LinkedIn</label><br />
                            <input placeholder="enter your linkedIn profile handle" name="linkedInHandle"
                                value={introFormData.linkedInHandle}
                                onChange={(e) => {
                                    setIntroFormData({
                                        ...introFormData,
                                        linkedInHandle: e.target.value
                                    })
                                }} />
                        </div>
                        <div>
                            <label>Github</label><br />
                            <input placeholder="enter your linkedIn profile handle" name="githubHandle"
                                value={introFormData.githubHandle}
                                onChange={(e) => {
                                    setIntroFormData({
                                        ...introFormData,
                                        githubHandle: e.target.value
                                    })
                                }} />
                        </div>
                        <div>
                            <label>Instagram</label><br />
                            <input placeholder="enter your Instagram profile page URL" name="instagramHandle"
                                value={introFormData.instagramHandle}
                                onChange={(e) => {
                                    setIntroFormData({
                                        ...introFormData,
                                        instagramHandle: e.target.value
                                    })
                                }} />
                        </div>
                        <div>
                            <label>Twitter</label><br />
                            <input placeholder="enter your twitter handle" name="twitterHandle"
                                value={introFormData.twitterHandle}
                                onChange={(e) => {
                                    setIntroFormData({
                                        ...introFormData,
                                        twitterHandle: e.target.value
                                    })
                                }} />
                        </div>
                        <div>
                            <label>Facebook</label><br />
                            <input placeholder="enter your facebook profile page URL" name="facebookHandle"
                                value={introFormData.facebookHandle}
                                onChange={(e) => {
                                    setIntroFormData({
                                        ...introFormData,
                                        facebookHandle: e.target.value
                                    })
                                }} />
                        </div>
                        <div className={editStyles.editButton}>
                            <div
                                
                            >
                                <FaSave />
                            </div>
                            <div
                                onClick={() => setEditIntroduction(!editIntroduction)}
                            >
                                <GiCancel />
                            </div>
                        </div>
                    </div>
                )
            }
            <div className={styles.imagePart}>
            </div>
        </div >
    )
}