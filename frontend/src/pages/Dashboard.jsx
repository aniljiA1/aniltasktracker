import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", dueDate: "" });

  

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const res = await api.get("/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
    await api.post("/tasks", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setForm({ title: "", description: "", dueDate: "" });
    fetchTasks();
} catch (err) {
    console.error("Task creation faild:", err.response?.data || err.message);
    alert("failed to add task. check console for details.");
}
  };

  const markComplete = async (id) => {
    const token = localStorage.getItem("token");
    await api.put(`/tasks/${id}`, { status: "completed" }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

 useEffect(() => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  api.get("/tasks", config)
    .then((res) => {
      console.log("res", res.data);
      setTasks(Array.isArray(res.data) ? res.data : res.data.tasks || []);
    })
    .catch((err) => {
      console.error("API error:", err);
      setTasks([]);
    });
}, []);




  //useEffect(() => {
    //fetchTasks();
  //}, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">Your Tasks</h1>

      <form onSubmit={handleCreate} className="flex flex-col gap-4 mb-6 max-w-md">
        <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="p-2 border" />
        <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="p-2 border" />
        <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} className="p-2 border" />
        <button type="submit" disabled={!form.title || !form.description || !form.dueDate} className="bg-blue-500 text-white p-2 rounded">Add Task</button>
      </form>

      <ul className="space-y-4">
        {tasks.map(task => (
          <li key={task.id} className="border p-4 flex justify-between items-center">
            <div>
              <h2 className="font-bold">{task.title}</h2>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
              <p className={`text-sm ${task.status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>
                Status: {task.status}
              </p>
            </div>
            {task.status === 'pending' && (
              <button onClick={() => markComplete(task.id)} className="bg-green-600 text-white px-4 py-1 rounded">
                Mark Complete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;

