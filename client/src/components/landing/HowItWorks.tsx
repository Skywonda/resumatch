import { FileText, Wand2, Check } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FileText className="h-12 w-12 text-primary" />,
      title: "Upload Your Resume",
      description:
        "Upload your existing resume or create a new one using our templates.",
    },
    {
      icon: <Wand2 className="h-12 w-12 text-primary" />,
      title: "AI Enhancement",
      description:
        "Our AI analyzes and optimizes your resume for maximum impact.",
    },
    {
      icon: <Check className="h-12 w-12 text-primary" />,
      title: "Get Results",
      description:
        "Download your enhanced resume and start landing interviews.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            How It Works
          </h2>
          <p className="mt-4 text-gray-500 md:text-xl">
            Three simple steps to your perfect resume
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/4 left-1/2 w-full h-0.5 bg-gray-200" />
              )}
              {/* Step Content */}
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
