// import firebase
import { writeNoteData, readNoteText, deleteNoteData, updateNoteData } from "./app.js"
/*************************************************************************************** */

let fillStatus: string = document.querySelector(".wrapper").getAttribute("fill-status");
var form: HTMLFormElement = document.querySelector("form");
var todoDiv: Element = document.querySelector(".todo");

let noteNum: number = 0;

// for (let i = 0; i < statusButton.length; i++) {
//     statusButton[i].addEventListener('click', () => {
//         console.log("clicked");
//         console.log(readNoteText(statusButton[i].classList[1]));
//     })
// }

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

    todoDiv.innerHTML += `<div class="todo-item ${newID}">
                            <div class="text-area">
                                <p class="todo-text ${newID}">${inputValue}</p>
                                <div class="status ${newID}">
                                    <h3>DO IT</h3>
                                </div>
                            </div>
                            <img src="assets/trash.svg" alt="trash icon" class="delete ${newID}">
                        </div>`;

    let trashCan: NodeListOf<Element> = document.querySelectorAll(".delete");
    for (let i = 0; i < trashCan.length; i++) {
        trashCan[i].addEventListener("click", () => {
            console.log(trashCan[i].classList[1]);
        })
    }
    let statusButton: NodeListOf<Element> = document.querySelectorAll(".status");
    for (let i = 0; i < statusButton.length; i++) {
        statusButton[i].addEventListener('click', () => {
            // console.log("clicked " + statusButton[i].classList[1]);
            console.log(readNoteText(statusButton[i].classList[1]));
        })
    }
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