// import "./firebase/database";
// import { getDatabase, ref, child, get, push, set, onValue } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
// import { getDatabase, ref, child, get, push, set, onValue } from "./firebase/database";
//  Initialize
const firebaseConfig = {
    apiKey: "AIzaSyBY_-N52LuC1ADir4S_h8Jlg422X5xijzU",
    authDomain: "whatdo-a5baa.firebaseapp.com",
    projectId: "whatdo-a5baa",
    storageBucket: "whatdo-a5baa.appspot.com",
    messagingSenderId: "1007179620472",
    appId: "1:1007179620472:web:a325f90b911a5173f2cd8d",
    databaseURL: "https://whatdo-a5baa-default-rtdb.firebaseio.com/",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(db);
var todoDiv = document.querySelector(".todo");
// watch the database for changes. On change, run getNotes function. This could all be one function, 
// but this aspect is being gerry-rigged in after the fact so yolo.
onValue(dbRef, (snapshot) => {
    getNotes();
});
// create data in new div
function newDiv(dataReturned, key, status) {
    let statusText = "";
    status ? statusText = "DID IT" : statusText = "DO IT";
    todoDiv.innerHTML += `<div class="todo-item ${key} ${status}">
                            <div class="text-area">
                                <p class="todo-text ${key}">${dataReturned[key].text}</p>
                                <div class="status ${key}">
                                    <h3>${statusText}</h3>
                                </div>
                            </div>
                            <img src="assets/trash.svg" alt="trash icon" class="delete ${key}">
                        </div>`;
    // set event listener actions for delete button
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
    // event listener for all status buttons
    let statusButton = document.querySelectorAll(".status");
    for (let i = 0; i < statusButton.length; i++) {
        statusButton[i].addEventListener('click', () => {
            let id = statusButton[i].classList[1];
            statusSwap(id);
        });
    }
}
//  Get data 
export function getNotes() {
    let allTodo = [];
    var headerElement = document.querySelector("header");
    var wrapperElement = document.querySelector(".wrapper");
    var inputElement = document.querySelector("input");
    var todoElement = document.querySelector(".todo");
    get(child(dbRef, `notes/`))
        .then((snapshot) => {
        if (snapshot.exists()) {
            headerElement.innerHTML = "<h5>F***ING DO IT</h5>";
            wrapperElement.setAttribute("fill-status", true);
            inputElement.setAttribute("placeholder", "DO MORE +");
            todoElement.innerHTML = "";
            let dataReturned = snapshot.val();
            for (let key in dataReturned) {
                allTodo.push(dataReturned[key].text);
                console.log("testing status key " + dataReturned[key].done);
                dataReturned[key].done
                    ? newDiv(dataReturned, key, true)
                    : newDiv(dataReturned, key, false);
            }
            // console.log(allTodo);
        }
        else {
            console.log("No data available");
            headerElement.innerHTML = "<h5>WHAT DO?</h5>";
            wrapperElement.setAttribute("fill-status", false);
        }
    })
        .catch((error) => {
        console.error(error);
    });
    // console.log(allTodo);
    return allTodo;
}
// Swap "done" property to opposite state
export function statusSwap(noteId) {
    var notesRef = ref(db, `notes/${noteId}`);
    let todoItem = document.querySelector(`.todo-item.${noteId}`);
    let statusElement = document.querySelector(`.status.${noteId}`);
    get(child(dbRef, `notes/`))
        .then((snapshot) => {
        if (snapshot.exists()) {
            let dataReturned = snapshot.val();
            if (dataReturned[noteId].done) {
                set(notesRef, {
                    text: dataReturned[noteId].text,
                    done: false
                });
                todoItem.classList.replace("true", "false");
                statusElement.innerHTML = "<h3>DO IT</h3>";
            }
            else {
                set(notesRef, {
                    text: dataReturned[noteId].text,
                    done: true
                });
                todoItem.classList.replace("false", "true");
                statusElement.innerHTML = "<h3>DID IT</h3>";
            }
        }
        else {
            console.log("No data available");
        }
    })
        .catch((error) => {
        console.error(error);
    });
}
//  Write new notes to database, returns the new node key as a string. Check style
export function writeNote(text) {
    var notesListRef = ref(db, "notes");
    var newNote = push(notesListRef);
    set(newNote, {
        text: text,
        done: false,
    });
    console.log("New data added");
    styleSwap();
    return newNote.key;
}
// delete specified note from database, check style 
export function deleteNote(noteId) {
    var notesRef = ref(db, `notes/${noteId}`);
    set(notesRef, null);
    styleSwap();
}
// fix appearance for use cases
function styleSwap() {
    // Get elements
    var headerElement = document.querySelector("header");
    var wrapperElement = document.querySelector(".wrapper");
    var inputElement = document.querySelector("input");
    // See if database is empty
    get(child(dbRef, `notes/`))
        .then((snapshot) => {
        if (snapshot.exists()) { // if has stuff
            headerElement.innerHTML = "<h5>F***ING DO IT</h5>";
            wrapperElement.setAttribute("fill-status", true);
            inputElement.setAttribute("placeholder", "DO MORE +");
        }
        else { // if no stuff
            console.log("No data available");
            headerElement.innerHTML = "<h5>WHAT DO?</h5>";
            wrapperElement.setAttribute("fill-status", false);
            inputElement.setAttribute("placeholder", "DO SOMETHING +");
        }
    })
        .catch((error) => {
        console.error(error);
    });
}
