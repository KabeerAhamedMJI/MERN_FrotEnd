import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeLoginStatus } from '../app/feature/loginSlice';

function LoginForm({ onLoginSuccess }) {
    // Get dispatch and navigate functions
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Set up form handling with react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Function to handle form submission
    const onSubmit = async (data) => {
        try {
            // Send login request to the server
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/Auth/login`, data, { withCredentials: true });
            // Update login status in the Redux store
            dispatch(changeLoginStatus(true));
            // Check user role and navigate to the correct page
            const { role } = response.data;
            if (role === 'admin') {
                navigate('/admin-profile');
            } else {
                navigate('/user-profile');
            }
            // Call onLoginSuccess callback if provided
            if (onLoginSuccess) {
                onLoginSuccess();
            }
        } catch (error) {
            // Update login status to false and log the error
            dispatch(changeLoginStatus(false));
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="p-8">
          
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-12 bg-white shadow-md rounded-md space-y-4">
                <h2 className="text-2xl font-bold text-[#3778c2] pb-4">LOGIN</h2>
                <div>
                    {/* Email input field */}
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        {...register("email", {
                            required: true,
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                        })}
                    />
                    {/* Error message for invalid email */}
                    {errors.email && <span className="text-red-500 text-xs">Please enter a valid email address</span>}
                </div>
                <div>
                    {/* Password input field */}
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        {...register("password", {
                            required: true,
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                        })}
                    />
                    {/* Error message for invalid password */}
                    {errors.password && <span className="text-red-500 text-xs">Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character</span>}
                </div>
                <div>
                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full bg-[#3778c2] text-white py-2 px-4 rounded-md hover:bg-[#2e69ac] focus:outline-none focus:bg-[#2e69ac]"
                    >
                        Login
                    </button>
                </div>
                <div className="mt-4 text-center">
                    {/* Link to the sign-up page */}
                    <p className="text-sm">Don't have an account? <a href="/" className="text-blue-500">Sign Up here</a>.</p>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
