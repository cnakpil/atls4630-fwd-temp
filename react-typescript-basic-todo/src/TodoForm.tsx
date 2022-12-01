import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import TextField from "@mui/material/TextField";
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'
const config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DB,
    projectId: process.env.REACT_APP_PID,
    storageBucket: process.env.REACT_APP_SB,
    messagingSenderId: process.env.REACT_APP_SID,
    appId: process.env.REACT_APP_APPID,
};
const app = initializeApp(config);
const db = getDatabase(app);
const todosRef = ref(db, "todos");
// import { db, todosRef } from "./firebase";

function TodoList() {
    const [todos, setTodos] = useState<any>([]);
    useEffect(() => {
        todosRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    task: items[item].task,
                    done: items[item].done
                });
            }
            setTodos(newState)
        });
    }, [])
    return (
        <>
            {todos.map((todo: any, i: number) => (
                <React.Fragment key={todo.id}>
                    <Todo todo={todo} />
                    {i < todos.length - 1 && <Divider />}
                </React.Fragment>
            ))}
        </>
    );
}
export default TodoList;