import React from 'react';

interface Todo {
    id: number;
    task: string;
    description: string;
    completed: boolean;
}

interface TodoItemProps {
    todo: Todo;
    openViewModal: (todo: Todo) => void;
    deleteTodo: (id: number) => void;
    toggleCompletion: (id: number, completed: boolean) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, openViewModal, deleteTodo, toggleCompletion }) => {
    return (
        <li
            className="flex items-center justify-between p-3 bg-gray-100 rounded-md shadow-md cursor-pointer"
        >
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompletion(todo.id, todo.completed)}
                className="mr-3"
            />
            <div className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`} onClick={() => openViewModal(todo)}>
                {todo.task}
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    deleteTodo(todo.id);
                }}
                className="text-red-500 hover:text-red-700 transition-colors duration-300"
            >
                Delete
            </button>
        </li>
    );
};

export default TodoItem;
