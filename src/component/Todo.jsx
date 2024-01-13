import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/firebase'

const Todo = () => {
    const [refresh, setRefresh] = useState(false)
    const [input, setInput] = useState("")
    const [todos, setTodos] = useState([])

    const addData = async () => {
        try {
            const userData = {
                todo: input,
            }
            const docRef = await addDoc(collection(db, "users"), userData)
            console.log(docRef)
        } catch (error) {
            console.log(error)
        }

    }


    const getData = async () => {
        try {
            const arr = []
            const docSnap = await getDocs(collection(db, 'users'))
            docSnap.forEach((doc) => {
                arr.push({
                    ...doc.data(),
                    id: doc.id
                })
            })
            setTodos([...arr])
            setRefresh(!refresh)

        } catch (error) {
            console.log(error)
        }
    }


    const editData = async (id) => {
        console.log(id)
        try {
            const editValue = prompt("Enter Value")
            if (editValue === '') {
                alert("Enter Value")
            }
            else {
                const userData = {
                    todo: editValue
                }
                await updateDoc(doc(db, "users", id), userData)
            }
        } catch (error) {
            console.log(error)
        }
        setRefresh(!refresh)
    }


    const deleteData = async (id) => {
        await deleteDoc(doc(db, "users", id))
    }

    useEffect(() => {
        getData()
    }, [refresh])


    return (
        <>
            <div className="mainContainer">
                <h1>Todo List Using React</h1>
                <div className="parentDiv">
                    <section className="container">
                        <h1>Todo List</h1>
                        <div className="inp">
                            <input
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Enter Todo"
                            /><br />
                        </div>
                        <div className="btn">
                            <button className="btn-add" onClick={addData}>Add</button>
                        </div>
                        <ul>
                            {todos.length
                                ? todos.map((e, i) => (
                                    <li key={i}>
                                        {e.todo}
                                        <div className="btn-li">
                                            <button className="editBtn" onClick={() => editData(e.id)}>Edit</button>
                                            <button className="delBtn" onClick={() => deleteData(e.id)}>Delete</button>
                                        </div>
                                    </li>
                                ))
                                : <b>All caught up</b>}
                        </ul>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Todo