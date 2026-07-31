import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import CommunityCard from "@/components/cards/CommunityCard";
import Searchbar from "@/components/shared/Searchbar";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import Link from "next/link";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchCommunities({
    searchString: searchParams.q || "",
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <section className='flex flex-col gap-8'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div>
          <h1 className='head-text'>Communities</h1>
          <p className='mt-1 text-small-regular text-[var(--text-muted)]'>Discover and join interest-based groups across the network.</p>
        </div>
        <Link
          href='/create-community'
          className='rounded-xl bg-primary-500 px-5 py-2.5 text-small-semibold text-light-1 shadow-lg shadow-indigo-500/20 transition hover:opacity-90 active:scale-95'
        >
          + Create Community
        </Link>
      </div>

      <Searchbar routeType='communities' />

      <div className='mt-4 flex flex-wrap gap-4'>
        {result.communities.length === 0 ? (
          <div className='w-full rounded-2xl border border-dashed border-[var(--border-color)] bg-[var(--card-bg)] py-16 text-center'>
            <p className='text-base-semibold text-[var(--text-primary)]'>No communities found</p>
            <p className='mt-1 text-small-regular text-[var(--text-muted)]'>Try searching for a different keyword or create your own community.</p>
          </div>
        ) : (
          result.communities.map((community: any) => (
            <CommunityCard
              key={community.id}
              id={community.id}
              name={community.name}
              username={community.username}
              imgUrl={community.image}
              bio={community.bio}
              members={community.members}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default Page;