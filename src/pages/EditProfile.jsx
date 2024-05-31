import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import appwriteService from '../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { Button, Input, RTE } from '../components';

export default function EditProfile() {
    const { register, handleSubmit, setValue, control } = useForm();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const onSubmit = async (data) => {
        try {
            const file = data.profilePic[0]; // Get the file object
            const fileDetails = await appwriteService.uploadFile(file); // Upload the file
            const profilePic = fileDetails.$id; // Get the file ID from the response

            await appwriteService.updateUserProfile({
                username: data.username,
                bio: data.bio,
                profilePic: profilePic // Pass the file ID to updateUserProfile
            });
            if(userData){
            navigate(`/profile/${userData.$id}`);}
        } catch (error) {
            console.error('Failed to update profile', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full py-8">
            <div className="container mx-auto">
                <Input
                    label="Username"
                    placeholder="Username"
                    className="mb-4"
                    {...register('username', { required: true })}
                />
                <Input
                    label="Bio"
                    placeholder="Bio"
                    className="mb-4"
                    {...register('bio', { required: true })}
                />
                <Input
                    label="Profile Picture"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register('profilePic')}
                />
                <Button type="submit">Save</Button>
            </div>
        </form>
    );
}
