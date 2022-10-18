# Project 1, Milestone 3 - MVP Product + Critique Day

[PREVIOUS MILESTONE](milestone2.md)

[LIVE DEMO](https://atls4630-fwd.vercel.app/projects/project1/index.html)

## Project Brief

Create a to-do list with persistent to-do items. Mostly inspired by other online to-do apps like Google Keep. Intended audience is anyone who uses an online app to keep track of things they need to do. All function will be run through JS/TypeScript.

### MVP Functions

- [x] Save data to Firebase
- [x] Delete data from Firebase
- [x] Load data from Firebase
- [x] Visuals according to proposed wireframes
- [x] Basic responsiveness

## Stretch Goals

- [x] Change header depending on page content
- [x] Change appearance of todo items on completion
- [ ] Scroll to input box after entering a new todo
- [ ] Improve user experience by moving completed to-do items to the bottom of the page
- [ ] Improve responsive layout
- [ ] Add animations for funsies
- [ ] Add user authentication using Firebase authentication

## Known Bugs

- Mobile responsiveness is incomplete
- "Completed" Todo state could be better designed
- Trash can emoji gets too small on mobile screens

---

## TypeScript

Learning TypeScript was an easy switch, actually! The installation of TypeScript went smoothly. Typing all variables and compiling my code forced me to get super clean about my coding choices. I will likely use TypeScript for all my future assignments.

## Struggles with Firebase

In principle, using a database sounds excellent, a natural extension of learning API services. I don't think I knew enough about either TypeScript or API promises and that made this a struggle.

### TypeScript + Firebase Compatibility

So for some reason, I couldn't get firebase to be happy importing from node_modules in my file system as it would consistently return a type error of sorts. I eventually had to switch back to vanilla js and use the firebase static SDK links to import firebase instead. This means that my script split into a hilarious combination of an app.js that exported several necessary functions to my ts file. Arguably, I could have just dropped TypeScript at the point and just done the whole project in JS, but here we are.
By the barest of technicalities, I'm using TypeScript! I'll revisit once I learn more about tools like webpack and see if I can solve the import/sdk link issues in the future.

### Async Issues

Ran into typical async issues where if I could access the database data, I would only be able to do it at specific times in the code - namely in the get() function of my app.js. All attempts to export and manipulate data failed miserably, and I still have no idea why other than that they were probably async function issues. So solution: if I can't get the information out of the function, then I'll import the HTML elements in! It works, but I'm a little peeved that I couldn't get the original idea to work.

## Last bit of design

At some point, I realized that I was gonna have to figure out what to do items looked like after marking them complete or not. Will add design screenshot.

---

## Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Firebase Realtime Database Documentation](https://firebase.google.com/docs/database)
- [Vanilla/Local Storage Todo App](https://freshman.tech/todo-list/)
- [React/Firebase/Authentication Todo App](https://dev.to/lada496/to-do-list-with-firebase-web-ver9-hd8)
- [TypeScript/Firebase/React Todo App](https://www.sipios.com/blog-tech/build-a-real-time-todo-app-in-30-minutes-with-reactjs-typescript-and-firebase)
