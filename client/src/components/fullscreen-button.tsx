import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FullscreenButtonProps {
  isFullscreen: boolean;
  onClick: () => void;
}

export const FullscreenButton: React.FC<FullscreenButtonProps> = ({
  isFullscreen,
  onClick,
}) => (
  <Button variant="outline" onClick={onClick}>
    {isFullscreen ? (
      <>
        <Minimize2 className="h-4 w-4 mr-2" />
        Exit Fullscreen
      </>
    ) : (
      <>
        <Maximize2 className="h-4 w-4 mr-2" />
        Fullscreen
      </>
    )}
  </Button>
);
