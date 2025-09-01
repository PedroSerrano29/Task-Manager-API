import React from "react";

const TaskList = ({ tasks, onToggle, onDelete }) => (
  <ul className="p-4">
    {tasks.map((task) => (
      <li key={task.id} className="flex justify-between p-2 border-b">
        <span
          onClick={() => onToggle(task)}
          style={{ textDecoration: task.done ? "line-through" : "none", cursor: "pointer" }}
        >
          {task.title}
        </span>
        <button onClick={() => onDelete(task.id)} className="text-red-500">Delete</button>
      </li>
    ))}
  </ul>
);

export default TaskList;
