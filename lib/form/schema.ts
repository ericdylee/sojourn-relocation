import { z } from "zod";

export const leadSchema = z
  .object({
    intent: z.enum(["relocation", "tour"]),
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional().default(""),
    company: z.string().optional().default(""),
    city: z.enum(["Busan", "Seoul", "Other"]).optional(),
    services: z.array(z.string()).optional(),
    timeline: z.string().optional(),
    tourDate: z.string().optional(),
    partySize: z.coerce.number().int().positive().optional(),
    duration: z.enum(["half", "full"]).optional(),
    message: z.string().min(1),
    website: z.string().max(0).optional().default(""),
  })
  .superRefine((v, ctx) => {
    if (v.intent === "tour") {
      if (!v.tourDate) ctx.addIssue({ code: "custom", path: ["tourDate"], message: "Required" });
      if (!v.partySize) ctx.addIssue({ code: "custom", path: ["partySize"], message: "Required" });
      if (!v.duration) ctx.addIssue({ code: "custom", path: ["duration"], message: "Required" });
    }
  });

export type Lead = z.infer<typeof leadSchema>;
