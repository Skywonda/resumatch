import { ResumeRoast } from "@/types/roast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, AlertTriangle, CheckCircle, X } from "lucide-react";

interface RoastResultProps {
  result: ResumeRoast;
}

export function RoastResult({ result }: RoastResultProps) {
  // Helper function to determine badge color based on brutality score
  const getBrutalityColor = (score: number) => {
    if (score >= 8) return "text-red-500";
    if (score >= 6) return "text-orange-500";
    return "text-yellow-500";
  };

  return (
    <div className="space-y-6">
      {/* Opening Roast Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Flame
                className={`h-5 w-5 ${getBrutalityColor(
                  result.overallRoast.brutalScore
                )}`}
              />
              Brutality Score: {result.overallRoast.brutalScore}/10
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="font-medium text-lg">
            {result.overallRoast.openingRoast}
          </p>
          <div className="space-y-2">
            {result.overallRoast.generalThoughts.map((thought, index) => (
              <p key={index} className="text-muted-foreground">
                • {thought}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Major Issues Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Major Resume Crimes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {result.topCrimes.map((crime, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold text-lg">{crime.description}</h3>
                <div className="pl-4 space-y-2">
                  {crime.evidence.map((evidence, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-red-500"
                    >
                      <X className="h-4 w-4" />
                      <span>{evidence}</span>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground pl-4">
                  <span className="font-medium">Fix it: </span>
                  {crime.remedy}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section-by-Section Roast */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Roasting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(result.sectionRoasts).map(([section, roast]) => (
            <div key={section} className="space-y-2">
              <h3 className="font-semibold text-lg capitalize">{section}</h3>
              <p className="italic">{roast.roast}</p>
              <div className="pl-4 space-y-2">
                <p className="font-medium">Issues:</p>
                {roast.issues.map((issue, index) => (
                  <p key={index} className="text-muted-foreground">
                    • {issue}
                  </p>
                ))}
                <p className="text-green-600">
                  <span className="font-medium">How to fix: </span>
                  {roast.howToFix}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Final Thoughts */}
      <Card>
        <CardHeader>
          <CardTitle>Final Verdict</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="font-medium">The Harsh Truth:</p>
            <p className="text-red-500">{result.finalThoughts.harshTruth}</p>
          </div>
          {result.finalThoughts.actuallyGood.length > 0 && (
            <div className="space-y-2">
              <p className="font-medium">Silver Linings:</p>
              <div className="flex flex-wrap gap-2">
                {result.finalThoughts.actuallyGood.map((good, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    {good}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="font-medium">{result.finalThoughts.finalRoast}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
