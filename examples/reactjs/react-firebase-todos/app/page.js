"use client";

import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  push,
  update,
  remove,
  onValue,
} from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ9_SGqyLhK-nveVGxbxaUpJiGvNs6zw8",
  authDomain: "test-6eda6.firebaseapp.com",
  projectId: "test-6eda6",
  storageBucket: "test-6eda6.appspot.com",
  messagingSenderId: "946571680904",
  appId: "1:946571680904:web:b8a7c6720b0e92667b933d",
  databaseURL: "https://test-6eda6-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editing, setEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const todosRef = ref(database, "todos/");

    onValue(todosRef, (snapshot) => {
      const data = snapshot.val();
      const todoList = data
        ? Object.entries(data).map(([key, value]) => ({ id: key, ...value }))
        : [];
      setTodos(todoList);
    });
  }, []);

  const addTodo = () => {
    const newTodoRef = push(ref(database, "todos/"));
    set(newTodoRef, {
      text: input,
      completed: false,
    });
    setInput("");
  };

  const deleteTodo = (id) => {
    remove(ref(database, `todos/${id}`));
  };

  const editTodo = (id, newText) => {
    update(ref(database, `todos/${id}`), {
      text: newText,
    });
    setEditing(null);
    setEditingText("");
  };

  const toggleComplete = (id, completed) => {
    update(ref(database, `todos/${id}`), {
      completed: !completed,
    });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Next.js + Firebase Todo App
          </h1>
          <div className="flex mb-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new task"
              className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addTodo}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                {editing === todo.id ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <span
                    onClick={() => toggleComplete(todo.id, todo.completed)}
                    className={`flex-1 cursor-pointer ${
                      todo.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                )}
                <div className="flex space-x-2">
                  {editing === todo.id ? (
                    <button
                      onClick={() => editTodo(todo.id, editingText)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditing(todo.id);
                        setEditingText(todo.text);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
