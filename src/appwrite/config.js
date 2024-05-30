import conf from "../conf/conf.js"
import { Client, ID, Databases, Storage, Query } from "appwrite"

export class Service{
    client = new Client()
    databases
    bucket

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            this.databases = new Databases(this.client)
            this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId, author }) {
        try {
            // Check if a post with the same title already exists
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    // This is assuming the field name in your database is "title"
                    Query.equal('title', title),
                ]
            );
    
            if (response.total > 0) {
                // If a post with the same title exists, throw an error
                throw new Error("A post with this title already exists. Please choose a different title.");
            }
    
            // Create the post if the title is unique
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    author
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            throw error;
        }
    }
    

    async updatePost(slug, { title, content, featuredImage, status, author }) {
        try {
            // Check if a post with the same title already exists
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal('title', title),
                    Query.notEqual('$id', slug), // Exclude the current post from the search
                ]
            );
    
            if (response.total > 0) {
                // If a post with the same title exists (excluding the current post), throw an error
                throw new Error("A post with this title already exists. Please choose a different title.");
            }
    
            // Update the post if the title is unique
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    author
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            throw error;
        }
    }
    

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true

        } catch(error){
            console.log("Appwrite service :: deletePost :: error", error)
            return false
        }
    }

     async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

        } catch(error){
            console.log("Appwrite service :: getPost :: error", error)
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,

            )

        } catch(error){
            console.log("Appwrite service :: getPosts :: error", error)
            return false
        }
    }

    // file uplode servive
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )

        } catch(error){
            console.log("Appwrite service :: uploadFile :: error", error)
            return false
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true

        } catch(error){
            console.log("Appwrite service :: deleteFile :: error", error)
            return false
        }
        
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service()
export default service