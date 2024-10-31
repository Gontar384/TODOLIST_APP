import styles from './ReusableComponents.module.css'
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRightFromBracket, faClipboard, faFileCirclePlus, faUser} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

function TitleNavbar() {

    const [isActive, setIsActive] = useState(false);
    const [info, setInfo] = useState("");
    const navigate = useNavigate()

    const logout = () => {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
            setInfo("Logging out...")
            setIsActive(true);
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        }
        return null;
    };


    return (
        <>
            <h1 className={styles.title}>Task Manager</h1>
            <nav className={styles.navbar}>
                <div className={isActive ? styles.active : styles.inactive}>
                    <p className={styles.item}>{info}</p>
                </div>
                <Link className={styles.link} to={"/taskmanager/add"} title="Add task">
                    <FontAwesomeIcon icon={faFileCirclePlus} size="4x"/>
                </Link>
                <Link className={styles.link} to={"/taskmanager/showall"} title="Show tasks">
                    <FontAwesomeIcon icon={faClipboard} size="4x"/>
                </Link>
                <Link className={styles.link} to={"/user/info"} title="User info">
                    <FontAwesomeIcon icon={faUser} size="4x"/>
                </Link>
                <button className={styles.logout} onClick={logout} title="Logout">
                    <FontAwesomeIcon icon={faRightFromBracket} size="3x"/>
                </button>
            </nav>
        </>
    );
}

export default TitleNavbar;