import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';

function PostCard({ $id, title, featuredImage, author, userId }) {
    const [profilePicUrl, setProfilePicUrl] = useState('');

    useEffect(() => {
        const fetchProfilePicUrl = async () => {
            try {
                const profile = await appwriteService.getProfile(userId);
                if (profile && profile.profilepic) {
                    const profilePicUrl = appwriteService.getFilePreview(profile.profilepic);
                    setProfilePicUrl(profilePicUrl);
                }
            } catch (error) {
                console.error('Failed to fetch profile picture URL', error);
            }
        };

        fetchProfilePicUrl();
    }, [userId]);

    return (
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <div className='flex items-center mb-2'>
                    <Link to={`/profile/${userId}`}>

                           <Avatar
                             src={profilePicUrl}
                             alt={author}
                              sx={{ width: 46, height: 46 }}
                            />
                    </Link>
                    <p style={{ fontWeight: 'bold', color: 'grey' }}>{author}</p>
                </div>
                <Link to={`/post/${$id}`}>
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className='rounded-xl'
                    />
                </Link>
            </div>
            <Link to={`/post/${$id}`}>
                <h2 className='text-xl font-bold'>{title}</h2>
            </Link>
        </div>
    );
}

export default PostCard;
