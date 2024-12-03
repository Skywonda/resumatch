import { Zap, Shield, Rocket, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Features() {
  const features = [
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "AI-Powered Enhancement",
      description:
        "Our advanced AI analyzes and enhances your resume to highlight your strongest qualifications.",
    },
    {
      icon: <Target className="h-10 w-10 text-primary" />,
      title: "Perfect Job Matching",
      description:
        "Automatically tailor your resume to match specific job descriptions and requirements.",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "ATS-Optimized",
      description:
        "Ensure your resume passes Applicant Tracking Systems with our smart optimization engine.",
    },
    {
      icon: <Rocket className="h-10 w-10 text-primary" />,
      title: "Instant Improvement",
      description:
        "Get real-time suggestions and improvements to make your resume stand out instantly.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Powerful Features
          </h2>
          <p className="mt-4 text-gray-500 md:text-xl">
            Everything you need to create the perfect resume
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
