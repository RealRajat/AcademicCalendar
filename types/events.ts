// ── Calendar Event Types ────────────────────────────────────────────────────

/** A single user-created calendar event */
export interface CalendarEvent {
  /** Unique identifier (timestamp-based UUID) */
  id: string;
  /** ISO date string: YYYY-MM-DD */
  date: string;
  /** Short title shown on the calendar */
  title: string;
  /** Optional longer description */
  description?: string;
}

/**
 * Flat map of all events, keyed by date string (YYYY-MM-DD).
 * Each date maps to an array of events (zero or more).
 */
export type EventsStore = Record<string, CalendarEvent[]>;
