// components/landing/FAQ.tsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does ResuMatch enhance my resume?",
      answer:
        "ResuMatch uses advanced AI to analyze your resume against job requirements, providing personalized suggestions to improve content, highlight key achievements, and optimize keywords for ATS systems.",
    },
    {
      question: "Will my resume be ATS-friendly?",
      answer:
        "Yes! Our AI specifically optimizes your resume for Applicant Tracking Systems (ATS) while maintaining readability for human recruiters. We ensure proper formatting, keyword optimization, and industry-standard sections.",
    },
    {
      question: "How accurate is the resume rating system?",
      answer:
        "Our rating system provides detailed analysis across multiple categories including impact, clarity, and ATS compatibility. Each score is based on industry standards and real hiring data.",
    },
    {
      question: "Can I use ResuMatch for different industries?",
      answer:
        "Absolutely! ResuMatch adapts to various industries and roles, providing tailored suggestions based on your specific field and target position.",
    },
    {
      question: "How brutal is the resume roast feature?",
      answer:
        "Our resume roast provides honest, constructive feedback while maintaining professionalism. We highlight areas for improvement with actionable suggestions rather than just criticism.",
    },
    {
      question: "How does the cover letter generator work?",
      answer:
        "Our AI analyzes your resume and the job description to create a personalized cover letter that highlights relevant experiences and achievements, maintaining your voice while optimizing for impact.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-500 md:text-xl">
            Everything you need to know about ResuMatch
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 rounded-lg">
              <button
                className="flex w-full justify-between px-6 py-4 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-lg">{faq.question}</span>
                <ChevronDown
                  className={`${
                    openIndex === index ? "transform rotate-180" : ""
                  } w-5 h-5 text-gray-500 transition-transform duration-200`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-500">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Still have questions?{" "}
            <a href="/contact" className="text-primary hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
