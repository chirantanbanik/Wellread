import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { Button, Input, Logo } from './index';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        try {
            await appwriteService.updatePassword(userId, secret, data.password);
            toast.success('Password reset successful. Please log in with your new password.');
            navigate('/login');
        } catch (error) {
            toast.error('Failed to reset password. Please try again.');
            setError('password', { type: 'manual', message: 'Failed to reset password. Please try again.' });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Reset Your Password</h2>
                <form onSubmit={handleSubmit(onSubmit)} className='mt-8'>
                    <div className='space-y-5'>
                        <div className='space-y-2'>
                            <div className='text-left font-medium ml-1'>New Password: </div>
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your new password"
                                    {...register("password", {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters long',
                                        },
                                    })}
                                />
                                <span
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                        >Reset Password</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
