import { createContext, useContext, useState } from 'react';

const TasksContext = createContext();

import { tasks as initialTasks } from '../data/tasks';

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState(initialTasks);

    const addTask = (task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
    };

    const deleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    return (
        <TasksContext.Provider value={{ tasks, addTask, deleteTask }}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTasks = () => useContext(TasksContext);