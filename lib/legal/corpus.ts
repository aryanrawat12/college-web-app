import type { CaseAuthority, CommentaryHit } from "./types";

/**
 * Curated chambers corpus of landmark / frequently cited Indian authorities.
 * Paragraphs are well-known holdings used for research scaffolding; always
 * verify against the official judgment / paid reporter before filing.
 */
export const LANDMARK_CORPUS: CaseAuthority[] = [
  {
    id: "kesavananda-1973",
    title: "Kesavananda Bharati v. State of Kerala",
    shortName: "Kesavananda Bharati",
    citation: "(1973) 4 SCC 225",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 1973,
    domains: ["constitutional"],
    issues: ["basic structure", "amendment power", "article 368"],
    statutes: ["Constitution of India", "Article 368"],
    keywords: [
      "basic structure",
      "constitutional amendment",
      "parliament",
      "judicial review",
      "fundamental rights",
    ],
    holding:
      "Parliament's amending power under Article 368 is wide but cannot destroy the basic structure of the Constitution.",
    ratio:
      "The basic structure doctrine limits constitutional amendments that abrogate the Constitution's essential features.",
    paragraphs: [
      {
        paraLabel: "Holding (majority)",
        text: "Although Parliament has wide power to amend the Constitution, that power does not extend to altering or destroying the basic structure or framework of the Constitution.",
        whyRelevant:
          "Controls every challenge to constitutional amendments and frames the ceiling of legislative competence.",
      },
      {
        paraLabel: "Core features",
        text: "Features such as supremacy of the Constitution, republican and democratic form of government, secular character, separation of powers and judicial review form part of the basic structure.",
        whyRelevant:
          "Useful checklist when arguing that an amendment / organic change trenches upon essential features.",
      },
    ],
    relatedAngles: ["constitutional", "contrary", "policy"],
    sourceIds: ["sci", "indian-kanoon", "scc"],
    url: "https://indiankanoon.org/doc/257876/",
  },
  {
    id: "maneka-1978",
    title: "Maneka Gandhi v. Union of India",
    shortName: "Maneka Gandhi",
    citation: "(1978) 1 SCC 248",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 1978,
    domains: ["constitutional"],
    issues: ["article 21", "procedure established by law", "passport"],
    statutes: ["Constitution of India", "Article 14", "Article 19", "Article 21"],
    keywords: [
      "personal liberty",
      "due process",
      "fair procedure",
      "passport",
      "article 21",
    ],
    holding:
      "Procedure under Article 21 must be fair, just and reasonable; Articles 14, 19 and 21 form a golden triangle.",
    ratio:
      "State action depriving personal liberty must satisfy substantive fairness, not merely formal legality.",
    paragraphs: [
      {
        paraLabel: "Golden triangle",
        text: "The sweep of Article 21 is wide; any procedure that deprives a person of life or personal liberty must be right, just and fair, and not arbitrary, fanciful or oppressive.",
        whyRelevant:
          "Foundational for every liberty, detention, due-process and reasonableness challenge.",
      },
    ],
    relatedAngles: ["constitutional", "procedural", "remedy"],
    sourceIds: ["sci", "indian-kanoon", "scc"],
    url: "https://indiankanoon.org/doc/1766147/",
  },
  {
    id: "puttaswamy-2017",
    title: "Justice K.S. Puttaswamy (Retd.) v. Union of India",
    shortName: "Puttaswamy",
    citation: "(2017) 10 SCC 1",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 2017,
    domains: ["constitutional"],
    issues: ["right to privacy", "article 21", "aadhaar"],
    statutes: ["Constitution of India", "Article 14", "Article 19", "Article 21"],
    keywords: [
      "privacy",
      "informational privacy",
      "dignity",
      "proportionality",
      "surveillance",
    ],
    holding:
      "Right to privacy is a fundamental right protected under Part III, intrinsic to liberty and dignity.",
    ratio:
      "Privacy claims are tested on legality, legitimate aim and proportionality.",
    paragraphs: [
      {
        paraLabel: "Privacy as fundamental right",
        text: "The right to privacy is protected as an intrinsic part of the right to life and personal liberty under Article 21 and as a part of the freedoms guaranteed by Part III.",
        whyRelevant:
          "Primary authority for data protection, surveillance, bodily autonomy and informational privacy disputes.",
      },
      {
        paraLabel: "Overruling ADM Jabalpur (privacy facet)",
        text: "The majority repudiated the ADM Jabalpur approach that eclipsed liberties during Emergency, restoring primacy of constitutional rights.",
        whyRelevant:
          "Useful when State argues that liberty yields completely to statutory eclipse clauses.",
      },
    ],
    relatedAngles: ["constitutional", "statutory", "policy"],
    sourceIds: ["sci", "indian-kanoon", "scc", "livelaw"],
    url: "https://indiankanoon.org/doc/91938676/",
  },
  {
    id: "shreya-singhal-2015",
    title: "Shreya Singhal v. Union of India",
    shortName: "Shreya Singhal",
    citation: "(2015) 5 SCC 1",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 2015,
    domains: ["constitutional", "criminal"],
    issues: ["free speech", "section 66a", "vagueness"],
    statutes: ["Constitution of India", "Article 19", "IT Act"],
    keywords: [
      "free speech",
      "section 66a",
      "chilling effect",
      "vagueness",
      "intermediary",
    ],
    holding:
      "Section 66A IT Act struck down as vague and overbroad; intermediary liability narrowed.",
    ratio:
      "Criminal speech restrictions must be precise; vague offences create an unconstitutional chilling effect.",
    paragraphs: [
      {
        paraLabel: "Vagueness / overbreadth",
        text: "Section 66A casts the net very wide and is liable to be used in ways that abridge freedom of speech far beyond the reasonable restrictions in Article 19(2).",
        whyRelevant:
          "Template for challenging vague speech offences and online content criminalisation.",
      },
    ],
    relatedAngles: ["constitutional", "contrary", "ratio"],
    sourceIds: ["sci", "indian-kanoon", "livelaw"],
    url: "https://indiankanoon.org/doc/110813550/",
  },
  {
    id: "vishaka-1997",
    title: "Vishaka v. State of Rajasthan",
    shortName: "Vishaka",
    citation: "(1997) 6 SCC 241",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 1997,
    domains: ["constitutional", "labour"],
    issues: ["sexual harassment", "workplace", "guidelines"],
    statutes: ["Constitution of India", "Article 14", "Article 15", "Article 21"],
    keywords: [
      "sexual harassment",
      "workplace",
      "guidelines",
      "gender equality",
      "posh",
    ],
    holding:
      "In absence of legislation, binding workplace sexual-harassment guidelines were laid down under Article 32.",
    ratio:
      "International conventions and constitutional guarantees can fill legislative vacuum to protect dignity at work.",
    paragraphs: [
      {
        paraLabel: "Guidelines as binding law",
        text: "The guidelines and norms against sexual harassment are to be treated as law declared under Article 141 until suitable legislation is enacted.",
        whyRelevant:
          "Historical foundation for POSH jurisprudence and employer duty of care.",
      },
    ],
    relatedAngles: ["constitutional", "remedy", "policy"],
    sourceIds: ["sci", "indian-kanoon", "ipleaders"],
    url: "https://indiankanoon.org/doc/1031794/",
  },
  {
    id: "indra-sawhney-1992",
    title: "Indra Sawhney v. Union of India",
    shortName: "Indra Sawhney",
    citation: "1992 Supp (3) SCC 217",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 1992,
    domains: ["constitutional"],
    issues: ["reservation", "obe", "creamy layer"],
    statutes: ["Constitution of India", "Article 16"],
    keywords: [
      "reservation",
      "backward classes",
      "creamy layer",
      "50 percent",
      "article 16",
    ],
    holding:
      "Reservations generally capped around 50%; creamy layer excluded from OBC benefits; no reservation in promotions (as then held).",
    ratio:
      "Equality permits compensatory discrimination but subject to quantitative and qualitative limits.",
    paragraphs: [
      {
        paraLabel: "50% ceiling / creamy layer",
        text: "Reservation ordinarily should not exceed 50%, and the advanced sections among backward classes (creamy layer) must be excluded from the benefit.",
        whyRelevant:
          "Core for reservation challenges, cadre restructuring and equality litigation.",
      },
    ],
    relatedAngles: ["constitutional", "policy", "statutory"],
    sourceIds: ["sci", "indian-kanoon", "scc"],
    url: "https://indiankanoon.org/doc/1369891/",
  },
  {
    id: "arnesh-kumar-2014",
    title: "Arnesh Kumar v. State of Bihar",
    shortName: "Arnesh Kumar",
    citation: "(2014) 8 SCC 273",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 2014,
    domains: ["criminal", "procedural"],
    issues: ["arrest", "section 41 crpc", "498a"],
    statutes: ["CrPC / BNSS", "IPC / BNS"],
    keywords: [
      "arrest",
      "section 41",
      "498a",
      "police",
      "checklist",
      "bail",
    ],
    holding:
      "Police must record reasons and follow Section 41 safeguards before arrest in offences punishable up to 7 years.",
    ratio:
      "Arrest is not routine; liberty interests require reasoned satisfaction of necessity conditions.",
    paragraphs: [
      {
        paraLabel: "Directions on arrest",
        text: "Police officers shall not arrest the accused unnecessarily and Magistrate shall not authorise detention casually; check-list compliance under Section 41/41A is mandatory.",
        whyRelevant:
          "First-cut authority for illegal arrest, remand challenge and 498A misuse arguments.",
      },
    ],
    relatedAngles: ["procedural", "ratio", "remedy"],
    sourceIds: ["sci", "indian-kanoon", "livelaw"],
    url: "https://indiankanoon.org/doc/2982624/",
  },
  {
    id: "satender-antil-2022",
    title: "Satender Kumar Antil v. CBI",
    shortName: "Satender Kumar Antil",
    citation: "(2022) 10 SCC 51",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 2022,
    domains: ["criminal", "procedural"],
    issues: ["bail", "categories of offences", "investigation"],
    statutes: ["CrPC / BNSS"],
    keywords: ["bail", "categories", "a b c d", "investigation", "arrest"],
    holding:
      "Structured guidelines for bail across offence categories; unnecessary arrests discouraged.",
    ratio:
      "Bail jurisprudence must be category-sensitive and liberty-preserving where investigation does not require custody.",
    paragraphs: [
      {
        paraLabel: "Category framework",
        text: "The Court issued elaborate guidelines classifying offences and the approach courts/investigating agencies must adopt on arrest and bail.",
        whyRelevant:
          "Modern controlling framework for routine bail hearings post-charge-sheet.",
      },
    ],
    relatedAngles: ["ratio", "procedural", "remedy"],
    sourceIds: ["sci", "indian-kanoon", "livelaw", "scc"],
    url: "https://indiankanoon.org/doc/151958776/",
  },
  {
    id: "lalita-kumari-2014",
    title: "Lalita Kumari v. Government of Uttar Pradesh",
    shortName: "Lalita Kumari",
    citation: "(2014) 2 SCC 1",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 2014,
    domains: ["criminal", "procedural"],
    issues: ["fir registration", "preliminary inquiry"],
    statutes: ["CrPC / BNSS"],
    keywords: ["fir", "mandatory registration", "preliminary inquiry", "cognizable"],
    holding:
      "Registration of FIR is mandatory for cognizable offences; preliminary inquiry only in limited categories.",
    ratio:
      "Police have no discretion to avoid FIR when information discloses a cognizable offence.",
    paragraphs: [
      {
        paraLabel: "Mandatory FIR",
        text: "If the information discloses commission of a cognizable offence, registration of an FIR is mandatory under Section 154.",
        whyRelevant:
          "Used both to compel registration and to attack refusal / delayed FIRs.",
      },
    ],
    relatedAngles: ["procedural", "ratio", "remedy"],
    sourceIds: ["sci", "indian-kanoon"],
    url: "https://indiankanoon.org/doc/1023907/",
  },
  {
    id: "bachan-singh-1980",
    title: "Bachan Singh v. State of Punjab",
    shortName: "Bachan Singh",
    citation: "(1980) 2 SCC 684",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 1980,
    domains: ["criminal", "constitutional"],
    issues: ["death penalty", "rarest of rare"],
    statutes: ["IPC / BNS", "Constitution of India", "Article 21"],
    keywords: ["death penalty", "rarest of rare", "sentencing", "mitigating"],
    holding:
      "Death penalty constitutional but only in the rarest of rare cases after balancing aggravating and mitigating circumstances.",
    ratio:
      "Capital sentence is an exception; life imprisonment is the rule.",
    paragraphs: [
      {
        paraLabel: "Rarest of rare",
        text: "A real and abiding concern for the dignity of human life postulates resistance to taking a life through law's instrumentality; that ought not to be done save in the rarest of rare cases.",
        whyRelevant:
          "Sentencing authority in every death-reference / confirmation matter.",
      },
    ],
    relatedAngles: ["constitutional", "ratio", "policy"],
    sourceIds: ["sci", "indian-kanoon", "scc"],
    url: "https://indiankanoon.org/doc/307021/",
  },
  {
    id: "navtej-2018",
    title: "Navtej Singh Johar v. Union of India",
    shortName: "Navtej Johar",
    citation: "(2018) 10 SCC 1",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 2018,
    domains: ["constitutional", "criminal"],
    issues: ["section 377", "sexual orientation", "equality"],
    statutes: ["IPC / BNS", "Constitution of India", "Article 14", "Article 15", "Article 21"],
    keywords: ["section 377", "lgbt", "sexual orientation", "dignity", "privacy"],
    holding:
      "Section 377 decriminalised insofar as it criminalised consensual sexual conduct between adults.",
    ratio:
      "Sexual orientation is intrinsic to identity; majoritarian morality cannot override constitutional morality.",
    paragraphs: [
      {
        paraLabel: "Constitutional morality",
        text: "Consensual carnal intercourse among adults in private is not a criminal act; Section 377 is unconstitutional to that extent.",
        whyRelevant:
          "Equality / dignity template and reading-down technique for colonial offences.",
      },
    ],
    relatedAngles: ["constitutional", "contrary", "policy"],
    sourceIds: ["sci", "indian-kanoon", "livelaw"],
    url: "https://indiankanoon.org/doc/168671544/",
  },
  {
    id: "joseph-shine-2018",
    title: "Joseph Shine v. Union of India",
    shortName: "Joseph Shine",
    citation: "(2019) 3 SCC 39",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 2018,
    domains: ["constitutional", "criminal", "family"],
    issues: ["adultery", "section 497", "gender equality"],
    statutes: ["IPC / BNS", "Constitution of India", "Article 14", "Article 15", "Article 21"],
    keywords: ["adultery", "section 497", "privacy", "autonomy", "gender"],
    holding: "Section 497 IPC struck down as unconstitutional.",
    ratio:
      "Criminal adultery treated women as property of husbands and violated equality, privacy and dignity.",
    paragraphs: [
      {
        paraLabel: "Autonomy & equality",
        text: "Section 497 is manifestly arbitrary and violative of Articles 14, 15 and 21; adultery may be a civil wrong but cannot remain a criminal offence in that form.",
        whyRelevant:
          "Authority on criminalisation of private consensual conduct and gendered offences.",
      },
    ],
    relatedAngles: ["constitutional", "policy"],
    sourceIds: ["sci", "indian-kanoon", "livelaw"],
    url: "https://indiankanoon.org/doc/42184625/",
  },
  {
    id: "sr-bommai-1994",
    title: "S.R. Bommai v. Union of India",
    shortName: "S.R. Bommai",
    citation: "(1994) 3 SCC 1",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 1994,
    domains: ["constitutional", "administrative"],
    issues: ["article 356", "president rule", "federalism"],
    statutes: ["Constitution of India", "Article 356"],
    keywords: [
      "president rule",
      "federalism",
      "floor test",
      "secularism",
      "article 356",
    ],
    holding:
      "Proclamation under Article 356 is justiciable; secularism is basic structure; floor test preferred to assess majority.",
    ratio:
      "Centre's emergency power over States is exceptional and subject to judicial review.",
    paragraphs: [
      {
        paraLabel: "Justiciability",
        text: "The satisfaction of the President under Article 356 is open to judicial review on grounds of illegality, malafide, and irrelevant considerations.",
        whyRelevant:
          "Federal disputes, floor tests and proclamation challenges.",
      },
    ],
    relatedAngles: ["constitutional", "procedural", "policy"],
    sourceIds: ["sci", "indian-kanoon", "scc"],
    url: "https://indiankanoon.org/doc/999195/",
  },
  {
    id: "anuradha-bhasin-2020",
    title: "Anuradha Bhasin v. Union of India",
    shortName: "Anuradha Bhasin",
    citation: "(2020) 3 SCC 637",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 2020,
    domains: ["constitutional"],
    issues: ["internet shutdown", "proportionality", "article 19"],
    statutes: ["Constitution of India", "Article 19", "Article 21"],
    keywords: [
      "internet shutdown",
      "proportionality",
      "freedom of speech",
      "trade",
      "j&k",
    ],
    holding:
      "Freedom of speech and trade through internet protected; indefinite shutdowns impermissible; proportionality applies.",
    ratio:
      "Restrictions on digital access must be lawful, necessary and proportionate, with reasoned orders.",
    paragraphs: [
      {
        paraLabel: "Proportionality on shutdowns",
        text: "An order suspending internet services indefinitely is impermissible; the State must pursue the least restrictive alternative and publish reasoned orders.",
        whyRelevant:
          "Controlling case for internet curbs, Section 144 orders and speech/trade online.",
      },
    ],
    relatedAngles: ["constitutional", "procedural", "remedy"],
    sourceIds: ["sci", "indian-kanoon", "livelaw"],
    url: "https://indiankanoon.org/doc/235574101/",
  },
  {
    id: "swiss-ribbons-2019",
    title: "Swiss Ribbons Pvt. Ltd. v. Union of India",
    shortName: "Swiss Ribbons",
    citation: "(2019) 4 SCC 17",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 2019,
    domains: ["corporate"],
    issues: ["ibc constitutionality", "financial vs operational creditor"],
    statutes: ["Insolvency and Bankruptcy Code", "Constitution of India"],
    keywords: [
      "ibc",
      "financial creditor",
      "operational creditor",
      "nclt",
      "cirp",
    ],
    holding:
      "IBC upheld; differentiation between financial and operational creditors is valid.",
    ratio:
      "Commercial wisdom and time-bound resolution animate the IBC; classification has intelligible differentia.",
    paragraphs: [
      {
        paraLabel: "IBC object",
        text: "The IBC is a beneficial legislation to put the corporate debtor back on its feet, not a mere recovery legislation for creditors.",
        whyRelevant:
          "Opening brief authority for almost every IBC constitutional / classification challenge.",
      },
    ],
    relatedAngles: ["statutory", "commercial", "constitutional"],
    sourceIds: ["sci", "indian-kanoon", "cam", "scc"],
    url: "https://indiankanoon.org/doc/172250941/",
  },
  {
    id: "essar-steel-2019",
    title: "Committee of Creditors of Essar Steel India Ltd. v. Satish Kumar Gupta",
    shortName: "Essar Steel",
    citation: "(2020) 8 SCC 531",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 2019,
    domains: ["corporate"],
    issues: ["commercial wisdom", "coc", "distribution"],
    statutes: ["Insolvency and Bankruptcy Code"],
    keywords: [
      "commercial wisdom",
      "committee of creditors",
      "resolution plan",
      "judicial review",
      "distribution",
    ],
    holding:
      "Limited judicial review of CoC's commercial wisdom; equitable treatment does not mean equality of recovery.",
    ratio:
      "NCLT/NCLAT cannot substitute commercial wisdom of the CoC on distribution / feasibility.",
    paragraphs: [
      {
        paraLabel: "Commercial wisdom",
        text: "The limited judicial review available is to see that the CoC has taken into account the specified factors; there is no equity-based redistribution by the Adjudicating Authority.",
        whyRelevant:
          "Decisive on resolution-plan challenges and operational creditor haircuts.",
      },
    ],
    relatedAngles: ["commercial", "statutory", "remedy"],
    sourceIds: ["sci", "indian-kanoon", "cam", "khaitan"],
    url: "https://indiankanoon.org/doc/147645862/",
  },
  {
    id: "vidya-drolia-2020",
    title: "Vidya Drolia v. Durga Trading Corporation",
    shortName: "Vidya Drolia",
    citation: "(2021) 2 SCC 1",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 2020,
    domains: ["arbitration", "civil"],
    issues: ["arbitrability", "section 8", "section 11"],
    statutes: ["Arbitration & Conciliation Act, 1996"],
    keywords: [
      "arbitrability",
      "existence of dispute",
      "section 11",
      "prima facie",
      "tenancy",
    ],
    holding:
      "Fourfold test of non-arbitrability; referral courts undertake only a prima facie review.",
    ratio:
      "When in doubt, refer to arbitration — subject to clear non-arbitrable categories.",
    paragraphs: [
      {
        paraLabel: "Fourfold test",
        text: "A dispute is non-arbitrable when the cause of action / subject matter is reserved for public fora, or rights in rem / sovereign functions are implicated, among other articulated limits.",
        whyRelevant:
          "Standard cite on Section 8/11 objections and subject-matter arbitrability.",
      },
    ],
    relatedAngles: ["commercial", "procedural", "statutory"],
    sourceIds: ["sci", "indian-kanoon", "cam", "trilegal"],
    url: "https://indiankanoon.org/doc/152038972/",
  },
  {
    id: "balco-2012",
    title: "Bharat Aluminium Co. v. Kaiser Aluminium Technical Services",
    shortName: "BALCO",
    citation: "(2012) 9 SCC 552",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 2012,
    domains: ["arbitration"],
    issues: ["seat", "part i", "foreign award"],
    statutes: ["Arbitration & Conciliation Act, 1996"],
    keywords: ["seat", "venue", "part i", "foreign seated", "section 34"],
    holding:
      "Part I does not apply to foreign-seated arbitrations; seat determines curial law supervisory jurisdiction.",
    ratio:
      "Indian courts will not entertain Part I set-aside for foreign-seated awards (prospective overruling of Bhatia).",
    paragraphs: [
      {
        paraLabel: "Seat doctrine",
        text: "The seat of arbitration is the centre of gravity; Part I of the A&C Act has no application to arbitrations seated outside India.",
        whyRelevant:
          "Critical for drafting / challenging cross-border arbitration clauses.",
      },
    ],
    relatedAngles: ["commercial", "statutory", "distinguishing"],
    sourceIds: ["sci", "indian-kanoon", "nishith", "cam"],
    url: "https://indiankanoon.org/doc/1739744/",
  },
  {
    id: "novartis-2013",
    title: "Novartis AG v. Union of India",
    shortName: "Novartis",
    citation: "(2013) 6 SCC 1",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 2013,
    domains: ["ip"],
    issues: ["section 3d", "evergreening", "patentability"],
    statutes: ["Patents Act"],
    keywords: [
      "section 3(d)",
      "efficacy",
      "evergreening",
      "glivec",
      "patent",
    ],
    holding:
      "Glivec patent refused; enhanced therapeutic efficacy required under Section 3(d).",
    ratio:
      "India rejects evergreening; incremental innovations need demonstrated efficacy.",
    paragraphs: [
      {
        paraLabel: "Therapeutic efficacy",
        text: "Mere discovery of a new form of a known substance which does not result in enhancement of known efficacy is not patentable under Section 3(d).",
        whyRelevant:
          "Primary Indian pharma patent / Section 3(d) authority.",
      },
    ],
    relatedAngles: ["statutory", "policy", "commercial"],
    sourceIds: ["sci", "indian-kanoon", "scc"],
    url: "https://indiankanoon.org/doc/165776436/",
  },
  {
    id: "mc-mehta-oleum-1987",
    title: "M.C. Mehta v. Union of India (Oleum Gas Leak)",
    shortName: "M.C. Mehta (Oleum)",
    citation: "(1987) 1 SCC 395",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 1987,
    domains: ["environmental", "constitutional"],
    issues: ["absolute liability", "hazardous industry"],
    statutes: ["Constitution of India", "Article 21"],
    keywords: [
      "absolute liability",
      "hazardous",
      "polluter",
      "article 21",
      "public interest",
    ],
    holding:
      "Enterprises engaged in hazardous activities owe absolute liability for harm.",
    ratio:
      "Unlike Rylands v Fletcher, absolute liability admits no common-law exceptions for hazardous industries in India.",
    paragraphs: [
      {
        paraLabel: "Absolute liability",
        text: "An enterprise engaged in a hazardous or inherently dangerous industry owes an absolute and non-delegable duty to the community; it must compensate irrespective of fault.",
        whyRelevant:
          "Environmental / industrial accident compensation and Article 21 PILs.",
      },
    ],
    relatedAngles: ["constitutional", "remedy", "policy"],
    sourceIds: ["sci", "indian-kanoon", "ipleaders"],
    url: "https://indiankanoon.org/doc/1482109/",
  },
  {
    id: "kedar-nath-1962",
    title: "Kedar Nath Singh v. State of Bihar",
    shortName: "Kedar Nath Singh",
    citation: "1962 AIR 955",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 1962,
    domains: ["constitutional", "criminal"],
    issues: ["sedition", "incitement to violence"],
    statutes: ["IPC / BNS", "Constitution of India", "Article 19"],
    keywords: ["sedition", "section 124a", "incitement", "public order"],
    holding:
      "Sedition narrowed to acts involving incitement to violence or public disorder.",
    ratio:
      "Disaffection without incitement to violence is not sedition under the reading-down.",
    paragraphs: [
      {
        paraLabel: "Reading down 124A",
        text: "Section 124A applies only to acts involving intention or tendency to create disorder or disturbance of law and order / incitement to violence.",
        whyRelevant:
          "Still the classical narrowing lens pending / alongside later sedition developments.",
      },
    ],
    relatedAngles: ["constitutional", "ratio", "distinguishing"],
    sourceIds: ["sci", "indian-kanoon"],
    url: "https://indiankanoon.org/doc/1132792/",
  },
  {
    id: "minerva-mills-1980",
    title: "Minerva Mills Ltd. v. Union of India",
    shortName: "Minerva Mills",
    citation: "(1980) 3 SCC 625",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 1980,
    domains: ["constitutional"],
    issues: ["basic structure", "directive principles", "article 31c"],
    statutes: ["Constitution of India", "Article 14", "Article 19", "Article 31C"],
    keywords: [
      "basic structure",
      "harmony",
      "directive principles",
      "fundamental rights",
      "limited amending power",
    ],
    holding:
      "Limited amending power is itself basic structure; harmony between Parts III and IV essential.",
    ratio:
      "Giving absolute primacy to Directive Principles over Fundamental Rights destroys basic structure.",
    paragraphs: [
      {
        paraLabel: "Limited amending power",
        text: "The power to destroy is not a power to amend; clauses that exclude judicial review of amendments trench upon basic structure.",
        whyRelevant:
          "Pairs with Kesavananda in amendment / rights-harmony litigation.",
      },
    ],
    relatedAngles: ["constitutional", "contrary", "policy"],
    sourceIds: ["sci", "indian-kanoon", "scc"],
    url: "https://indiankanoon.org/doc/1932729/",
  },
  {
    id: "common-cause-2018",
    title: "Common Cause v. Union of India",
    shortName: "Common Cause (Living Will)",
    citation: "(2018) 5 SCC 1",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 2018,
    domains: ["constitutional"],
    issues: ["passive euthanasia", "living will", "article 21"],
    statutes: ["Constitution of India", "Article 21"],
    keywords: [
      "passive euthanasia",
      "living will",
      "dignity",
      "end of life",
      "best interests",
    ],
    holding:
      "Passive euthanasia and living wills recognised under Article 21 with safeguards.",
    ratio:
      "Right to die with dignity is part of right to life; advance directives permissible with procedural guards.",
    paragraphs: [
      {
        paraLabel: "Dignity in dying",
        text: "The right to life includes the right to live with dignity, and a dignified end of life is part of that continuum, subject to carefully designed safeguards.",
        whyRelevant:
          "Medical ethics, guardianship and end-of-life hospital counsel.",
      },
    ],
    relatedAngles: ["constitutional", "remedy", "policy"],
    sourceIds: ["sci", "indian-kanoon", "livelaw"],
    url: "https://indiankanoon.org/doc/184449972/",
  },
  {
    id: "shayara-bano-2017",
    title: "Shayara Bano v. Union of India",
    shortName: "Shayara Bano",
    citation: "(2017) 9 SCC 1",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 2017,
    domains: ["constitutional", "family"],
    issues: ["triple talaq", "personal law", "equality"],
    statutes: ["Constitution of India", "Article 14", "Article 15", "Article 21"],
    keywords: ["triple talaq", "talaq-e-biddat", "muslim law", "manifest arbitrariness"],
    holding: "Talaq-e-biddat (instant triple talaq) set aside as unconstitutional.",
    ratio:
      "Personal law practices that are manifestly arbitrary fail constitutional scrutiny.",
    paragraphs: [
      {
        paraLabel: "Manifest arbitrariness",
        text: "Instantaneous triple talaq is manifestly arbitrary and violative of fundamental rights; it cannot claim constitutional immunity merely by wearing a personal-law label.",
        whyRelevant:
          "Family-law constitutionalisation and gender-equality challenges to personal law.",
      },
    ],
    relatedAngles: ["constitutional", "policy"],
    sourceIds: ["sci", "indian-kanoon", "livelaw", "ipleaders"],
    url: "https://indiankanoon.org/doc/115701830/",
  },
  {
    id: "bangalore-water-1978",
    title: "Bangalore Water Supply & Sewerage Board v. A. Rajappa",
    shortName: "Bangalore Water Supply",
    citation: "(1978) 2 SCC 213",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 1978,
    domains: ["labour"],
    issues: ["industry definition", "industrial disputes"],
    statutes: ["Industrial Disputes Act"],
    keywords: ["industry", "triple test", "workman", "industrial dispute"],
    holding:
      "Wide triple-test definition of 'industry' under the Industrial Disputes Act.",
    ratio:
      "Systematic activity organised by cooperation between employer and employee for production/service is industry.",
    paragraphs: [
      {
        paraLabel: "Triple test",
        text: "Where there is systematic activity, organized by cooperation between employer and employee, for the production and/or distribution of goods and services, there is an industry.",
        whyRelevant:
          "Threshold maintainability for ID Act / labour forum jurisdiction.",
      },
    ],
    relatedAngles: ["statutory", "distinguishing"],
    sourceIds: ["sci", "indian-kanoon", "ipleaders"],
    url: "https://indiankanoon.org/doc/108116/",
  },
  {
    id: "hadley-india-contract",
    title: "Satyabrata Ghose v. Mugneeram Bangur & Co.",
    shortName: "Satyabrata Ghose",
    citation: "1954 SCR 310",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 1954,
    domains: ["civil"],
    issues: ["frustration", "section 56", "impossibility"],
    statutes: ["Indian Contract Act, 1872"],
    keywords: ["frustration", "section 56", "impossibility", "force majeure"],
    holding:
      "Indian frustration doctrine under Section 56 is statutory and not a mere import of English law.",
    ratio:
      "Impossibility includes impracticability destroying the foundation of the contract.",
    paragraphs: [
      {
        paraLabel: "Section 56",
        text: "The doctrine of frustration is really an aspect or part of the law of discharge of contract by reason of supervening impossibility or illegality under Section 56.",
        whyRelevant:
          "Force majeure / COVID / wartime supply-chain contract disputes.",
      },
    ],
    relatedAngles: ["statutory", "commercial", "distinguishing"],
    sourceIds: ["sci", "indian-kanoon"],
    url: "https://indiankanoon.org/doc/1545380/",
  },
  {
    id: "gujarat-bottling-1995",
    title: "Gujarat Bottling Co. Ltd. v. Coca Cola Co.",
    shortName: "Gujarat Bottling",
    citation: "(1995) 5 SCC 545",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 1995,
    domains: ["civil", "ip", "corporate"],
    issues: ["injunction", "negative covenant", "balance of convenience"],
    statutes: ["Indian Contract Act, 1872", "CPC", "Specific Relief Act"],
    keywords: [
      "interim injunction",
      "negative covenant",
      "balance of convenience",
      "irreparable injury",
      "prima facie",
    ],
    holding:
      "Classic restatement of interim injunction triple test in commercial negative-covenant settings.",
    ratio:
      "Prima facie case, balance of convenience and irreparable injury guide interlocutory injunctions.",
    paragraphs: [
      {
        paraLabel: "Triple test",
        text: "The Court must be satisfied that there is a prima facie case, that balance of convenience is in favour of the injunction, and that irreparable injury would be caused if relief is refused.",
        whyRelevant:
          "Daily citation in commercial interim applications.",
      },
    ],
    relatedAngles: ["remedy", "commercial", "procedural"],
    sourceIds: ["sci", "indian-kanoon", "scc"],
    url: "https://indiankanoon.org/doc/648671/",
  },
  {
    id: "dalpat-kumar-1992",
    title: "Dalpat Kumar v. Prahlad Singh",
    shortName: "Dalpat Kumar",
    citation: "(1992) 1 SCC 719",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 1992,
    domains: ["civil", "procedural"],
    issues: ["temporary injunction", "order 39"],
    statutes: ["CPC"],
    keywords: ["order 39", "temporary injunction", "prima facie", "irreparable"],
    holding:
      "Temporary injunction is equitable; plaintiff must show strong prima facie case and irreparable injury.",
    ratio:
      "Injunction is exception; courts avoid granting it when damages are adequate.",
    paragraphs: [
      {
        paraLabel: "Equitable caution",
        text: "Satisfaction that there is a prima facie case by itself is not sufficient; court must further satisfy that non-interference would result in irreparable injury and balance of convenience favours the applicant.",
        whyRelevant:
          "Defence playbook against casual interim orders.",
      },
    ],
    relatedAngles: ["remedy", "procedural", "distinguishing"],
    sourceIds: ["sci", "indian-kanoon"],
    url: "https://indiankanoon.org/doc/1842395/",
  },
  {
    id: "kaushal-kishor-2023",
    title: "Kaushal Kishor v. State of Uttar Pradesh",
    shortName: "Kaushal Kishor",
    citation: "(2023) 4 SCC 1",
    court: "Supreme Court of India",
    courtTier: "Supreme Court",
    year: 2023,
    domains: ["constitutional"],
    issues: ["free speech", "ministerial speech", "horizontal rights"],
    statutes: ["Constitution of India", "Article 19", "Article 21"],
    keywords: [
      "minister speech",
      "hate speech",
      "article 19",
      "horizontal",
      "public functionary",
    ],
    holding:
      "Clarified contours of free speech / dignity claims against public functionaries; additional restrictions beyond 19(2) rejected.",
    ratio:
      "Article 19(2) is exhaustive of restrictions on free speech; remedies for dignitary harms lie in other constitutional / civil avenues.",
    paragraphs: [
      {
        paraLabel: "19(2) exhaustiveness",
        text: "The grounds enumerated in Article 19(2) are exhaustive; additional restrictions on free speech cannot be fashioned by courts outside that scheme.",
        whyRelevant:
          "Speech litigation involving ministers / public officials.",
      },
    ],
    relatedAngles: ["constitutional", "contrary", "remedy"],
    sourceIds: ["sci", "indian-kanoon", "livelaw", "barandbench"],
    url: "https://indiankanoon.org/doc/147958174/",
  },
  {
    id: "supernus-delhi-hc",
    title: "Illustrative Delhi HC commercial approach — interim IP restraint principles",
    shortName: "Delhi HC interim IP principles",
    citation: "Delhi HC commercial board practice (composite principles)",
    court: "Delhi High Court",
    courtTier: "High Court",
    year: 2021,
    domains: ["ip", "civil"],
    issues: ["passing off", "interim injunction", "trademark"],
    statutes: ["Trade Marks Act", "CPC"],
    keywords: [
      "passing off",
      "trademark",
      "secondary meaning",
      "interim",
      "delhi high court",
    ],
    holding:
      "High Courts apply classic trinity (reputation, misrepresentation, damage) with commercial urgency on IP dockets.",
    ratio:
      "Where deceptive similarity and goodwill are shown, interim restraint frequently follows to protect brand equity.",
    paragraphs: [
      {
        paraLabel: "Practice note",
        text: "On a strong prima facie case of deceptive similarity coupled with goodwill, Delhi High Court's commercial courts often protect the prior mark pending trial, while calibrating bond / accounts conditions.",
        whyRelevant:
          "Practical High Court layer beneath Supreme Court injunction doctrine for brand disputes.",
      },
    ],
    relatedAngles: ["commercial", "remedy", "distinguishing"],
    sourceIds: ["delhi-hc", "indian-kanoon", "scc"],
    url: "https://delhihighcourt.nic.in",
  },
];

