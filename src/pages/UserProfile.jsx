import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import appwriteService from '../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components';
import authService from '../appwrite/auth';

export default function UserProfile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const userData = useSelector((state) => state.auth.userData);
    const { userId } = useParams();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userProfile = await appwriteService.getProfile(userId);
                setProfile(userProfile);
            } catch (error) {
                console.error('Failed to fetch user profile', error);
            }
        };

        if (userId) {
            fetchUserProfile();
        }
    }, [userId]);

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    return (
        <div className="w-full py-8">
            <div className="container mx-auto">
                {profile ? (
                    <div className="profile">
                        <div className="profile-pic mb-4 flex items-center justify-center">
                            {profile.profilepic ? (
                                <img
                                    src={appwriteService.getFilePreview(profile.profilepic)}
                                    alt={profile.username}
                                    className="rounded-full w-32 h-32 object-cover"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-gray-500">
                                    {profile.username.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">{profile.username}</h2>
                        <p className="text-gray-700 mb-4">{profile.bio}</p>
                        {userData && userData.$id === userId && ( // Render the button conditionally
                            <Button onClick={handleEditProfile}>Edit Profile</Button>
                        )}
                    </div>
                ) : (
                    <p>Loading profile...</p>
                )}
            </div>
        </div>
    );
}
