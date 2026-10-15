// Static fallback for /anti-ragging, used when Supabase is unreachable or the
// admin hasn't filled in a field yet. Editable via /admin → Anti-Ragging.
// Lists are stored one item per line; the intro uses blank lines between
// paragraphs.

export type AntiRaggingInfo = {
  intro: string;
  helplinePhone: string;
  helplineEmail: string;
  collegeContact: string;
  whatIsRagging: string[];
  punishments: string[];
  undertaking: string;
  appointmentOrder: string;
  appointmentDate: string;
  pdfUrl: string;
  pdfLabel: string;
};

export type AntiRaggingMember = {
  id: number;
  name: string;
  role: string;
  department: string;
  mobile: string;
  email: string;
};

export type AntiRaggingDocument = {
  id: number;
  title: string;
  year: string;
  pdfUrl: string;
};

export const lines = (text: string | null | undefined): string[] =>
  (text ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

export const antiRaggingFallback: AntiRaggingInfo = {
  intro: `Ragging in any form is strictly prohibited at Akhil Bharti Group of Institutes. It is a criminal offence and a violation of human dignity, and the Hon'ble Supreme Court of India has directed every institution of higher education to curb it.

The Anti-Ragging Committee and Anti-Ragging Squad work throughout the year to keep the campus, hostels and transport safe for every student. Awareness drives are held before each new session, and senior students are counselled on the consequences of ragging.

At the time of admission, every student and their parent/guardian must submit an anti-ragging undertaking. A student found guilty of ragging will face strict disciplinary action, including cancellation of admission.`,
  helplinePhone: "1800-180-5522",
  helplineEmail: "helpline@antiragging.in",
  collegeContact: "",
  whatIsRagging: lines(`Any conduct, by words spoken or written or by an act, that teases, treats or handles a fresher or any other student with rudeness
Indulging in rowdy or undisciplined activities that cause annoyance, hardship or psychological harm
Asking a student to do any act that they would not do in the ordinary course and that causes shame, torment or embarrassment
Any act by a senior that prevents, disrupts or disturbs the regular academic activity of another student
Exploiting the services of a fresher for completing academic tasks assigned to an individual or group
Any act of financial extortion or forceful expenditure burden put on a fresher
Any act of physical abuse, including sexual abuse, homosexual assaults, stripping, forcing obscene and lewd acts, or gestures causing bodily harm
Any act or abuse by spoken words, emails, posts or public insults, including deriving perverted pleasure from the embarrassment of a fresher
Any act that affects the mental health and self-confidence of a fresher, with or without an intent to derive sadistic pleasure`),
  punishments: lines(`Suspension from attending classes and academic privileges
Withholding or withdrawing scholarships, fellowships and other benefits
Debarring from appearing in any test or examination, or withholding results
Debarring from representing the institution in any event, tournament or youth festival
Suspension or expulsion from the hostel
Cancellation of admission
Rustication from the institution for a period of one to four semesters
Expulsion from the institution and debarring from admission to any other institution
Fine and collective punishment where the persons committing ragging are not identified
Registration of an FIR with the police under the relevant provisions of law`),
  undertaking:
    "As per UGC Regulations on Curbing the Menace of Ragging in Higher Educational Institutions, 2009, every student and their parent/guardian must submit an online anti-ragging undertaking at www.antiragging.in at the time of admission and at the start of every academic year, and submit a copy to the institute.",
  appointmentOrder: "",
  appointmentDate: "",
  pdfUrl: "",
  pdfLabel: "Download Anti-Ragging Policy (PDF)",
};
