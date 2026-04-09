"use client";

import { useMemo, useCallback, useRef, useEffect } from "react";
import type { DateRange } from "@/components/CalendarApp";
import type { EventsStore } from "@/types/events";
import { hasAcademicEvent, getAcademicEventsForDate, type AcademicEventType } from "@/data/academicEvents";
import DayCell from "./DayCell";
import styles from "./CalendarGrid.module.css";

// Priority order for the single type label shown on each cell
const TYPE_PRIORITY: AcademicEventType[] = ["exam", "sessional", "holiday", "event"];

function getTopAcademicType(dateStr: string): AcademicEventType | undefined {
  const items = getAcademicEventsForDate(dateStr);
  if (!items.length) return undefined;
  for (const t of TYPE_PRIORITY) {
    if (items.some((e) => e.type === t)) return t;
  }
  return items[0].type;
}

interface CalendarGridProps {
  month: number;
  year: number;
  range: DateRange;
  today: Date;
  events: EventsStore;
  onDayClick: (dateStr: string) => void;
  getHoliday: (dateStr: string) => string | undefined;
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toDateStr(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export default function CalendarGrid({
  month,
  year,
  range,
  today,
  events,
  onDayClick,
  getHoliday,
}: CalendarGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  const todayStr = toDateStr(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  // Build the grid of day cells
  const cells = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const grid: Array<{
      dateStr: string;
      day: number;
      isCurrentMonth: boolean;
      monthOffset: number; // -1, 0, +1
    }> = [];

    // Previous month overflow
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const m = month - 1;
      const y = m < 0 ? year - 1 : year;
      const mm = m < 0 ? 11 : m;
      grid.push({ dateStr: toDateStr(y, mm, d), day: d, isCurrentMonth: false, monthOffset: -1 });
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      grid.push({ dateStr: toDateStr(year, month, d), day: d, isCurrentMonth: true, monthOffset: 0 });
    }

    // Next month overflow to complete 6 rows
    const remaining = 42 - grid.length;
    for (let d = 1; d <= remaining; d++) {
      const m = month + 1;
      const y = m > 11 ? year + 1 : year;
      const mm = m > 11 ? 0 : m;
      grid.push({ dateStr: toDateStr(y, mm, d), day: d, isCurrentMonth: false, monthOffset: 1 });
    }

    return grid;
  }, [month, year]);

  // Compute day state for range visualization
  const getDayState = useCallback(
    (dateStr: string): "start" | "end" | "inRange" | "today" | "default" => {
      if (dateStr === range.start) return "start";
      if (dateStr === range.end) return "end";
      if (range.start && range.end && dateStr > range.start && dateStr < range.end)
        return "inRange";
      if (dateStr === todayStr) return "today";
      return "default";
    },
    [range, todayStr]
  );

  // Keyboard navigation within grid
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const focused = document.activeElement as HTMLButtonElement;
      if (!focused?.dataset?.date) return;

      const currentDateStr = focused.dataset.date;
      const allButtons = Array.from(grid.querySelectorAll("button[data-date]")) as HTMLButtonElement[];
      const currentIndex = allButtons.findIndex((b) => b.dataset.date === currentDateStr);
      if (currentIndex === -1) return;

      let nextIndex = currentIndex;
      if (e.key === "ArrowRight") nextIndex = currentIndex + 1;
      else if (e.key === "ArrowLeft") nextIndex = currentIndex - 1;
      else if (e.key === "ArrowDown") nextIndex = currentIndex + 7;
      else if (e.key === "ArrowUp") nextIndex = currentIndex - 7;
      else return;

      e.preventDefault();
      const next = allButtons[nextIndex];
      if (next) next.focus();
    };

    grid.addEventListener("keydown", handleKeyDown);
    return () => grid.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={styles.calendarGrid} ref={gridRef} role="grid" aria-label={`Calendar grid`}>
      {/* Day name headers */}
      <div className={styles.dayHeaders} role="row">
        {DAY_NAMES.map((name) => (
          <div
            key={name}
            className={styles.dayHeader}
            role="columnheader"
            aria-label={name}
          >
            {name}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className={styles.daysGrid} role="rowgroup">
        {cells.map((cell, i) => {
          const state = getDayState(cell.dateStr);
          const holiday = getHoliday(cell.dateStr);
          const isWeekStart = i % 7 === 0;
          const isWeekEnd = i % 7 === 6;

          return (
            <DayCell
              key={cell.dateStr}
              dateStr={cell.dateStr}
              day={cell.day}
              isCurrentMonth={cell.isCurrentMonth}
              state={state}
              holiday={holiday}
              hasEvents={!!(events[cell.dateStr]?.length)}
              hasAcademicEvents={cell.isCurrentMonth && hasAcademicEvent(cell.dateStr)}
              academicType={cell.isCurrentMonth ? getTopAcademicType(cell.dateStr) : undefined}
              isWeekStart={isWeekStart}
              isWeekEnd={isWeekEnd}
              onClick={() => {
                if (cell.isCurrentMonth) onDayClick(cell.dateStr);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
