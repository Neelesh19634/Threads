"use client";

import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { dark } from "@clerk/themes";
import { useRouter } from "next/navigation";
import TopbarThemeToggle from "./TopbarThemeToggle";

function Topbar() {
  const router = useRouter();

  return (
    <header className='topbar' role='banner'>
      <Link
        href='/'
        className='flex items-center gap-3 transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg p-1'
        aria-label='Threads Home'
      >
        <div className='relative h-8 w-8 transition-transform hover:scale-105'>
          <Image src='/assets/logo.svg' alt='Threads Logo' width={32} height={32} />
        </div>
        <p className='text-heading3-bold tracking-tight text-[var(--text-primary)] max-xs:hidden'>
          Threads
        </p>
      </Link>

      <div className='flex items-center gap-3 sm:gap-4'>
        <TopbarThemeToggle />

        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger:
                "px-3 py-2 bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-xl hover:opacity-90 transition-all cursor-pointer font-medium text-xs sm:text-sm",
            },
          }}
        />

        <div className='block md:hidden'>
          <SignedIn>
            <SignOutButton signOutCallback={() => router.push('/sign-in')}>
              <button
                className='flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-rose-500/20 hover:border-rose-500/30 transition-all'
                aria-label='Log out'
              >
                <Image src='/assets/logout.svg' width={20} height={20} alt='logout' className='dark:brightness-200 brightness-50' />
              </button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

export default Topbar;