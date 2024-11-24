import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface DashboardLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  result?: React.ReactNode;
  isLoading?: boolean;
  buttonText: string;
  onSubmit: () => void;
}

export function DashboardLayout({
  title,
  description,
  children,
  result,
  isLoading,
  buttonText,
  onSubmit,
}: DashboardLayoutProps) {
  return (
    <div className="bg-background min-h-screen">
      {/* Header Section */}
      <div className="container max-w-screen-2xl py-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {/* Main Content Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Left Panel - Input Section */}
          <Card className="lg:col-span-2 p-6">
            <div className="space-y-6">
              {children}
              <Button
                className="w-full"
                disabled={isLoading}
                onClick={onSubmit}
              >
                {isLoading ? "Processing..." : buttonText}
              </Button>
            </div>
          </Card>

          {/* Right Panel - Results Section */}
          <Card className="lg:col-span-3 min-h-[500px] p-6">
            {result ? (
              result
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground">
                    Your results will appear here
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
