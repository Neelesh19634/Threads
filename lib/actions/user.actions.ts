"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import Thread from "../models/thread.model";
import { connectToDB } from "../mongoose";
import { SortOrder } from "mongoose";

interface Params {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
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
            { id: userId },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },
            { upsert: true },
        );
        if (path === "/profile/edit") {
            revalidatePath(path);
        }
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);
    }
}

export async function fetchUser(userId: string) {
    try {
        connectToDB();
        const user = await User.findOne({ id: userId });
        return user ? JSON.parse(JSON.stringify(user)) : null;
    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}

export async function fetchUserPosts(userId: string) {
    try {
        connectToDB();

        const threads = await User.findOne({ id: userId })
        .populate({
            path: 'threads',
            model: Thread,
            populate: {
                path: 'children',
                model: Thread,
                populate: {
                    path: 'author',
                    model: User,
                    select: "name image id"
                }
            }
        });

        return threads ? JSON.parse(JSON.stringify(threads)) : null;
    } catch (error: any) {
        throw new Error(`Error fetching the Threads by the User: ${error.message}`);
    }
}

export async function fetchUsers({
    userId,
    searchString = "",
    pageNumber = 1,
    pageSize = 20,
    sortBy = "desc"
}: {
    userId: string;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder;
}) {
    try {
        connectToDB();

        const skipAmount = (pageNumber - 1) * pageSize;
        const regex = new RegExp(searchString, "i");

        const query: any = {
            id: { $ne: userId }
        };

        if (searchString.trim() !== "") {
            query.$or = [
                { username: { $regex: regex } },
                { name: { $regex: regex } }
            ];
        }

        const sortOptions = { createdAt: sortBy };

        const usersQuery = User.find(query)
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize);

        const totalUsersCount = await User.countDocuments(query);
        const users = await usersQuery.exec();

        const isNext = totalUsersCount > skipAmount + users.length;

        return JSON.parse(JSON.stringify({ users, isNext }));
    } catch (error: any) {
        throw new Error(`Failed to fetch users: ${error.message}`);
    }
}

export async function getActivity(userId: string) {
    try {
        connectToDB();

        const user = await User.findOne({ id: userId });
        if (!user) return [];

        // Find all threads created by the user
        const userThreads = await Thread.find({ author: user._id });

        // Collect all reply thread IDs (children) from user's threads
        const childThreadIds = userThreads.reduce((acc: any, userThread: any) => {
            return acc.concat(userThread.children);
        }, []);

        // Find all replies excluding ones created by the user
        const replies = await Thread.find({
            _id: { $in: childThreadIds },
            author: { $ne: user._id }
        }).populate({
            path: "author",
            model: User,
            select: "name image _id id"
        });

        return JSON.parse(JSON.stringify(replies));
    } catch (error: any) {
        throw new Error(`Failed to fetch activity: ${error.message}`);
    }
}

export async function getActivityCount(userId: string) {
    try {
        connectToDB();
        const user = await User.findOne({ id: userId });
        if (!user) return 0;

        const userThreads = await Thread.find({ author: user._id });
        const childThreadIds = userThreads.reduce((acc: any, userThread: any) => {
            return acc.concat(userThread.children);
        }, []);

        const count = await Thread.countDocuments({
            _id: { $in: childThreadIds },
            author: { $ne: user._id }
        });

        return count;
    } catch (error: any) {
        return 0;
    }
}

export async function fetchUserReplies(userId: string) {
    try {
        connectToDB();

        const user = await User.findOne({ id: userId });
        if (!user) return [];

        const replies = await Thread.find({
            author: user._id,
            parentId: { $exists: true, $ne: null }
        })
        .populate({
            path: "author",
            model: User,
            select: "name image id"
        })
        .populate({
            path: "children",
            model: Thread,
            populate: {
                path: "author",
                model: User,
                select: "name image id"
            }
        });

        return JSON.parse(JSON.stringify(replies));
    } catch (error: any) {
        throw new Error(`Failed to fetch user replies: ${error.message}`);
    }
}