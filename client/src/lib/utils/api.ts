import axios from "axios";
import Cookies from "js-cookie";

export const FILE_TYPES = {
  PDF: "PDF",
  DOCX: "DOCX",
  TXT: "TXT",
} as const;

const baseURL = import.meta.env.VITE_API_URL;

// Create separate instances for auth and resume APIs
export const AuthService = axios.create({
  baseURL: `${baseURL}/api/auth` || "http://localhost:8000/api/auth",
});

export const ApiService = axios.create({
  baseURL: `${baseURL}/api/resume` || "http://localhost:8000/api/resume",
});

ApiService.interceptors.request.use(async (config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

AuthService.interceptors.request.use(async (config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const initiateEmailLogin = async (email: string) => {
  const { data } = await AuthService.post("/login/email/initiate", { email });
  return data;
};

export const verifyEmailLogin = async (email: string, code: string) => {
  const { data } = await AuthService.post("/login/email/verify", {
    email,
    code,
  });
  if (data.token) {
    Cookies.set("token", data.token);
  }
  return data;
};

export const checkAuthStatus = async () => {
  try {
    const { data } = await AuthService.get<{
      isAuthenticated: boolean;
      user: {
        id: string;
        email: string;
        name?: string;
      };
    }>("/status");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      Cookies.remove("token");
      localStorage.removeItem("token");
    }
    throw error;
  }
};

// Resume APIs
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

export const rateMyResume = async (resume: string) => {
  const { data } = await ApiService.post<{ data: string }>("/rate", {
    resumeText: resume,
  });

  return { data: data };
};

export const generateCoverLetter = async (
  jobDescription: string,
  resumeText: string,
  companyName: string
) => {
  const { data } = await ApiService.post<{ data: string }>("/cover-letter", {
    resumeText,
    companyName,
    jobDescription,
  });

  return { data: data };
};

export const roastMyResume = async (resume: string) => {
  const { data } = await ApiService.post<{ data: string }>("roast", {
    resumeText: resume,
  });

  return { data: data };
};

// Error handling helper
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "An error occurred";
  }
  return "An unexpected error occurred";
};

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const { isAuthenticated } = await checkAuthStatus();
    return isAuthenticated;
  } catch {
    return false;
  }
};
