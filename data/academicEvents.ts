/**
 * NIET Greater Noida – Academic Calendar Session 2025–2026
 * Even Semester: B.Tech 2nd & 3rd Year | M.Tech (Int.) 2nd, 3rd & 4th Year
 * Extracted from the official NIET Academic Calendar image.
 *
 * Teaching Days (as published):
 *  Jan 2026: 12,13,14,15,16,19,20,21,22,23,27,28,29,30         → 14 days
 *  Feb 2026: 2,3,4,5,6,10,11,12,13,19,20,23,24,25,26,27        → 17 days
 *  Mar 2026: 2,5,10,11,12,13,16,17,18,19,26,27,28,30           → 14 days
 *  Apr 2026: 1,2,3,6,7,8,9,10,13,15,16,17,20,21,22,23,24      → 17 days
 *  May 2026: (End-semester exam period)
 *  Jun 2026: (End-semester exam / result period)
 *
 *  Total Teaching Days : 62
 *  Sessional Exam Days : 10
 *  Other Activity Days : 06
 *  Total Working Days  : 78
 */

export type AcademicEventType = "holiday" | "exam" | "sessional" | "event";

export interface AcademicEvent {
  /** ISO date string: YYYY-MM-DD */
  date: string;
  /** Short descriptive title */
  title: string;
  /** Category of the event */
  type: AcademicEventType;
}

