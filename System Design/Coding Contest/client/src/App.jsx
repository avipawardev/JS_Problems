import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import Login from './components/Login';
import Register from './components/Register';
import BoardList from './components/BoardList';
import TaskBoard from './components/TaskBoard';
import './App.css';

function AuthWrapper() {
  const { user, loading, logout } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [selectedBoard, setSelectedBoard] = useState(null);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="auth-container">
        {isLogin ? (
          <Login onToggle={() => setIsLogin(false)} />
        ) : (
          <Register onToggle={() => setIsLogin(true)} />
        )}
      </div>
    );
  }

  return (
    <SocketProvider>
      <div className="app-header">
        <h1>🚀 TaskFlow Pro</h1>
        <div className="user-info">
          <span>👋 {user.username} • {user.role === 'admin' ? '👑 Admin' : '👤 Member'}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      
      {selectedBoard ? (
        <TaskBoard 
          boardId={selectedBoard} 
          onBack={() => setSelectedBoard(null)} 
        />
      ) : (
        <BoardList onSelectBoard={setSelectedBoard} />
      )}
    </SocketProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AuthWrapper />
      </div>
    </AuthProvider>
  );
}

export default App;
