import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config"
import {Container, PostCard} from "../components"
import { useSelector } from 'react-redux'

function Home() {

    const [posts, setPosts] = useState([])

    const userData = useSelector((state) => state.auth.userData);
    const [profileChecked, setProfileChecked] = useState(false);
 
   
    
    useEffect(() => {
        const checkAndCreateProfile = async () => {
            if (userData && !profileChecked) {
                try {
                    const profile = await appwriteService.getProfile(userData.$id);
                    if (!profile) {
                        // If profile doesn't exist, create one
                        await appwriteService.createProfile({
                            username: userData.name,
                            bio: 'Welcome to my profile',
                            profilepic: '',
                            userID: userData.$id
                        });
                    }
                    setProfileChecked(true);
                } catch (error) {
                    if (error.message === "Profile not found") {
                        await appwriteService.createProfile({
                            username: userData.name,
                            bio: 'Welcome to my profile',
                            profilepic: '',
                            userID: userData.$id
                        });
                    } else {
                        console.error('Failed to fetch or create profile', error);
                    }
                    setProfileChecked(true); // Ensure this runs only once
                }
            }
        };

        checkAndCreateProfile();
    }, [userData, profileChecked]);
    
    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        })
    }, [])
    if(posts.length === 0){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-blue-500">
                                
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
        )
    }

export default Home