export const academicEvents: AcademicEvent[] = [

  // =========================================================================
  // JANUARY 2026
  // =========================================================================

  // Faculty Development Program (FDP) by SGSST — Jan 5–14
  { date: "2026-01-05", title: "FDP by SGSST – Day 1", type: "event" },
  { date: "2026-01-06", title: "FDP by SGSST – Day 2", type: "event" },
  { date: "2026-01-07", title: "FDP by SGSST – Day 3", type: "event" },
  { date: "2026-01-08", title: "FDP by SGSST – Day 4", type: "event" },
  { date: "2026-01-09", title: "FDP by SGSST – Day 5", type: "event" },
  { date: "2026-01-12", title: "FDP by SGSST – Day 6", type: "event" },
  { date: "2026-01-13", title: "FDP by SGSST – Day 7", type: "event" },
  { date: "2026-01-14", title: "FDP by SGSST – Last Day", type: "event" },

  // Even Semester Begins
  { date: "2026-01-12", title: "Even Semester Classes Commence", type: "event" },

  // Hyderabad Alumni Chapter Meet
  { date: "2026-01-12", title: "Hyderabad Alumni Chapter Meet", type: "event" },

  // Lab Project Evaluation – 1 (2nd Year: SCSST, ME, IT, CSE, MCA) — Jan 12–16
  { date: "2026-01-12", title: "Lab Project Evaluation – 1 (2nd Yr: SCSST/ME/IT/CSE/MCA)", type: "event" },
  { date: "2026-01-13", title: "Lab Project Evaluation – 1 (2nd Yr: SCSST/ME/IT/CSE/MCA)", type: "event" },
  { date: "2026-01-14", title: "Lab Project Evaluation – 1 (2nd Yr: SCSST/ME/IT/CSE/MCA)", type: "event" },
  { date: "2026-01-15", title: "Lab Project Evaluation – 1 (2nd Yr: SCSST/ME/IT/CSE/MCA)", type: "event" },
  { date: "2026-01-16", title: "Lab Project Evaluation – 1 (2nd Yr: SCSST/ME/IT/CSE/MCA)", type: "event" },

  // Republic Day — National Holiday
  { date: "2026-01-26", title: "Republic Day", type: "holiday" },

  // =========================================================================
  // FEBRUARY 2026
  // =========================================================================

  // Workshop Slot 1 – B.Tech 2nd Year, ME Dept. (Feb 2–14)
  { date: "2026-02-02", title: "Workshop Slot 1 – B.Tech 2nd Yr (ME Dept.) Begins", type: "event" },
  { date: "2026-02-03", title: "Workshop Slot 1 – B.Tech 2nd Yr (ME Dept.)", type: "event" },
  { date: "2026-02-04", title: "Workshop Slot 1 – B.Tech 2nd Yr (ME Dept.)", type: "event" },
  { date: "2026-02-05", title: "Workshop Slot 1 – B.Tech 2nd Yr (ME Dept.)", type: "event" },
  { date: "2026-02-06", title: "Workshop Slot 1 – B.Tech 2nd Yr (ME Dept.)", type: "event" },
  { date: "2026-02-10", title: "Workshop Slot 1 – B.Tech 2nd Yr (ME Dept.)", type: "event" },
  { date: "2026-02-11", title: "Workshop Slot 1 – B.Tech 2nd Yr (ME Dept.)", type: "event" },
  { date: "2026-02-12", title: "Workshop Slot 1 – B.Tech 2nd Yr (ME Dept.)", type: "event" },
  { date: "2026-02-13", title: "Workshop Slot 1 – B.Tech 2nd Yr (ME Dept.)", type: "event" },

  // Pitch@NIET by SGSST (Feb 9–13)
  { date: "2026-02-09", title: "Pitch@NIET – Start-up Pitching Event (SGSST)", type: "event" },
  { date: "2026-02-10", title: "Pitch@NIET – Start-up Pitching Event (SGSST)", type: "event" },
  { date: "2026-02-11", title: "Pitch@NIET – Start-up Pitching Event (SGSST)", type: "event" },
  { date: "2026-02-12", title: "Pitch@NIET – Start-up Pitching Event (SGSST)", type: "event" },
  { date: "2026-02-13", title: "Pitch@NIET – Start-up Pitching Event (SGSST)", type: "event" },

  // Lab Project Evaluation – 1 (Last Sem: B.Tech & M.Tech) — Feb 9–13
  { date: "2026-02-09", title: "Lab Project Evaluation – 1 (B.Tech & M.Tech Last Sem.)", type: "event" },
  { date: "2026-02-10", title: "Lab Project Evaluation – 1 (B.Tech & M.Tech Last Sem.)", type: "event" },
  { date: "2026-02-11", title: "Lab Project Evaluation – 1 (B.Tech & M.Tech Last Sem.)", type: "event" },
  { date: "2026-02-12", title: "Lab Project Evaluation – 1 (B.Tech & M.Tech Last Sem.)", type: "event" },
  { date: "2026-02-13", title: "Lab Project Evaluation – 1 (B.Tech & M.Tech Last Sem.)", type: "event" },

  // First Sessional Examination — Feb 11–13
  { date: "2026-02-11", title: "1st Sessional Exam – Day 1", type: "sessional" },
  { date: "2026-02-12", title: "1st Sessional Exam – Day 2", type: "sessional" },
  { date: "2026-02-13", title: "1st Sessional Exam – Day 3", type: "sessional" },

  // Workshop Slot 2 – B.Tech & M.Tech Ind. 2nd Year, ECE Dept. (Feb 11–17)
  { date: "2026-02-11", title: "Workshop Slot 2 – B.Tech & M.Tech 2nd Yr (ECE Dept.)", type: "event" },
  { date: "2026-02-12", title: "Workshop Slot 2 – B.Tech & M.Tech 2nd Yr (ECE Dept.)", type: "event" },
  { date: "2026-02-13", title: "Workshop Slot 2 – B.Tech & M.Tech 2nd Yr (ECE Dept.)", type: "event" },
  { date: "2026-02-16", title: "Workshop Slot 2 – B.Tech & M.Tech 2nd Yr (ECE Dept.)", type: "event" },
  { date: "2026-02-17", title: "Workshop Slot 2 – B.Tech & M.Tech 2nd Yr (ECE Dept.) – Last Day", type: "event" },

  // Maha Shivaratri — Holiday (Feb 15, observed Feb 16 as working day off)
  { date: "2026-02-15", title: "Maha Shivaratri", type: "holiday" },
  { date: "2026-02-16", title: "Maha Shivaratri (Observed Holiday)", type: "holiday" },

  // Workshop Slot 3 – B.Tech & M.Tech 3rd Year, SCSST & ECE Dept. (Feb 17–20)
  { date: "2026-02-17", title: "Workshop Slot 3 – B.Tech & M.Tech 3rd Yr (SCSST & ECE)", type: "event" },
  { date: "2026-02-18", title: "Workshop Slot 3 – B.Tech & M.Tech 3rd Yr (SCSST & ECE)", type: "event" },
  { date: "2026-02-19", title: "Workshop Slot 3 – B.Tech & M.Tech 3rd Yr (SCSST & ECE)", type: "event" },
  { date: "2026-02-20", title: "Workshop Slot 3 – B.Tech & M.Tech 3rd Yr (SCSST & ECE) – Last Day", type: "event" },

  // Peer Alumni Chapter Meet (Feb 23–25)
  { date: "2026-02-23", title: "Peer Alumni Chapter Meet", type: "event" },
  { date: "2026-02-24", title: "Peer Alumni Chapter Meet", type: "event" },
  { date: "2026-02-25", title: "Peer Alumni Chapter Meet", type: "event" },

  // Display of 1st Sessional Marks & Result Analysis
  { date: "2026-02-26", title: "Display of 1st Sessional Marks & Result Analysis", type: "event" },

  // National Science Day
  { date: "2026-02-28", title: "National Science Day", type: "event" },

  // =========================================================================
  // MARCH 2026
  // =========================================================================

  // Holi — Festival Holiday (Mar 2–3)
  { date: "2026-03-02", title: "Holika Dahan", type: "holiday" },
  { date: "2026-03-03", title: "Holi", type: "holiday" },

  // Sports & Tech Fest — Mar 4–7
  { date: "2026-03-04", title: "Sports & Tech Fest – Day 1", type: "event" },
  { date: "2026-03-05", title: "Sports & Tech Fest – Day 2", type: "event" },
  { date: "2026-03-06", title: "Sports & Tech Fest – Day 3", type: "event" },
  { date: "2026-03-07", title: "Sports & Tech Fest – Day 4", type: "event" },

  // International Women's Day Celebration — Mar 8
  { date: "2026-03-08", title: "International Women's Day Celebration", type: "event" },

  // Workshop Slot – B.Tech & M.Tech 2nd Yr, SCSST & BT Dept. (Mar 9–21 approx.)
  { date: "2026-03-09", title: "Workshop Slot – B.Tech & M.Tech 2nd Yr (SCSST & BT Dept.)", type: "event" },
  { date: "2026-03-10", title: "Workshop Slot – B.Tech & M.Tech 2nd Yr (SCSST & BT Dept.)", type: "event" },
  { date: "2026-03-11", title: "Workshop Slot – B.Tech & M.Tech 2nd Yr (SCSST & BT Dept.)", type: "event" },
  { date: "2026-03-12", title: "Workshop Slot – B.Tech & M.Tech 2nd Yr (SCSST & BT Dept.)", type: "event" },
  { date: "2026-03-13", title: "Workshop Slot – B.Tech & M.Tech 2nd Yr (SCSST & BT Dept.)", type: "event" },
  { date: "2026-03-16", title: "Workshop Slot – B.Tech & M.Tech 2nd Yr (SCSST & BT Dept.)", type: "event" },
  { date: "2026-03-17", title: "Workshop Slot – B.Tech & M.Tech 2nd Yr (SCSST & BT Dept.)", type: "event" },
  { date: "2026-03-18", title: "Workshop Slot – B.Tech & M.Tech 2nd Yr (SCSST & BT Dept.)", type: "event" },
  { date: "2026-03-19", title: "Workshop Slot – B.Tech & M.Tech 2nd Yr (SCSST & BT Dept.)", type: "event" },

  // Eid-ul-Fitr — Holiday (tentative, Mar 20–21)
  { date: "2026-03-20", title: "Eid-ul-Fitr (Tentative Holiday)", type: "holiday" },
  { date: "2026-03-21", title: "Eid-ul-Fitr (Tentative Holiday)", type: "holiday" },

  // Second Sessional Examination — Mar 23–25
  { date: "2026-03-23", title: "2nd Sessional Exam – Day 1", type: "sessional" },
  { date: "2026-03-24", title: "2nd Sessional Exam – Day 2", type: "sessional" },
  { date: "2026-03-25", title: "2nd Sessional Exam – Day 3", type: "sessional" },

  // Workshop Slot – M.Tech 2nd Year (SGSST & ECE) — Mar 27–28
  { date: "2026-03-27", title: "Workshop Slot – M.Tech 2nd Yr (SGSST & ECE Dept.)", type: "event" },
  { date: "2026-03-28", title: "Workshop Slot – M.Tech 2nd Yr (SGSST & ECE Dept.) – Last Day", type: "event" },

  // Lab Project Evaluation – 2 (B.Tech & M.Tech) — Mar 24–30
  { date: "2026-03-26", title: "Lab Project Evaluation – 2 (B.Tech & M.Tech)", type: "event" },
  { date: "2026-03-27", title: "Lab Project Evaluation – 2 (B.Tech & M.Tech)", type: "event" },
  { date: "2026-03-28", title: "Lab Project Evaluation – 2 (B.Tech & M.Tech)", type: "event" },
  { date: "2026-03-30", title: "Lab Project Evaluation – 2 (B.Tech & M.Tech) – Last Day", type: "event" },

  // =========================================================================
  // APRIL 2026
  // =========================================================================

  // Pitch@NIET 3.0 by SGSST (Apr 4)
  { date: "2026-04-04", title: "Pitch@NIET 3.0 – Start-up Pitching Competition (SGSST)", type: "event" },

  // Display of 2nd Sessional Marks & Result Analysis (Apr 8)
  { date: "2026-04-08", title: "Display of 2nd Sessional Marks & Result Analysis", type: "event" },

  // Sanskriti – Cultural Fest / Project Exhibition (Apr 11)
  { date: "2026-04-11", title: "Sanskriti – Cultural Fest & Project Exhibition", type: "event" },

  // Lab Project Evaluation – 2 (Last Sem: B.Tech & M.Tech) — Apr 13–19
  { date: "2026-04-13", title: "Lab Project Evaluation – 2 (B.Tech & M.Tech Last Sem.)", type: "event" },
  { date: "2026-04-14", title: "Lab Project Evaluation – 2 (B.Tech & M.Tech Last Sem.)", type: "event" },
  { date: "2026-04-15", title: "Lab Project Evaluation – 2 (B.Tech & M.Tech Last Sem.)", type: "event" },
  { date: "2026-04-16", title: "Lab Project Evaluation – 2 (B.Tech & M.Tech Last Sem.)", type: "event" },
  { date: "2026-04-17", title: "Lab Project Evaluation – 2 (B.Tech & M.Tech Last Sem.)", type: "event" },
  { date: "2026-04-19", title: "Lab Project Evaluation – 2 (B.Tech & M.Tech Last Sem.) – Last Day", type: "event" },

  // Dr. B.R. Ambedkar Jayanti — National Holiday (Apr 14)
  { date: "2026-04-14", title: "Dr. B.R. Ambedkar Jayanti", type: "holiday" },

  // Third Sessional Examination / PUT Exam — Apr 27–30
  { date: "2026-04-27", title: "3rd Sessional Exam (PUT) – Day 1", type: "sessional" },
  { date: "2026-04-28", title: "3rd Sessional Exam (PUT) – Day 2", type: "sessional" },
  { date: "2026-04-29", title: "3rd Sessional Exam (PUT) – Day 3", type: "sessional" },
  { date: "2026-04-30", title: "3rd Sessional Exam (PUT) – Day 4", type: "sessional" },

  // =========================================================================
  // MAY 2026
  // =========================================================================

  // End Semester Theory Examination (External) — May 1–16
  { date: "2026-05-01", title: "End Semester Theory Exam – Day 1", type: "exam" },
  { date: "2026-05-04", title: "End Semester Theory Exam – Day 2", type: "exam" },
  { date: "2026-05-05", title: "End Semester Theory Exam – Day 3", type: "exam" },
  { date: "2026-05-06", title: "End Semester Theory Exam – Day 4", type: "exam" },
  { date: "2026-05-07", title: "End Semester Theory Exam – Day 5", type: "exam" },
  { date: "2026-05-08", title: "End Semester Theory Exam – Day 6", type: "exam" },
  { date: "2026-05-11", title: "End Semester Theory Exam – Day 7", type: "exam" },
  { date: "2026-05-12", title: "End Semester Theory Exam – Day 8", type: "exam" },
  { date: "2026-05-13", title: "End Semester Theory Exam – Day 9", type: "exam" },
  { date: "2026-05-14", title: "End Semester Theory Exam – Day 10", type: "exam" },
  { date: "2026-05-15", title: "End Semester Theory Exam – Day 11", type: "exam" },
  { date: "2026-05-16", title: "End Semester Theory Exam – Last Day", type: "exam" },

  // National Technology Day (May 11)
  { date: "2026-05-11", title: "National Technology Day", type: "event" },

  // End Semester External Practical Examination — May 11–27
  { date: "2026-05-11", title: "End Semester Practical Exam Begins", type: "exam" },
  { date: "2026-05-12", title: "End Semester Practical Exam", type: "exam" },
  { date: "2026-05-13", title: "End Semester Practical Exam", type: "exam" },
  { date: "2026-05-14", title: "End Semester Practical Exam", type: "exam" },
  { date: "2026-05-15", title: "End Semester Practical Exam", type: "exam" },
  { date: "2026-05-18", title: "End Semester Practical Exam", type: "exam" },
  { date: "2026-05-19", title: "End Semester Practical Exam", type: "exam" },
  { date: "2026-05-20", title: "End Semester Practical Exam", type: "exam" },
  { date: "2026-05-21", title: "End Semester Practical Exam", type: "exam" },
  { date: "2026-05-22", title: "End Semester Practical Exam", type: "exam" },
  { date: "2026-05-25", title: "End Semester Practical Exam", type: "exam" },
  { date: "2026-05-26", title: "End Semester Practical Exam", type: "exam" },
  { date: "2026-05-27", title: "End Semester Practical Exam – Last Day", type: "exam" },

  // International Biological Diversity Day (May 22)
  { date: "2026-05-22", title: "International Day for Biological Diversity", type: "event" },

  // Buddha Purnima / Eid ul-Adha — Holiday (May 27)
  { date: "2026-05-27", title: "Eid ul-Adha (Bakrid)", type: "holiday" },

  // =========================================================================
  // JUNE 2026
  // =========================================================================

  // World Environment Day (Jun 5)
  { date: "2026-06-05", title: "World Environment Day", type: "event" },

  // Muharram — Holiday (Jun 25–26)
  { date: "2026-06-25", title: "Muharram (Islamic New Year)", type: "holiday" },

];

// ── Helper Functions ───────────────────────────────────────────────────────

/**
 * Get all academic events for a given date string (YYYY-MM-DD).
 */
export function getAcademicEventsForDate(dateStr: string): AcademicEvent[] {
  return academicEvents.filter((e) => e.date === dateStr);
}

/**
 * Get all events of a specific type.
 */
export function getAcademicEventsByType(type: AcademicEventType): AcademicEvent[] {
  return academicEvents.filter((e) => e.type === type);
}

/**
 * Check if a date has any academic event (of optional specific type).
 */
export function hasAcademicEvent(dateStr: string, type?: AcademicEventType): boolean {
  return academicEvents.some(
    (e) => e.date === dateStr && (type === undefined || e.type === type)
  );
}
