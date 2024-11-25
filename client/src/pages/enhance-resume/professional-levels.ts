// export type ProfessionalLevelId = "entry" | "mid" | "senior" | "expert";

// export interface ProfessionalLevel {
//   id: ProfessionalLevelId;
//   label: string;
//   description: string;
//   details: {
//     focusAreas: string[];
//     skillEmphasis: string[];
//   };
// }

// export const PROFESSIONAL_LEVELS: ProfessionalLevel[] = [
//   {
//     id: "entry",
//     label: "Entry Level",
//     description: "0-2 years of experience",
//     details: {
//       focusAreas: ["Academic projects", "Internships", "Foundational skills"],
//       skillEmphasis: [
//         "Technical fundamentals",
//         "Soft skills",
//         "Academic achievements",
//       ],
//     },
//   },
//   {
//     id: "mid",
//     label: "Mid Level",
//     description: "2-5 years of experience",
//     details: {
//       focusAreas: [
//         "Project ownership",
//         "Team collaboration",
//         "Technical expertise",
//       ],
//       skillEmphasis: [
//         "Specialized skills",
//         "Project management",
//         "Leadership potential",
//       ],
//     },
//   },
//   {
//     id: "senior",
//     label: "Senior Level",
//     description: "5-8 years of experience",
//     details: {
//       focusAreas: [
//         "Team leadership",
//         "Strategic initiatives",
//         "Technical architecture",
//       ],
//       skillEmphasis: [
//         "Leadership",
//         "Strategic planning",
//         "Advanced technical skills",
//       ],
//     },
//   },
//   {
//     id: "expert",
//     label: "8+ years | Expert Level",
//     description: "8+ years of experience",
//     details: {
//       focusAreas: [
//         "Organizational impact",
//         "Industry influence",
//         "Strategic vision",
//       ],
//       skillEmphasis: [
//         "Executive leadership",
//         "Industry expertise",
//         "Innovation",
//       ],
//     },
//   },
// ];

export const API_LEVELS = [
  "entry",
  "junior",
  "mid",
  "senior",
  "lead",
  "principal",
  "executive",
] as const;

export type ProfessionalLevelId = (typeof API_LEVELS)[number];

export interface ProfessionalLevel {
  id: ProfessionalLevelId;
  label: string;
  description: string;
}

export const PROFESSIONAL_LEVELS: ProfessionalLevel[] = [
  {
    id: "entry",
    label: "Entry Level",
    description: "0-2 years of experience",
  },
  {
    id: "junior",
    label: "Junior Level",
    description: "1-3 years of experience",
  },
  {
    id: "mid",
    label: "Mid Level",
    description: "3-5 years of experience",
  },
  {
    id: "senior",
    label: "Senior Level",
    description: "5-8 years of experience",
  },
  {
    id: "lead",
    label: "Lead Level",
    description: "8-12 years of experience",
  },
  {
    id: "principal",
    label: "Principal Level",
    description: "12-15 years of experience",
  },
  {
    id: "executive",
    label: "Executive Level",
    description: "15+ years of experience",
  },
];
