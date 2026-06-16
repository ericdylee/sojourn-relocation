export type Service = { id: string; title: string; summary: string; items: string[]; image: string };
export const services: Service[] = [
  { id: "visa", title: "Korea Visa & Immigration", summary: "Every visa type, handled end to end.",
    items: ["All visa types (work & non-work)","Document prep, submission & interview support","In-person accompaniment to the immigration office","Alien Registration Card (ARC)","Stay extension, status & address-change reports"],
    image: "/images/visa.jpg" },
  { id: "settle", title: "Settling-in & Documentation", summary: "The paperwork that makes life work.",
    items: ["Fingerprint registration accompaniment","Korean driver's license","Car purchase / lease / rental & registration","Mobile phone account setup","Bank account setup","FDI enterprise registration, domestic-help visa"],
    image: "/images/settle.jpg" },
  { id: "home", title: "Home Finding", summary: "The right home is the key to an easy move.",
    items: ["Housing matched to your preferences","Family or individual, fully customized","Local-market knowledge you can trust"],
    image: "/images/home.jpg" },
  { id: "tenancy", title: "Tenancy Management", summary: "Support that continues after move-in.",
    items: ["Utilities payment management","House inspection","Repair & maintenance","Lease negotiation & renewal support"],
    image: "/images/tenancy.jpg" },
  { id: "transport", title: "Transportation & Escort", summary: "Get everywhere, from day one.",
    items: ["Airport transfers","Escort to schools, hospitals, shopping","Pet escorting","Long-term rental-car lease","Large-vehicle goods delivery"],
    image: "/images/transport.jpg" },
  { id: "tour", title: "Private Tours", summary: "Discover Busan & Seoul, privately.", items: ["English-speaking guides","Half-day & full-day","Families, buyers & cruise guests"], image: "/images/tour-busan.jpg" },
];
