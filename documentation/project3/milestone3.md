# Project 3, Milestone 3 - Final Project & Reflection

[PREV MILESTONE](milestone2.md)

## Project Brief

### Team members

- Celine: React.js, Firebase - todo database
- Charlie: React.js, Firebase - authentication
- Torshawna: React.js, UX design

### Timeline (Actual Working Time)

29 November 2022 - 8 December 2022

### Proposal

Build a single page todo app using React, Typescript, and Firebase with focus on understanding and utilizing a component-based, modular style of coding.

If we can get user authentication via firebase working, we plan to make a team productivity tool, inspired by Google Keep, Trello, and other collaborative productivity spaces. It is effectively a collaborative Todo list with the ability to keep track of who made, is assigned to, and completed which items on the list.

### Technologies

- React.js
- TypeScript
- Firebase Realtime Database

## MVP Functions

- [x] Create todo
- [x] Read todo items
- [x] Delete todo items
- [x] Basic css styling
- [x] Uses Firebase realtime database

## Stretch Goals

- [ ] Write an "updateTodo" function
- [ ] Reskin todo list with different CSS

### Authentication Dependent Goals

- [ ] Display who made each Todo item
- [ ] Display who completed each Todo item
- [ ] Set and display due date/deadline
- [ ] Add user authentication using Firebase authentication
- [ ] Users can access specific lists
- [ ] Make the page keyboard tabbable for accesibility
- [ ] Add animations for funsies
- [ ] Add multiple views, including one that sorts the items into each user's individual list
- [ ] View + use multiple lists at once

---

## New Tools

Having used Firebase Realtime Database and Typescript in prior projects, they were not terribly new technologies this time. It was an excellent chance to deepen my understanding of both, though. Continued exposure to Firebase can only be a good thing for my future in web development and I learned how to create custom types for TS via a types.ts file. Finding all the proper types for the methods I am trying to use can still be a hassle, but I'm finding it easier as I make more projects with TS.

I missed most of the in class learning of React.js due to health issues, but it was surprisingly easy to pick up after understanding the basic component structure of React. The initial setup of a project is actually the hard part as I didn't know how to configure webpack to compile TypeScript. It was an exercise in frustruation until I realized that React comes with boilerplate app templates for exactly this reason. I used the TypeScript template to get started and after that, it was pretty smooth sailing.

While my style of programming is already quite modular because I use the box model to vizualise my builds before I start coding, it was quite an interesting shift to begin coding all the React components entirely seperately from each other. For more static pages with less function, a JS Framework is absolutely overkill as many things can be accomplished in vanilla JS/TS. However, for a single page app like this, it was significantly easier to built the modular components in React than it was to do in vanilla. I will definitely be using React or other frameworks if I need to make such an app again.

## Group Dynamics

Since I had prior knowledge of todo app structure and Firebase, the brunt of the base programming was my responsibility. Charlie took on the authentication challenge to see if he could get something up and running to combine with the todo list idea. Torsh was in charge of initial UX design as well as coding much of the CSS.

The modular nature of React.js made it significantly to work on the same app as my partners as we could each code a different bit of the app simply share the file to be imported.

## Challenges

### Scope

Our original was incredibly ambitious for the time we had, but I still think it was good to aim high. Since we split the two main bits of the app (login and main function) between two coders, we were able to ensure we reached MVP status even if we didn't manage to complete all of the functions we wanted. As a result, we have a good piece of boilerplate code for Firebase Realtime Database projects in general. It'll be a really good piece of code to iterate on and have in our back pockets in the future.

### Custom Checkbox Component

It was surprisingly difficult to get the custom checkbox working.

The original tutorial I followed to get a React/TS/Firebase todo app built used Bootstrap for convenience. I did the same, the first time I followed the tutorial. When trying to figure out the custom components (input box, buttons, checkboxes), only the checkbox gave me a hard time about it.

I had to create a type in my types.ts file called "CheckboxProps" to track the kind of information that the component stored/needed, which I had to reverse engineer from the original bootstrap checkbox. Was a headache and a half, but a really good way to learn more about Bootstrap, custom interactive components, TypeScript, and React in general. No regrets.

### Firebase Authentication

Unfortunately, we didn't get this bit running. Charlie got really close, but we did not want to break our MVP demo on the critique day. The crux of the issue is that Firebase recently updated all of its syntax to Version 9. All the tutorials we could find online were still using Version 8 and thus, the syntax was completely incorrect.

Speaking from prior experience from figuring out the CRD functions for the todo list function, it is _incredibly_ annoying and stressful to translate Firebase from v8 to v9, especially when you're still trying to figure out how Firebase works as a whole. Charlie was also new to TS and the guides he was using were also in majority JS. Also an annoying translation job there.

All in all, though it didn't work (yet), we all understand in concept (if not in practice) how to get the authentication working. Conceptualization really is half the battle sometimes.

## Future Goals

I want to get the full planned functionality up one day! Or a version of it, at least. Perhaps I'll start with being able to support several different lists, not just the single one. Then, try to get authentication working again.

I also want to reskin the todo list, or provide a toggle to do so. Since react is so modular, it would be as simple as a state and importing from a different CSS file. Just things to play with in the future!

---

## Resources

- [Sipios - React, TS, and Firebase Todo App Tutorial](https://www.sipios.com/blog-tech/build-a-real-time-todo-app-in-30-minutes-with-reactjs-typescript-and-firebase)
- [React Custom Checkbox Tutorial](https://blog.logrocket.com/building-custom-checkbox-react/)
- [React.js Documentation](https://reactjs.org/docs/getting-started.html)
- [Firebase V9 Documentation](https://firebase.google.com/docs/web/setup)
