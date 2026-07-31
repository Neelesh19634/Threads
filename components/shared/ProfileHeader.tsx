"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { updateUser } from "@/lib/actions/user.actions";
import ThemeAccentPicker from "./ThemeAccentPicker";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
}

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
}: Props) => {
  const pathname = usePathname();
  const [isEditing, setIsEditing] = useState(false);
  const [currentBio, setCurrentBio] = useState(bio || "");
  const [newBio, setNewBio] = useState(bio || "");
  const [isSaving, setIsSaving] = useState(false);

  const isOwner = authUserId === accountId;

  const handleSaveBio = async () => {
    setIsSaving(true);
    try {
      await updateUser({
        userId: authUserId,
        username,
        name,
        bio: newBio,
        image: imgUrl,
        path: pathname,
      });
      setCurrentBio(newBio);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update bio:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='flex w-full flex-col justify-start'>
      <div className='flex items-center justify-between gap-4 flex-wrap'>
        <div className='flex items-center gap-4'>
          <div className='relative h-20 w-20 flex-shrink-0'>
            <Image
              src={imgUrl || "/assets/profile.svg"}
              alt='profile avatar'
              fill
              className='rounded-full object-cover shadow-2xl ring-4 ring-black/10 dark:ring-white/10'
            />
          </div>
          <div className='flex-1'>
            <h2 className='text-left text-heading3-bold tracking-tight text-[var(--text-primary)]'>{name}</h2>
            <p className='text-base-medium text-[var(--text-muted)]'>@{username}</p>
          </div>
        </div>

        {isOwner && !isEditing && (
          <button
            type='button'
            onClick={() => setIsEditing(true)}
            className='flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-2 text-subtle-medium text-[var(--text-primary)] transition hover:opacity-80 focus-visible:ring-2 focus-visible:ring-primary-500'
            aria-label='Edit Bio'
          >
            <Image src='/assets/edit.svg' alt='edit icon' width={16} height={16} className='dark:brightness-200 brightness-50' />
            <span className='font-medium'>Edit Bio</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <div className='mt-6 flex max-w-xl flex-col gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5 backdrop-blur-md animate-in fade-in zoom-in-95'>
          <div className='flex items-center justify-between'>
            <label className='text-small-semibold text-[var(--text-primary)]'>Edit Bio</label>
            <span className='text-subtle-medium text-[var(--text-muted)]'>
              {newBio.length} / 300
            </span>
          </div>
          <textarea
            rows={3}
            maxLength={300}
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
            placeholder='Write your bio here...'
            className='w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-3.5 text-sm-regular text-[var(--text-primary)] outline-none transition focus:border-primary-500 resize-none'
          />
          <div className='flex gap-3 justify-end pt-1'>
            <button
              type='button'
              onClick={() => {
                setNewBio(currentBio);
                setIsEditing(false);
              }}
              className='rounded-xl border border-[var(--border-color)] bg-black/5 dark:bg-white/10 px-4 py-2 text-subtle-semibold text-[var(--text-primary)] hover:opacity-80 transition'
            >
              Cancel
            </button>
            <button
              type='button'
              onClick={handleSaveBio}
              disabled={isSaving}
              className='rounded-xl bg-primary-500 px-5 py-2 text-subtle-semibold text-light-1 hover:opacity-90 transition shadow-md disabled:opacity-50'
            >
              {isSaving ? "Saving..." : "Save Bio"}
            </button>
          </div>
        </div>
      ) : (
        <p className='mt-6 max-w-lg text-base-regular leading-relaxed text-[var(--text-secondary)]'>
          {currentBio || "No bio added yet."}
        </p>
      )}

      {/* Dedicated Theme Accent Settings Section */}
      {isOwner && (
        <div className='relative z-30 mt-6 flex flex-col gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5 backdrop-blur-md'>
          <span className='text-tiny-medium tracking-wider uppercase text-[var(--text-muted)] font-semibold'>
            Appearance & Preferences
          </span>
          <ThemeAccentPicker />
        </div>
      )}

      <div className='mt-8 h-px w-full bg-[var(--border-color)]' />
    </div>
  );
};

export default ProfileHeader;