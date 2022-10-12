// import firebase
import { app } from "./app.js";
import { db } from "./app.js"
/*************************************************************************************** */

let fillStatus: string = document.querySelector(".wrapper").getAttribute("fill-status");
var formInput: Element = document.querySelector(".todo-input");

console.log(fillStatus);

// To-do item class to contain information in each list item
class Todo {
    text: string;
    checked: boolean;
    id: number;

    constructor(text: string, checked: boolean, date: number) {
        this.text = text;
        this.checked = checked;
        this.id = date;
    }
}

let todoItems: Array<Todo>;

function addTodo(input: string) {
    todoItems.push(new Todo(
        input,
        false,
        Date.now(),
    ));
    // todoItems.push(newTodo);
    console.log(todoItems);
}