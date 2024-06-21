import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from 'react-redux';
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit,formState: { errors } } = useForm();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            dispatch(authLogin(userData));
            navigate("/");
        }
    }, [dispatch, navigate]);
    const invalid = (data) => {
        console.log("Form Errors:", errors);
        if (errors.email) {
          toast.error(errors.email.message);
        }
        else if (errors.password) {
            toast.error(errors.password.message);
          }
      };
    const login = (data) => {
        console.log()
        console.log(data)
       if(data){

       }else{
        authService.login(data)
            .then(session => {
                if (session) {
                    return authService.getCurrentUser();
                }
            })
            .then(userData => {
                if (userData) {
                    dispatch(authLogin(userData));
                    if (rememberMe) {
                        localStorage.setItem('user', JSON.stringify(userData));
                    } else {
                        localStorage.removeItem('user');
                    }
                    navigate("/");
                }
            })
            .catch(error => {
                toast.error(error.message);
                setError(error.message);
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onClose = () => {
        navigate("/");
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    return (
        <div className='flex items-center justify-center w-full min-h-screen p-4'>
            <div className='relative w-full max-w-lg bg-gray-100 rounded-xl p-6 sm:p-10 border border-black/10'>
                <button onClick={onClose} className="absolute top-4 right-4">
                    <AiOutlineCloseCircle className="text-2xl" />
                </button>
                <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Login to your account</h2>
                <form onSubmit={handleSubmit(login,invalid)} className='mt-8'>
                    <div className='space-y-5'>
                        <div className='space-y-2'>
                            <div className='text-left font-medium ml-1'>Email: </div>
                            <Input
                                placeholder="Enter your Email"
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    
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
                                         required: "password is required",
                                         matchPattern: (value) => /^.{1,}$/.test(value) ||
                                         "Email address must be a valid address",
                                      
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
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    className="mr-2"
                                    checked={rememberMe}
                                    onChange={handleRememberMeChange}
                                />
                                <label htmlFor="rememberMe" className='text-left font-medium ml-1'>Remember Me</label>
                            </div>
                        </div>
                        <div className="text-center">
                            <Link
                                to="/forgot-password"
                                className="font-medium text-primary transition-all duration-200 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        <Button type="submit" className="w-full">Login</Button>
                        <p className="mt-2 text-center text-base text-black/60">
                            Don&apos;t have an account?&nbsp;
                            <Link
                                to="/signup"
                                className="font-medium text-primary transition-all duration-200 hover:underline"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
