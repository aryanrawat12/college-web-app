// ponytail: DUMMY alumni profiles — replace names, photos and details with real ones.
export type Alumnus = {
  name: string;
  batch: string;
  programme: string;
  role: string;
  company: string;
  photo: string;
  quote: string;
};

export const alumni: Alumnus[] = [
  {
    name: "Ananya Gupta",
    batch: "2018",
    programme: "B.Pharm",
    role: "Regulatory Affairs Associate",
    company: "Sun Pharma",
    photo: "https://i.pravatar.cc/240?img=5",
    quote:
      "ABGI's labs and industrial training gave me the confidence to step straight into pharma quality and regulatory work.",
  },
  {
    name: "Rohan Singh",
    batch: "2019",
    programme: "MBA",
    role: "Business Analyst",
    company: "HDFC Bank",
    photo: "https://i.pravatar.cc/240?img=15",
    quote:
      "The case-based learning and live projects made the jump into corporate analytics feel natural.",
  },
  {
    name: "Sneha Patel",
    batch: "2020",
    programme: "M.Pharm",
    role: "Formulation Scientist",
    company: "Cipla",
    photo: "https://i.pravatar.cc/240?img=9",
    quote:
      "My dissertation work here shaped my research career — I now lead formulation trials in industry.",
  },
  {
    name: "Vikram Yadav",
    batch: "2017",
    programme: "B.Ed",
    role: "Senior Teacher",
    company: "Delhi Public School",
    photo: "https://i.pravatar.cc/240?img=33",
    quote:
      "The teaching practice and mentorship at ABGI made me a classroom-ready educator from day one.",
  },
  {
    name: "Megha Jain",
    batch: "2021",
    programme: "MBA",
    role: "HR Executive",
    company: "Infosys",
    photo: "https://i.pravatar.cc/240?img=20",
    quote:
      "Beyond academics, the soft-skills and placement training set me apart in interviews.",
  },
  {
    name: "Aditya Rao",
    batch: "2016",
    programme: "B.Pharm",
    role: "Medical Representative",
    company: "Mankind Pharma",
    photo: "https://i.pravatar.cc/240?img=51",
    quote:
      "Supportive faculty and a strong alumni network opened the right doors early in my career.",
  },
];
