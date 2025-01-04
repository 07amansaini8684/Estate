import {Account, Avatars, Client, OAuthProvider} from "react-native-appwrite";
import * as Linking from 'expo-linking';
import {openAuthSessionAsync} from "expo-web-browser";
import {EXPO_PUBLIC_APPWRITE_PROJECT_ID,EXPO_PUBLIC_APPWRITE_ENDPOINT} from "@env";

export const config = {
    platform : 'com.blue.estate',
    endpoint: EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId : EXPO_PUBLIC_APPWRITE_PROJECT_ID,

}

export const client  = new Client();

client.setEndpoint(config.endpoint!)
      .setProject(config.projectId!)
      .setPlatform(config.platform!)

export const avatar = new Avatars(client);
export const account = new Account(client);

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

export async function logout(){
    try{
        await account.deleteSession('current');
        return true;
    }catch (error){
        console.error("Failed to logout", error)
        return false;
    }
}

export async function getUser(){
    try {
        const response = await account.get();
        if(response.$id){
            const userAvatar = await avatar.getInitials(response.name );
            return {...response, avatar: userAvatar.toString()}
        }
        return null;
    }catch (error){
        console.error("failed to get user", error)
        return null;
    }
}