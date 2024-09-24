import React from 'react';

interface AddTaskModalProps {
    setNewTask: (task: string) => void;
    setNewDescription: (description: string) => void;
    addTodo: () => void;
    closeModal: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ setNewTask, setNewDescription, addTodo, closeModal }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Add New Task</h2>
                <input
                    type="text"
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Task"
                    className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Description"
                    className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end">
                    <button
                        onClick={addTodo}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 mr-2"
                    >
                        Add
                    </button>
                    <button
                        onClick={closeModal}
                        className="bg-gradient-to-r from-orange-500 to-red-500  text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTaskModal;
