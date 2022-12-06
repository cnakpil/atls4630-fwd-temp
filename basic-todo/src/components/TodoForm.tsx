import { useState } from "react";
// import { Button, Form } from "react-bootstrap";
import { getDatabase, ref, push } from "firebase/database";

// Import firebase configuration from firebase.ts file
import firebaseApp from "../firebase";

const TodoForm = () => {
    const db = getDatabase(firebaseApp);

    const [title, setTitle] = useState("");

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
    };

    return (
        <form>
            <input type="text" name="name" onChange={handleChange} />
            <input type="submit" value="Submit" onClick={addTodo} />
        </form>
    )
}

export default TodoForm;