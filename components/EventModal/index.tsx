"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import type { CalendarEvent, EventsStore } from "@/types/events";
import { getHolidayEntry } from "@/data/holidays";
import { getAcademicEventsForDate } from "@/data/academicEvents";
import { addEvent, updateEvent, deleteEvent, getEventsForDate } from "@/utils/events";
import styles from "./EventModal.module.css";

// ── Helpers ───────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function parseDateStr(dateStr: string): { year: number; month: number; day: number } {
  const [y, m, d] = dateStr.split("-").map(Number);
  return { year: y, month: m - 1, day: d };
}

function formatDateLabel(dateStr: string): string {
  const { year, month, day } = parseDateStr(dateStr);
  const date = new Date(year, month, day);
  const dow = DAY_NAMES[date.getDay()];
  return `${dow}, ${day} ${MONTH_NAMES[month]} ${year}`;
}

// ── EventModal Props ──────────────────────────────────────────────────────

interface EventModalProps {
  dateStr: string;
  events: EventsStore;
  onEventsChange: (next: EventsStore) => void;
  onClose: () => void;
}

// ── Inline Edit Form ──────────────────────────────────────────────────────

function EditForm({
  event,
  onSave,
  onCancel,
}: {
  event: CalendarEvent;
  onSave: (updated: CalendarEvent) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(event.title);
  const [desc, setDesc] = useState(event.description ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  return (
    <form
      className={styles.editForm}
      onSubmit={(e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSave({ ...event, title: title.trim(), description: desc.trim() || undefined });
      }}
    >
      <input
        ref={inputRef}
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event title"
        required
      />
      <textarea
        className={styles.textarea}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description (optional)"
        rows={2}
      />
      <div className={styles.formRow}>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={styles.submitBtn} disabled={!title.trim()}>
          Save
        </button>
      </div>
    </form>
  );
}

// ── Main Modal ────────────────────────────────────────────────────────────

export default function EventModal({ dateStr, events, onEventsChange, onClose }: EventModalProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [mounted, setMounted] = useState(false);
  const addInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const dateEvents = getEventsForDate(events, dateStr);
  const holidayEntry = getHolidayEntry(dateStr);
  const academicItems = getAcademicEventsForDate(dateStr);

  // Badge label map
  const badgeLabel: Record<string, string> = {
    sessional: "Sessional",
    exam: "Exam",
    holiday: "Holiday",
    event: "Activity",
  };

  const handleAdd = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const next = addEvent(events, { date: dateStr, title: newTitle.trim(), description: newDesc.trim() || undefined });
    onEventsChange(next);
    setNewTitle("");
    setNewDesc("");
    addInputRef.current?.focus();
  }, [events, dateStr, newTitle, newDesc, onEventsChange]);

  const handleSaveEdit = useCallback((updated: CalendarEvent) => {
    const next = updateEvent(events, updated);
    onEventsChange(next);
    setEditingId(null);
  }, [events, onEventsChange]);

  const handleDelete = useCallback((id: string) => {
    const next = deleteEvent(events, dateStr, id);
    onEventsChange(next);
  }, [events, dateStr, onEventsChange]);

  const holidayIcon = holidayEntry?.type === "national" ? "🇮🇳"
    : holidayEntry?.type === "festival" ? "🎉"
    : "📍";

  if (!mounted) return null;

  return createPortal(
    <div
      className={styles.overlay}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Events for ${dateStr}`}
    >
      <div className={styles.modal}>
        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.dateInfo}>
            <span className={styles.dateLabel}>{formatDateLabel(dateStr)}</span>
            <span className={styles.dateSub}>{dateStr}</span>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* ── Body ── */}
        <div className={styles.body}>
          {/* Holiday banner (Indian national/festival holiday) */}
          {holidayEntry && (
            <div className={`${styles.holidayBanner} ${styles[holidayEntry.type]}`}>
              <span className={styles.holidayIcon}>{holidayIcon}</span>
              <span>{holidayEntry.name}</span>
            </div>
          )}

          {/* Academic schedule section */}
          {academicItems.length > 0 && (
            <div>
              <p className={styles.sectionLabel}>🏫 Academic Schedule ({academicItems.length})</p>
              <div className={styles.academicList}>
                {academicItems.map((item, idx) => (
                  <div key={idx} className={styles.academicItem}>
                    <span className={`${styles.academicBadge} ${styles[item.type]}`}>
                      {badgeLabel[item.type] ?? item.type}
                    </span>
                    <span className={styles.academicTitle}>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events section */}
          <div>
            <p className={styles.sectionLabel}>
              {dateEvents.length > 0 ? `${dateEvents.length} Event${dateEvents.length > 1 ? "s" : ""}` : "Events"}
            </p>
            <div className={styles.eventList}>
              {dateEvents.length === 0 && (
                <p className={styles.emptyEvents}>No events — add one below.</p>
              )}
              {dateEvents.map((evt) =>
                editingId === evt.id ? (
                  <div key={evt.id} className={styles.eventItem}>
                    <div className={styles.eventDotInline} />
                    <EditForm
                      event={evt}
                      onSave={handleSaveEdit}
                      onCancel={() => setEditingId(null)}
                    />
                  </div>
                ) : (
                  <div key={evt.id} className={styles.eventItem}>
                    <div className={styles.eventDotInline} />
                    <div className={styles.eventContent}>
                      <p className={styles.eventTitle}>{evt.title}</p>
                      {evt.description && (
                        <p className={styles.eventDesc}>{evt.description}</p>
                      )}
                    </div>
                    <div className={styles.eventActions}>
                      <button
                        className={styles.actionBtn}
                        onClick={() => setEditingId(evt.id)}
                        title="Edit event"
                        aria-label={`Edit event: ${evt.title}`}
                      >
                        ✎
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.delete}`}
                        onClick={() => handleDelete(evt.id)}
                        title="Delete event"
                        aria-label={`Delete event: ${evt.title}`}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className={styles.divider} />

          {/* Add event form */}
          <form className={styles.addForm} onSubmit={handleAdd}>
            <p className={styles.formTitle}>Add Event</p>
            <input
              ref={addInputRef}
              id="new-event-title"
              className={styles.input}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Event title *"
              required
              autoFocus
            />
            <textarea
              id="new-event-desc"
              className={styles.textarea}
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Description (optional)"
              rows={2}
            />
            <div className={styles.formRow}>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={!newTitle.trim()}
              >
                + Add Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
