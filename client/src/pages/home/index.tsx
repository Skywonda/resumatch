// pages/index.tsx
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Stats from "@/components/landing/Stats";
import Tools from "@/components/landing/Tools";
import HowItWorks from "@/components/landing/HowItWorks";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";
import { Tool } from "@/types/tool";

export default function Home() {
  const toolsData: Tool[] = [
    {
      title: "Resume Enhancement",
      description:
        "AI-powered suggestions to strengthen your resume's impact and relevance.",
      icon: "Wand2",
      path: "/dashboard/enhance-resume",
    },
    {
      title: "Resume Tailoring",
      description: "Match your resume perfectly to specific job descriptions.",
      icon: "Target",
      path: "/dashboard/tailor-resume",
    },
    {
      title: "Cover Letter Generator",
      description:
        "Create compelling cover letters customized to each application.",
      icon: "FileText",
      path: "/dashboard/cover-letter",
    },
    {
      title: "Resume Rating",
      description:
        "Get detailed feedback and scoring on your resume's effectiveness.",
      icon: "Stars",
      path: "/dashboard/rate-resume",
    },
    {
      title: "Resume Roasting",
      description: "Receive brutally honest feedback to perfect your resume.",
      icon: "Flame",
      path: "/dashboard/roast-resume",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <Stats />
        <Features />
        <Tools tools={toolsData} />
        <HowItWorks />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}
