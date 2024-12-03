import {
  FileText,
  Stars,
  Clock,
  ArrowRight,
  Target,
  Flame,
  FileEdit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/feature-card";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Enhance Resume",
    description:
      "Get instant feedback and optimization suggestions to strengthen your resume",
    icon: Clock,
    route: "enhance-resume",
    status: "available" as const,
  },
  {
    title: "Tailor Resume",
    description: "Match your resume perfectly to specific job descriptions",
    icon: Target,
    route: "tailor-resume",
    status: "available" as const,
  },
  {
    title: "Rate Resume",
    description:
      "Get a detailed score and analysis of your resume's effectiveness",
    icon: Stars,
    route: "rate-resume",
    status: "available" as const,
  },
  {
    title: "Roast Resume",
    description:
      "Get brutally honest feedback to identify critical improvements",
    icon: Flame,
    route: "roast-resume",
    status: "available" as const,
  },
  {
    title: "Cover Letter Generator",
    description:
      "Create compelling, customized cover letters that complement your resume",
    icon: FileEdit,
    route: "cover-letter",
    status: "available" as const,
  },
  {
    title: "AI Resume Review",
    description: "Get comprehensive AI-powered analysis and suggestions",
    icon: FileText,
    route: "ai-review",
    status: "coming_soon" as const,
  },
];

export default function Dashboard() {
  const onNavigate = useNavigate();
  return (
    <div className="container relative">
      {/* Hero Section */}
      <div className="relative space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-16">
        <div className="mx-auto max-w-[64rem] text-center">
          <h1 className="font-heading text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            Unlock Your Career Potential with{" "}
            <span className="text-primary">ResuMatch AI</span>
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            AI-powered resume optimization to help you land your dream job. Get
            instant feedback, match job descriptions, and improve your chances.
          </p>
          <div className="mt-8 flex justify-center">
            <Button onClick={() => onNavigate("#feature")} size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-5xl" id="features">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Our Features</h2>
          <p className="text-muted-foreground">
            Everything you need to optimize your resume and land your dream job
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              onSelect={() => onNavigate(feature.route)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
