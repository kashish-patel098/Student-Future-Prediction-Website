import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await auth.login(email, password, userType);
      
      // Redirect based on user type
      if (userType === 'student') {
        navigate('/student-portal');
      } else if (userType === 'faculty') {
        navigate('/faculty-portal');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to login');
      
      // Handle user type mismatch
      if (error.response?.data?.suggested_type) {
        setUserType(error.response.data.suggested_type);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-type-selector">
        <button 
          onClick={() => setUserType('student')}
          className={`type-button ${userType === 'student' ? 'active' : ''}`}
        >
          Login as Student
        </button>
        <button 
          onClick={() => setUserType('faculty')}
          className={`type-button ${userType === 'faculty' ? 'active' : ''}`}
        >
          Login as Faculty
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="login-button" disabled={isLoading}>
          Login as {userType === 'student' ? 'Student' : 'Faculty'}
        </button>
      </form>
    </div>
  );
};

export default Login;