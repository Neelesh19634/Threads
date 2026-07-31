import { fetchUserPosts, fetchUserReplies } from "@/lib/actions/user.actions";
import { fetchUserLikedThreads } from "@/lib/actions/thread.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
  tabType?: string;
}

const ThreadsTab = async ({
  currentUserId,
  accountId,
  accountType,
  tabType = "threads",
}: Props) => {
  if (tabType === "replies") {
    const replies = await fetchUserReplies(accountId);

    return (
      <section className='mt-9 flex flex-col gap-10'>
        {replies.length === 0 ? (
          <p className='no-result'>No replies found</p>
        ) : (
          replies.map((reply: any) => (
            <ThreadCard
              key={reply._id}
              id={reply._id}
              currentUser={currentUserId}
              parentId={reply.parentId}
              content={reply.text}
              author={reply.author}
              community={reply.community}
              createdAt={reply.createdAt}
              comments={reply.children}
              likes={reply.likes}
              isComment
            />
          ))
        )}
      </section>
    );
  }

  if (tabType === "tagged") {
    const likedThreads = await fetchUserLikedThreads(accountId);

    return (
      <section className='mt-9 flex flex-col gap-10'>
        {likedThreads.length === 0 ? (
          <p className='no-result'>No liked or tagged threads</p>
        ) : (
          likedThreads.map((thread: any) => (
            <ThreadCard
              key={thread._id}
              id={thread._id}
              currentUser={currentUserId}
              parentId={thread.parentId}
              content={thread.text}
              author={thread.author}
              community={thread.community}
              createdAt={thread.createdAt}
              comments={thread.children}
              likes={thread.likes}
            />
          ))
        )}
      </section>
    );
  }

  // Default: "threads" tab
  let result = await fetchUserPosts(accountId);
  if (!result) redirect("/");

  // Filter top-level threads created by user
  const topLevelThreads = (result.threads || []).filter(
    (t: any) => !t.parentId
  );

  return (
    <section className='mt-9 flex flex-col gap-10'>
      {topLevelThreads.length === 0 ? (
        <p className='no-result'>No threads posted yet</p>
      ) : (
        topLevelThreads.map((thread: any) => (
          <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUser={currentUserId}
            parentId={thread.parentId}
            content={thread.text}
            author={
              accountType === "User"
                ? { name: result.name, image: result.image, id: result.id }
                : {
                    name: thread.author.name,
                    image: thread.author.image,
                    id: thread.author.id,
                  }
            }
            community={thread.community}
            createdAt={thread.createdAt}
            comments={thread.children}
            likes={thread.likes}
          />
        ))
      )}
    </section>
  );
};

export default ThreadsTab;