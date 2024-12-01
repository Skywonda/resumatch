import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RatingResult } from "@/types/rate";

export function RatingResults({ result }: { result: RatingResult }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Overall Score: {result.overallScore}/100</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {Object.entries(result.categoryScores).map(([category, score]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-lg font-semibold">
                  {category.replace(/([A-Z])/g, " $1").trim()}: {score.score}/10
                </h3>
                {score.strengths.length > 0 && (
                  <div>
                    <h4 className="font-medium text-green-600">Strengths:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {score.strengths.map((strength, i) => (
                        <li key={i}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {score.gaps.length > 0 && (
                  <div>
                    <h4 className="font-medium text-amber-600">
                      Areas for Improvement:
                    </h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {score.gaps.map((gap, i) => (
                        <li key={i}>
                          <p>{gap.issue}</p>
                          <p className="text-sm text-gray-600">
                            Suggestion: {gap.suggestion}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {result.criticalImprovements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Critical Improvements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {result.criticalImprovements.map((improvement, i) => (
                <li key={i} className="space-y-1">
                  <h4 className="font-medium text-red-600">
                    {improvement.area}
                  </h4>
                  <p>{improvement.issue}</p>
                  <p className="text-sm text-gray-600">
                    Solution: {improvement.solution}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
