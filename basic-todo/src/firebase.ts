// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyCLYtvwI8PVOiX6sTAB-9WHOdXQCcY8_hg",

    authDomain: "react-todo-e7a66.firebaseapp.com",

    projectId: "react-todo-e7a66",

    storageBucket: "react-todo-e7a66.appspot.com",

    messagingSenderId: "596116478668",

    appId: "1:596116478668:web:c4c7bea6d641e13953c069"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export default app;