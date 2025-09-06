import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const navigate = useNavigate();
    const baseURL = 'http://127.0.0.1:8000';
    const [csrfToken, setCsrfToken] = useState('');

    // Regex for a strong password: min 8 characters, at least one uppercase, lowercase, number, and special character.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/;

    // Helper function to get the CSRF token from the cookie
    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    // Fetch the CSRF token when the component mounts
    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await fetch(`${baseURL}/api/auth/csrf/`, {
                    credentials: 'include',
                });
                if (response.ok) {
                    const token = getCookie('csrftoken');
                    setCsrfToken(token);
                }
            } catch (error) {
                console.error("Error fetching CSRF token:", error);
            }
        };
        fetchCsrfToken();
    }, []);

    // Real-time validation for email
    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (newEmail && !/\S+@\S+\.\S+/.test(newEmail)) {
            setEmailError('Email is invalid');
        } else {
            setEmailError('');
        }
    };

    // Real-time validation for password
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (newPassword && !passwordRegex.test(newPassword)) {
            setPasswordError('Password must be at least 8 characters and include a capital letter, a number, and a special character.');
        } else {
            setPasswordError('');
        }
    };

    // Real-time validation for confirm password
    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        if (password && newConfirmPassword && password !== newConfirmPassword) {
            setConfirmPasswordError('Passwords do not match!');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        
        // Final form validation before API call
        if (!firstName || !lastName || !email || !password || !confirmPassword || emailError || passwordError || confirmPasswordError) {
            return;
        }

        try {
            const response = await fetch(`${baseURL}/api/auth/register/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password,
                    password2: confirmPassword, // Make sure to send confirm password to Django if needed
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Signup successful:", data);
                // Correct place to store user data in localStorage
                localStorage.setItem('userData', JSON.stringify(data));
                navigate('/dashboard');
            } else {
                console.error("Signup failed:", data);
                // Display server-side error messages
                if (data.email) {
                  setEmailError(data.email[0]);
                }
                if (data.password) {
                  setPasswordError(data.password[0]);
                }
            }
        } catch (error) {
            console.error("An error occurred during signup:", error);
            // set a general error message
        }
    };

    const isFormValid = firstName && lastName && email && password && confirmPassword && !emailError && !passwordError && !confirmPasswordError;

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
                        Create an Account
                    </h2>
                    <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
                        Get started with your free account
                    </p>
                    <form onSubmit={handleSignup} noValidate>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 border-gray-300 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 border-gray-300 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                className={`w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 ${emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
                            />
                            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className={`w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 ${passwordError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
                            />
                            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className={`w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 ${confirmPasswordError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
                            />
                            {confirmPasswordError && <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>}
                        </div>
                        <button 
                            type="submit" 
                            className={`w-full py-2.5 rounded-lg font-semibold transition-colors duration-300 ${isFormValid ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                            disabled={!isFormValid}
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate('/login')}
                            className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                        >
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};