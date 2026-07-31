"use client";

import { useEffect, useState } from "react";

export default function TopbarThemeToggle() {
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">("system");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedMode = (localStorage.getItem("threads-theme-mode") as any) || "system";
    setThemeMode(savedMode);
    applyThemeMode(savedMode);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      const currentSaved = localStorage.getItem("threads-theme-mode") || "system";
      if (currentSaved === "system") {
        applyThemeMode("system");
      }
    };
    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, []);

  const toggleTheme = () => {
    const isCurrentlyDark =
      document.documentElement.classList.contains("dark") ||
      document.documentElement.getAttribute("data-theme") === "dark";

    const nextMode = isCurrentlyDark ? "light" : "dark";
    setThemeMode(nextMode);
    localStorage.setItem("threads-theme-mode", nextMode);
    applyThemeMode(nextMode);
  };

  const isDarkActive =
    isMounted &&
    (themeMode === "dark" ||
      (themeMode === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches));

  return (
    <button
      type='button'
      onClick={toggleTheme}
      className='flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-primary)] shadow-sm transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer'
      aria-label='Toggle theme'
      title={isDarkActive ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDarkActive ? (
        <svg className='h-5 w-5 text-amber-400 transition-transform duration-300 hover:rotate-45' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' />
        </svg>
      ) : (
        <svg className='h-5 w-5 text-indigo-500 transition-transform duration-300 hover:-rotate-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' />
        </svg>
      )}
    </button>
  );
}

function applyThemeMode(mode: string) {
  const isDark =
    mode === "dark" ||
    (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  if (isDark) {
    document.documentElement.classList.add("dark");
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.setAttribute("data-theme", "light");
  }
}
