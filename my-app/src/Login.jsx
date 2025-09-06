import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getCookie from '../utils'; // Import the helper function

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const baseURL = 'http://127.0.0.1:8000/';

  useEffect(() => {
    // This function will be called when the component mounts
    const getCsrfToken = async () => {
      try {
        // We still need to hit the endpoint to get the cookie set
        await fetch(`${baseURL}/api/auth/csrf/`);
        console.log("CSRF cookie should be set now.");
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };

    getCsrfToken();
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    // 1. Get the CSRF token value using our helper function
    const csrfToken = getCookie('csrftoken');

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/auth/register/`, {
        method: 'POST',
        // 2. IMPORTANT: Include credentials to send cookies
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          // 3. Manually set the X-CSRFToken header
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
          username: 'testuser', // Replace with form data
          password: 'testpassword', // Replace with form data
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
      } else {
        console.error("Login failed:", data);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

    const validate = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
        if (!password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // In a real app, you'd perform an API call here.
            // On success, navigate to the dashboard.
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center p-4 transition-colors duration-300">
            <div className="max-w-md w-full mx-auto">
                <div 
                    className="text-3xl font-bold text-center text-indigo-600 cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    SynergySphere
                </div>
                <div className="bg-white dark:bg-gray-800 p-8 mt-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-1">
                        Welcome Back!
                    </h2>
                    <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
                        Sign in to continue
                    </p>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>
                        <button type="submit" onClick={handleLogin} className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors duration-300">
                            Login to Dashboard
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                        Don't have an account?{" "}
                        <span
                            onClick={() => navigate('/signup')}
                            className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                        >
                            Sign Up
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};