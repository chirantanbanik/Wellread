import React, {useState} from 'react'
import authService from "../appwrite/auth"
import {Link, useNavigate} from "react-router-dom"
import {login} from "../store/authSlice"
import {Button, Input, Logo} from "./index.js"
import { useDispatch } from 'react-redux'
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        try {
           const userData = await authService.createAccount(data)
           if(userData){
            const userData = await authService.getCurrentUser()
            if(userData) dispatch(login(userData))
            navigate("/")
           }

        } catch(error){
            toast.error('Password must have a minimum of 8 characters.', {

                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start'
                },
                iconTheme: {
                    primary: 'red', // Set the color of the icon if it's a SVG
                    secondary: 'white', // Background color of the icon, useful if you use SVGs
                    marginleft:"5px"
                },
            });
            setError(error.message)
        }
    }

    return (
        <div 
        className="flex items-center justify-center w-full">
                <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                    <form onSubmit={handleSubmit(create)}>
                        <div className='space-y-5'>
                            <Input
                            label="Full Name: "
                            placeholder="Enter your Full Name"
                            {...register("name", {
                                required: true
                            })}
                            />
                            <Input
                        label="Email: "
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
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <Button
                        type="submit"
                        className="w-full"
                        >Create Account</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    
    export default Signup