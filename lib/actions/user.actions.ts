"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import Thread from "../models/thread.model";
import { connectToDB } from "../mongoose"
import { SortOrder } from "mongoose";

interface Params {
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string
}

export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
    path
}: Params): Promise<void> {
    connectToDB();
    
    try {
        await User.findOneAndUpdate(
            {id: userId},
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },
            { upsert: true},
        );
        if(path === '/profile/edit'){
            revalidatePath(path);
        }
        
    } catch (error:any) {
        throw new Error(`Failed to create/update user: ${error.message}`);
    }
}

export async function fetchUser(userId:string){
    try {
        connectToDB();

        return await User.findOne({id: userId})

    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`)
    }
}

export async function fetchUserPosts(userId:string) {
    try {
        connectToDB();

        // find all the threads authored by the user by the given userId

        // TODO : populate community
        const threads = await User.findOne({id: userId})
        .populate({
            path: 'threads',
            model: Thread,
            populate:{
                path: 'children',
                model: Thread,
                populate:{
                    path: 'author',
                    model: User,
                    select: "name image id"
                }
            }

        })

        return threads
    } catch (error: any) {
        throw new Error(`Error fetching the Threads by the User: ${error.message}`)
    }
}

export async function fetchUsers({
    userId,
    searchString = "",
    pageNumber =1,
    pageSize = 20,
    sortBy = "desc"
}: {
    userId : String;
    searchString?: string;
    pageNumber: number;
    pageSize: number;
    sortBy: SortOrder;
}) {
    
    try {
        connectToDB();
        
        const skipAmount = (pageNumber-1)* pageSize;
        const regex = new RegExp(searchString, "i");

        const query = {
            
        }
        
    } catch (error) {
        
    }
    
}