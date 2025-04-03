import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, image }) {
 

 console.log("image", appwriteService.getFilePreview(image));
  

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 h-80 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
        
            <img
              src={appwriteService.getFilePreview(image)}
              alt={title}
              className="rounded-xl h-36"
            />
          
           
      
      </div>

      <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
