import React, { useEffect, useState } from 'react';
import { PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts () {
  const [posts, setPosts] = useState([]);
 

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
       
      }
    });
  }, []);
console.log("Posts", posts);
  
  return (
    <div className="w-full py-8">
      <div className="flex flex-wrap">
        {posts.map((post) => {
       <div key={post.$id} className="p-2 w-1/3 text-gray-900">
        <PostCard {...post} />
       </div>;
     
     
      })}
     </div>
      </div>
  ); 
};    
     

export default AllPosts;
