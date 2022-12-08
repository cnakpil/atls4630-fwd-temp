import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="app-wrapper">
      <div className="app-container">
        <h1>React + Firebase Todo App</h1>
        <TodoList />
        <TodoForm />
      </div>
    </div >
  );
}

export default App;