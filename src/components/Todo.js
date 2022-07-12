import { React, useState, useEffect } from 'react'
import { db } from '../firebase.js'
import {
 collection, getDocs, addDoc, updateDoc, doc, deleteDoc
} from 'firebase/firestore'

function Todo() {
    const taskCollectionRef = collection(db, 'tasks')
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("")
    const [deadline, setDeadline] = useState('')
    const [newDeadline, setNewDeadline] = useState('')

    const createTask = async ()=> {
        await addDoc(taskCollectionRef, {title: newTask, Deadline: deadline})
    }
    const deleteTask = async (id) => {
        const taskDoc = doc(db, "tasks", id)
        await deleteDoc(taskDoc)
    }
    const updateTask = async (id) => {
        const userDoc = doc(db, "tasks", id)
        await updateDoc(userDoc,{Deadline: newDeadline})
    }


    useEffect(()=> {
        const getTasks = async () => {
            const data= await getDocs(taskCollectionRef)
            setTasks(data.docs.map((doc)=>({...doc.data(), id: doc.id })));
        };
        getTasks();
    }, [createTask,deleteTask,updateTask]);

    return(
        <div className = "Todo">
            <input 
            placeholder="new task"
            onChange={(event) => {
                setNewTask(event.target.value)
            }}></input>
            <input 
            placeholder="deadline"
            onChange={(event) => {
                setDeadline(event.target.value)
            }}></input>
            <button onClick={createTask}>Add task</button>

            {tasks.map((task) => { 
            return (<div>
                {" "}
                <h2>{task.title}</h2>
                <h4>{task.Deadline}</h4>
                <button onClick={()=> {
                    deleteTask(task.id)
                }}>완료</button>
                <input 
                placeholder="새 데드라인"
                onChange={(event) => {
                    setNewDeadline(event.target.value)
                }}></input>
                <button onClick={()=> {
                    updateTask(task.id)
                }}>데드라인 변경</button>
                </div>
                
                );
            })}
        </div>
    )
}

export default Todo;