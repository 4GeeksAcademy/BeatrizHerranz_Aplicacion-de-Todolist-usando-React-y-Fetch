import React, { useState, useEffect } from 'react';

const API_URL = 'https://playground.4geeks.com/todo/users/Beatriz_Herranz';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState(null);

  // Función para obtener las tareas desde la API
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Error fetching tasks: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Fetched tasks:', data); // Para depuración
      setTasks(data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Función para agregar una nueva tarea
  const addTask = () => {
    if (newTask.trim() === '') return;
    fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ name: newTask, completed: false }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => {
        console.log('Response from addTask:', resp); // Para depuración
        if (!resp.ok) {
          throw new Error(`Error adding task: ${resp.statusText}`);
        }
        return resp.json();
      })
      .then(data => {
        console.log('Added task:', data); // Para depuración
        fetchTasks(); // Actualiza la lista de tareas después de agregar una nueva
        setNewTask(''); // Limpia el campo de entrada
      })
      .catch(error => {
        setError(error.message);
        console.error('Error:', error); // Para depuración
      });
  };

  // Función para eliminar una tarea
  const deleteTask = (taskId) => {
    fetch(`${API_URL}/${taskId}`, {
      method: 'DELETE'
    })
      .then(resp => {
        console.log('Response from deleteTask:', resp); // Para depuración
        if (!resp.ok) {
          throw new Error(`Error deleting task: ${resp.statusText}`);
        }
        return resp.json();
      })
      .then(data => {
        console.log('Deleted task:', data); // Para depuración
        fetchTasks(); // Actualiza la lista de tareas después de eliminar una
      })
      .catch(error => {
        setError(error.message);
        console.error('Error:', error); // Para depuración
      });
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Agregar nueva tarea"
      />
      <button onClick={addTask}>Agregar</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
            />
            {task.name}
            <button onClick={() => deleteTask(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;