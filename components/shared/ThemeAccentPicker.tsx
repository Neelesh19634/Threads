"use client";

import { useEffect, useState, useRef } from "react";

export type ThemeMode = "light" | "dark" | "system";

const ACCENTS = [
  { name: "indigo", label: "Obsidian Indigo", color: "#877eff" },
  { name: "emerald", label: "Cyber Emerald", color: "#10b981" },
  { name: "blue", label: "Electric Blue", color: "#3b82f6" },
  { name: "amber", label: "Sunset Amber", color: "#f59e0b" },
];

const MODES: { name: ThemeMode; label: string; icon: string }[] = [
  { name: "light", label: "Light", icon: "☀️" },
  { name: "dark", label: "Dark", icon: "🌙" },
  { name: "system", label: "System", icon: "💻" },
];

export default function ThemeAccentPicker() {
  const [activeAccent, setActiveAccent] = useState<string>("indigo");
  const [activeMode, setActiveMode] = useState<ThemeMode>("system");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Accent
    const savedAccent = localStorage.getItem("threads-theme-accent") || "indigo";
    setActiveAccent(savedAccent);
    document.documentElement.setAttribute("data-accent", savedAccent);

    // Initialize Mode
    const savedMode = (localStorage.getItem("threads-theme-mode") as ThemeMode) || "system";
    setActiveMode(savedMode);
    applyThemeMode(savedMode);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      const currentSaved = localStorage.getItem("threads-theme-mode");
      if (currentSaved === "system" || !currentSaved) {
        applyThemeMode("system");
      }
    };
    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeAccent = (accentName: string) => {
    setActiveAccent(accentName);
    localStorage.setItem("threads-theme-accent", accentName);
    document.documentElement.setAttribute("data-accent", accentName);
    setIsOpen(false);
  };

  const changeMode = (newMode: ThemeMode) => {
    setActiveMode(newMode);
    localStorage.setItem("threads-theme-mode", newMode);
    applyThemeMode(newMode);
  };

  const currentTheme = ACCENTS.find((a) => a.name === activeAccent) || ACCENTS[0];

  return (
    <div className='flex flex-col gap-5 w-full max-w-md' ref={dropdownRef}>
      {/* Theme Mode Selector */}
      <div className='flex flex-col gap-2'>
        <label className='text-subtle-semibold text-[var(--text-muted)] flex items-center gap-2'>
          Theme Mode
        </label>
        <div className='flex items-center gap-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-1.5 backdrop-blur-md'>
          {MODES.map((m) => {
            const isSelected = activeMode === m.name;
            return (
              <button
                key={m.name}
                type='button'
                onClick={() => changeMode(m.name)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-small-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-primary-500 text-light-1 font-semibold shadow-md"
                    : "text-[var(--text-muted)] hover:bg-black/5 dark:hover:bg-white/[0.06] hover:text-[var(--text-primary)]"
                }`}
              >
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Theme Accent Picker */}
      <div className='flex flex-col gap-2 relative w-full'>
        <label className='text-subtle-semibold text-[var(--text-muted)] flex items-center gap-2'>
          <svg className='h-4 w-4 text-primary-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' />
          </svg>
          Theme Accent Color
        </label>

        {/* Interactive Clickable Input Box */}
        <div className='relative w-full z-50'>
          <button
            type='button'
            onClick={() => setIsOpen(!isOpen)}
            className='flex w-full items-center justify-between gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-3 text-[var(--text-primary)] shadow-lg transition-all hover:border-[var(--primary-500)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer'
          >
            <div className='flex items-center gap-3'>
              <span
                className='h-5 w-5 rounded-full ring-2 ring-black/10 dark:ring-white/20 flex-shrink-0 shadow-md'
                style={{ backgroundColor: currentTheme.color }}
              />
              <span className='text-base-semibold text-[var(--text-primary)]'>{currentTheme.label}</span>
            </div>
            <span className={`text-[var(--text-muted)] text-xs transition-transform duration-200 ${isOpen ? "rotate-180 text-primary-500" : ""}`}>
              ▲
            </span>
          </button>

          {/* Custom Premium Popup Overlay Menu */}
          {isOpen && (
            <div className='absolute left-0 top-full z-50 mt-2.5 w-full rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150'>
              <div className='flex flex-col gap-1'>
                {ACCENTS.map((accent) => {
                  const isSelected = activeAccent === accent.name;
                  return (
                    <button
                      key={accent.name}
                      type='button'
                      onClick={() => changeAccent(accent.name)}
                      className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-small-medium transition-all cursor-pointer ${
                        isSelected
                          ? "bg-primary-500/10 text-primary-500 font-semibold border border-primary-500/30"
                          : "text-[var(--text-muted)] hover:bg-black/5 dark:hover:bg-white/[0.06] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <div className='flex items-center gap-3.5'>
                        <span
                          className='h-4 w-4 rounded-full ring-2 ring-black/10 dark:ring-white/20 shadow-sm flex-shrink-0'
                          style={{ backgroundColor: accent.color }}
                        />
                        <span className='text-sm-semibold'>{accent.label}</span>
                      </div>

                      {isSelected && (
                        <span className='flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-tiny-medium text-light-1 font-bold shadow-md'>
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
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
