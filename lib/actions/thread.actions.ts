"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
    text: string;
    image?: string;
    author: string;
    communityId: string | null;
    path: string;
}

export async function createThread({ text, image, author, communityId, path }: Params) {
    try {
        await connectToDB();

        const createdThread = await Thread.create({
            text, image, author, community: null
        });

        await User.findByIdAndUpdate(author, {
            $push: { threads: createdThread._id }
        });

        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Error creating thread: ${error}`);
    }
}

export const fetchPosts = async (pageNumber = 1, pageSize = 20) => {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
        .sort({ createdAt: "desc" })
        .skip(skipAmount)
        .limit(pageSize)
        .populate({ path: "author", model: User })
        .populate({
            path: "children",
            populate: {
                path: "author",
                model: User,
                select: "_id name parentId image"
            }
        });

    const totalPostsCount = await Thread.countDocuments({ parentId: { $in: [null, undefined] } });

    const posts = await postsQuery.exec();

    const isNext = totalPostsCount > skipAmount + posts.length;

    return JSON.parse(JSON.stringify({ posts, isNext }));
};

export async function fetchThreadById(id: string) {
    connectToDB();

    try {
        const thread = await Thread.findById(id)
            .populate({
                path: "author",
                model: User,
                select: "_id id name image"
            })
            .populate({
                path: "children",
                populate: [
                    {
                        path: "author",
                        model: User,
                        select: "_id id name parentId image"
                    },
                    {
                        path: "children",
                        model: Thread,
                        populate: {
                            path: "author",
                            model: User,
                            select: "_id id name parentId image"
                        }
                    }
                ]
            })
            .exec();

        return thread ? JSON.parse(JSON.stringify(thread)) : null;
    } catch (error: any) {
        throw new Error(`Error fetching thread: ${error.message}`);
    }
}

export async function addCommentToThread(
    threadId: string,
    commenttext: string,
    userId: string,
    path: string
) {
    connectToDB();

    try {
        const originalThread = await Thread.findById(threadId);
        if (!originalThread) throw new Error("thread not found");

        const commentThread = new Thread({
            text: commenttext,
            author: userId,
            parentId: threadId,
        });

        const saveCommentThread = await commentThread.save();

        originalThread.children.push(saveCommentThread._id);
        await originalThread.save();

        await User.findByIdAndUpdate(userId, {
            $push: { threads: saveCommentThread._id }
        });

        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Error adding a comment to thread: ${error.message}`);
    }
}

export async function deleteThread(id: string, path: string): Promise<void> {
    try {
        connectToDB();

        const mainThread = await Thread.findById(id);
        if (!mainThread) {
            throw new Error("Thread not found");
        }

        const fetchAllChildThreads = async (threadId: string): Promise<any[]> => {
            const childThreads = await Thread.find({ parentId: threadId });
            const descendantThreads = [];
            for (const childThread of childThreads) {
                const descendants = await fetchAllChildThreads(childThread._id.toString());
                descendantThreads.push(...descendants);
            }
            return [threadId, ...descendantThreads];
        };

        const descendantThreadIds = await fetchAllChildThreads(id);

        await Thread.deleteMany({ _id: { $in: descendantThreadIds } });

        await User.updateOne(
            { _id: mainThread.author },
            { $pull: { threads: id } }
        );

        if (mainThread.parentId) {
            await Thread.updateOne(
                { _id: mainThread.parentId },
                { $pull: { children: id } }
            );
        }

        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Failed to delete thread: ${error.message}`);
    }
}

export async function likeThread(threadId: string, userId: string, path: string) {
    try {
        connectToDB();

        const user = await User.findOne({ id: userId });

        const thread = await Thread.findById(threadId);
        if (!thread) throw new Error("Thread not found");

        if (!thread.likes) {
            thread.likes = [];
        }

        const idsToMatch = [userId];
        if (user?._id) {
            idsToMatch.push(user._id.toString());
        }

        const hasLiked = thread.likes.some((id: any) => idsToMatch.includes(id.toString()));

        if (hasLiked) {
            thread.likes = thread.likes.filter((id: any) => !idsToMatch.includes(id.toString()));
        } else {
            thread.likes.push(userId);
        }

        await thread.save();
        revalidatePath(path);
        return JSON.parse(JSON.stringify({ success: true, likes: thread.likes }));
    } catch (error: any) {
        throw new Error(`Failed to toggle like: ${error.message}`);
    }
}

export async function fetchUserLikedThreads(userId: string) {
    try {
        connectToDB();

        const user = await User.findOne({ id: userId });
        
        const idsToMatch: any[] = [userId];
        if (user?._id) {
            idsToMatch.push(user._id);
            idsToMatch.push(user._id.toString());
        }

        const likedThreads = await Thread.find({ likes: { $in: idsToMatch } })
            .populate({ path: "author", model: User })
            .populate({
                path: "children",
                populate: {
                    path: "author",
                    model: User,
                    select: "_id name parentId image"
                }
            });

        return JSON.parse(JSON.stringify(likedThreads));
    } catch (error: any) {
        throw new Error(`Failed to fetch user liked threads: ${error.message}`);
    }
}