"use client";

import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getActivity } from "@/lib/actions/user.actions";

function Bottombar() {
  const pathname = usePathname();
  const { userId } = useAuth();
  const [activityCount, setActivityCount] = useState<number>(0);

  useEffect(() => {
    if (!userId) return;

    // If user is currently viewing Activity page, mark activity as read
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
    <nav className='bottombar' aria-label='Mobile Navigation'>
      <div className='bottombar_container'>
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
              className={`bottombar_link transition-all ${
                isActive
                  ? "bg-primary-500 text-light-1 shadow-md shadow-indigo-500/20 font-semibold"
                  : "text-light-2 hover:bg-white/[0.06]"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <div className='relative'>
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={20}
                  height={20}
                  className={isActive ? "" : "opacity-75"}
                />
                {isActivity && activityCount > 0 && (
                  <span className='absolute -top-1 -right-1 flex h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-[#101012]' />
                )}
              </div>
              <p className='text-subtle-medium max-sm:hidden'>
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default Bottombar;