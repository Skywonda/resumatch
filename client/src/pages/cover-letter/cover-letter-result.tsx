import { CoverLetterGeneration } from "@/types/cover-letter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CoverLetterResultProps {
  result: CoverLetterGeneration;
}

export function CoverLetterResult({ result }: CoverLetterResultProps) {
  const { toast } = useToast();

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result.coverLetter.content);
      toast({
        title: "Copied to clipboard",
        description: "Cover letter content has been copied!",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try copying manually",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Your Cover Letter</CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={handleCopyToClipboard}
            >
              <Copy className="h-4 w-4" />
              Copy to Clipboard
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-wrap font-serif">
            {result.coverLetter.content}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Focus Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {result.metadata.focusPoints.map((point, index) => (
              <Badge key={index} variant="secondary">
                {point}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Terms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {result.metadata.keywordsUsed.map((keyword, index) => (
              <Badge key={index} variant="outline">
                {keyword}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Value Proposition</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {result.customization.valueProposition}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
