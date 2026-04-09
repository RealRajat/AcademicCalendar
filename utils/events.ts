import type { CalendarEvent, EventsStore } from "@/types/events";

const STORAGE_KEY = "wall-calendar-events";

// ── localStorage helpers ────────────────────────────────────────────────────

/** Load all events from localStorage. Returns an empty store on failure. */
export function loadEvents(): EventsStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as EventsStore;
  } catch {
    return {};
  }
}

/** Persist the entire EventsStore to localStorage. */
export function saveEvents(store: EventsStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {}
}

// ── CRUD helpers ────────────────────────────────────────────────────────────

/** Generate a simple unique ID using timestamp + random suffix. */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Add a new event to the store (immutable — returns a new store). */
export function addEvent(
  store: EventsStore,
  event: Omit<CalendarEvent, "id">
): EventsStore {
  const newEvent: CalendarEvent = { ...event, id: generateId() };
  const existing = store[event.date] ?? [];
  return { ...store, [event.date]: [...existing, newEvent] };
}

/** Update an existing event in the store (immutable). */
export function updateEvent(
  store: EventsStore,
  updated: CalendarEvent
): EventsStore {
  const existing = store[updated.date] ?? [];
  return {
    ...store,
    [updated.date]: existing.map((e) => (e.id === updated.id ? updated : e)),
  };
}

/** Delete an event from the store by id (immutable). */
export function deleteEvent(
  store: EventsStore,
  date: string,
  id: string
): EventsStore {
  const existing = store[date] ?? [];
  const updated = existing.filter((e) => e.id !== id);
  const next = { ...store };
  if (updated.length === 0) {
    delete next[date];
  } else {
    next[date] = updated;
  }
  return next;
}

/** Get all events for a specific date, sorted by insertion order. */
export function getEventsForDate(
  store: EventsStore,
  date: string
): CalendarEvent[] {
  return store[date] ?? [];
}
