"use client";

import type { MonthTheme } from "@/data/monthThemes";
import styles from "./CalendarHeader.module.css";

interface CalendarHeaderProps {
  month: number;
  year: number;
  theme: MonthTheme;
  isFlipping: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export default function CalendarHeader({
  month,
  year,
  theme,
  isFlipping,
  onPrev,
  onNext,
}: CalendarHeaderProps) {
  return (
    <header className={styles.header} role="banner">
      <button
        className={styles.navBtn}
        onClick={onPrev}
        disabled={isFlipping}
        aria-label="Previous month"
        title="Previous month"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div className={`${styles.monthYearBlock} ${isFlipping ? styles.flipping : ""}`}>
        <div className={styles.yearLabel}>{year}</div>
        <h1 className={styles.monthLabel}>{theme.name}</h1>
      </div>

      <button
        className={styles.navBtn}
        onClick={onNext}
        disabled={isFlipping}
        aria-label="Next month"
        title="Next month"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </header>
  );
}
