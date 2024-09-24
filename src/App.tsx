import { useState, useEffect } from 'react'
import axios from "axios";
import './App.css'

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:5000/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (!newTask.trim()) return;
    console.log("this is new task: ", newTask);
    const response = await axios.post('http://localhost:5000/todos', { task: newTask });
    setTodos([...todos, response.data]);
    setNewTask('');
  };

  const toggleCompletion = async (id: number, completed: boolean) => {
    const response = await axios.put(`http://localhost:5000/todos/${id}`, { completed: !completed });
    setTodos(todos.map(todo => todo.id === id ? response.data : todo));
  };

  const deleteTodo = async (id: number) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Todo List</h1>

        {/* Add New Todo */}
        <div className="flex mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors duration-300"
          >
            Add Task
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-3 bg-gray-100 rounded-md shadow-md"
            >
              <div
                className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-400' : ''
                  }`}
                onClick={() => toggleCompletion(todo.id, todo.completed)}
              >
                {todo.task}
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 transition-colors duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App
