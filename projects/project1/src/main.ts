// import firebase functions
import { writeNote, getNotes, deleteNote, statusSwap } from "./app.js"

let fillStatus: string = document.querySelector(".wrapper").getAttribute("fill-status");
var form: HTMLFormElement = document.querySelector("form");
var todoDiv: Element = document.querySelector(".todo");
// var priorTodo = [];
// priorTodo = getNotes();
// console.log(priorTodo);
// var length: number = priorTodo.length;
// console.log(length);


// On form submission, input note text to the database and add a new todo item
form.addEventListener('submit', (event) => {
    var headerElement: Element = document.querySelector("header");
    headerElement.innerHTML = "F***ING DO IT";
    event.preventDefault();
    var formInput: HTMLInputElement = document.querySelector(".todo-input");
    let inputValue: string = formInput.value;
    console.log(inputValue);

    let newID: string = writeNote(inputValue);
    console.log(newID);

    // Change placeholder text
    var inputElement = document.querySelector("input");
    inputElement.setAttribute("placeholder", "DO MORE +");

    // Reset form
    form.reset();

    // getNotes();

    // todoDiv.innerHTML += `<div class="todo-item ${newID} false">
    //                         <div class="text-area">
    //                             <p class="todo-text ${newID}">${inputValue}</p>
    //                             <div class="status ${newID}">
    //                                 <h3>DO IT</h3>
    //                             </div>
    //                         </div>
    //                         <img src="assets/trash.svg" alt="trash icon" class="delete ${newID}">
    //                     </div>`;

    // let trashCan: NodeListOf<Element> = document.querySelectorAll(".delete");
    // for (let i = 0; i < trashCan.length; i++) {
    //     trashCan[i].addEventListener("click", () => {
    //         let id = trashCan[i].classList[1];
    //         deleteNote(id);
    //         const toDelete: NodeListOf<Element> = document.querySelectorAll(`.${id}`);
    //         toDelete.forEach(element => {
    //             element.remove();
    //         })
    //     })
    // }

    // let statusButton: NodeListOf<Element> = document.querySelectorAll(".status");
    // for (let i = 0; i < statusButton.length; i++) {
    //     statusButton[i].addEventListener('click', () => {
    //         let id = statusButton[i].classList[1];
    //         statusSwap(id);
    //     })
    // }
});

// To-do item class to contain information in each list item, no Firebase
// class Todo {
//     id: string;
//     text: string;
//     done: boolean;

//     constructor(id: string, text: string, done: boolean) {
//         this.id = id;
//         this.text = text;
//         this.done = done;
//     }
// }

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