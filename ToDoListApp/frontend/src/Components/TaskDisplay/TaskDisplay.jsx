import styles from './TaskDisplay.module.css'
import TitleNavbar from '../../ReusableComponents/TitleNavbar.jsx'
import Footer from '../../ReusableComponents/Footer.jsx'
import {useEffect, useState} from "react";
import api from "../AxiosConfig.jsx";

function TaskDisplay() {

    document.title = "Task Manager | All Tasks";
    const url = `${import.meta.env.VITE_BACKEND_URL}api/task-show-all`;
    const url1 = `${import.meta.env.VITE_BACKEND_URL}api/task-delete`;
    const url2 = `${import.meta.env.VITE_BACKEND_URL}api/task-isdone`;
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks().then(() => console.log("Tasks info fetched..") );
    }, [])

    const fetchTasks = async () => {
        try {
            const {data} = await api.get(`${url}`);
            setTasks(data);
        } catch (error) {
            console.log("Error fetching tasks:", error)
        }
    }

    const deleteTask = async (id) => {
        try {
           await api.delete(`${url1}/${id}`)
            setTasks(tasks.filter(task => task.id !== id));
        }catch(error) {
            console.log("Error deleting task:", error)
        }
    }

    const handleDone = async (id, isDone) => {
        try {
            await api.patch(`${url2}/${id}`, {
                isDone
            });
            setTasks(tasks.map(task =>
                task.id === id ? {...task, done: isDone} : task
            ));
        }catch(error) {
            console.log("Error deleting task:", error)
        }
    }

    return (
        <>
            <TitleNavbar/>
            <div className={styles.container}>
                <div className={styles.box}>
                    <h1>Tasks to do:</h1>
                    <ol>
                        {tasks.map((item, index) =>
                            <li key={index}>
                                <div className={styles.taskBox}>
                                    <h2>{item.name}</h2>
                                    <p>{item.description}</p> <br/>
                                    <h5>{item.date}</h5>
                                </div>
                                <div className={styles.doneBox}>
                                    <input checked={item.done} onChange={() =>
                                        handleDone(item.id, !item.done)} type="checkbox"/>
                                    <button onClick={()=>
                                        deleteTask(item.id)}>Delete
                                    </button>
                                </div>
                            </li>
                        )}
                    </ol>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default TaskDisplay;
