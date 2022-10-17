import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, ref, child, get, push, set, update } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

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

function newDiv(dataReturned, key, status) {
    todoDiv.innerHTML += `<div class="todo-item ${key}">
                            <div class="text-area">
                                <p class="todo-text ${key}">${dataReturned[key].text}</p>
                                <div class="status ${key} ${status}">
                                    <h3>DO IT</h3>
                                </div>
                            </div>
                            <img src="assets/trash.svg" alt="trash icon" class="delete ${key}">
                        </div>`;

    let trashCan = document.querySelectorAll(".delete");
    for (let i = 0; i < trashCan.length; i++) {
        trashCan[i].addEventListener("click", () => {
            let id = trashCan[i].classList[1];
            deleteNote(id);
            const toDelete = document.querySelectorAll(`.${id}`);
            toDelete.forEach(element => {
                element.remove();
            })
        })
    }

    let statusButton = document.querySelectorAll(".status");
    for (let i = 0; i < statusButton.length; i++) {
        statusButton[i].addEventListener('click', () => {
            let id = statusButton[i].classList[1];
            statusSwap(id);
        })
    }
}

//  Get data 
export function getNotes() {
    let allTodo = [];
    get(child(dbRef, `notes/`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                let dataReturned = snapshot.val();
                for (let key in dataReturned) {
                    allTodo.push(dataReturned[key].text);
                    console.log("testing status key " + dataReturned[key].done);
                    dataReturned[key.done]
                        ? newDiv(dataReturned, key, true)
                        : newDiv(dataReturned, key, false);
                }
                // console.log(allTodo);
            } else {
                console.log("No data available");
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

    get(child(dbRef, `notes/`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                let dataReturned = snapshot.val();
                if (dataReturned[noteId].done) {
                    set(notesRef, {
                        text: dataReturned[noteId].text,
                        done: false
                    });
                } else {
                    set(notesRef, {
                        text: dataReturned[noteId].text,
                        done: true
                    });
                }
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

// export function swapStatus(noteId, status) {
//     var notesRef = ref(db, `notes/${noteId}`);
//     // var newNote = push(notesListRef); get(child(dbRef, `notes/`))
//     // update(child(db, `notes/${noteId}`), {
//     //     done: true
//     // })
//     var notesListRef = ref(db, "notes");
//     var newNote = push(notesListRef);
//     set(newNote, {
//         text: text,
//         done: false,
//     });
//     // console.log("run swap");
//     // var notesRef = ref(db, `notes/${noteId}`);
//     // console.log(notesRef);
//     // var notesRef = db.ref(`notes/${noteId}`);
//     // console.log("current status: " + currentStatus);
//     // if (currentStatus) {
//     //     update(notesRef, { done: false });
//     //     // notesRef.update({
//     //     //     done: false
//     //     // })
//     // } else {
//     //     update(notesRef, { done: true });
//     //     // notesRef.update({
//     //     //     done: true
//     //     // })
//     // }
//     // // console.log(getStatus());
// }

//  Write new notes to database, returns the new node key as a string
export function writeNote(text) {
    var notesListRef = ref(db, "notes");
    var newNote = push(notesListRef);
    set(newNote, {
        text: text,
        done: false,
    });
    console.log("New data added");
    return newNote.key;
}

// delete specified note from database
export function deleteNote(noteId) {
    var notesRef = ref(db, `notes/${noteId}`);
    set(notesRef, null);
}


//  Testing ground
// writeNoteData("I need to not eat sushi");
// console.log(getData());

// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, child, get, push, set } from "firebase/database";
// // let noteText = "";

// const firebaseConfig = {
//     apiKey: "AIzaSyBY_-N52LuC1ADir4S_h8Jlg422X5xijzU",
//     authDomain: "whatdo-a5baa.firebaseapp.com",
//     projectId: "whatdo-a5baa",
//     storageBucket: "whatdo-a5baa.appspot.com",
//     messagingSenderId: "1007179620472",
//     appId: "1:1007179620472:web:a325f90b911a5173f2cd8d",
//     databaseURL: "https://whatdo-a5baa-default-rtdb.firebaseio.com/"
// };

// const app = initializeApp(firebaseConfig);
// const db = getDatabase();
// const dbRef = ref(db);

// // Write data to database
// export function writeNoteData(text) {
//     var notesListRef = ref(db, 'notes');
//     var newNote = push(notesListRef);
//     set(newNote, {
//         text: text,
//         done: false
//     });
//     console.log("new data added");
//     return newNote.key;
// }

// // Get data from database
// export function getData() {
//     let allTodo = [];
//     get(child(dbRef, `notes/`))
//         .then((snapshot) => {
//             if (snapshot.exists()) {
//                 let dataReturned = snapshot.val();
//                 for (let key in dataReturned) {
//                     allTodo.push(dataReturned[key].text);
//                 }
//                 console.log(allTodo);
//             } else {
//                 console.log("No data available");
//             }
//         })
//         .catch((error) => {
//             console.error(error);
//         });
//     return allTodo;
// }

// export function deleteNoteData(noteId) {
//     remove(db, `notes/${noteId}`);
// }

// export function updateNoteData(updateText, noteId) {
//     set(ref(db, `notes/${noteId}`), {
//         updateText
//     });
// }

// getData();
// // export const app = initializeApp(firebaseConfig);
// // export const db = getDatabase(app);