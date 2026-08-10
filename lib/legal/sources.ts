import type { SourceDefinition } from "./types";

export const LEGAL_SOURCES: SourceDefinition[] = [
  {
    id: "sci",
    name: "Supreme Court of India",
    category: "court",
    baseUrl: "https://www.sci.gov.in",
    searchUrlTemplate:
      "https://www.sci.gov.in/judgements-judgement-date/?s={query}",
    weight: 1,
  },
  {
    id: "ecourts",
    name: "eCourts / High Courts",
    category: "court",
    baseUrl: "https://judgments.ecourts.gov.in",
    searchUrlTemplate: "https://judgments.ecourts.gov.in/pdfsearch/?q={query}",
    weight: 0.92,
  },
  {
    id: "delhi-hc",
    name: "Delhi High Court",
    category: "court",
    baseUrl: "https://delhihighcourt.nic.in",
    searchUrlTemplate:
      "https://delhihighcourt.nic.in/app/show-case-result?query={query}",
    weight: 0.88,
  },
  {
    id: "bombay-hc",
    name: "Bombay High Court",
    category: "court",
    baseUrl: "https://bombayhighcourt.nic.in",
    searchUrlTemplate:
      "https://bombayhighcourt.nic.in/searchresult.php?q={query}",
    weight: 0.88,
  },
  {
    id: "madras-hc",
    name: "Madras High Court",
    category: "court",
    baseUrl: "https://www.mhc.tn.gov.in",
    searchUrlTemplate: "https://www.mhc.tn.gov.in/judgments?q={query}",
    weight: 0.86,
  },
  {
    id: "calcutta-hc",
    name: "Calcutta High Court",
    category: "court",
    baseUrl: "https://www.calcuttahighcourt.gov.in",
    searchUrlTemplate:
      "https://www.calcuttahighcourt.gov.in/?s={query}",
    weight: 0.86,
  },
  {
    id: "karnataka-hc",
    name: "Karnataka High Court",
    category: "court",
    baseUrl: "https://karnatakajudiciary.kar.nic.in",
    searchUrlTemplate:
      "https://karnatakajudiciary.kar.nic.in/search?q={query}",
    weight: 0.86,
  },
  {
    id: "indian-kanoon",
    name: "Indian Kanoon",
    category: "database",
    baseUrl: "https://indiankanoon.org",
    searchUrlTemplate: "https://indiankanoon.org/search/?formInput={query}",
    weight: 0.98,
    notes: "Primary free judgment search; optional API token via INDIANKANOON_API_TOKEN",
  },
  {
    id: "scc",
    name: "SCC Online",
    category: "database",
    baseUrl: "https://www.scconline.com",
    searchUrlTemplate: "https://www.scconline.com/blog/?s={query}",
    weight: 0.95,
    notes: "Premium database — deep judgment text requires subscription",
  },
  {
    id: "livelaw",
    name: "LiveLaw",
    category: "news",
    baseUrl: "https://www.livelaw.in",
    searchUrlTemplate: "https://www.livelaw.in/?s={query}",
    weight: 0.82,
  },
  {
    id: "barandbench",
    name: "Bar & Bench",
    category: "news",
    baseUrl: "https://www.barandbench.com",
    searchUrlTemplate: "https://www.barandbench.com/?s={query}",
    weight: 0.8,
  },
  {
    id: "ipleaders",
    name: "iPleaders",
    category: "commentary",
    baseUrl: "https://blog.ipleaders.in",
    searchUrlTemplate: "https://blog.ipleaders.in/?s={query}",
    weight: 0.72,
  },
  {
    id: "cam",
    name: "Cyril Amarchand Mangaldas",
    category: "firm",
    baseUrl: "https://www.cyrilshroff.com",
    searchUrlTemplate: "https://www.cyrilshroff.com/?s={query}",
    weight: 0.78,
  },
  {
    id: "khaitan",
    name: "Khaitan & Co",
    category: "firm",
    baseUrl: "https://www.khaitanco.com",
    searchUrlTemplate: "https://www.khaitanco.com/?s={query}",
    weight: 0.76,
  },
  {
    id: "azb",
    name: "AZB & Partners",
    category: "firm",
    baseUrl: "https://www.azbpartners.com",
    searchUrlTemplate: "https://www.azbpartners.com/?s={query}",
    weight: 0.76,
  },
  {
    id: "trilegal",
    name: "Trilegal",
    category: "firm",
    baseUrl: "https://www.trilegal.com",
    searchUrlTemplate: "https://www.trilegal.com/?s={query}",
    weight: 0.74,
  },
  {
    id: "samvad",
    name: "Samvad Partners / Thought Leadership",
    category: "firm",
    baseUrl: "https://www.samvadpartners.com",
    searchUrlTemplate: "https://www.samvadpartners.com/?s={query}",
    weight: 0.7,
  },
  {
    id: "nishith",
    name: "Nishith Desai Associates",
    category: "firm",
    baseUrl: "https://www.nishithdesai.com",
    searchUrlTemplate: "https://www.nishithdesai.com/SectionCategory/33/Research-Papers/12/33/ResearchPapers.html?q={query}",
    weight: 0.77,
  },
];

export function buildSourceSearchUrl(source: SourceDefinition, query: string) {
  return source.searchUrlTemplate.replace(
    "{query}",
    encodeURIComponent(query.trim()),
  );
}
