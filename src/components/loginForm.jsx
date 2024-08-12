import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeLoginStatus } from '../app/feature/loginSlice';

function LoginForm({ onLoginSuccess }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/Auth/login`, data, { withCredentials: true });
            dispatch(changeLoginStatus(true));
            const { role } = response.data;
            if (role === 'admin') {
                navigate('/admin-profile');
            } else {
                navigate('/user-profile');
            }
            if (onLoginSuccess) {
                onLoginSuccess();
            }
        } catch (error) {
            dispatch(changeLoginStatus(false));
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-12 bg-white shadow-md rounded-md space-y-4">
                <h2 className="text-2xl font-bold text-[#3778c2] pb-4">LOGIN</h2>
                <div>
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
                    {errors.email && <span className="text-red-500 text-xs">Please enter a valid email address</span>}
                </div>
                <div>
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
                    {errors.password && <span className="text-red-500 text-xs">Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character</span>}
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full bg-[#3778c2] text-white py-2 px-4 rounded-md hover:bg-[#2e69ac] focus:outline-none focus:bg-[#2e69ac]"
                    >
                        Login
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-sm">Don't have an account? <a href="/" className="text-blue-500">Sign Up here</a>.</p>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
