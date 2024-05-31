import React, {useState, useEffect} from 'react'
import appwriteService from "../appwrite/config" 
import {Container, PostCard} from "../components"
 import { useSelector } from 'react-redux'
function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])
    appwriteService.getPosts([]).then((posts) => {
      if(posts){
        setPosts(posts.documents)
      }
    })
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
    
  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'>
              <PostCard {...post}/>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts
