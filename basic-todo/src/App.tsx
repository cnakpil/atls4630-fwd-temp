import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="app-wrapper">
      <TodoForm />
      <TodoList />
    </div >
  );
}

export default App;