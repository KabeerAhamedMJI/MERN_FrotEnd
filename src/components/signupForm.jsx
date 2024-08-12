import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUpForm({ onSignUpSuccess }) {
  const [role, setRole] = useState('user');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/Auth/signup`, { ...data, role });
      if (onSignUpSuccess) {
        onSignUpSuccess();
      }
      navigate('/login');
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-20 bg-white p-8 rounded-md">
      <h2 className="text-2xl font-bold text-[#3778c2] pb-4">SIGN UP</h2>
      <div className="mb-3">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true, maxLength: 25 })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.name && <span className="text-red-500 text-xs">Name is required</span>}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.email && <span className="text-red-500 text-xs">Please enter a valid email address</span>}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: true,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.password && <span className="text-red-500 text-xs">Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character</span>}
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">Role:</label>
        <select
          {...register("role", { required: true })}
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="w-full bg-[#3778c2] text-white py-2 px-4 rounded-md hover:bg-[#2e69ac] focus:outline-none focus:bg-[#2e69ac]"
        >
          Sign Up
        </button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm">Already have an account? <a href="/login" className="text-blue-500">Login here</a>.</p>
      </div>
    </form>
  );
}
