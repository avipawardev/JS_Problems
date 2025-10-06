import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const BoardList = ({ onSelectBoard }) => {
  const [boards, setBoards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newBoard, setNewBoard] = useState({ name: '', description: '' });
  const { user } = useAuth();

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/boards');
      setBoards(response.data);
    } catch (err) {
      console.error('Failed to fetch boards:', err);
    }
  };

  const createBoard = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/boards', newBoard);
      setNewBoard({ name: '', description: '' });
      setShowForm(false);
      fetchBoards();
    } catch (err) {
      console.error('Failed to create board:', err);
    }
  };

  const deleteBoard = async (boardId) => {
    if (window.confirm('Are you sure you want to delete this board?')) {
      try {
        await axios.delete(`http://localhost:5000/api/boards/${boardId}`);
        fetchBoards();
      } catch (err) {
        console.error('Failed to delete board:', err);
      }
    }
  };

  return (
    <div className="board-list">
      <div className="board-header">
        <h2>📋 My Boards</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? '❌ Cancel' : '➕ Create Board'}
        </button>
      </div>

      {showForm && (
        <form className="board-form" onSubmit={createBoard}>
          <input
            type="text"
            placeholder="Board name"
            value={newBoard.name}
            onChange={(e) => setNewBoard({ ...newBoard, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Board description"
            value={newBoard.description}
            onChange={(e) => setNewBoard({ ...newBoard, description: e.target.value })}
          />
          <button type="submit">Create Board</button>
        </form>
      )}

      <div className="boards-grid">
        {boards.map(board => (
          <div key={board.id} className="board-card" onClick={() => onSelectBoard(board.id)}>
            <h3>📁 {board.name}</h3>
            <p>{board.description || 'No description provided'}</p>
            <div className="board-actions" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => onSelectBoard(board.id)}>🚀 Open Board</button>
              {board.createdBy === user.id && (
                <button 
                  className="delete-btn" 
                  onClick={() => deleteBoard(board.id)}
                >
                  🗑️ Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardList;