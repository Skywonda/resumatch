import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="container px-4 py-16 md:py-24 lg:py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Land Your Dream Job with{" "}
            <span className="text-primary">AI-Powered</span> Resume Tools
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Transform your job search with our suite of AI tools. Get
            personalized resume enhancement, perfect tailoring, and honest
            feedback.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="bg-primary hover:bg-primary/90"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("#")}>
              View Pricing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
