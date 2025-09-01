import React, { useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "./api";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import AuthForm from "./components/AuthForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [auth, setAuth] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    if (auth) {
      fetchTasks().then((res) => setTasks(res.data));
    }
  }, [auth]);

  if (!auth) return <AuthForm onAuth={() => setAuth(true)} />;

  const addTask = (task) =>
    createTask(task).then((res) => setTasks([...tasks, res.data]));

  const toggleTask = (task) =>
    updateTask(task.id, { done: !task.done }).then((res) =>
      setTasks(tasks.map((t) => (t.id === task.id ? res.data : t)))
    );

  const removeTask = (id) =>
    deleteTask(id).then(() =>
      setTasks(tasks.filter((t) => t.id !== id))
    );

  return (
    <div className="max-w-lg mx-auto mt-10 shadow-lg p-4 rounded">
      <h1 className="text-2xl font-bold text-center">Task Manager</h1>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded float-right"
        onClick={() => {
          localStorage.removeItem("token");
          setAuth(false);
        }}
      >
        Logout
      </button>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={removeTask} />
    </div>
  );
}

export default App;
