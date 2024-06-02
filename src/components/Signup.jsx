import React, { useState } from 'react';
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const checkEmail = async (email) => {
        try {
            const response = await fetch(`https://disposable.debounce.io/?email=${email}`);
            const data = await response.json();
            return data.disposable === "false";
        } catch (error) {
            console.error('Error:', error);
            toast.error("An error occurred while checking the email.");
            return false;
        }
    };

    const create = async (data) => {
        setLoading(true);
        const isEmailValid = await checkEmail(data.email);
        if (!isEmailValid) {
            toast.error('Disposable email addresses are not allowed.');
            setLoading(false);
            return;
        }

        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) dispatch(login(currentUser));
                navigate("/");
            }
        } catch (error) {
            toast.error('Password must have a minimum of 8 characters.', {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start'
                },
                iconTheme: {
                    primary: 'red',
                    secondary: 'white',
                    marginleft: "5px"
                },
            });
            setError(error.message);
        }
        setLoading(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-5'>
                        <div className='space-y-2'>
                        <div className='text-left font-medium ml-1'>Full Name: </div>
                        <Input
                            placeholder="Enter your Full Name"
                            {...register("name", {
                                required: true
                            })}
                        />
                        </div>
                        <div className='space-y-2'>
                        <div className='text-left font-medium ml-1'>Email: </div>
                        <Input
                            placeholder="Enter your Email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        </div>
                        <div className='space-y-2'>
                        <div className='text-left font-medium ml-1'>Password: </div>
                        <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      {...register("password", {
                        required: true,
                      })}
                      
                    />
                    <span
                     onClick={togglePasswordVisibility}
                     className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                    </div>
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                        <p className="mt-2 text-center text-base text-black/60">
                             Already have an account?&nbsp;
                          <Link
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                           > Login </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
