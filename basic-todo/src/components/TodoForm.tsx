import "./TodoForm.css";
import { useState } from "react";

// Import firebase configuration from firebase.ts file
import firebaseApp from "../firebase";
import { getDatabase, ref, push } from "firebase/database";

// To prevent empty input and to clear the input form on submit is more manual work than I have time
// to figure out right now. Easiest would be to use a react hook library like the React Hook Form package

const TodoForm = () => {
    const db = getDatabase(firebaseApp);

    const [title, setTitle] = useState("");
    // const [inputText, setInputText] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    // Method to add todo item to the todo list
    // Extend onClick functions here
    const addTodo = (event: any) => {
        event.preventDefault();
        const todoRef = ref(db, "/todos");
        const todo = {
            title,
            done: false,
        };
        push(todoRef, todo);
        // setInputText("");
    };

    return (
        <form onSubmit={addTodo}>
            <input type="text" name="name" onChange={handleChange} placeholder="Enter todo item" />
            <input type="submit" value="Submit" />
        </form>
    )
}

export default TodoForm;