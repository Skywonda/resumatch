import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import type { ResumeData } from "@/types/resume";

export type ExportFormat = "pdf" | "docx";

export function useResumeExport() {
  const exportToPdf = async () => {
    try {
      const resumeElement = document.getElementById("resume-content");
      if (!resumeElement) {
        throw new Error(
          "Resume content not found. Please ensure the resume is properly loaded."
        );
      }

      // Wait for any potential images to load
      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = await html2canvas(resumeElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: resumeElement.scrollWidth,
        windowHeight: resumeElement.scrollHeight,
        onclone: (doc) => {
          const clonedResume = doc.getElementById("resume-content");
          if (clonedResume) {
            clonedResume.style.visibility = "visible";
            clonedResume.style.width = `${resumeElement.scrollWidth}px`;
            clonedResume.style.height = `${resumeElement.scrollHeight}px`;
          }
        },
      });

      const imgData = canvas.toDataURL("image/png", 1.0);

      // A4 dimensions in pts (72 per inch)
      const pdfWidth = 595.28;
      const pdfHeight = 841.89;

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      // Calculate scaling to fit A4
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const scaledWidth = imgWidth * ratio;
      const scaledHeight = imgHeight * ratio;
      const xOffset = (pdfWidth - scaledWidth) / 2;
      const yOffset = (pdfHeight - scaledHeight) / 2;

      // Add image to PDF and save
      pdf.addImage(imgData, "PNG", xOffset, yOffset, scaledWidth, scaledHeight);
      pdf.save("resume.pdf");
    } catch (error) {
      console.error("PDF export failed:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to export PDF. Please try again."
      );
    }
  };

  const exportResume = async (_: ResumeData, format: ExportFormat = "pdf") => {
    return format === "pdf" ? exportToPdf() : exportToPdf();
  };

  return { exportResume };
}
