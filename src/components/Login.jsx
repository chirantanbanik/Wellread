import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { Button, Input } from "./index";

function NewLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "all" }); // Ensure all fields are validated on submit

  const [serverError, setServerError] = useState(""); // State for server-side errors

  const login = async (data) => {
    setServerError(""); // Clear previous server errors before login attempt

    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setServerError(error.message); // Set server error message
    }
  };

  // Clear form errors when user starts correcting input
  const clearErrors = () => {
    setServerError(""); // Clear server errors on input focus as well
  };

  return (
    <div className='flex items-center justify-center w-full'>
      <div className='mx-auto w-full max-w-lg bg-gradient-to-r from-[#000000] to-[#434343] opacity-45 rounded-xl p-10'>
        <h2 className='text-[#fffafa] drop-shadow-lg text-xl font-extrabold text-center pb-4'>
          Welcome back to <span className='text-blue-500'>WellRead!</span> - Where Every Thought Finds Its Voice!
        </h2>
        <h4 className='text-white font-medium text-lg text-center underline'>Login</h4>
        {serverError && <p className='text-red-500 mt-8 text-center'>{serverError}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className='space-y-5'>
            <Input
              label="Email: "
              placeholder="Enter your Email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email address must be a valid address"
                }
              })}
              onFocus={clearErrors} // Clear form and server errors on focus
            />
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            <Input
                label="Password: "
                labelClassName="text-white"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: "Password is required"
                })}
                onFocus={clearErrors} // Clear form and server errors on focus
                />
                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

            <Button type="submit" className="w-full">Login</Button>
          </div>
        </form>
        <div className='flex justify-center mt-2'>
          <p className="mt-2 text-center text-base text-white">
            Don&apos;t have an account?&nbsp;
            <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewLogin;
