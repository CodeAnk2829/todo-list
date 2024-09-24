import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import AddTaskModal from './components/AddTaskModal';
import ViewTaskModal from './components/ViewTaskModal';

interface Todo {
  id: number;
  task: string;
  description: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    fetchTodos();
  }, [todos]);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:5000/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (!newTask.trim() || !newDescription.trim()) return;
    const response = await axios.post('http://localhost:5000/todos', { task: newTask, description: newDescription });
    setTodos([...todos, response.data]);
    setNewTask('');
    setNewDescription('');
    setIsAddModalOpen(false);
  };

  const toggleCompletion = async (id: number, completed: boolean) => {
    const response = await axios.put(`http://localhost:5000/todos/${id}`, { completed: !completed });
    setTodos(todos.map(todo => todo.id === id ? response.data : todo));
  };

  const deleteTodo = async (id: number) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const openViewModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsViewModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Todo List</h1>

        <div className="flex justify-center mb-4">
          <button
            onClick={openAddModal}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Add Task
          </button>
        </div>

        <TodoList
          todos={todos}
          openViewModal={openViewModal}
          deleteTodo={deleteTodo}
          toggleCompletion={toggleCompletion}
        />

        {isAddModalOpen && (
          <AddTaskModal
            setNewTask={setNewTask}
            setNewDescription={setNewDescription}
            addTodo={addTodo}
            closeModal={() => setIsAddModalOpen(false)}
          />
        )}

        {isViewModalOpen && selectedTodo && (
          <ViewTaskModal
            todo={selectedTodo}
            closeModal={() => setIsViewModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
