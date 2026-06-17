export type Partner = {
  name: string;
  description: string;
  /** Outbound site. Empty until the stakeholder provides it — rendered as a
   *  "coming soon" state rather than a broken link. */
  url: string;
};

export const about = {
  eyebrow: "About us",
  title: "Making Korea home — since 2011.",
  intro: [
    "SOJOURN KOREA has helped foreign professionals and their families settle into Korea since 2011. Based in Busan's Marine City and now serving Seoul and beyond, we carry the full arc of a move — visas, housing, settling-in, transportation and everyday life — with a single dedicated manager for every client.",
    "We work in English, end to end, alongside a vetted network of trusted local partners. As a member of the Korea International Trade Association (KITA), we're relied on by expert teams relocating staff for clients such as KHNP. Our promise is simple: honest, personal service that makes settling in easy.",
  ],
  greeting: {
    eyebrow: "From our founder",
    body: [
      "When I founded SOJOURN KOREA in 2011, I had watched too many talented people arrive in Korea excited for a new chapter, then get lost in paperwork, housing contracts and a language they didn't yet speak.",
      "I started this company to be the person I wished they'd had — someone local who handles the hard parts honestly, one family at a time. That's still how we work today: one dedicated manager, straight answers, and a network of partners who treat your move as carefully as we do.",
      "Whether you're an individual relocating for work or an HR team moving an entire group, my team and I are here to make Korea feel like home.",
    ],
    name: "Rosh Yum",
    role: "Founder & Representative",
  },
  partners: {
    eyebrow: "Our partners",
    title: "We don't work alone.",
    intro:
      "Relocation touches a lot of moving parts, so we work hand in hand with specialists we trust. Housing is one of the most important — and that's where our real estate partner comes in.",
    items: [
      {
        name: "S.E. Real Estate",
        description:
          "A real estate office we collaborate with closely — handling housing and apartment contracts so our clients sign with confidence.",
        url: "",
      },
    ] satisfies Partner[],
  },
} as const;
