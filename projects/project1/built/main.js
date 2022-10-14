// import firebase
import { writeNoteData } from "./app.js";
/*************************************************************************************** */
let fillStatus = document.querySelector(".wrapper").getAttribute("fill-status");
var form = document.querySelector("form");
var todoDiv = document.querySelector(".todo");
var statusButton = document.querySelector(".status");
let noteNum = 0;
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
    var formInput = document.querySelector(".todo-input");
    let inputValue = formInput.value;
    console.log(inputValue);
    noteNum++;
    let newID = writeNoteData(inputValue);
    console.log(newID);
    todoDiv.innerHTML += `<div id="${newID}">test test test</div>`;
    form.reset();
});
// To-do item class to contain information in each list item, no Firebase
class Todo {
    constructor(id, text, done) {
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
