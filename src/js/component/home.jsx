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
            if (!response.ok) throw new Error('Failed to fetch tasks');
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            setError(error.message);
        }
    };

    // Función para agregar una nueva tarea
    const addTask = async () => {
        if (newTask.trim() === '') return; // Evita agregar tareas vacías
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newTask, completed: false })
            });
            if (!response.ok) throw new Error('Failed to add task');
            fetchTasks(); // Actualiza la lista de tareas después de agregar una nueva
            setNewTask(''); // Limpia el campo de entrada
        } catch (error) {
            setError(error.message);
        }
    };

    // Función para eliminar una tarea
    const deleteTask = async (taskId) => {
        try {
            const response = await fetch(`${API_URL}/${taskId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete task');
            fetchTasks(); // Actualiza la lista de tareas después de eliminar una
        } catch (error) {
            setError(error.message);
        }
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
                            onChange={() => toggleTaskCompletion(task.id, task.completed)}
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