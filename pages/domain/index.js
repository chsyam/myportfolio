import { useEffect, useState } from "react";
import { FaEdit, FaLink, FaSave } from "react-icons/fa";
import styles from "./../../styles/WebAddress.module.css";
import { decrypt } from "../api/auth/lib";
import axios from "axios";

const domainURL = process.env.DOMAIN_URL

export default function DomainChange({ username, userId, data, objId, allRecords }) {
    const [domain, setDomain] = useState('http://localhost:3000/');
    const [webAddress, setWebAddress] = useState("");
    const [changeInputToggle, setChangeInputToggle] = useState(true);
    const [allDomainNames, setAllDomainNames] = useState([])

    useEffect(() => {
        let temp = [];
        if (data) {
            Object.keys(allRecords).map((key) => {
                allRecords[key].webAddress !== data.webAddress
                    && temp.push(allRecords[key].webAddress)
            })
            setAllDomainNames(temp);
        } else {
            Object.keys(allRecords).map((key) => {
                setAllDomainNames(prev => [...prev, allRecords[key].webAddress])
            })
        }
    }, [allRecords])

    useEffect(() => {
        let address = "";
        try {
            address = data.webAddress ? data.webAddress : ""
        } catch (error) {
            console.log(error);
        }
        setWebAddress(address);
    }, [data]);

    const handleAddressChange = (value) => {
        let modifiedValue = value.replace(/[^a-zA-Z]/g, '-')
        modifiedValue = modifiedValue.replace(/-+/g, '-')
        setWebAddress(modifiedValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (webAddress[0] === '-' || webAddress[webAddress.length - 1] === '-' || webAddress.length <= 2) {
            console.log("invlaid domain name")
            return;
        }

        const formData = {
            userId: userId,
            username: username,
            webAddress: webAddress
        }

        try {
            if (objId) {
                const response = await fetch(`https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/endUserWebAddress/${objId}.json`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                console.log(response);
            } else {
                const response = await fetch(`https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/endUserWebAddress.json`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
        setChangeInputToggle(!changeInputToggle);
    }

    return (
        <div className={styles.webAddressContainer}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <div className={styles.heading}>Current web address</div>
                    <div className={styles.description}>
                        Your website is available via the following address. Go ahead, try it out in your browser 🏄‍♂️
                    </div>
                </div>
                {
                    !changeInputToggle ? (
                        <div className={styles.inputElement}>
                            <div className="text-gray-500 mx-2 font-semibold">
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
                            <div className="text-gray-400 ml-3">
                                {domain}
                            </div>
                            <input type="text"
                                className=" font-semibold"
                                value={webAddress}
                                readOnly={true}
                            />
                        </div>
                    )
                }
                <div className="text-red-600 text-md mb-[20px]">
                    {
                        webAddress?.length === 0 ? (
                            <div>- website address should not be empty</div>
                        ) : (
                            webAddress?.length !== 0 && webAddress?.length <= 2 &&
                            <div>{"- website address must have 3 characters long"}</div>
                        )
                    }
                    {
                        webAddress.length !== 0 && webAddress[0] === "-" &&
                        <div>{"- website address should not start with \'-\'"}</div>
                    }
                    {
                        webAddress.length !== 0 && webAddress[webAddress.length - 1] === "-" &&
                        <div>{"- website address should not end with \'-\'"}</div>
                    }
                </div>
                <div>
                    {
                        !changeInputToggle ? (
                            <button type="submit"
                                className={styles.labelText}
                            >
                                <FaSave />{"save"}
                            </button>
                        ) : (
                            <div onClick={() => setChangeInputToggle(!changeInputToggle)}
                                className={styles.labelText}><FaEdit />
                                {"Change address"}
                            </div>
                        )
                    }
                </div>
            </form>
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

    const emptyData = {
        username: '',
        userId: '',
        data: {},
        objId: ''
    }

    try {
        if (!payload.username || !payload.userId) {
            return {
                props: {
                    username: '',
                    userId: '',
                    data: {},
                    objId: '',
                    allRecords: {}
                }
            }
        }

        const response = await axios.get('https://db-educationforjobs-default-rtdb.asia-southeast1.firebasedatabase.app/endUserWebAddress.json');
        let data = response.data
        if (data === null)
            data = {};
        const objId = Object.keys(data).find((objId) => data[objId].userId === payload.userId);
        if (objId === undefined || data === null) {
            return {
                props: {
                    objId: '',
                    data: emptyData,
                    username: payload.username,
                    userId: payload.userId,
                    allRecords: data
                }
            }
        }

        return {
            props: {
                objId: objId,
                data: data[objId],
                username: payload.username,
                userId: payload.userId,
                allRecords: data
            }
        }
    }
    catch (error) {
        console.log(error);
        return {
            props: {
                objId: '',
                data: emptyData,
                username: payload.username,
                userId: payload.userId,
                allRecords: {}
            }
        }
    }
}