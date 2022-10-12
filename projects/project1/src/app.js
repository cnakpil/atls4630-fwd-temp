import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBY_-N52LuC1ADir4S_h8Jlg422X5xijzU",
    authDomain: "whatdo-a5baa.firebaseapp.com",
    projectId: "whatdo-a5baa",
    storageBucket: "whatdo-a5baa.appspot.com",
    messagingSenderId: "1007179620472",
    appId: "1:1007179620472:web:a325f90b911a5173f2cd8d",
    databaseURL: "https://whatdo-a5baa-default-rtdb.firebaseio.com/"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);