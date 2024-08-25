import { useEffect, useState } from "react";
import styles from "./EditNavbar.module.css"
import { GrEdit } from "react-icons/gr";
import { GiCancel } from "react-icons/gi";
import { FaSave } from "react-icons/fa";

export default function EditNavbar({ formData, setFormData }) {
    const [editUsername, setEditUsername] = useState(false);
    const [username, setUsername] = useState("");
    useEffect(() => {
        setUsername(formData.username);
    }, [formData])

    useEffect(() => {
        console.log(username, formData);
    }, [formData, editUsername])

    return (
        <nav className={styles.edit_navbar}>
            <div className={styles.eidt_navbar__logo}
            >
                {
                    !editUsername ? (
                        <div className={styles.editUsername}>
                            <div>
                                {formData.username}
                            </div>
                            <div className={styles.editButton}
                                onClick={() => setEditUsername(!editUsername)}
                            >
                                <GrEdit />
                            </div>
                        </div>
                    ) : (
                        <div className={`${styles.editForm} ${styles.editUsername}`}>
                            <input placeholder="enter your name" name='username'
                                value={username}
                                onChange={(e) => setUsername(
                                    e.target.value)
                                }
                            />
                            <div className={styles.editButton}
                                onClick={() => {
                                    setFormData({ ...formData, username: username });
                                    setEditUsername(!editUsername);
                                }}
                            >
                                <FaSave />
                            </div>
                            <div className={styles.editButton}
                                onClick={() => {
                                    setEditUsername(!editUsername);
                                }}
                            >
                                <GiCancel />
                            </div>
                        </div>
                    )
                }
            </div>
        </nav>
    );
}