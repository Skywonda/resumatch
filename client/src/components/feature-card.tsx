import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  status: "available" | "coming_soon";
  onSelect: () => void;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  status,
  onSelect,
}: FeatureCardProps) {
  return (
    <Card className="relative overflow-hidden border border-muted transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-primary/10 p-2">
            <Icon className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              {title}
              {status === "coming_soon" && (
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-normal">
                  Coming Soon
                </span>
              )}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button
          variant={status === "available" ? "default" : "secondary"}
          className="w-full"
          onClick={onSelect}
          disabled={status === "coming_soon"}
        >
          {status === "available" ? "Get Started" : "Coming Soon"}
        </Button>
      </CardContent>
    </Card>
  );
}
