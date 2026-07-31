import PostThread from "@/components/forms/PostThreads";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section className='flex flex-col gap-6'>
      <div>
        <h1 className='head-text'>Create Thread</h1>
        <p className='mt-1 text-small-regular text-light-4'>
          Post thoughts, links, and discussions to your profile feed or active community.
        </p>
      </div>

      <PostThread userId={userInfo._id} />
    </section>
  );
}

export default Page;