export const COMMENTARY_CORPUS: CommentaryHit[] = [
  {
    id: "c-cam-ibc",
    title: "IBC: commercial wisdom and limited judicial review — CAM insights",
    sourceId: "cam",
    sourceName: "Cyril Amarchand Mangaldas",
    url: "https://www.cyrilshroff.com",
    snippet:
      "Law-firm analyses emphasise that after Essar Steel / Swiss Ribbons, challenges to resolution plans rarely succeed unless CoC process defects or statutory exclusions are shown.",
    domains: ["corporate"],
    keywords: ["ibc", "commercial wisdom", "resolution plan", "nclt"],
  },
  {
    id: "c-nishith-arb",
    title: "Seat vs venue in Indian arbitration — NDA research",
    sourceId: "nishith",
    sourceName: "Nishith Desai Associates",
    url: "https://www.nishithdesai.com",
    snippet:
      "Firm papers synthesise BALCO and later amendments: draft the seat expressly; avoid venue/seat ambiguity in cross-border contracts.",
    domains: ["arbitration"],
    keywords: ["seat", "venue", "balco", "arbitration clause"],
  },
  {
    id: "c-ipleaders-bail",
    title: "Bail after Arnesh Kumar & Satender Antil — iPleaders explainer",
    sourceId: "ipleaders",
    sourceName: "iPleaders",
    url: "https://blog.ipleaders.in",
    snippet:
      "Commentary walks through checklists for arrest memos, 41A notices, and category-wise bail arguments for defence practice.",
    domains: ["criminal", "procedural"],
    keywords: ["bail", "arrest", "arnesh kumar", "satender antil"],
  },
  {
    id: "c-livelaw-privacy",
    title: "Privacy & proportionality after Puttaswamy — LiveLaw trackers",
    sourceId: "livelaw",
    sourceName: "LiveLaw",
    url: "https://www.livelaw.in",
    snippet:
      "Case trackers map how High Courts apply legality-aim-proportionality to data, CCTV, phone extraction and platform disputes.",
    domains: ["constitutional"],
    keywords: ["privacy", "proportionality", "puttaswamy", "data"],
  },
  {
    id: "c-khaitan-competition-corp",
    title: "Deal risk notes — oppression, SEBI & IBC interfaces",
    sourceId: "khaitan",
    sourceName: "Khaitan & Co",
    url: "https://www.khaitanco.com",
    snippet:
      "Transactional updates flag how shareholder disputes migrate across NCLT oppression petitions, SEBI enforcement and insolvency triggers.",
    domains: ["corporate"],
    keywords: ["oppression", "sebi", "nclt", "shareholder"],
  },
  {
    id: "c-azb-contracts",
    title: "Force majeure & frustration after supply-chain shocks",
    sourceId: "azb",
    sourceName: "AZB & Partners",
    url: "https://www.azbpartners.com",
    snippet:
      "Briefings distinguish contractual force-majeure clauses from Section 56 frustration, stressing notice, causation and alternate performance.",
    domains: ["civil", "corporate"],
    keywords: ["force majeure", "frustration", "section 56", "contract"],
  },
  {
    id: "c-trilegal-arb",
    title: "Section 11 / 34 strategy notes",
    sourceId: "trilegal",
    sourceName: "Trilegal",
    url: "https://www.trilegal.com",
    snippet:
      "Practice notes on prima facie referral standards post Vidya Drolia and the narrow patent-illegality set-aside lane.",
    domains: ["arbitration"],
    keywords: ["section 11", "section 34", "vidya drolia", "patent illegality"],
  },
  {
    id: "c-scc-blog",
    title: "SCC Online Blog — issue-wise precedent digests",
    sourceId: "scc",
    sourceName: "SCC Online",
    url: "https://www.scconline.com/blog/",
    snippet:
      "Editorials and digests help locate reporter-quality citations and subsequent citator treatment (overruled / distinguished / followed).",
    domains: ["general"],
    keywords: ["citator", "digest", "precedent", "scc"],
  },
];
