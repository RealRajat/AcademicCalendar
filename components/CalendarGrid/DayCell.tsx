"use client";

import { useState } from "react";
import styles from "./CalendarGrid.module.css";

interface DayCellProps {
  dateStr: string;
  day: number;
  isCurrentMonth: boolean;
  state: "start" | "end" | "inRange" | "today" | "default";
  holiday?: string;
  hasEvents: boolean;
  hasAcademicEvents: boolean;
  academicType?: "exam" | "sessional" | "holiday" | "event"; // top-priority type for label
  isWeekStart: boolean;
  isWeekEnd: boolean;
  onClick: () => void;
}

export default function DayCell({
  dateStr,
  day,
  isCurrentMonth,
  state,
  holiday,
  hasEvents,
  hasAcademicEvents,
  academicType,
  isWeekStart,
  isWeekEnd,
  onClick,
}: DayCellProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const hasDots = isCurrentMonth && (!!holiday || hasEvents || hasAcademicEvents);

  const isRangeEdge = state === "start" || state === "end";
  const isInRange = state === "inRange";
  const hasRangeBand = isInRange || isRangeEdge;

  // Determine which range-band sub-classes to apply
  // For start cell: gradient from transparent (left) to range-mid (right)
  //   - but if start is also a week-end, the band should be capped right
  // For end cell: gradient from range-mid (left) to transparent (right)
  //   - but if end is also a week-start, cap left
  // For inRange at week boundaries: add a rounded cap
  const getBandClasses = () => {
    const classes = [styles.rangeBand];

    if (state === "start") {
      classes.push(styles.bandStart);
      // If start date is also week-end, no right overflow → just right half, already fine
    } else if (state === "end") {
      classes.push(styles.bandEnd);
    } else {
      // inRange
      classes.push(styles.bandMid);
      // Add rounded caps at visual line-break boundaries
      if (isWeekStart) classes.push(styles.bandCapLeft);
      if (isWeekEnd) classes.push(styles.bandCapRight);
    }

    return classes.join(" ");
  };

  return (
    <div
      className={`
        ${styles.dayCellWrapper}
        ${isInRange ? styles.inRangeWrapper : ""}
        ${isRangeEdge ? styles.edgeWrapper : ""}
      `}
      role="gridcell"
    >
      {/* Range band background */}
      {hasRangeBand && (
        <div className={getBandClasses()} aria-hidden="true" />
      )}

      <button
        className={`
          ${styles.dayCell}
          ${!isCurrentMonth ? styles.otherMonth : ""}
          ${state === "today" ? styles.today : ""}
          ${state === "start" ? styles.rangeStart : ""}
          ${state === "end" ? styles.rangeEnd : ""}
          ${state === "inRange" ? styles.inRange : ""}
          ${holiday && isCurrentMonth ? styles.hasHoliday : ""}
        `}
        onClick={onClick}
        disabled={!isCurrentMonth}
        data-date={dateStr}
        aria-label={`${dateStr}${holiday ? `, ${holiday}` : ""}${state !== "default" ? `, ${state}` : ""}`}
        aria-pressed={state === "start" || state === "end"}
        onMouseEnter={() => holiday && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => holiday && setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        tabIndex={isCurrentMonth ? 0 : -1}
      >
        <span className={`${styles.dayNumber} ${holiday && isCurrentMonth ? styles.holidayNumber : ""}`}>{day}</span>
        {/* Unified dots row — holiday (teal) | user event (blue) | academic (amber) */}
        {hasDots && (
          <span className={styles.dotsRow} aria-hidden="true">
            {holiday && <span className={`${styles.dot} ${styles.dotHoliday}`} />}
            {hasEvents && <span className={`${styles.dot} ${styles.dotEvent}`} />}
            {hasAcademicEvents && <span className={`${styles.dot} ${styles.dotAcademic}`} />}
          </span>
        )}
      </button>

      {/* Holiday tooltip */}
      {holiday && showTooltip && isCurrentMonth && (
        <div className={styles.tooltip} role="tooltip">
          🎉 {holiday}
        </div>
      )}
    </div>
  );
}
