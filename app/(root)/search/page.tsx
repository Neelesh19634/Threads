import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/Searchbar";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q || "",
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <section className='flex flex-col gap-8'>
      <h1 className='head-text mb-2'>Search</h1>

      <Searchbar routeType='search' />

      <div className='mt-6 flex flex-col gap-4'>
        {result.users.length === 0 ? (
          <div className='rounded-2xl border border-dashed border-[var(--border-color)] bg-[var(--card-bg)] py-16 text-center'>
            <p className='text-base-semibold text-[var(--text-primary)]'>No users found</p>
            <p className='mt-1 text-small-regular text-[var(--text-muted)]'>Try searching with a different name or username.</p>
          </div>
        ) : (
          result.users.map((person: any) => (
            <UserCard
              key={person.id}
              id={person.id}
              name={person.name}
              username={person.username}
              imgUrl={person.image}
              personType='User'
            />
          ))
        )}
      </div>
    </section>
  );
}

export default Page;