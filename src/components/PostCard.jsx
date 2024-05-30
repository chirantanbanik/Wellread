import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from "react-router-dom"

function PostCard({$id, title, featuredImage,author}) {
  return (
     
        <div className='w-full bg-gray-100 rounded-xl p-4'>
             <div className='w-full justify-center mb-4'>
             <p style={{ fontWeight: 'bold', color: 'grey' }}>{author}</p>
             <br></br>
              <Link to={`/post/${$id}`}>
                <img src={appwriteService.getFilePreview(featuredImage)} 
                alt={title}
                className='rounded-xl' 
                />
              </Link>
             </div>
             <Link to={`/post/${$id}`}>
             <h2
             className='text-xl font-bold'
             >{title}</h2>
             </Link>
             
        </div>
      
 
  )
}

export default PostCard
