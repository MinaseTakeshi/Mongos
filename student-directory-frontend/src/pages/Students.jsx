import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { token, logout, user } = useAuth();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/students', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to fetch students data');
        }

        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchStudents();
    }
  }, [token]);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading students...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Students Directory</h2>
        <button 
          onClick={logout} 
          style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>

      {user && <p style={{ color: '#666' }}>Logged in as: <strong>{user.email}</strong></p>}

      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {students.map((student) => (
            <li
              key={student._id || student.id}
              style={{
                padding: '12px 16px',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <strong>{student.name}</strong> — <span style={{ color: '#555' }}>{student.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}