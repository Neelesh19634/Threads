import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (userInfo?.onboarded) redirect("/");

    const userData = {
        id: user.id,
        objectId: userInfo?._id?.toString() || "",
        username: userInfo?.username || user.username || "",
        name: userInfo?.name || user.firstName || "",
        bio: userInfo?.bio || "",
        image: userInfo?.image || user.imageUrl || "",
    };

    return (
        <main className="mx-auto flex flex-col justify-start max-w-3xl px-10 py-20">
            <h1 className='head-text'>Onboarding</h1>
            <p className="mt-3 text-base-regular text-[var(--text-muted)]">Complete your profile now to use Threads</p>

            <section className="mt-9 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-10 backdrop-blur-md">
                <AccountProfile user={userData} btnTitle="Continue" />
            </section>
        </main>
    );
}

export default Page;