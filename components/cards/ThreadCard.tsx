"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { likeThread, deleteThread } from "@/lib/actions/thread.actions";
import { formatTimeAgo } from "@/lib/utils";

interface Props {
  id: string;
  currentUser: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
    _id?: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  likes?: any[];
  isComment?: boolean;
}

const ThreadCard = ({
  id,
  currentUser,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  likes = [],
  isComment,
}: Props) => {
  const pathname = usePathname();

  const uniqueLikes = Array.from(
    new Set((likes || []).map((l: any) => l._id?.toString() || l.id?.toString() || l.toString()))
  );

  const initialLiked = currentUser ? uniqueLikes.includes(currentUser) : false;

  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(uniqueLikes.length);
  const [isReposted, setIsReposted] = useState(false);
  const [repostCount, setRepostCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isProfilePage = pathname.includes("/profile");
  const isAuthor =
    currentUser &&
    (currentUser === author?.id ||
      currentUser === author?._id ||
      currentUser === author?._id?.toString());

  const canDelete = isProfilePage && isAuthor;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleLike = async () => {
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setLikesCount((prev) => (nextLiked ? prev + 1 : Math.max(0, prev - 1)));

    try {
      await likeThread(id, currentUser, pathname);
    } catch (error) {
      setIsLiked(!nextLiked);
      setLikesCount((prev) => (nextLiked ? Math.max(0, prev - 1) : prev + 1));
    }
  };

  const handleRepost = () => {
    if (isReposted) {
      setIsReposted(false);
      setRepostCount((prev) => Math.max(0, prev - 1));
      showToast("Removed from reposts");
    } else {
      setIsReposted(true);
      setRepostCount((prev) => prev + 1);
      showToast("Thread reposted!");
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/thread/${id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      showToast("Link copied to clipboard!");
    } else {
      showToast("Shared!");
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this thread globally?")) {
      setIsDeleting(true);
      try {
        await deleteThread(id, pathname);
        showToast("Thread deleted globally!");
      } catch (error) {
        console.error("Failed to delete thread:", error);
        showToast("Failed to delete thread");
        setIsDeleting(false);
      }
    }
  };

  return (
    <article
      className={`relative flex w-full flex-col transition-all duration-200 ${
        isComment
          ? "px-0 sx:px-7"
          : "rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-md backdrop-blur-md"
      } ${isDeleting ? "opacity-50 pointer-events-none" : ""}`}
    >
      {toastMessage && (
        <div className='absolute top-3 right-4 z-20 rounded-xl border border-primary-500/30 bg-primary-500/90 px-3.5 py-1.5 text-subtle-semibold text-light-1 shadow-lg backdrop-blur-md transition-all animate-in fade-in zoom-in-95'>
          {toastMessage}
        </div>
      )}

      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 gap-4'>
          <div className='flex flex-col items-center'>
            <Link href={`/profile/${author?.id}`} className='relative h-11 w-11 transition-transform hover:scale-105'>
              <Image
                src={author?.image || "/assets/profile.svg"}
                alt='user avatar'
                fill
                className='cursor-pointer rounded-full object-cover ring-2 ring-black/10 dark:ring-white/10'
              />
            </Link>
            <div className='thread-card_bar' />
          </div>

          <div className='flex w-full flex-col'>
            <div className='flex items-center justify-between gap-2'>
              <div className='flex items-center gap-2'>
                <Link href={`/profile/${author?.id}`} className='w-fit hover:underline'>
                  <h4 className='cursor-pointer text-base-semibold text-[var(--text-primary)]'>
                    {author?.name || "Anonymous"}
                  </h4>
                </Link>
                {createdAt && (
                  <span suppressHydrationWarning className='text-subtle-medium text-[var(--text-muted)]'>
                    • {formatTimeAgo(createdAt)}
                  </span>
                )}
              </div>

              <div className='flex items-center gap-2'>
                {community && (
                  <Link
                    href={`/communities/${community.id}`}
                    className='flex items-center gap-1 rounded-full border border-[var(--border-color)] bg-[#12141a]/10 dark:bg-white/[0.04] px-2.5 py-1 text-subtle-medium text-[var(--text-secondary)] transition hover:bg-black/5 dark:hover:bg-white/[0.08]'
                  >
                    <span className='max-w-[120px] truncate'>{community.name}</span>
                  </Link>
                )}

                {canDelete && (
                  <button
                    type='button'
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className='flex cursor-pointer items-center gap-1 rounded-lg p-1.5 text-[var(--text-muted)] transition hover:bg-rose-500/20 hover:text-rose-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 disabled:opacity-50'
                    aria-label='Delete thread'
                    title='Delete thread globally'
                  >
                    {isDeleting ? (
                      <div className='h-4 w-4 animate-spin rounded-full border-2 border-rose-500 border-t-transparent' />
                    ) : (
                      <Image src='/assets/delete.svg' alt='delete icon' width={18} height={18} className='opacity-70 hover:opacity-100 dark:brightness-200 brightness-50' />
                    )}
                  </button>
                )}
              </div>
            </div>

            <p className='mt-2.5 text-sm-regular leading-relaxed text-[var(--text-primary)]'>{content}</p>

            <div className={`${isComment && "mb-8"} mt-4 flex flex-col gap-3`}>
              <div className='flex items-center gap-5'>
                {/* Like Button */}
                <button
                  type='button'
                  onClick={handleLike}
                  className='group flex items-center gap-1.5 rounded-lg p-1 text-[var(--text-muted)] transition hover:text-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
                  aria-label={isLiked ? "Unlike post" : "Like post"}
                >
                  <Image
                    src={isLiked ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"}
                    alt='like icon'
                    width={20}
                    height={20}
                    className='transition-transform group-hover:scale-110'
                  />
                  {likesCount > 0 && (
                    <span className={`text-subtle-medium ${isLiked ? "text-rose-500 font-semibold" : "text-[var(--text-muted)]"}`}>
                      {likesCount}
                    </span>
                  )}
                </button>

                {/* Comment / Reply Button */}
                <Link
                  href={`/thread/${id}`}
                  className='group flex items-center gap-1.5 rounded-lg p-1 text-[var(--text-muted)] transition hover:text-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
                  aria-label='Reply to thread'
                >
                  <Image
                    src='/assets/reply.svg'
                    alt='reply icon'
                    width={20}
                    height={20}
                    className='transition-transform group-hover:scale-110 opacity-70 group-hover:opacity-100 dark:brightness-200 brightness-50'
                  />
                  {comments?.length > 0 && (
                    <span className='text-subtle-medium text-[var(--text-muted)]'>{comments.length}</span>
                  )}
                </Link>

                {/* Repost Button */}
                <button
                  type='button'
                  onClick={handleRepost}
                  className='group flex items-center gap-1.5 rounded-lg p-1 text-[var(--text-muted)] transition hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
                  aria-label='Repost thread'
                >
                  <Image
                    src='/assets/repost.svg'
                    alt='repost icon'
                    width={20}
                    height={20}
                    className={`transition-transform group-hover:scale-110 dark:brightness-200 brightness-50 ${isReposted ? "opacity-100" : "opacity-70"}`}
                  />
                  {repostCount > 0 && (
                    <span className='text-subtle-medium text-[var(--text-muted)]'>{repostCount}</span>
                  )}
                </button>

                {/* Share Button */}
                <button
                  type='button'
                  onClick={handleShare}
                  className='group flex items-center gap-1.5 rounded-lg p-1 text-[var(--text-muted)] transition hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
                  aria-label='Share thread link'
                >
                  <Image
                    src='/assets/share.svg'
                    alt='share icon'
                    width={20}
                    height={20}
                    className='transition-transform group-hover:scale-110 opacity-70 group-hover:opacity-100 dark:brightness-200 brightness-50'
                  />
                </button>
              </div>

              {isComment && comments?.length > 0 && (
                <Link href={`/thread/${id}`} className='w-fit'>
                  <p className='mt-1 text-subtle-medium text-primary-500 hover:underline'>
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ThreadCard;