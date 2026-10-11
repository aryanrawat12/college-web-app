// ponytail: DUMMY names/photos — replace with real, attributed testimonials.
export type Testimonial = {
  name: string;
  detail: string;
  quote: string;
  photo: string; // lorem placeholder avatar
};

export const testimonials: Testimonial[] = [
  {
    name: "Priya Sharma",
    detail: "B.Pharm, Class of 2024",
    quote:
      "The faculty and laboratories gave me a strong practical foundation. The industrial training helped me step confidently into the pharmaceutical industry.",
    photo: "https://i.pravatar.cc/160?img=47",
  },
  {
    name: "Arjun Mehta",
    detail: "MBA, Class of 2023",
    quote:
      "Beyond the classroom, the focus on communication and real-world projects prepared me well for placements and a management role.",
    photo: "https://i.pravatar.cc/160?img=12",
  },
  {
    name: "Neha Verma",
    detail: "B.Ed, Class of 2024",
    quote:
      "The teaching practice and mentorship shaped me into a confident educator. I am grateful for the supportive learning environment.",
    photo: "https://i.pravatar.cc/160?img=32",
  },
];
