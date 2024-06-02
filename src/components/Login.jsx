import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import {login as authLogin} from "../store/authSlice"
import {Button, Input, Logo} from "./index"
import { useDispatch } from 'react-redux'
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"
import toast from "react-hot-toast";
function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        try{
            const session = await authService.login(data)
            if(session){
                const userData = await authService.
                getCurrentUser()
                if(userData) dispatch(authLogin(userData))
                navigate("/")
            }
        } catch(error){
            toast.error(error.message);
            setError(error.message);
        }
    }


  return (
    <div
    className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 
      rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                </span>
           </div>
           <h2 className="text-center text-2xl font-bold leading-tight">Login to your account</h2>
            <form onSubmit={handleSubmit(login)}
            className='mt-8'>
                <div className='space-y-5'>
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
                    <Input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                </div>
                <Button
                type="submit"
                className="w-full"
                >Login</Button>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
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
  )
}

export default Login
