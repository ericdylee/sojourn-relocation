export type Course = { id: string; title: string; length: "Half day" | "Full day"; stops: string[]; image: string };
export const busanCourses: Course[] = [
  { id: "busan-highlights", title: "Busan Highlights", length: "Full day",
    stops: ["Gamcheon Culture Village","Jagalchi & Gukje traditional markets (street food)","Haedong Yonggungsa Temple","Haeundae Blue Line Sky Capsule + Gwangalli night view"], image: "/images/gamcheon.jpg" },
  { id: "busan-markets", title: "Markets & Food", length: "Half day",
    stops: ["Jagalchi Fish Market","Gukje Market","Bujeon Market","Street-food tasting"], image: "/images/jagalchi.jpg" },
  { id: "busan-coast", title: "Coast & Culture", length: "Half day",
    stops: ["Haeundae Beach","Huinnyeoul Culture Village","Songdo Skywalk / Taejongdae"], image: "/images/haeundae.jpg" },
];
export const seoulCourses: Course[] = [
  { id: "seoul-palaces", title: "Palaces & Hanok", length: "Full day",
    stops: ["Gyeongbokgung Palace","Bukchon Hanok Village","Insadong"], image: "/images/gyeongbokgung.jpg" },
  { id: "seoul-markets", title: "Traditional Markets", length: "Half day",
    stops: ["Gwangjang Market","Namdaemun Market"], image: "/images/gwangjang.jpg" },
  { id: "seoul-city", title: "City Highlights", length: "Half day",
    stops: ["Myeongdong","N Seoul Tower","Hongdae"], image: "/images/seoul-city.jpg" },
];
