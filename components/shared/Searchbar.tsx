"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "../ui/input";

interface Props {
  routeType: string;
}

function Searchbar({ routeType }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search.trim()) {
        router.push(`/${routeType}?q=${encodeURIComponent(search.trim())}`);
      } else {
        router.push(`/${routeType}`);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, routeType, router]);

  return (
    <div className='searchbar group relative flex items-center gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-3 shadow-inner backdrop-blur-md transition-all focus-within:border-primary-500'>
      <Image
        src='/assets/search-gray.svg'
        alt='search icon'
        width={20}
        height={20}
        className='object-contain opacity-70 group-focus-within:opacity-100 transition-opacity dark:brightness-200 brightness-50'
      />
      <Input
        id='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={
          routeType === "search" ? "Search creators by name or username..." : "Search communities..."
        }
        className='no-focus border-none bg-transparent text-sm-regular text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none w-full'
      />
      {search && (
        <button
          type='button'
          onClick={() => setSearch("")}
          className='text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xs font-semibold p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition'
          aria-label='Clear search'
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default Searchbar;
