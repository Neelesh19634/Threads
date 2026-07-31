import { currentUser } from "@clerk/nextjs";

import UserCard from "../cards/UserCard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUsers } from "@/lib/actions/user.actions";

async function RightSidebar() {
  const user = await currentUser();
  if (!user) return null;

  const similarMinds = await fetchUsers({
    userId: user.id,
    pageSize: 4,
  });

  const suggestedCommunities = await fetchCommunities({
    pageSize: 4,
  });

  return (
    <aside className='custom-scrollbar rightsidebar' aria-label='Suggested Items'>
      <div className='flex flex-col justify-start'>
        <h3 className='text-heading4-medium tracking-tight text-[var(--text-primary)]'>
          Suggested Communities
        </h3>

        <div className='mt-6 flex w-full flex-col gap-4'>
          {suggestedCommunities.communities.length > 0 ? (
            suggestedCommunities.communities.map((community: any) => (
              <UserCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                personType='Community'
              />
            ))
          ) : (
            <div className='rounded-xl border border-dashed border-[var(--border-color)] bg-[var(--card-bg)] p-4 text-center'>
              <p className='text-small-regular text-[var(--text-muted)]'>No communities yet</p>
            </div>
          )}
        </div>
      </div>

      <div className='flex flex-col justify-start'>
        <h3 className='text-heading4-medium tracking-tight text-[var(--text-primary)]'>Suggested Users</h3>
        <div className='mt-6 flex w-full flex-col gap-4'>
          {similarMinds.users.length > 0 ? (
            similarMinds.users.map((person: any) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType='User'
              />
            ))
          ) : (
            <div className='rounded-xl border border-dashed border-[var(--border-color)] bg-[var(--card-bg)] p-4 text-center'>
              <p className='text-small-regular text-[var(--text-muted)]'>No users yet</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default RightSidebar;