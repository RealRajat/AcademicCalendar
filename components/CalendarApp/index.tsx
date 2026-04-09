"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { MONTH_THEMES, type MonthTheme } from "@/data/monthThemes";
import { getHoliday } from "@/data/holidays";
import type { EventsStore } from "@/types/events";
import { loadEvents, saveEvents } from "@/utils/events";
import styles from "./CalendarApp.module.css";
import CalendarHeader from "@/components/CalendarHeader";
import HeroImage from "@/components/HeroImage";
import CalendarGrid from "@/components/CalendarGrid";
import NotesPanel from "@/components/NotesPanel";
import EventModal from "@/components/EventModal";

export interface DateRange {
  start: string | null; // ISO date string YYYY-MM-DD
  end: string | null;
}

export interface NotesStore {
  [key: string]: string; // key: "YYYY-MM" for monthly, "YYYY-MM-DD:YYYY-MM-DD" for range
}

export default function CalendarApp() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0-indexed
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [notes, setNotes] = useState<NotesStore>({});
  const [events, setEvents] = useState<EventsStore>({});
  const [modalDate, setModalDate] = useState<string | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState<"left" | "right">("right");
  const [prevMonth, setPrevMonth] = useState(month);
  const [prevYear, setPrevYear] = useState(year);
  const [theme, setTheme] = useState<MonthTheme>(MONTH_THEMES[today.getMonth()]);
  const flipTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load notes from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("wall-calendar-notes");
      if (stored) setNotes(JSON.parse(stored));
    } catch { }
  }, []);

  // Load events from localStorage
  useEffect(() => {
    setEvents(loadEvents());
  }, []);

  // Persist notes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("wall-calendar-notes", JSON.stringify(notes));
    } catch { }
  }, [notes]);

  // Persist events to localStorage
  useEffect(() => {
    saveEvents(events);
  }, [events]);

  // Apply theme CSS variables to document root
  useEffect(() => {
    const t = MONTH_THEMES[month];
    setTheme(t);
    const root = document.documentElement;
    root.style.setProperty("--color-primary", t.primary);
    root.style.setProperty("--color-primary-dark", t.primaryDark);
    root.style.setProperty("--color-accent", t.accent);
    root.style.setProperty("--color-bg", t.bg);
    root.style.setProperty("--color-bg-card", t.bgCard);
    root.style.setProperty("--color-text", t.text);
    root.style.setProperty("--color-text-muted", t.textMuted);
    root.style.setProperty("--color-range-start", t.rangeStart);
    root.style.setProperty("--color-range-end", t.rangeEnd);
    root.style.setProperty("--color-range-mid", t.rangeMid);
    root.style.setProperty("--color-range-mid-text", t.rangeMidText);
  }, [month]);

  const navigateMonth = useCallback(
    (dir: "prev" | "next") => {
      if (isFlipping) return;
      setFlipDir(dir === "next" ? "right" : "left");
      setPrevMonth(month);
      setPrevYear(year);
      setIsFlipping(true);

      if (flipTimeout.current) clearTimeout(flipTimeout.current);
      flipTimeout.current = setTimeout(() => {
        setIsFlipping(false);
        if (dir === "next") {
          if (month === 11) { setMonth(0); setYear((y) => y + 1); }
          else setMonth((m) => m + 1);
        } else {
          if (month === 0) { setMonth(11); setYear((y) => y - 1); }
          else setMonth((m) => m - 1);
        }
      }, 500);
    },
    [isFlipping, month, year]
  );

  const handleDayClick = useCallback(
    (dateStr: string) => {
      // Range selection (original behavior)
      setRange((prev) => {
        if (!prev.start || (prev.start && prev.end)) {
          return { start: dateStr, end: null };
        }
        if (prev.start && !prev.end) {
          if (dateStr < prev.start) return { start: dateStr, end: prev.start };
          if (dateStr === prev.start) return { start: null, end: null };
          return { start: prev.start, end: dateStr };
        }
        return { start: dateStr, end: null };
      });
      // Open event modal for the clicked date
      setModalDate(dateStr);
    },
    []
  );

  const clearRange = useCallback(() => {
    setRange({ start: null, end: null });
  }, []);

  const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;
  const rangeKey =
    range.start && range.end ? `${range.start}:${range.end}` : null;

  const updateNote = useCallback(
    (key: string, value: string) => {
      setNotes((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const getHolidayForDate = useCallback((dateStr: string) => {
    return getHoliday(dateStr);
  }, []);

  return (
    <div
      className={styles.calendarApp}
      data-season={theme.season}
      aria-label="Interactive Wall Calendar"
    >
      {/* Binding holes at the top */}
      <div className={styles.bindingBar} aria-hidden="true">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className={styles.bindingHole} />
        ))}
      </div>

      {/* Calendar body */}
      <div className={styles.calendarBody}>
        {/* Left panel: Hero image */}
        <div className={styles.leftPanel}>
          <HeroImage
            theme={theme}
            isFlipping={isFlipping}
            flipDir={flipDir}
          />
        </div>

        {/* Right panel: Header + Grid + Notes */}
        <div className={styles.rightPanel}>
          <CalendarHeader
            month={month}
            year={year}
            theme={theme}
            isFlipping={isFlipping}
            onPrev={() => navigateMonth("prev")}
            onNext={() => navigateMonth("next")}
          />

          <div
            className={`${styles.gridContainer} ${isFlipping ? styles[`flip-${flipDir}`] : ""}`}
          >
            <CalendarGrid
              month={month}
              year={year}
              range={range}
              today={today}
              events={events}
              onDayClick={handleDayClick}
              getHoliday={getHolidayForDate}
            />
          </div>

          <NotesPanel
            monthKey={monthKey}
            rangeKey={rangeKey}
            range={range}
            notes={notes}
            onUpdateNote={updateNote}
            onClearRange={clearRange}
            theme={theme}
          />
        </div>
      </div>

      {/* Paper texture overlay */}
      <div className={styles.paperTexture} aria-hidden="true" />

      {/* Event Modal */}
      {modalDate && (
        <EventModal
          dateStr={modalDate}
          events={events}
          onEventsChange={setEvents}
          onClose={() => setModalDate(null)}
        />
      )}
    </div>
  );
}
