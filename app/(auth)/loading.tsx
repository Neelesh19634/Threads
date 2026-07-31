import Image from "next/image";

export default function AuthLoading() {
  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center gap-5 bg-[var(--bg-primary)]'>
      <div className='relative flex items-center justify-center'>
        <div className='absolute h-20 w-20 animate-ping rounded-full bg-primary-500/20 duration-1000' />
        <div className='relative h-14 w-14 animate-pulse'>
          <Image src='/assets/logo.svg' alt='Threads Loading' fill className='object-contain' />
        </div>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <p className='text-small-semibold text-[var(--text-primary)] tracking-wide'>Authenticating...</p>
        <div className='flex items-center gap-1.5'>
          <div className='h-1.5 w-1.5 rounded-full bg-primary-500 animate-bounce' />
          <div className='h-1.5 w-1.5 rounded-full bg-primary-500 animate-bounce [animation-delay:0.2s]' />
          <div className='h-1.5 w-1.5 rounded-full bg-primary-500 animate-bounce [animation-delay:0.4s]' />
        </div>
      </div>
    </div>
  );
}
