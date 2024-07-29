import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const apiUrl = 'https://playground.4geeks.com/apis/fake/todos/user/yourusername';

  // Obtener tareas al cargar el componente
  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Agregar una nueva tarea
  const addTodo = (newTodo) => {
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTodos)
    })
    .then(response => response.json())
    .then(data => setTodos(data))
    .catch(error => console.error('Error adding todo:', error));
  };

  // Eliminar una tarea
  const deleteTodo = (todoToDelete) => {
    const updatedTodos = todos.filter(todo => todo.label !== todoToDelete.label);
    setTodos(updatedTodos);

    fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTodos)
    })
    .then(response => response.json())
    .then(data => setTodos(data))
    .catch(error => console.error('Error deleting todo:', error));
  };

  // Limpiar todas las tareas
  const clearTodos = () => {
    setTodos([]);

    fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([])
    })
    .then(() => setTodos([]))
    .catch(error => console.error('Error clearing todos:', error));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.label} <button onClick={() => deleteTodo(todo)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={clearTodos}>Clear All</button>
      <input type="text" id="new-todo" placeholder="Add new todo" />
      <button onClick={() => addTodo({
        label: document.getElementById('new-todo').value,
        done: false
      })}>Add Todo</button>
    </div>
  );
};

export default TodoList;