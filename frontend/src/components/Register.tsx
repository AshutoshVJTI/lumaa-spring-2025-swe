import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
  setIsAuthenticated: (value: boolean) => void;
}

function Register({ setIsAuthenticated }: RegisterProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        username,
        password
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user.id);
      setIsAuthenticated(true);
      navigate('/tasks');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errorData = err.response.data;
        if (errorData.errors && Array.isArray(errorData.errors)) {
          setError(errorData.errors[0]);
        } else if (typeof errorData.error === 'string') {
          setError(errorData.error);
        } else {
          setError('Registration failed');
        }
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                className="input mt-1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="input mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button type="submit" className="btn-primary w-full">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register; 