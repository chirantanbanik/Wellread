
import React, { useState, useEffect } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm)
  );

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex justify-center mb-4'>
          <input
            type="text"
            placeholder="Search posts"
            value={searchTerm}
            onChange={handleSearch}
            className="input input-bordered input-success w-96"
          />
        </div>
        <div className='flex flex-wrap'>
          {filteredPosts.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;