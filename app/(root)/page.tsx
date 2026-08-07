import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();
  const res = await fetchPosts(1, 30);

  return (
    <section className='flex flex-col gap-8'>
      <div className='flex items-center justify-between'>
        <h1 className='head-text text-left'>Home</h1>
      </div>

      {user && (
        <Link
          href='/create-thread'
          className='flex items-center gap-4 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4 shadow-md backdrop-blur-md transition-all hover:border-primary-500'
        >
          <div className='relative h-10 w-10 flex-shrink-0'>
            <Image
              src={user.imageUrl || "/assets/profile.svg"}
              alt='user avatar'
              fill
              className='rounded-full object-cover ring-2 ring-black/10 dark:ring-white/10'
            />
          </div>
          <span className='text-sm-regular text-[var(--text-muted)]'>What is on your mind?...</span>
        </Link>
      )}

      <section className='flex flex-col gap-6'>
        {res.posts.length === 0 ? (
          <div className='flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border-color)] bg-[var(--card-bg)] py-16 text-center'>
            <div className='relative mb-4 h-16 w-16 opacity-40'>
              <Image src='/assets/reply.svg' alt='empty feed' fill className='object-contain dark:brightness-200 brightness-50' />
            </div>
            <p className='text-base-semibold text-[var(--text-primary)]'>No threads found</p>
            <p className='mt-1 text-small-regular text-[var(--text-muted)]'>Be the first to post a thread to start the conversation!</p>
            <Link
              href='/create-thread'
              className='mt-6 rounded-xl bg-primary-500 px-6 py-2.5 text-small-semibold text-light-1 shadow-lg shadow-indigo-500/20 transition hover:opacity-90 active:scale-95'
            >
              Post Thread
            </Link>
          </div>
        ) : (
          res.posts.map((post: any) => (
            <ThreadCard
              key={post._id}
              id={post._id}
              currentUser={user?.id || ""}
              parentId={post.parentId}
              content={post.text}
              image={post.image}
              author={post.author}
              community={post.community}
              createdAt={post.createdAt}
              comments={post.children}
              likes={post.likes}
            />
          ))
        )}
      </section>
    </section>
  );
}
