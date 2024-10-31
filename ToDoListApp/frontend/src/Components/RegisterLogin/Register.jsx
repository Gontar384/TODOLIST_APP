import styles from './RegisterLogin.module.css'
import TitleNavbar from "../../ReusableComponents/TitleNavbar.jsx";
import Footer from "../../ReusableComponents/Footer.jsx";
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {checksPassword} from "../../ReusableComponents/ReusableFunctions.jsx";
import {useToggleInputType} from "../../ReusableComponents/ReusableFunctions.jsx";
import axios from "axios";

function Register() {

    document.title = "Task Manager | Register";
    const url = `${import.meta.env.VITE_BACKEND_URL}api/auth/register/check-username`;
    const url1 = `${import.meta.env.VITE_BACKEND_URL}api/auth/register`;
    const [appUser, setAppUser] =
        useState({username: "", password: ""});
    const [repeatPassword, setRepeatPassword] = useState("");
    const [info, setInfo] = useState([]);
    const [info1, setInfo1] = useState([]);
    const [isActive, setActive] = useState(false);
    const [isActive1, setActive1] = useState(false);
    const navigate = useNavigate();
    const [inputType, toggleInputType] = useToggleInputType();

    const handleRegister = async () => {
        if (appUser.username && appUser.password && repeatPassword) {
            try {
                const usernameExists = await axios.get(`${url}`, {
                    params: {username: appUser.username},
                });
                if (usernameExists.data["exists"]) {
                    setInfo(["Username already exists"]);
                    setActive(true);
                    return null;
                }
                if (checksPassword(appUser.password).length !== 0) {
                    setInfo([checksPassword(appUser.password).join(" ")]);
                    setActive(true);
                    return null;
                }
                if (appUser.password !== repeatPassword) {
                    setInfo(["Passwords do not match"]);
                    setActive(true);
                    return null;
                }
                await axios.post(`${url1}`, appUser);
                setActive(false);
                setInfo1(["Registered successfully"]);
                setActive1(true);
                setTimeout(() => {
                    navigate("/login");
                }, 2000)
            } catch (error) {
                if (error) {
                    setInfo(["Something went wrong"]);
                    setActive(true);
                }
                console.log("Error during register process", error);
            }
        } else {
            setInfo(["Please fill all fields"]);
            setActive(true);
        }
    }

    return (
        <>
            <TitleNavbar/>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={isActive1 ? styles.active1 : styles.inactive1}>
                        <p className={styles.item1}>{info1}</p>
                    </div>
                    <h1>Register:</h1>
                    <div className={isActive ? styles.active : styles.inactive}>
                        <pre className={styles.item}>{info}</pre>
                    </div>
                    <input value={appUser.username} onChange={(e) =>
                        setAppUser({...appUser, username: e.target.value.trim()})}
                           type="text" placeholder="Enter username" required
                           onClick={() => setActive(false)}/>
                    <br/>
                    <input value={appUser.password} onChange={(e) =>
                        setAppUser({...appUser, password: e.target.value})}
                           type={inputType} placeholder="Enter password" required
                           onClick={() => setActive(false)}/>
                    <input value={repeatPassword} onChange={(e) =>
                        setRepeatPassword(e.target.value)}
                           type={inputType} placeholder="Repeat password" required
                           onClick={() => setActive(false)}/>
                    <div className={styles.toggleBox}>
                        <button id={styles["show1"]} className={styles.show} onClick={toggleInputType}>Show password
                        </button>
                    </div>
                    <div className={styles.endingBox}>
                        <button className={styles.submit} onClick={handleRegister}>Submit</button>
                        <span className={styles.endBox}>
                            <p>You have an account?</p>
                            <Link className={styles.link} to="/Login">
                                <p>Log in here!</p>
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Register;