import React from 'react';

interface Todo {
    id: number;
    task: string;
    description: string;
    completed: boolean;
}

interface ViewTaskModalProps {
    todo: Todo;
    closeModal: () => void;
}

const ViewTaskModal: React.FC<ViewTaskModalProps> = ({ todo, closeModal }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">{todo.task}</h2>
                <p className="text-gray-700 mb-4">{todo.description}</p>
                <div className="flex justify-end">
                    <button
                        onClick={closeModal}
                        className="bg-gradient-to-r from-orange-500 to-red-500  text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewTaskModal;
