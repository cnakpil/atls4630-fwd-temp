import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { FormCheck } from "react-bootstrap";
import Checkbox from "./Checkbox";

import firebaseApp from "../firebase";
import { Todo } from "../types";

const TodoList = () => {
    const db = getDatabase(firebaseApp);
    const [todoList, setTodoList] = useState<Todo[]>([]);

    useEffect(() => {
        const todoRef = ref(db, "/todos");

        // firebase onValue method, watches for changes on the database and updates the todoRef array.
        onValue(todoRef, (snapshot) => {
            const todos = snapshot.val();
            const newTodoList: Todo[] = [];

            for (let id in todos) {
                newTodoList.push({ id, ...todos[id] });
            }

            setTodoList(newTodoList);
        });
    }, [db]);

    const changeTodoCompletion = (todo: Todo) => {
        const todoRef = ref(db, "/todos/" + todo.id);
        console.log(todoRef);
        update(todoRef, { done: !todo.done });
        console.log("done: " + !todo.done)
    };

    return (
        <div>
            <h1>Todo List</h1>
            {todoList.map((todo, index) => {
                return (
                    // <FormCheck
                    //     key={index}
                    //     checked={todo.done}
                    //     onChange={() => changeTodoCompletion(todo)}
                    //     label={todo.title}
                    // />
                    <Checkbox
                        key={index}
                        checked={todo.done}
                        label={todo.title}
                        onChange={() => changeTodoCompletion(todo)}
                    />
                );
            })}
        </div>
    );
};

export default TodoList;