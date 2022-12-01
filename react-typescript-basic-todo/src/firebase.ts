import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'
const config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DB,
    projectId: process.env.REACT_APP_PID,
    storageBucket: process.env.REACT_APP_SB,
    messagingSenderId: process.env.REACT_APP_SID,
    appId: process.env.REACT_APP_APPID,
};
const app = initializeApp(config);
export const db = getDatabase(app);
export const todosRef = ref(db, "todos");