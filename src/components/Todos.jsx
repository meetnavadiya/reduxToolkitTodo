import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updateTodo } from '../features/todo/todoSlice';

function Todos() {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');

    const handleEdit = (id, text) => {
        setEditId(id);
        setEditText(text);
    };

    const handleSave = (id) => {
        dispatch(updateTodo({ id, text: editText }));
        setEditId(null);
    };

    return (
        <>
            <div>Todos</div>
            <ul className="list-none">
                {todos.map((todo) => (
                    <li
                        className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
                        key={todo.id}
                    >
                        {editId === todo.id ? (
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="text-black px-2 py-1 rounded"
                            />
                        ) : (
                            <div className='text-white'>{todo.text}</div>
                        )}

                        <div className="flex gap-2">
                            {editId === todo.id ? (
                                <button
                                    onClick={() => handleSave(todo.id)}
                                    className="text-white bg-green-500 px-3 py-1 rounded hover:bg-green-600"
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleEdit(todo.id, todo.text)}
                                    className="text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                            )}

                            <button
                                onClick={() => dispatch(removeTodo(todo.id))}
                                className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Todos;
