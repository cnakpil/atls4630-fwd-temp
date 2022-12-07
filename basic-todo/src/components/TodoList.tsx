import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, update, set } from "firebase/database";
import Checkbox from "./Checkbox";

import firebaseApp from "../firebase";
import { Todo } from "../types";

// I cannot figure out how to get the input box to clear itself I am going to scream

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
        console.log("done: " + !todo.done);
    };

    const deleteTodo = (todo: Todo) => {
        const todoRef = ref(db, "/todos/" + todo.id);
        set(todoRef, null);
    }

    return (
        <div>
            <h1>Todo List</h1>
            {todoList.map((todo, index) => {
                return (
                    <Checkbox
                        key={index}
                        checked={todo.done}
                        label={todo.title}
                        handleChange={() => changeTodoCompletion(todo)}
                        handleClick={() => deleteTodo(todo)}
                    />
                );
            })}
        </div>
    );
};

export default TodoList;