import conf from "../conf/conf"
import { Client, Account, ID } from "appwrite"

export class AuthService {
    client = new Client()
    account = new Account()

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)       
    }

    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
               // call another method
               return this.login({email, password})
            } else {
                return userAccount 
            }
        } catch (error){
            throw error
        }
    }

    async login({email, password}){
        try{
            return await this.account.createEmailSession(email, password)
        } catch(error){
            throw error
        }
    }

    async getCurrentUser(){
        try{
           return await this.account.get()
        } catch(error){
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null
    }

    async logout(){
        try{
            await this.account.deleteSessions("current")
        } catch (error){
            console.log("Appwrite service :: logout :: error", error)
        }

    }
}


const authService = new AuthService()

export default authService

