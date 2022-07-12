import { React, useState, useEffect } from 'react'
import { db } from '../firebase.js'
import {
 collection, getDocs, addDoc, updateDoc, doc, deleteDoc
} from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const [newEmail, setNewEmail] = useState("")
    const [newPassword, setNewPassword] = useState(0)
    const [changePassword, setChangePassword] = useState("")
    const [users, setUsers] = useState([]);
    const userCollectionRef = collection(db, 'Users')
    
    const createUser = async () => {
        await addDoc(userCollectionRef, {email: newEmail, password: newPassword})
    }

    const updateUser = async (id) => {
        const userDoc = doc(db, "Users", id)
        await updateDoc(userDoc,{password: changePassword})
    }

    const deleteUser = async (id) => {
        const userDoc = doc(db, "Users", id)
        await deleteDoc(userDoc)
    }

    useEffect(()=> {
        const getUsers = async () => {
            const data= await getDocs(userCollectionRef)
            setUsers(data.docs.map((doc)=>({...doc.data(), id: doc.id })));
        };
        getUsers();
    }, []);
    
    return (
        
        <div className="App">
            <input 
            placeholder="email"
            onChange={(event) => {
                setNewEmail(event.target.value)
            }}></input>
            <input placeholder="password"
            onChange={(event) => {
                setNewPassword(event.target.value)
            }}></input>

            <button onClick={createUser}>사용자 생성</button>
        {users.map((user) => { 
            return (<div>
                {" "}
                <h1>Email: {user.email}</h1>
                <h1>Password: {user.password}</h1>
                <button onClick={() => {updateUser(user.id)}}> 비밀번호 변경 </button>
                <input 
            placeholder="new password"
            onChange={(event) => {
                setChangePassword(event.target.value)
            }}></input>
            <button 
            onClick= {() => {
                deleteUser(user.id);
                }}
                >사용자 삭제</button>
                </div>
                
                );
                
            })}
            </div>)
            
}
