import React from 'react';
import { useForm } from 'react-hook-form';
import appwriteService from '../appwrite/config';
import { Button, Input, Logo } from '../components';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await appwriteService.resetPasswordRequest(data.email);
            toast.success('Password reset link sent to your email.');
        } catch (error) {
            toast.error('Failed to send reset link. Please try again.');
            setError('email', { type: 'manual', message: 'Failed to send reset link. Please try again.' });
        }
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
                            <div className='text-left font-medium ml-1'>Email: </div>
                            <Input
                                placeholder="Enter your Email"
                                type="email"
                                {...register("email", {
                                    required: 'Email is required',
                                    validate: {
                                        matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                    }
                                })}
                            />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                        >Send Reset Link</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
