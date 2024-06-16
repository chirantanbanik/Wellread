import conf from "../conf/conf.js"
import { Account, Client, ID, Databases, Storage, Query } from "appwrite"
import authService from "./auth.js"

export class Service{
    client = new Client()
    databases
    bucket
    account

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            this.databases = new Databases(this.client)
            this.bucket = new Storage(this.client)
            this.account = new Account(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId,author}){
        try{
          
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
            )

        } catch(error){
            console.log("Apwrite service :: createPost :: error", error)
        }
    }

    async updatePost(slug, {title, content, featuredImage, status,author}){
          try{
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
            )

          } catch(error){
            console.log("Appwrite service :: updatePost :: error", error)

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

    async createProfile({ username, bio, profilepic, userID }) {
        try {
            // Check if a profile already exists for the user
            const profiles = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteUserId,
                [Query.equal('userID', userID)]
            );

            if (profiles.total > 0) {
                throw new Error("Profile already exists");
            }

            // Create a new profile
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserId,
                ID.unique(),
                {
                    username,
                    bio,
                    profilepic,
                    userID
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createProfile :: error", error);
            throw error;
        }
    }

    async getProfile(userId) {
        try {
            const profiles = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteUserId,
                [Query.equal('userID', userId)]
            );

            if (profiles.total > 0) {
                return profiles.documents[0];
            } else {
                return null; // Return null if no profile is found
            }
        } catch (error) {
            console.log("Appwrite service :: getProfile :: error", error);
            throw error;
        }
    }

    async updateUserProfile({ username, bio, profilePic }) {
        try {
            const currentUser = await authService.getCurrentUser();
            if (!currentUser) {
                throw new Error("User not logged in");
            }
            const userId = currentUser.$id;

            console.log(`Updating user profile for user ID: ${userId}`);

            // Fetch the profile document using user ID
            const profiles = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteUserId,
                [Query.equal('userID', userId)]
            );

            if (profiles.total === 0) {
                throw new Error("Profile not found");
            }

            const profileDocId = profiles.documents[0].$id;

            // Update the profile document in the Profiles collection
            await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserId,
                profileDocId,
                {
                    username,
                    bio,
                    profilepic: profilePic,
                }
            );

            // Update the name attribute in the Appwrite user account
            await this.account.updateName(username);  

            console.log("User profile updated successfully");

        } catch (error) {
            console.error("Failed to update user profile", error);
            throw error;
        }
    }
    async resetPasswordRequest(email) {
        try {
            const origin = window.location.origin;
            const resetPasswordUrl = `${origin}/reset-password`;
            
            return await this.account.createRecovery(
                email,
                resetPasswordUrl
            );
        } catch (error) {
            console.error("Appwrite service :: resetPasswordRequest :: error", error);
            throw error;
        }
    }
    

    async updatePassword(userId, secret, password) {
        try {
            return await this.account.updateRecovery(
                userId,
                secret,
                password,
                password
            );
        } catch (error) {
            console.error("Appwrite service :: updatePassword :: error", error);
            throw error;
        }
    }





}

const service = new Service()
export default service