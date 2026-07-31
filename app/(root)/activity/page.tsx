import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { formatTimeAgo } from "@/lib/utils";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const activity = await getActivity(user.id);

  return (
    <section className='flex flex-col gap-8'>
      <h1 className='head-text mb-2'>Activity</h1>

      <div className='flex flex-col gap-4'>
        {activity.length > 0 ? (
          activity.map((activityItem: any) => (
            <Link key={activityItem._id} href={`/thread/${activityItem.parentId}`}>
              <article className='activity-card group'>
                <div className='relative h-10 w-10 flex-shrink-0'>
                  <Image
                    src={activityItem.author.image || "/assets/profile.svg"}
                    alt={`${activityItem.author.name} avatar`}
                    fill
                    className='rounded-full object-cover ring-2 ring-black/10 dark:ring-white/10'
                  />
                </div>
                <div className='flex flex-1 items-center justify-between gap-2 overflow-hidden'>
                  <p className='text-small-regular text-[var(--text-primary)] truncate'>
                    <span className='mr-1.5 font-semibold text-primary-500 group-hover:underline'>
                      {activityItem.author.name}
                    </span>
                    replied to your thread:
                    <span className='ml-1 text-[var(--text-muted)] italic truncate'>"
                      {activityItem.text.length > 50
                        ? `${activityItem.text.substring(0, 50)}...`
                        : activityItem.text}"
                    </span>
                  </p>
                  {activityItem.createdAt && (
                    <span className='flex-shrink-0 text-subtle-medium text-[var(--text-muted)]'>
                      {formatTimeAgo(activityItem.createdAt)}
                    </span>
                  )}
                </div>
              </article>
            </Link>
          ))
        ) : (
          <div className='rounded-2xl border border-dashed border-[var(--border-color)] bg-[var(--card-bg)] py-16 text-center'>
            <div className='relative mx-auto mb-3 h-12 w-12 opacity-40'>
              <Image src='/assets/heart.svg' alt='no activity' fill className='object-contain dark:brightness-200 brightness-50' />
            </div>
            <p className='text-base-semibold text-[var(--text-primary)]'>No activity yet</p>
            <p className='mt-1 text-small-regular text-[var(--text-muted)]'>When someone replies to your threads, you will see notifications here.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Page;