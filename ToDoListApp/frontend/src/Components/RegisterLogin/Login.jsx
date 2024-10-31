import styles from './RegisterLogin.module.css'
import TitleNavbar from "../../ReusableComponents/TitleNavbar.jsx";
import Footer from "../../ReusableComponents/Footer.jsx";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useToggleInputType} from "../../ReusableComponents/ReusableFunctions.jsx";
import axios from "axios";

function Login() {

    document.title = "Task Manager | Login";
    const api = `${import.meta.env.VITE_BACKEND_URL}api/auth/login`;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [info, setInfo] = useState([]);
    const [isActive, setActive] = useState(false);
    const [info1, setInfo1] = useState([]);
    const [isActive1, setActive1] = useState(false);
    const [inputType, toggleInputType] = useToggleInputType();

    const handleLogin = async () => {
        if (username && password) {
            try {
                const response = await axios.post(`${api}`, {username, password});
                if (response.data) {
                    localStorage.setItem('token', response.data);
                    setActive(false);
                    setInfo1(["Logging in..."]);
                    setActive1(true);
                    setTimeout(() => {
                        window.location.reload();
                        navigate("/taskmanager/showall");
                    }, 2000)
                }
            } catch (error) {
                console.log(error);
                if (error.response) {
                    setInfo(["Wrong username or password"]);
                    setActive(true);
                } else {
                    setInfo(["Login failed, please try again"]);
                    setActive(true);
                }
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
                    <h1>Log in:</h1>
                    <div className={isActive ? styles.active : styles.inactive}>
                        <ol>
                            {info.map((item, index) => (
                                <li className={styles.item} key={index}>{item}</li>
                            ))}
                        </ol>
                    </div>
                    <input value={username} onChange={(e) =>
                        setUsername(e.target.value.trim())}
                           type="text" placeholder="Enter username" required
                           onClick={() => setActive(false)}/>
                    <input value={password} onChange={(e) =>
                        setPassword(e.target.value)}
                           type={inputType} placeholder="Enter password" required
                           onClick={() => setActive(false)}/>
                    <div className={styles.toggleBox}>
                        <button className={styles.show} onClick={toggleInputType}>Show password</button>
                    </div>
                    <div className={styles.endingBox}>
                        <button className={styles.submit} onClick={handleLogin}>Submit</button>
                        <span className={styles.endBox}>
                            <p>No account?</p>
                            <Link className={styles.link} to="/register">
                                <p>Register here!</p>
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}


export default Login