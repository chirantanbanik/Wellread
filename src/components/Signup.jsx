import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
  // Using React hooks to manage state and navigate
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Function to handle form submission
  const create = async (data) => {
    setError(''); // Clear any existing error
    try {
      // Attempt to create account using auth service
      const userData = await authService.createAccount(data);
      if (userData) {
        // If account creation is successful, log in the user and navigate to home page
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate('/');
      }
    } catch (error) {
      // If there's an error during account creation, set the error state
      setError(error.message);
    }
  };

  // Function to clear form errors
  const clearErrors = () => {
    setError(''); // Clear error state
    reset(); // Reset form errors
  };

  return (
    <div className='flex items-center justify-center w-full'>
      <div className='mx-auto w-full max-w-lg bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364] opacity-45 rounded-xl p-10'>
        <h2 className='text-[#fffafa] drop-shadow-lg text-xl font-extrabold text-center pb-4'>Welcome to <span className='text-blue-500'>WellRead!</span> - Where Every Thought Finds Its Voice!</h2>
        <h4 className='text-white font-medium text-lg text-center mb-3 underline'>Sign Up</h4>
        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>} {/* Display error message if there's an error */}
        <form onSubmit={handleSubmit(create)}>
          <div className='space-y-5'>
            {/* Input field for full name */}
            <Input
              label="Full Name: "
              placeholder="Enter your Full Name"
              {...register("name", { required: "Full name is required" })}
              onFocus={clearErrors} // Clear errors when input is focused
            />
            {errors.name && <p className="text-red-600">{errors.name.message}</p>} {/* Display error message if full name is empty */}
            {/* Input field for email */}
            <Input
              label="Email: "
              placeholder="Enter your Email"
              type="email"
              {...register("email", {
                required: "Valid email address is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email address must be a valid address"
                }
              })}
              onFocus={clearErrors} // Clear errors when input is focused
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>} {/* Display error message if email is empty or invalid */}
            {/* Input field for password */}
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              onFocus={clearErrors} // Clear errors when input is focused
            />
            {errors.password && <p className="text-red-600">{errors.password.message}</p>} {/* Display error message if password is empty */}
            {/* Button to submit the form */}
            <Button
              type="submit"
              className="w-full"
            >Create Account</Button>
          </div>
        </form>
        <p className="mt-4 text-center text-base text-white">
          Already have an account? 
          {/* Link to navigate to login page */}
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
