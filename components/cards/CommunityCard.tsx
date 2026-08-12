import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  members: {
    image: string;
  }[];
}

function CommunityCard({ id, name, username, imgUrl, bio, members }: Props) {
  return (
    <article className='community-card group border border-[var(--glass-border)] bg-[var(--card-bg)] backdrop-blur-xl shadow-[var(--glass-shadow)] transition-all duration-300 hover:border-primary-500/40 hover:shadow-[var(--glass-shadow-hover)] hover:-translate-y-0.5'>
      <div className='flex items-center gap-4'>
        <Link href={`/communities/${id}`} className='relative h-14 w-14 flex-shrink-0 transition-transform group-hover:scale-105'>
          <Image
            src={imgUrl || "/assets/community.svg"}
            alt={`${name} community logo`}
            fill
            className='rounded-2xl object-cover ring-2 ring-black/10 dark:ring-white/10'
          />
        </Link>

        <div className='flex-1 overflow-hidden'>
          <Link href={`/communities/${id}`}>
            <h4 className='text-base-semibold text-[var(--text-primary)] truncate hover:text-primary-500 transition-colors'>
              {name}
            </h4>
          </Link>
          <p className='text-small-medium text-[var(--text-muted)] truncate'>@{username}</p>
        </div>
      </div>

      <p className='mt-4 text-subtle-medium leading-relaxed text-[var(--text-secondary)] line-clamp-2 min-h-[32px]'>
        {bio || "No description provided."}
      </p>

      <div className='mt-5 flex items-center justify-between gap-3 border-t border-[var(--border-color)] pt-4'>
        <Link href={`/communities/${id}`}>
          <Button size='sm' className='community-card_btn' aria-label={`View ${name} community`}>
            View
          </Button>
        </Link>

        {members && members.length > 0 ? (
          <div className='flex items-center gap-1.5 rounded-full border border-[var(--border-color)] bg-black/5 dark:bg-white/[0.04] px-2.5 py-1'>
            <div className='flex items-center'>
              {members.slice(0, 3).map((member, index) => (
                <Image
                  key={index}
                  src={member.image || "/assets/profile.svg"}
                  alt={`Member ${index + 1}`}
                  width={22}
                  height={22}
                  className={`${index !== 0 && "-ml-2"} rounded-full object-cover ring-1 ring-[var(--card-bg)]`}
                />
              ))}
            </div>
            <p className='text-subtle-medium text-[var(--text-secondary)] font-medium'>
              {members.length} {members.length === 1 ? "member" : "members"}
            </p>
          </div>
        ) : (
          <span className='text-subtle-medium text-[var(--text-muted)]'>0 members</span>
        )}
      </div>
    </article>
  );
}

export default CommunityCard;
