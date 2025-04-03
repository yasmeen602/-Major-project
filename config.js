import config from "../config";
import { Client, Databases, Storage, Query, ID } from "appwrite";

const client = new Client();
client.setEndpoint(config.appwriteUrl).setProject("67c189cc00266ef3d731");
const databases = new Databases(client);
const bucket = new Storage(client);




  async function createPost({ title, slug, content, image, status, userId }) {
    if (!title || !slug || !content || !userId) {
      throw new Error("Missing required fields for creating a post.");
    }
  
    try {
      return await retryRequest(() => databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          image,
          status,
          userId,
        }
      ));
    } catch (error) {
      console.error("Appwrite service -> createPost -> error", error);
      throw error; // Re-throw for further handling
    }
  }
  

async function updatePost(slug, { title, content, image, status }) {
    try {
        return await databases.updateDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
                title,
                content,
                image,
                status,
            }
        );
    } catch (error) {
        console.log("Appwrite service -> updatePost -> error", error);
    }
}

async function deletePost(slug) {
    try {
        await databases.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        );
        return true;
    } catch (error) {
        console.log("Appwrite service -> deletePost -> error", error);
    }
}



async function retryRequest(requestFunction, maxAttempts = 3) {
  let attempts = 0;
  while (attempts < maxAttempts) {
    try {
      return await requestFunction();
    } catch (error) {
      if (error.code === 429) { // Rate limit exceeded
        await new Promise(resolve => setTimeout(resolve, 500 * (attempts + 1)));
        attempts++;
      } else {
        throw error;
      }
    }
  }
  throw new Error('Maximum attempts exceeded');
}

async function getPost(slug) {
   // ... other checks ...

   try {
    return await databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
    );
} catch (error) {
    console.error("Appwrite service -> getPost -> error", error);
    return false;
}
}




async function getPosts(query = [Query.equal("status", "active")]) {
    try {
        return await databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            query
        )
       
    } catch (error) {
        console.log("Appwrite service -> getPosts -> error", error);
       
    }
}




async function uploadFile(file) {
    try {
        return await bucket.createFile(
            config.appwriteBucketId,
            ID.unique(),
            file
        );
    } catch (error) {
        console.log("Appwrite service -> uploadFile -> error", error);
    }
}

async function deleteFile(fileId) {
    try {
        await bucket.deleteFile(config.appwriteBucketId, fileId);
        return true;
    } catch (error) {
        console.log("Appwrite service -> deleteFile -> error", error);
        return false;
    }
}

async function getFilePreview(fileId) {
  return bucket.getFilePreview(config.appwriteBucketId, fileId);
    
    
}

export default {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getPosts,
    uploadFile,
    deleteFile,
    getFilePreview,
};