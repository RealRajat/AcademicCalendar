"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { DateRange } from "@/components/CalendarApp";
import type { MonthTheme } from "@/data/monthThemes";
import type { NotesStore } from "@/components/CalendarApp";
import { getAcademicEventsForDate, academicEvents, type AcademicEventType } from "@/data/academicEvents";
import styles from "./NotesPanel.module.css";

interface NotesPanelProps {
  monthKey: string;
  rangeKey: string | null;
  range: DateRange;
  notes: NotesStore;
  onUpdateNote: (key: string, value: string) => void;
  onClearRange: () => void;
  theme: MonthTheme;
}

function formatDateLabel(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function formatRangeLabel(range: DateRange): string {
  if (!range.start) return "";
  if (!range.end) return formatDateLabel(range.start);
  return `${formatDateLabel(range.start)} – ${formatDateLabel(range.end)}`;
}

// ── Per-date events (shown when a date is selected) ──────────────────────────

const TYPE_LABEL: Record<string, string> = {
  sessional: "Sessional",
  exam: "Exam",
  holiday: "Holiday",
  event: "Activity",
};

function AcademicEventsList({ dateStr }: { dateStr: string }) {
  const items = getAcademicEventsForDate(dateStr);
  if (!items.length) return null;
  return (
    <div className={styles.academicSection}>
      <p className={styles.academicSectionLabel}>📅 {formatDateLabel(dateStr)}</p>
      {items.map((item, i) => (
        <div key={i} className={styles.academicRow}>
          <span className={`${styles.academicRowBadge} ${styles[item.type]}`}>
            {TYPE_LABEL[item.type] ?? item.type}
          </span>
          <span className={styles.academicRowTitle}>{item.title}</span>
        </div>
      ))}
    </div>
  );
}

// ── Monthly grouped summary ───────────────────────────────────────────────────

const GROUP_CONFIG: { type: AcademicEventType; icon: string; label: string }[] = [
  { type: "sessional", icon: "📝", label: "Sessional Exams" },
  { type: "exam",      icon: "📋", label: "End Semester Exams" },
  { type: "holiday",  icon: "🎉", label: "Holidays" },
  { type: "event",    icon: "🎯", label: "Activities & Workshops" },
];

function formatShortDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${d} ${months[m - 1]}`;
}

function MonthlyAcademicSummary({ monthKey }: { monthKey: string }) {
  // Filter all events whose date starts with "YYYY-MM"
  const monthEvents = academicEvents.filter((e) => e.date.startsWith(monthKey));
  if (!monthEvents.length) return null;

  // Deduplicate by date+type+title and group
  const seen = new Set<string>();
  const groups: Record<AcademicEventType, { date: string; title: string }[]> = {
    sessional: [], exam: [], holiday: [], event: [],
  };
  for (const e of monthEvents) {
    const key = `${e.date}|${e.type}|${e.title}`;
    if (seen.has(key)) continue;
    seen.add(key);
    groups[e.type].push({ date: e.date, title: e.title });
  }

  const hasAny = Object.values(groups).some((g) => g.length > 0);
  if (!hasAny) return null;

  return (
    <div className={styles.monthlySummary}>
      {GROUP_CONFIG.map(({ type, icon, label }) => {
        const items = groups[type];
        if (!items.length) return null;
        return (
          <div key={type} className={styles.monthGroup}>
            <p className={`${styles.monthGroupHeader} ${styles[type]}`}>
              {icon} {label}
            </p>
            <ul className={styles.monthGroupList}>
              {items.map((item, i) => (
                <li key={i} className={styles.monthGroupItem}>
                  <span className={styles.monthGroupDate}>{formatShortDate(item.date)}</span>
                  <span className={styles.monthGroupTitle}>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}


export default function NotesPanel({
  monthKey,
  rangeKey,
  range,
  notes,
  onUpdateNote,
  onClearRange,
  theme,
}: NotesPanelProps) {
  const [activeTab, setActiveTab] = useState<"month" | "daily">("month");
  const [saveFlash, setSaveFlash] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-switch to Daily tab whenever a date is clicked
  const selectedDate = range.start;
  useEffect(() => {
    if (selectedDate) setActiveTab("daily");
  }, [selectedDate]);

  const handleChange = useCallback(
    (key: string, value: string) => {
      onUpdateNote(key, value);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        setSaveFlash(true);
        setTimeout(() => setSaveFlash(false), 1500);
      }, 800);
    },
    [onUpdateNote]
  );

  // Note keys: month tab → "YYYY-MM", daily tab → "YYYY-MM-DD"
  const dailyKey = selectedDate ?? null;
  const activeKey = activeTab === "month" ? monthKey : (dailyKey ?? monthKey);
  const activeNote = notes[activeKey] ?? "";
  const charCount = activeNote.length;
  const maxChars = 500;

  return (
    <div className={styles.notesPanel}>
      {/* Tabs */}
      <div className={styles.tabs} role="tablist" aria-label="Notes tabs">
        {/* Month tab */}
        <button
          className={`${styles.tab} ${activeTab === "month" ? styles.tabActive : ""}`}
          role="tab"
          aria-selected={activeTab === "month"}
          aria-controls="panel-month"
          id="tab-month"
          onClick={() => setActiveTab("month")}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Events
        </button>

        {/* Daily Notes tab — always enabled */}
        <button
          className={`${styles.tab} ${activeTab === "daily" ? styles.tabActive : ""}`}
          role="tab"
          aria-selected={activeTab === "daily"}
          aria-controls="panel-daily"
          id="tab-daily"
          onClick={() => setActiveTab("daily")}
          aria-label={selectedDate ? `Daily notes for ${formatDateLabel(selectedDate)}` : "Daily Notes"}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
          </svg>
          {selectedDate ? formatDateLabel(selectedDate) : "Daily Notes"}
        </button>
      </div>

      {/* Note area */}
      <div
        className={styles.noteArea}
        id={activeTab === "month" ? "panel-month" : "panel-daily"}
        role="tabpanel"
        aria-labelledby={activeTab === "month" ? "tab-month" : "tab-daily"}
      >
        {/* ── Month tab — sirf events list ── */}
        {activeTab === "month" && (
          <>
            {!selectedDate && <MonthlyAcademicSummary monthKey={monthKey} />}
            {selectedDate && <AcademicEventsList dateStr={selectedDate} />}
          </>
        )}

        {/* ── Daily tab ── */}
        {activeTab === "daily" && !selectedDate && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📅</div>
            <p>Calendar mein koi bhi date click karo — us din ke notes yahan dikhenge.</p>
          </div>
        )}

        {activeTab === "daily" && selectedDate && (
          <>
            {/* Date header with clear button */}
            <div className={styles.rangeHeader}>
              <span className={styles.rangeLabel}>
                📅 {formatDateLabel(selectedDate)}
              </span>
              <button
                className={styles.clearRangeBtn}
                onClick={onClearRange}
                title="Clear selection"
                aria-label="Clear selected date"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                Clear
              </button>
            </div>

            {/* Academic events for this date */}
            <AcademicEventsList dateStr={selectedDate} />

            {/* Free-form daily notes textarea */}
            <textarea
              ref={textareaRef}
              className={styles.textarea}
              value={activeNote}
              onChange={(e) => handleChange(activeKey, e.target.value)}
              placeholder={`Notes for ${formatDateLabel(selectedDate)}… tasks, reminders, thoughts`}
              maxLength={maxChars}
              aria-label={`Daily notes for ${formatDateLabel(selectedDate)}`}
              spellCheck
              autoFocus
            />
            <div className={styles.noteFooter}>
              <span
                className={`${styles.saveIndicator} ${saveFlash ? styles.saveFlashAnim : ""}`}
                aria-live="polite" aria-atomic="true"
              >
                {saveFlash ? "✓ Saved" : ""}
              </span>
              <span className={`${styles.charCount} ${charCount > maxChars * 0.85 ? styles.charCountWarn : ""}`}>
                {charCount}/{maxChars}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
