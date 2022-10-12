/*************************************************************************************** */
let fillStatus = document.querySelector(".wrapper").getAttribute("fill-status");
var formInput = document.querySelector(".todo-input");
console.log(fillStatus);
// To-do item class to contain information in each list item
class Todo {
    constructor(text, checked, date) {
        this.text = text;
        this.checked = checked;
        this.id = date;
    }
}
let todoItems;
function addTodo(input) {
    todoItems.push(new Todo(input, false, Date.now()));
    // todoItems.push(newTodo);
    console.log(todoItems);
}
export {};
