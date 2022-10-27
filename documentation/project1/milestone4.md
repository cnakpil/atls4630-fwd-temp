# Project 1, Milestone 4 - Reflection

[PREVIOUS MILESTONE](milestone3.md)

[LIVE DEMO](https://atls4630-fwd.vercel.app/projects/project1/index.html)

## Summary

This project was filled with challenges. I had to overhaul my understanding of async events, promises, and other API related things for Firebase, and start dipping my toes into NPM. I still can't import firebase directly from my npm_modules but frankly, I cannot be bothered to fix it right now as it seems to be working just fine the way it is.

I also had to adjust my coding style to be more rigid than before with TypeScript, but I think it was an overall good change as it forced me to learn more about the granular nature of data types and how they're being used. Unfortunately, TypeScript does not mesh well with the gerry-rigged nature of how I'm importing Firebase SDK from static URL links and thus, a lot of my code still had to be written in vanilla JS.

Overall, this project stretched my abilities considerably. It was also my first step towards teaching myself more about back-end tools as I've never worked with databases before. Yes, Firebase is a front-end dev's workaround to avoiding a true SQL database, but I think it's a good first step nonetheless. Next, I think I'll consider working with Supabase as an introduction to PostGreSQL and relational tables.

### New Tools

- TypeScript
- Firebase Realtime Database

### MVP Functions

- [x] Save data to Firebase
- [x] Delete data from Firebase
- [x] Load data from Firebase
- [x] Visuals according to proposed wireframes
- [x] Basic responsiveness

### Stretch Goals

- [x] Change header depending on page content
- [x] Change appearance of todo items on completion
- [x] Populate from database every time something new is added instead of doing it locally so that multiple users can input new notes at the same time
- [ ] Scroll to input box after entering a new todo
- [ ] Improve user experience by moving completed to-do items to the bottom of the page
- [ ] Improve responsive layout
- [ ] Add animations for funsies
- [ ] Add user authentication using Firebase authentication
