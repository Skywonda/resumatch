export interface ResumeHeader {
  name: string;
  title: string;
  contacts: {
    phone: string;
    linkedin: string;
    email: string;
    location: string;
  };
}

export interface ResumeData {
  header: ResumeHeader;
  professionalSummary: {
    content: string;
    highlights: string[];
  };
  experience: {
    positions: {
      role: string;
      company: string;
      duration: string;
      achievements: string[];
      impactMetrics: string[];
    }[];
  };
  skills: {
    technical: string[];
    domain: string[];
    leadership: string[];
  };
  education: {
    entries: {
      degree: string;
      institution: string;
      year: string | null;
      highlights: string[];
    }[];
  };
  optimization?: {
    keyStrengths: string[];
    impactMetrics: string[];
    uniqueValue: string[];
  };
}

export interface Section {
  id: string;
  title: string;
  icon: React.FC;
}

export interface ExperiencePosition {
  role: string;
  company: string;
  duration: string;
  achievements: string[];
  impactMetrics: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  year: string | null;
  highlights: string[];
}
