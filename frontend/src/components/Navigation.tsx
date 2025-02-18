import { Link, useNavigate } from 'react-router-dom';

interface NavigationProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

function Navigation({ isAuthenticated, setIsAuthenticated }: NavigationProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-800">Task Manager</span>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/tasks" className="text-gray-600 hover:text-gray-900">Tasks</Link>
                <button onClick={handleLogout} className="btn-secondary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-primary">Login</Link>
                <Link to="/register" className="btn-secondary">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation; 