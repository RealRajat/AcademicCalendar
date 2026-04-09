// Indian Public Holidays 2024–2027
// Includes: national holidays, major festivals, regional observances
// Note: Some festival dates (Holi, Diwali, etc.) vary by year based on the Hindu calendar.

export type HolidayEntry = {
  name: string;
  type: "national" | "festival" | "regional";
};

export const HOLIDAYS: Record<string, HolidayEntry> = {
  // ── 2024 ────────────────────────────────────────────────────────────────
  "2024-01-01": { name: "New Year's Day", type: "festival" },
  "2024-01-14": { name: "Makar Sankranti / Pongal", type: "festival" },
  "2024-01-26": { name: "Republic Day", type: "national" },
  "2024-02-24": { name: "Maha Shivaratri", type: "festival" },
  "2024-03-25": { name: "Holi", type: "festival" },
  "2024-03-29": { name: "Good Friday", type: "festival" },
  "2024-04-09": { name: "Ugadi / Gudi Padwa", type: "festival" },
  "2024-04-14": { name: "Dr. Ambedkar Jayanti / Tamil New Year", type: "national" },
  "2024-04-17": { name: "Ram Navami", type: "festival" },
  "2024-04-21": { name: "Mahavir Jayanti", type: "festival" },
  "2024-04-23": { name: "Hanuman Jayanti", type: "festival" },
  "2024-05-23": { name: "Buddha Purnima", type: "festival" },
  "2024-06-17": { name: "Eid ul-Adha (Bakrid)", type: "festival" },
  "2024-07-17": { name: "Muharram", type: "festival" },
  "2024-08-15": { name: "Independence Day", type: "national" },
  "2024-08-19": { name: "Raksha Bandhan", type: "festival" },
  "2024-08-26": { name: "Janmashtami", type: "festival" },
  "2024-09-07": { name: "Ganesh Chaturthi", type: "festival" },
  "2024-09-16": { name: "Milad-un-Nabi (Prophet's Birthday)", type: "festival" },
  "2024-10-02": { name: "Gandhi Jayanti / Dussehra", type: "national" },
  "2024-10-12": { name: "Dussehra (Vijaya Dashami)", type: "festival" },
  "2024-10-31": { name: "Sardar Patel Jayanti / Halloween", type: "regional" },
  "2024-11-01": { name: "Diwali (Lakshmi Puja)", type: "festival" },
  "2024-11-02": { name: "Govardhan Puja", type: "festival" },
  "2024-11-03": { name: "Bhai Dooj", type: "festival" },
  "2024-11-15": { name: "Guru Nanak Jayanti", type: "festival" },
  "2024-12-25": { name: "Christmas Day", type: "festival" },

  // ── 2025 ────────────────────────────────────────────────────────────────
  "2025-01-01": { name: "New Year's Day", type: "festival" },
  "2025-01-14": { name: "Makar Sankranti / Pongal", type: "festival" },
  "2025-01-26": { name: "Republic Day", type: "national" },
  "2025-02-26": { name: "Maha Shivaratri", type: "festival" },
  "2025-03-13": { name: "Holi", type: "festival" },
  "2025-03-14": { name: "Dhuleti (Holi 2nd day)", type: "festival" },
  "2025-03-30": { name: "Ugadi / Gudi Padwa", type: "festival" },
  "2025-04-06": { name: "Ram Navami", type: "festival" },
  "2025-04-10": { name: "Mahavir Jayanti", type: "festival" },
  "2025-04-14": { name: "Dr. Ambedkar Jayanti / Tamil New Year", type: "national" },
  "2025-04-18": { name: "Good Friday", type: "festival" },
  "2025-05-12": { name: "Buddha Purnima", type: "festival" },
  "2025-06-07": { name: "Eid ul-Adha (Bakrid)", type: "festival" },
  "2025-07-06": { name: "Muharram", type: "festival" },
  "2025-08-09": { name: "Raksha Bandhan", type: "festival" },
  "2025-08-15": { name: "Independence Day", type: "national" },
  "2025-08-16": { name: "Janmashtami", type: "festival" },
  "2025-08-27": { name: "Ganesh Chaturthi", type: "festival" },
  "2025-09-05": { name: "Milad-un-Nabi (Prophet's Birthday)", type: "festival" },
  "2025-10-02": { name: "Gandhi Jayanti & Dussehra", type: "national" },
  "2025-10-20": { name: "Diwali (Lakshmi Puja)", type: "festival" },
  "2025-10-21": { name: "Govardhan Puja", type: "festival" },
  "2025-10-22": { name: "Bhai Dooj", type: "festival" },
  "2025-11-05": { name: "Guru Nanak Jayanti", type: "festival" },
  "2025-12-25": { name: "Christmas Day", type: "festival" },

  // ── 2026 ────────────────────────────────────────────────────────────────
  "2026-01-01": { name: "New Year's Day", type: "festival" },
  "2026-01-14": { name: "Makar Sankranti / Pongal", type: "festival" },
  "2026-01-26": { name: "Republic Day", type: "national" },
  "2026-02-15": { name: "Maha Shivaratri", type: "festival" },
  "2026-03-02": { name: "Holi", type: "festival" },
  "2026-03-03": { name: "Dhuleti (Holi 2nd day)", type: "festival" },
  "2026-03-19": { name: "Ugadi / Gudi Padwa", type: "festival" },
  "2026-03-26": { name: "Ram Navami", type: "festival" },
  "2026-03-30": { name: "Mahavir Jayanti", type: "festival" },
  "2026-04-03": { name: "Good Friday", type: "festival" },
  "2026-04-14": { name: "Dr. Ambedkar Jayanti / Tamil New Year", type: "national" },
  "2026-05-01": { name: "Buddha Purnima", type: "festival" },
  "2026-05-27": { name: "Eid ul-Adha (Bakrid)", type: "festival" },
  "2026-06-26": { name: "Muharram", type: "festival" },
  "2026-07-29": { name: "Raksha Bandhan", type: "festival" },
  "2026-08-05": { name: "Janmashtami", type: "festival" },
  "2026-08-15": { name: "Independence Day", type: "national" },
  "2026-08-17": { name: "Ganesh Chaturthi", type: "festival" },
  "2026-08-25": { name: "Milad-un-Nabi (Prophet's Birthday)", type: "festival" },
  "2026-10-02": { name: "Gandhi Jayanti", type: "national" },
  "2026-10-08": { name: "Dussehra (Vijaya Dashami)", type: "festival" },
  "2026-10-27": { name: "Diwali (Lakshmi Puja)", type: "festival" },  // ← today is Apr 9, 2026!
  "2026-10-28": { name: "Govardhan Puja", type: "festival" },
  "2026-10-29": { name: "Bhai Dooj", type: "festival" },
  "2026-11-24": { name: "Guru Nanak Jayanti", type: "festival" },
  "2026-12-25": { name: "Christmas Day", type: "festival" },

  // ── 2027 ────────────────────────────────────────────────────────────────
  "2027-01-01": { name: "New Year's Day", type: "festival" },
  "2027-01-14": { name: "Makar Sankranti / Pongal", type: "festival" },
  "2027-01-26": { name: "Republic Day", type: "national" },
  "2027-02-20": { name: "Maha Shivaratri", type: "festival" },
  "2027-03-21": { name: "Holi", type: "festival" },
  "2027-03-22": { name: "Dhuleti (Holi 2nd day)", type: "festival" },
  "2027-04-06": { name: "Ugadi / Gudi Padwa", type: "festival" },
  "2027-04-14": { name: "Dr. Ambedkar Jayanti / Tamil New Year", type: "national" },
  "2027-04-15": { name: "Ram Navami", type: "festival" },
  "2027-04-18": { name: "Mahavir Jayanti", type: "festival" },
  "2027-04-26": { name: "Good Friday", type: "festival" },
  "2027-05-20": { name: "Buddha Purnima", type: "festival" },
  "2027-05-17": { name: "Eid ul-Adha (Bakrid)", type: "festival" },
  "2027-06-15": { name: "Muharram", type: "festival" },
  "2027-08-15": { name: "Independence Day", type: "national" },
  "2027-08-17": { name: "Raksha Bandhan", type: "festival" },
  "2027-08-24": { name: "Janmashtami", type: "festival" },
  "2027-09-06": { name: "Ganesh Chaturthi", type: "festival" },
  "2027-10-02": { name: "Gandhi Jayanti", type: "national" },
  "2027-10-27": { name: "Dussehra (Vijaya Dashami)", type: "festival" },
  "2027-11-05": { name: "Diwali (Lakshmi Puja)", type: "festival" },
  "2027-11-06": { name: "Govardhan Puja", type: "festival" },
  "2027-11-07": { name: "Bhai Dooj", type: "festival" },
  "2027-11-13": { name: "Guru Nanak Jayanti", type: "festival" },
  "2027-12-25": { name: "Christmas Day", type: "festival" },
};

/** Returns the holiday name for a date string, or undefined. */
export function getHoliday(dateStr: string): string | undefined {
  return HOLIDAYS[dateStr]?.name;
}

/** Returns the full HolidayEntry (with type) for a date string, or undefined. */
export function getHolidayEntry(dateStr: string): HolidayEntry | undefined {
  return HOLIDAYS[dateStr];
}
