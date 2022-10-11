var fillStatus;
fillStatus = document.querySelector(".wrapper").getAttribute("fill-status");
console.log(fillStatus);
// To-do item class to contain information in each list item
var Todo = /** @class */ (function () {
    function Todo(text, checked, date) {
        this.text = text;
        this.checked = checked;
        this.id = date;
    }
    return Todo;
}());
var todoItems;
function addTodo(input) {
    todoItems.push(new Todo(input, false, Date.now()));
    // todoItems.push(newTodo);
    console.log(todoItems);
}
