import axios from "axios";
import Cookies from "js-cookie";

export const FILE_TYPES = {
  PDF: "PDF",
  DOCX: "DOCX",
  TXT: "TXT",
} as const;

// eslint-disable-next-line import/no-anonymous-default-export

const baseURL = import.meta.env.VITE_API_URL;
const ApiService = axios.create({
  baseURL: `${baseURL}/api/resume` || "http://localhost:8000/api/resume",
  // timeout: 30000,
});

ApiService.interceptors.request.use(async (config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const resumeEnhancement = async (resume: string, level: string) => {
  const { data } = await ApiService.post<{ data: string }>("/enhance", {
    resumeText: resume,
    level,
  });

  return { text: data };
};

export const resumeTailoring = async (
  jobDescription: string,
  resumeText: string
) => {
  const { data } = await ApiService.post<{
    data: string;
    rating: string | null;
  }>("/tailor", {
    resumeText,
    jobDescription,
  });

  return { data: data, rating: data.rating };
};

export const generateCoverLetter = async (
  jobDescription: string,
  resume: string,
  length: string
) => {
  const { data } = await ApiService.post<{ data: string }>(
    "/resume-ranker/generate-cover-letter",
    {
      resume,
      length,
      jobDescription,
    }
  );

  return data.data;
};

export const generateJobApplicationQuestionAnswer = async (
  resume: string,
  question: string
) => {
  const { data } = await ApiService.post<{ data: string }>(
    "/resume-ranker/job-application-question",
    {
      resume,
      question,
    }
  );

  return data.data;
};

export const rateMyResume = async (resume: string, jobDescription?: string) => {
  const { data } = await ApiService.post<{ data: string }>(
    "/resume-ranker/rate-resume",
    {
      resume,
      jobDescription,
    }
  );

  return data.data;
};

export const roastMyResume = async (
  resume: string,
  jobDescription?: string
) => {
  const { data } = await ApiService.post<{ data: string }>(
    "/resume-ranker/roast-resume",
    {
      resume,
      jobDescription,
    }
  );

  return data.data;
};

export const generateResumeFile = async ({
  resume,
  type,
}: {
  resume: string;
  type?: keyof typeof FILE_TYPES;
}) => {
  const url =
    type === "PDF"
      ? "/resume-ranker/generate-resume-pdf"
      : "/resume-ranker/generate-resume-docx";
  const { data } = await ApiService.post<Blob>(
    url,
    {
      resume,
    },
    {
      responseType: "blob",
    }
  );

  return data;
};
