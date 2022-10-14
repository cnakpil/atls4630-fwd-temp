// import firebase
import { writeNoteData, deleteNoteData, updateNoteData } from "./app.js"
/*************************************************************************************** */

let fillStatus: string = document.querySelector(".wrapper").getAttribute("fill-status");
var form: HTMLFormElement = document.querySelector("form");
var todoDiv: Element = document.querySelector(".todo");
var statusButton: NodeListOf<Element> = document.querySelectorAll(".status");
let noteNum: number = 0;

for (let i = 0; i < statusButton.length; i++) {
    statusButton[i].addEventListener('hover', () => {

    })
}

// statusButton.addEventListener('click', () => {
//     let id = statusButton.getAttribute("id");
//     console.log(id);
// });


console.log(fillStatus);

// if have stuff in database, run read function and set noteNum to current number of notes

// else, display default/set fill-status, number of notes = 0;

// Form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();
    var formInput: HTMLInputElement = document.querySelector(".todo-input");
    let inputValue: string = formInput.value;
    console.log(inputValue);
    noteNum++;

    let newID: string = writeNoteData(inputValue);
    console.log(newID);

    todoDiv.innerHTML += `<div id="${newID}">test test test</div>`;

    form.reset();
});




// To-do item class to contain information in each list item, no Firebase
class Todo {
    id: string;
    text: string;
    done: boolean;

    constructor(id: string, text: string, done: boolean) {
        this.id = id;
        this.text = text;
        this.done = done;
    }
}

// let todoItems: Array<Todo>;

// function addTodo(input: string) {
//     todoItems.push(new Todo(
//         input,
//         false,
//         Date.now(),
//     ));
//     // todoItems.push(newTodo);
//     console.log(todoItems);
// }