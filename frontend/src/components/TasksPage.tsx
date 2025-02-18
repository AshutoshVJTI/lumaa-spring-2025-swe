import { useState, useEffect } from 'react';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
  is_complete: boolean;
}

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/tasks`,
        { ...newTask, user_id: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTask({ title: '', description: '' });
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (task: Task) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/tasks/${task.id}`,
        task,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">My Tasks</h2>
        
        {/* Create Task Form */}
        <form onSubmit={handleCreateTask} className="bg-white shadow-sm rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Task title"
                className="input"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Task description"
                className="input"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Add Task
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white shadow-sm rounded-lg p-6">
            {editingTask?.id === task.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  className="input"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                />
                <input
                  type="text"
                  className="input"
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                />
                <div className="flex space-x-2">
                  <button onClick={() => handleUpdateTask(editingTask)} className="btn-primary">
                    Save
                  </button>
                  <button onClick={() => setEditingTask(null)} className="btn-secondary">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 rounded"
                        checked={task.is_complete}
                        onChange={() => handleUpdateTask({ ...task, is_complete: !task.is_complete })}
                      />
                      <span className="text-sm text-gray-500">Complete</span>
                    </label>
                    <button onClick={() => setEditingTask(task)} className="btn-secondary">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteTask(task.id)} className="btn-danger">
                      Delete
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-gray-600">{task.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TasksPage; 