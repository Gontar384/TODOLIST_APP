import styles from './TaskAdd.module.css'
import TitleNavbar from '../../ReusableComponents/TitleNavbar.jsx'
import Footer from '../../ReusableComponents/Footer.jsx'
import React, {useState} from 'react'
import api from "../AxiosConfig.jsx";

function TaskAdd() {

    document.title = "Task Manager | Add task";
    const url = `${import.meta.env.VITE_BACKEND_URL}api/task-add`
    const [task, setTask] = useState({
        name: "", description: "", date: "", done: false
    })
    const [info, setInfo] = useState([])
    const [isActive, setIsActive] = useState(false);

    const addTask = async () => {
        if (task.name) {
            try {
                await api.post(`${url}`, task)
                setInfo(["Task added"])
                setIsActive(true);
                setTask({name: "", description: "", date: "", done: false});
            } catch (error) {
                console.log("Error during task save", error)
            }
        } else {
            setInfo(["Please fill fields"])
            setIsActive(true);
        }
    }

    return (
        <>
            <TitleNavbar/>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={isActive ? styles.active : styles.inactive}>
                        <p className={styles.item}>{info}</p>
                    </div>
                    <h1>Add task:</h1>
                    <input value={task.name} onChange={(e) =>
                        setTask({...task, name: e.target.value})}
                           type="text" placeholder="Name"
                           onClick={() => setIsActive(false)}/> <br/>
                    <textarea value={task.description} onChange={(e) =>
                        setTask({...task, description: e.target.value})}
                              placeholder="Description" rows="3"
                              onClick={() => setIsActive(false)}/> <br/>
                    <input value={task.date} onChange={(e) =>
                        setTask({...task, date: e.target.value})}
                           type="date" onClick={() => setIsActive(false)}/> <br/>
                    <div className={styles.buttonsContainer}>
                        <button onClick={addTask}>Submit</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default TaskAdd;
