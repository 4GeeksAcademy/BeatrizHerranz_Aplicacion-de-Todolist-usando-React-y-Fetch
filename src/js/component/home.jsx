import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const apiUrl = 'https://playground.4geeks.com/todo/users/Beatriz_Herranz';

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log("Fetched tasks:", data);
        setTodos(data.todos); // Asegúrate de ajustar esto según la estructura de datos recibida
      })
      .catch(error => console.error('Error fetching tasks:', error));
  };

  const addTask = (e) => {
    if (e.key === "Enter") {
      const newTaskLabel = inputValue.trim();
      if (newTaskLabel !== "") {
        const newTask = { label: newTaskLabel, done: false };

        fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTask)
        })
          .then(response => {
            console.log("Add task response status:", response.status);
            return response.json();
          })
          .then(() => {
            fetchTasks(); // Refresh the task list after adding a new task
            setInputValue("");
          })
          .catch(error => console.error('Error adding task:', error));
      }
    }
  };

  const handleDelete = (taskId) => {
    fetch(`${apiUrl}/${taskId}`, {
      method: 'DELETE'
    })
      .then(response => {
        console.log("Delete task response status:", response.status);
        if (response.ok) {
          fetchTasks(); // Refresh the task list after deleting a task
        }
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div className="container">
      <h1>My Todos</h1>
      <ul>
        <li>
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyPress={addTask}
            placeholder="What do you need to do?"></input>
        </li>
        {todos.length === 0 ? (
          <li className="no-tasks">No hay tareas, añadir tareas.</li>
        ) : (
          todos.map((todo) => (
            <li key={todo.id} className="task-list-item">
              {todo.label}{" "}
              <i
                className="fa-solid fa-trash-can"
                onClick={() => handleDelete(todo.id)}
              ></i>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;