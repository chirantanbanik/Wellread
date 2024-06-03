import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import service from '../conf/service';

function PostCard({ $id, title, featuredImage }) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userChoice, setUserChoice] = useState(null);

  useEffect(() => {
    const fetchLikesDislikes = async () => {
      const post = await service.getPost($id);
      if (post) {
        setLikes(post.likes);
        setDislikes(post.dislikes);
      }
    };
    fetchLikesDislikes();
  }, [$id]);

  const handleLike = async (e) => {
    e.preventDefault();
    if (userChoice === null) {
      const newLikes = likes + 1;
      setLikes(newLikes);
      setUserChoice('like');
      await service.updateLikes($id, newLikes);
    } else if (userChoice === 'dislike') {
      const newLikes = likes + 1;
      const newDislikes = dislikes - 1;
      setLikes(newLikes);
      setDislikes(newDislikes);
      setUserChoice('like');
      await service.updateLikes($id, newLikes);
      await service.updateDislikes($id, newDislikes);
    }
  };

  const handleDislike = async (e) => {
    e.preventDefault();
    if (userChoice === null) {
      const newDislikes = dislikes + 1;
      setDislikes(newDislikes);
      setUserChoice('dislike');
      await service.updateDislikes($id, newDislikes);
    } else if (userChoice === 'like') {
      const newLikes = likes - 1;
      const newDislikes = dislikes + 1;
      setLikes(newLikes);
      setDislikes(newDislikes);
      setUserChoice('dislike');
      await service.updateLikes($id, newLikes);
      await service.updateDislikes($id, newDislikes);
    }
  };

  return (
    <Link to={`/post/${$id}`} className="block hover:shadow-lg transition-shadow duration-300">
      <div className='w-full bg-white rounded-xl p-4 shadow-md'>
        <div className='w-full justify-center mb-4'>
          <img
            src={featuredImage}
            alt={title}
            className='rounded-xl w-full h-48 object-cover'
          />
        </div>
        <h2 className='text-xl font-bold mb-2'>{title}</h2>
        <div className='flex items-center mt-4 space-x-4 justify-center'>
          <button
            onClick={handleLike}
            className={`flex items-center p-2 rounded-lg transition-colors duration-300 ${userChoice === 'like' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            disabled={userChoice === 'like'}
          >
            <FaThumbsUp className='mr-1' /> Like ({likes})
          </button>
          <button
            onClick={handleDislike}
            className={`flex items-center p-2 rounded-lg transition-colors duration-300 ${userChoice === 'dislike' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            disabled={userChoice === 'dislike'}
          >
            <FaThumbsDown className='mr-1' /> Dislike ({dislikes})
          </button>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
