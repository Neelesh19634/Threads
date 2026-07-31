"use server";

import { FilterQuery, SortOrder } from "mongoose";
import Community from "../models/community.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

export async function fetchCommunities({
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;
    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof Community> = {};

    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    const sortOptions = { createdAt: sortBy };

    const communitiesQuery = Community.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)
      .populate("members");

    const totalCommunitiesCount = await Community.countDocuments(query);
    const communities = await communitiesQuery.exec();

    const isNext = totalCommunitiesCount > skipAmount + communities.length;

    return JSON.parse(JSON.stringify({ communities, isNext }));
  } catch (error: any) {
    throw new Error(`Failed to fetch communities: ${error.message}`);
  }
}
