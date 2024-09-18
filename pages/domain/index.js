import { useEffect, useState } from "react";
import { FaEdit, FaLink, FaSave } from "react-icons/fa";
import styles from "./../../styles/WebAddress.module.css";
import { decrypt } from "../api/auth/lib";
import axios from "axios";

export default function DomainChange({ username, userId }) {
    const [domain, setDomain] = useState("https://myportfolio.com/");
    const [webAddress, setWebAddress] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [changeInputToggle, setChangeInputToggle] = useState(true);
    const [domainNameErrors, setDomainNameErrors] = useState({});

    const handleAddressChange = (value) => {
        let modifiedValue = value.replace(/[^a-zA-Z]/g, '-')
        modifiedValue = modifiedValue.replace(/-+/g, '-')
        setWebAddress(modifiedValue);
    };


    const handleSubmit = async () => {
        const formData = {
            username: username,
            userId: userId,
            webAddress: webAddress
        }

        const response = await fetch(`https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/domain-names`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                userId: userId,
                webAddress: webAddress
            }),
        });

        const result = await response.json();
        console.log('Update successful:', result);
        if (result) {
            console.log("handleReloadIframe")
        } else {
            alert("something went wrong while updating")
        }
    }

    return (
        <div className={styles.webAddressContainer}>
            <div>
                <div>
                    <div className={styles.heading}>Current web address</div>
                    <div className={styles.description}>
                        Your website is available via the following address. Go ahead, try it out in your browser 🏄‍♂️
                    </div>
                </div>
                {
                    !changeInputToggle ? (
                        <div className={styles.inputElement}>
                            <div>
                                {domain}
                            </div>
                            <input
                                style={{ backgroundColor: 'white' }}
                                type="text"
                                value={webAddress}
                                onChange={(e) => handleAddressChange(e.target.value)}
                                placeholder="enter your desired web address"
                                readOnly={false}
                                className="bg-white"
                            />
                        </div>
                    ) : (
                        <div className={styles.inputElement}>
                            <div className="cursor-pointer" onClick={() => window.open(domain + webAddress, "_blank")}>
                                <FaLink className="text-2xl" />
                            </div>
                            <input type="text" value={domain + webAddress} placeholder=""
                                readOnly={true}
                            />
                        </div>
                    )
                }
                <div className="text-red-600 text-md mb-[20px]">
                    {
                        webAddress.length === 0 ? "- website address should not be empty" : webAddress.length !== 0 && webAddress.length <= 2 && "- website address must have 3 characters long"
                    }
                    {
                        Object.keys(domainNameErrors).map((error, index) => {
                            return (
                                <div key={index}>- {domainNameErrors[error]}</div>
                            )
                        })
                    }
                </div>
                <div>
                    <div
                        onClick={() => !changeInputToggle ?
                            webAddress.length > 2 && setChangeInputToggle(!changeInputToggle)
                            :
                            setChangeInputToggle(!changeInputToggle)
                        }
                    >
                        {
                            !changeInputToggle ?
                                <div
                                    className={styles.labelText}
                                    onClick={() => {
                                        webAddress.length > 2 &&
                                            handleSubmit()
                                    }}
                                ><FaSave />{"save"}</div>
                                :
                                <div className={styles.labelText}><FaEdit />{"Change address"}</div>
                        }
                    </div>
                </div>
            </div>
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

    try {
        if (!payload.username || !payload.userId) {
            return {
                props: {
                    username: '',
                    userId: ''
                }
            }
        }
        return {
            props: {
                username: payload.username,
                userId: payload.userId
            }
        }
    }
    catch (error) {
        console.log(error);
        return {
            props: {
                username: payload.username,
                userId: payload.userId
            }
        }
    }
}