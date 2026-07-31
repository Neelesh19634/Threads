"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

const UserCard = ({ id, name, username, imgUrl, personType }: Props) => {
  const router = useRouter();
  const isCommunity = personType === "Community";

  return (
    <article className='user-card group border border-[var(--border-color)] bg-[var(--card-bg)] backdrop-blur-md transition-all hover:border-primary-500'>
      <div className='user-card_avatar'>
        <div className='relative h-12 w-12 flex-shrink-0 transition-transform group-hover:scale-105'>
          <Image
            src={imgUrl || "/assets/profile.svg"}
            alt={`${name} avatar`}
            fill
            className='rounded-full object-cover ring-2 ring-black/10 dark:ring-white/10'
          />
        </div>

        <div className='flex-1 overflow-hidden text-ellipsis'>
          <h4 className='text-base-semibold text-[var(--text-primary)] truncate group-hover:text-primary-500 transition-colors'>
            {name}
          </h4>
          <p className='text-small-medium text-[var(--text-muted)] truncate'>@{username}</p>
        </div>
      </div>

      <Button
        className='user-card_btn'
        onClick={() => {
          if (isCommunity) {
            router.push(`/communities/${id}`);
          } else {
            router.push(`/profile/${id}`);
          }
        }}
        aria-label={`View profile for ${name}`}
      >
        View
      </Button>
    </article>
  );
};

export default UserCard;
