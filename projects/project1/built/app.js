import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js";
import { getDatabase, set, ref, remove, push, get } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-database.js";
// let noteText = "";
const firebaseConfig = {
    apiKey: "AIzaSyBY_-N52LuC1ADir4S_h8Jlg422X5xijzU",
    authDomain: "whatdo-a5baa.firebaseapp.com",
    projectId: "whatdo-a5baa",
    storageBucket: "whatdo-a5baa.appspot.com",
    messagingSenderId: "1007179620472",
    appId: "1:1007179620472:web:a325f90b911a5173f2cd8d",
    databaseURL: "https://whatdo-a5baa-default-rtdb.firebaseio.com/"
};
export function writeNoteData(text) {
    // User authentication version
    // set(ref(db, `users/testUser/${noteNum}`), {
    //     text
    // });
    // no user authentication
    // set(ref(db, `notes/${noteNum}`), {
    //     text
    // });
    var notesListRef = ref(db, 'notes');
    var newNote = push(notesListRef);
    set(newNote, {
        text: text,
        done: false
    });
    return newNote.key;
}
export function readNoteText(noteId) {
    console.log(get(db, `notes/${noteId}`));
    // let text = get(db, `notes/${noteId}/text`);
    // const noteText = () => {
    // onValue(ref(db, `notes/${noteId}/text`), (snapshot) => {
    //     noteText = snapshot.val();
    //     return noteText;
    // })
    // }
    // console.log(noteText);
}
export function deleteNoteData(noteId) {
    remove(db, `notes/${noteId}`);
}
export function updateNoteData(updateText, noteId) {
    set(ref(db, `notes/${noteId}`), {
        updateText
    });
}
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
