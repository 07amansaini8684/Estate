import {Account, Avatars, Client, Databases, OAuthProvider, Query} from "react-native-appwrite";
import * as Linking from 'expo-linking';
import {openAuthSessionAsync} from "expo-web-browser";
import {EXPO_PUBLIC_APPWRITE_PROJECT_ID,EXPO_PUBLIC_APPWRITE_ENDPOINT, EXPO_PUBLIC_APPWRITE_DATABASE_ID , EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID, EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID, EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID, EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID} from "@env";

// config ..
export const config = {
    platform : 'com.blue.estate',
    endpoint: EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId : EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    agentsCollectionId: EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
    galleriesCollectionId: EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
    reviewsCollectionId: EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    propertiesCollectionId: EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID

}


// creating client
export const client  = new Client();

// setting up the client
client.setEndpoint(config.endpoint!)
      .setProject(config.projectId!)
      .setPlatform(config.platform!)

// creating servieces
export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

// login function
export async function login(){
    try{
        const redirectURI= Linking.createURL('/');
        const response = await account.createOAuth2Token(OAuthProvider.Google, redirectURI);
        // console.log("Google_Auth-response", response)
        if(!response){
            throw new Error("Failed to login || No response")
        }
        const browserResult = await openAuthSessionAsync(response.toString(), redirectURI);
        if(browserResult.type !== 'success'){
    throw new Error("Failed to logl̥in || Browser not opened")
}
        const url = new URL(browserResult.url);
        const secret = url.searchParams.get('secret')?.toString();
        const userId = url.searchParams.get('userId')?.toString();

        if(!secret || !userId){
            throw new Error("Failed to login || No secret or userId")
        }

        const session = await account.createSession(userId, secret);
        console.log("Session", session)
        if(!session){
            throw new Error("Failed to login || No session")
        }
        return true;
    }catch (error){
        console.error("Failed to login", error)
        return false;
    }
}

// logout function
export async function logout() {
    try {
        // Check if there's an active session
        const activeSession = await account.getSession('current');
        if (activeSession) {
            console.log("Active session found:", activeSession);
            // Attempt to delete the session
            await account.deleteSession('current');
            console.log("Logged out successfully");
            return true;
        } else {
            console.log("No active session to log out from");
            return false; // No active session to log out from
        }
    } catch (error) {
        // Log the detailed error message if it fails
        console.error("Failed to logout:", error || error);
        return false; // Failed to log out
    }
}

// get user function
export async function getUser(){
    try {
        const response = await account.get();
        if(response.$id){
            const userAvatar = await avatar.getInitials(response.name);
            return {...response, avatar: userAvatar.toString()}
        }
        return null;
    }catch (error){
        console.error("failed to get user", error)
        return null;
    }
}


export async function getLatestProperties(){
    try{
        const result = await databases.listDocuments(
            config.databaseId,
            config.propertiesCollectionId,
            [Query.orderAsc('$createdAt'), Query.limit(5)]
        );
       if(!result.documents){
           throw new Error("Failed to get properties")
       }
         return result.documents;
    }catch(error){
        console.error("Failed to get latest properties", error)
        return null;
    }
}

export const getProperties = async ({filter, query, limit} : {filter: string, query: string, limit?: number}) => {
    try{
        const buildQuery = [Query.orderDesc('$createdAt')];

        if(filter && filter !== 'All'){
            buildQuery.push(Query.equal('type', filter))
        }
        if(query){
            buildQuery.push(Query.or([
                Query.search('name', query),
                Query.search('address', query),
                Query.search('type', query)
            ]))
        }

        if(limit){
            buildQuery.push(Query.limit(limit))
        }
        const result = await databases.listDocuments(
            config.databaseId,
            config.propertiesCollectionId,
            buildQuery

        );
        if(!result.documents){
            throw new Error("Failed to get properties")
        }
        return result.documents;
        

    }
    catch (error){
        console.error("Failed to get properties", error)
        return null;
    }
}

