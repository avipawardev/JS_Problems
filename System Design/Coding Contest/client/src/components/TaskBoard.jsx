import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import ActivityLog from './ActivityLog';
import axios from 'axios';

const TaskBoard = ({ boardId, onBack }) => {
  const [board, setBoard] = useState(null);
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState({});
  const [newTask, setNewTask] = useState({ title: '', description: '', columnId: '', assignedTo: '', dueDate: '' });
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ assignedTo: '', dueDate: '' });
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const { socket, joinBoard, leaveBoard } = useSocket();

  useEffect(() => {
    if (boardId) {
      fetchBoardDetails();
      fetchUsers();
      joinBoard(boardId);
    }

    return () => {
      if (boardId) {
        leaveBoard(boardId);
      }
    };
  }, [boardId]);

  useEffect(() => {
    if (socket) {
      socket.on('taskCreated', handleTaskCreated);
      socket.on('taskUpdated', handleTaskUpdated);
      socket.on('taskMoved', handleTaskMoved);
      socket.on('taskDeleted', handleTaskDeleted);

      return () => {
        socket.off('taskCreated');
        socket.off('taskUpdated');
        socket.off('taskMoved');
        socket.off('taskDeleted');
      };
    }
  }, [socket]);

  const fetchBoardDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/boards/${boardId}`);
      setBoard(response.data);
      setColumns(response.data.columns);
      
      // Fetch tasks for each column
      const tasksData = {};
      for (const column of response.data.columns) {
        const tasksResponse = await axios.get(`http://localhost:5000/api/tasks/column/${column.id}`);
        tasksData[column.id] = tasksResponse.data.tasks;
      }
      setTasks(tasksData);
    } catch (err) {
      console.error('Failed to fetch board details:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const handleTaskCreated = (task) => {
    setTasks(prev => ({
      ...prev,
      [task.columnId]: [...(prev[task.columnId] || []), task]
    }));
  };

  const handleTaskUpdated = (task) => {
    setTasks(prev => ({
      ...prev,
      [task.columnId]: prev[task.columnId]?.map(t => t.id === task.id ? task : t) || []
    }));
  };

  const handleTaskMoved = ({ task, oldColumnId, newColumnId }) => {
    setTasks(prev => ({
      ...prev,
      [oldColumnId]: prev[oldColumnId]?.filter(t => t.id !== task.id) || [],
      [newColumnId]: [...(prev[newColumnId] || []), task]
    }));
  };

  const handleTaskDeleted = ({ taskId, columnId }) => {
    setTasks(prev => ({
      ...prev,
      [columnId]: prev[columnId]?.filter(t => t.id !== taskId) || []
    }));
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tasks', newTask);
      setNewTask({ title: '', description: '', columnId: '', assignedTo: '', dueDate: '' });
      setShowForm(false);
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  const moveTask = async (taskId, newColumnId) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}/move`, { newColumnId });
    } catch (err) {
      console.error('Failed to move task:', err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const searchTasks = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filters.assignedTo) params.append('assignedTo', filters.assignedTo);
      if (filters.dueDate) params.append('dueDate', filters.dueDate);
      
      const response = await axios.get(`http://localhost:5000/api/tasks/board/${boardId}/search?${params}`);
      
      // Group tasks by column
      const groupedTasks = {};
      columns.forEach(col => { groupedTasks[col.id] = []; });
      response.data.forEach(task => {
        if (groupedTasks[task.columnId]) {
          groupedTasks[task.columnId].push(task);
        }
      });
      setTasks(groupedTasks);
    } catch (err) {
      console.error('Failed to search tasks:', err);
    }
  };

  if (!board) return <div className="loading">Loading...</div>;

  return (
    <div className="task-board">
      <header className="board-header">
        <div>
          <button onClick={onBack}>← Back to Boards</button>
          <h1>📁 {board.name}</h1>
        </div>
      </header>

      <div className="board-controls">
        <div className="search-filters">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={filters.assignedTo}
            onChange={(e) => setFilters({ ...filters, assignedTo: e.target.value })}
          >
            <option value="">All Users</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>{u.username}</option>
            ))}
          </select>
          <input
            type="date"
            value={filters.dueDate}
            onChange={(e) => setFilters({ ...filters, dueDate: e.target.value })}
          />
          <button onClick={searchTasks}>🔍 Search</button>
          <button onClick={fetchBoardDetails}>🔄 Clear</button>
        </div>
        
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? '❌ Cancel' : '➕ Add Task'}
        </button>
      </div>

      {showForm && (
        <form className="task-form" onSubmit={createTask}>
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Task description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            required
          />
          <select
            value={newTask.columnId}
            onChange={(e) => setNewTask({ ...newTask, columnId: parseInt(e.target.value) })}
            required
          >
            <option value="">Select Column</option>
            {columns.map(col => (
              <option key={col.id} value={col.id}>{col.name}</option>
            ))}
          </select>
          <select
            value={newTask.assignedTo}
            onChange={(e) => setNewTask({ ...newTask, assignedTo: parseInt(e.target.value) || '' })}
          >
            <option value="">Assign to...</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>{u.username}</option>
            ))}
          </select>
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />
          <button type="submit">✨ Create Task</button>
        </form>
      )}

      <div className="main-content">
        <div className="board-columns">
          {columns.map(column => (
            <div key={column.id} className="column">
              <h3>{column.name}</h3>
              <div className="tasks">
                {(tasks[column.id] || []).map(task => (
                  <div key={task.id} className="task-card">
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                    {task.assignedTo && (
                      <div className="task-assigned">
                        👤 {users.find(u => u.id === task.assignedTo)?.username}
                      </div>
                    )}
                    {task.dueDate && (
                      <div className="task-due">📅 {new Date(task.dueDate).toLocaleDateString()}</div>
                    )}
                    <div className="task-actions">
                      <select
                        onChange={(e) => moveTask(task.id, parseInt(e.target.value))}
                        value={task.columnId}
                      >
                        {columns.map(col => (
                          <option key={col.id} value={col.id}>{col.name}</option>
                        ))}
                      </select>
                      <button onClick={() => deleteTask(task.id)}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="sidebar">
          <ActivityLog boardId={boardId} />
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;