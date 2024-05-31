import conf from "../conf/conf.js"
import appwriteService from "./config.js"
import { Client, Account, ID} from "appwrite"

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
               

               return  this.login({email, password});
               
            } else {
               return userAccount;
            }
        } catch (error) {
                throw new Error("Password must be longer than 8 characters.");
        
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw new Error("Incorrect credentials. Please try again.");
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error ", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
      }
    }
    
}
    

const authService = new AuthService();

export default authService