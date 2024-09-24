import React from 'react';
import TodoItem from './TodoItem';

interface Todo {
    id: number;
    task: string;
    description: string;
    completed: boolean;
}

interface TodoListProps {
    todos: Todo[];
    openViewModal: (todo: Todo) => void;
    deleteTodo: (id: number) => void;
    toggleCompletion: (id: number, completed: boolean) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, openViewModal, deleteTodo, toggleCompletion }) => {
    return (
        <ul className="space-y-4">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    openViewModal={openViewModal}
                    deleteTodo={deleteTodo}
                    toggleCompletion={toggleCompletion}
                />
            ))}
        </ul>
    );
};

export default TodoList;
