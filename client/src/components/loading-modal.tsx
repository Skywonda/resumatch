import { FeatureKey } from "@/types/features";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Content = {
  downloading: {
    title: "Extracting Resume Text...",
    description: "Reading between the lines (literally) 🔍",
    emoji: "📄",
  },
  resumeAnalysis: {
    title: "Analyzing Your Resume...",
    description:
      "Our AI is reading your resume more thoroughly than any recruiter ever will 🤓",
    emoji: "🔍",
  },
  resumeTailoring: {
    title: "Tailoring Your Resume...",
    description: "Making your resume fit better than your interview suit 🎯",
    emoji: "✂️",
  },
  coverLetterGen: {
    title: "Crafting Your Cover Letter...",
    description:
      "Writing your love letter to your dream company, minus the desperate vibes 💌",
    emoji: "✍️",
  },
  skillsExtractor: {
    title: "Extracting Your Skills...",
    description: "Finding skills you didn't even know you had 🎯",
    emoji: "🎯",
  },
  resumeBuilder: {
    title: "Building Your Resume...",
    description: "Making you look good on paper (the rest is up to you) 😉",
    emoji: "🏗️",
  },
} as const;

interface LoadingModalProps {
  type: FeatureKey;
  open: boolean;
}

export function LoadingModal({ type, open }: LoadingModalProps) {
  const content = Content[type];

  return (
    <Dialog open={open} onOpenChange={() => null}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto text-4xl mb-4">{content.emoji}</div>
          <DialogTitle className="text-xl text-center">
            {content.title}
          </DialogTitle>
          <DialogDescription className="text-center">
            {content.description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary animate-[loading_1s_ease-in-out_infinite]"
              style={{
                width: "100%",
                animation: "loading 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
