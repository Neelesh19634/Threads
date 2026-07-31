import React from "react";

export function PostSkeleton() {
  return (
    <div className='w-full rounded-2xl border border-white/[0.06] bg-[#12141a]/60 p-6 backdrop-blur-md animate-pulse'>
      <div className='flex items-start gap-4'>
        <div className='h-11 w-11 rounded-full bg-white/10' />
        <div className='flex flex-1 flex-col gap-3'>
          <div className='h-4 w-32 rounded bg-white/10' />
          <div className='h-4 w-full rounded bg-white/5' />
          <div className='h-4 w-3/4 rounded bg-white/5' />
          <div className='mt-2 flex gap-4'>
            <div className='h-6 w-6 rounded bg-white/10' />
            <div className='h-6 w-6 rounded bg-white/10' />
            <div className='h-6 w-6 rounded bg-white/10' />
          </div>
        </div>
      </div>
    </div>
  );
}

export function UserSkeleton() {
  return (
    <div className='flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#12141a]/60 p-4 animate-pulse'>
      <div className='flex items-center gap-3'>
        <div className='h-12 w-12 rounded-full bg-white/10' />
        <div className='flex flex-col gap-2'>
          <div className='h-4 w-28 rounded bg-white/10' />
          <div className='h-3 w-20 rounded bg-white/5' />
        </div>
      </div>
      <div className='h-8 w-16 rounded-xl bg-white/10' />
    </div>
  );
}

export function CommunitySkeleton() {
  return (
    <div className='w-full rounded-2xl border border-white/[0.06] bg-[#12141a]/60 p-6 animate-pulse sm:w-96'>
      <div className='flex items-center gap-3'>
        <div className='h-12 w-12 rounded-full bg-white/10' />
        <div className='flex flex-col gap-2'>
          <div className='h-4 w-32 rounded bg-white/10' />
          <div className='h-3 w-24 rounded bg-white/5' />
        </div>
      </div>
      <div className='mt-4 h-4 w-full rounded bg-white/5' />
      <div className='mt-5 flex justify-between'>
        <div className='h-8 w-20 rounded-xl bg-white/10' />
        <div className='h-7 w-20 rounded-full bg-white/5' />
      </div>
    </div>
  );
}
