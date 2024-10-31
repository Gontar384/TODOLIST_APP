import styles from './AppUserInfo.module.css'
import TitleNavbar from "../../ReusableComponents/TitleNavbar.jsx";
import Footer from "../../ReusableComponents/Footer.jsx";
import api from '../../Components/AxiosConfig.jsx'
import React, {useState, useEffect} from 'react'
import {checksPassword, useToggleInputType} from "../../ReusableComponents/ReusableFunctions.jsx";
import {useNavigate} from "react-router-dom";

function AppUserInfo() {

    document.title = "Task Manager | User";
    const url = `${import.meta.env.VITE_BACKEND_URL}api/user-info`;
    const url1 = `${import.meta.env.VITE_BACKEND_URL}api/check-password`;
    const url2 = `${import.meta.env.VITE_BACKEND_URL}api/change-password`;
    const url3 = `${import.meta.env.VITE_BACKEND_URL}api/user-delete`;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [updated, setUpdated] = useState("");
    const [info, setInfo] = useState([]);
    const [info1, setInfo1] = useState([]);
    const [isActive, setActive] = useState(false);
    const [isActive1, setActive1] = useState(false);
    const [isActive2, setActive2] = useState(false);
    const [inputType, toggleInputType] = useToggleInputType();
    const navigate = useNavigate();

    useEffect(() => {
        fetchInfo().then(() => console.log("User info fetched.."));
    }, [])

    const fetchInfo = async () => {
        try {
            const {data} = await api.get(`${url}`);
            setUsername(data.username);
        } catch (error) {
            console.error("Error fetching info:", error);
        }
    }

    const handlePasswordChange = async () => {
        if (password && updated) {
            try {
                const response = await api.get(`${url1}`, {
                    params: {password},
                });
                if (!response.data["isValid"]) {
                    setInfo(["Wrong password"])
                    setActive(true);
                    return null;
                }
                if (checksPassword(updated).length !== 0) {
                    setInfo([checksPassword(updated).join(" ")]);
                    setActive(true);
                    return null;
                }
                if (password === updated) {
                    setInfo(["New password is the same!"])
                    setActive(true);
                    return null;
                }
                await api.patch(`${url2}`, {
                    updated,
                });
                setInfo(["Password changed"]);
                setActive(true);
            } catch (error) {
                console.error("Error during password change", error);
            }
        } else {
            setInfo(["Please fill all fields"]);
            setActive(true);
        }
    }

    const deleteAccount = async () => {
        try {
            await api.delete(`${url3}`)
            localStorage.removeItem('token');
            setActive1(false);
            setInfo1(["Account deleted"])
            setActive2(true);
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        }catch(error) {
            console.log("Error during account delete", error)
        }
    }

    return (
        <>
            <TitleNavbar/>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={isActive2 ? styles.active2 : styles.inactive2}>
                        <p className={styles.item2}>{info1}</p>
                    </div>
                    <div className={isActive1 ? styles.active1 : styles.inactive1}>
                        <p className={styles.item1}>Are you sure?</p>
                        <div>
                            <button onClick={deleteAccount}>Yes</button>
                            <button onClick={() => setActive1(false)}>No</button>
                        </div>
                    </div>
                    <div className={isActive ? styles.active : styles.inactive}>
                        <pre className={styles.item}>{info}</pre>
                    </div>
                    <p className={styles.p}>User: {username}</p>
                    <div className={styles.form}>
                        <input value={password} onChange={(e) =>
                            setPassword(e.target.value)} placeholder="Old Password"
                               type={inputType} onClick={() => setActive(false)}/>
                        <input value={updated} onChange={(e) =>
                            setUpdated(e.target.value)} placeholder="New Password"
                               type={inputType} onClick={() => setActive(false)}/>
                        <button className={styles.changeButton} onClick={handlePasswordChange}>Change password</button>
                        <button className={styles.show} onClick={toggleInputType}>Show password</button>
                    </div>
                    <div className={styles.deleteBox}>
                        <p>DoubleClick to delete account</p>
                        <button onDoubleClick={() => setActive1(true)}
                                onClick={() => setActive(false)}>Delete
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default AppUserInfo;