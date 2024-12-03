// components/NotFound.tsx
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <div className="text-center space-y-8">
        {/* Icon and Status */}
        <div className="space-y-4">
          <FileQuestion className="mx-auto h-24 w-24 text-muted-foreground" />
          <h1 className="text-4xl font-bold tracking-tight">404</h1>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Page not found</h2>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>

        {/* Action Button */}
        <Button onClick={() => navigate("/")} size="lg" className="mt-8">
          Return Home
        </Button>
      </div>
    </div>
  );
}
