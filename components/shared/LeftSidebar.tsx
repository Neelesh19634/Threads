"use client";

import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import { sidebarLinks } from "@/constants/index";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getActivity } from "@/lib/actions/user.actions";

function LeftSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();
  const [activityCount, setActivityCount] = useState<number>(0);

  useEffect(() => {
    if (!userId) return;

    if (pathname === "/activity") {
      localStorage.setItem(`threads_activity_read_${userId}`, new Date().toISOString());
      setActivityCount(0);
      return;
    }

    const fetchUnread = async () => {
      try {
        const replies = await getActivity(userId);
        const lastRead = localStorage.getItem(`threads_activity_read_${userId}`);

        if (lastRead) {
          const lastReadTime = new Date(lastRead).getTime();
          const unreadReplies = replies.filter(
            (reply: any) => new Date(reply.createdAt).getTime() > lastReadTime
          );
          setActivityCount(unreadReplies.length);
        } else {
          setActivityCount(replies.length);
        }
      } catch (err) {
        console.error("Failed to fetch activity count", err);
      }
    };

    fetchUnread();
  }, [userId, pathname]);

  return (
    <aside className='custom-scrollbar leftsidebar' aria-label='Main Navigation'>
      <nav className='flex w-full flex-1 flex-col gap-2 px-4'>
        {sidebarLinks.map((link) => {
          let targetRoute = link.route;
          if (targetRoute === "/profile") {
            targetRoute = `${link.route}/${userId}`;
          }

          const isActive =
            (pathname.includes(targetRoute) && targetRoute.length > 1) ||
            pathname === targetRoute;

          const isActivity = link.route === "/activity";

          return (
            <Link
              href={targetRoute}
              key={link.label}
              className={`leftsidebar_link group border border-transparent ${
                isActive
                  ? "bg-primary-500 text-light-1 shadow-lg shadow-indigo-500/20 font-semibold hover:bg-primary-500/90"
                  : "text-[var(--text-primary)] opacity-80 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/[0.06]"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <div className='relative h-6 w-6 transition-transform group-hover:scale-110'>
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                  className={`${
                    isActive
                      ? "brightness-200"
                      : "opacity-80 group-hover:opacity-100 dark:brightness-200 brightness-50"
                  }`}
                />
                {isActivity && activityCount > 0 && (
                  <span className='absolute -top-1 -right-1 flex h-3 w-3 rounded-full bg-rose-500 lg:hidden ring-2 ring-white dark:ring-[#0b0c0e]' />
                )}
              </div>
              <p className='text-body-medium max-lg:hidden'>{link.label}</p>

              {isActivity && activityCount > 0 && (
                <span className='ml-auto rounded-full bg-rose-500/90 px-2 py-0.5 text-tiny-medium text-light-1 shadow-md max-lg:hidden font-bold border border-rose-400/30'>
                  {activityCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className='mt-10 px-4'>
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <button
              className='flex w-full cursor-pointer items-center justify-start gap-4 rounded-xl px-4 py-3.5 text-[var(--text-primary)] opacity-80 hover:opacity-100 transition-all hover:bg-rose-500/10 hover:text-rose-500 border border-transparent hover:border-rose-500/20'
              aria-label='Log out'
            >
              <Image
                src='/assets/logout.svg'
                width={24}
                height={24}
                alt='logout'
                className='dark:brightness-200 brightness-50'
              />
              <p className='text-body-medium max-lg:hidden'>Logout</p>
            </button>
          </SignOutButton>
        </SignedIn>
      </div>
    </aside>
  );
}

export default LeftSidebar;