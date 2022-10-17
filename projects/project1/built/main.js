// import firebase functions
import { writeNote, getNotes, deleteNote, getStatus } from "./app.js";
let fillStatus = document.querySelector(".wrapper").getAttribute("fill-status");
var form = document.querySelector("form");
var todoDiv = document.querySelector(".todo");
var priorTodo = [];
priorTodo = getNotes();
console.log(priorTodo);
var length = priorTodo.length;
console.log(length);
// On form submission, input note text to the database and add a new todo item
form.addEventListener('submit', (event) => {
    event.preventDefault();
    var formInput = document.querySelector(".todo-input");
    let inputValue = formInput.value;
    console.log(inputValue);
    let newID = writeNote(inputValue);
    console.log(newID);
    todoDiv.innerHTML += `<div class="todo-item ${newID}">
                            <div class="text-area">
                                <p class="todo-text ${newID}">${inputValue}</p>
                                <div class="status ${newID} false">
                                    <h3>DO IT</h3>
                                </div>
                            </div>
                            <img src="assets/trash.svg" alt="trash icon" class="delete ${newID}">
                        </div>`;
    let trashCan = document.querySelectorAll(".delete");
    for (let i = 0; i < trashCan.length; i++) {
        trashCan[i].addEventListener("click", () => {
            let id = trashCan[i].classList[1];
            deleteNote(id);
            const toDelete = document.querySelectorAll(`.${id}`);
            toDelete.forEach(element => {
                element.remove();
            });
        });
    }
    let statusButton = document.querySelectorAll(".status");
    for (let i = 0; i < statusButton.length; i++) {
        statusButton[i].addEventListener('click', () => {
            let id = statusButton[i].classList[1];
            getStatus(id);
            // console.log(getStatus(id));
            // console.log("main.ts status " + status);
            // swapStatus(id);
        });
    }
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
