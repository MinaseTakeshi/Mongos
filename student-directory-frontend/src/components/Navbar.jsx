import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // 1. Clears localStorage & resets AuthContext state
    navigate('/login'); // 2. Redirects user to /login
  };

  if (!isAuthenticated) return null;

  return (
    <nav style={styles.nav}>
      <h3 style={{ margin: 0 }}>Student Portal</h3>
      <div style={styles.userInfo}>
        {user && <span style={{ marginRight: '15px' }}>{user.email}</span>}
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#333',
    color: '#fff',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoutBtn: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};