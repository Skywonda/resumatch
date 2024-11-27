import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import type { ResumeData } from "@/types/resume";

export type ExportFormat = "pdf" | "docx";

export function useResumeExport() {
  const exportToPdf = async () => {
    try {
      const resumeElement = document.getElementById("resume-content");
      if (!resumeElement) throw new Error("Resume content not found");

      const canvas = await html2canvas(resumeElement, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        imageTimeout: 0,
        removeContainer: true,
        onclone: (doc) => {
          const clone = doc.getElementById("resume-content");
          if (clone) {
            clone.setAttribute(
              "style",
              `${clone.getAttribute("style") || ""}
              transition: none !important;
              animation: none !important;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;`
            );
          }
        },
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.85);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
        compress: true,
      });

      const pdfWidth = 595.28;
      const pdfHeight = 841.89;
      const ratio = Math.min(
        (pdfWidth - 40) / canvas.width,
        (pdfHeight - 40) / canvas.height
      );

      const scaledWidth = canvas.width * ratio;
      const scaledHeight = canvas.height * ratio;
      const x = (pdfWidth - scaledWidth) / 2;
      const y = (pdfHeight - scaledHeight) / 2;

      pdf.addImage(imgData, "JPEG", x, y, scaledWidth, scaledHeight);

      // Create and download blob directly without datauristring
      const pdfBlob = new Blob([pdf.output("blob")], {
        type: "application/pdf",
      });
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "resume.pdf";
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF export failed:", error);
      throw error instanceof Error ? error : new Error("PDF export failed");
    }
  };

  const exportResume = async (
    data: ResumeData,
    format: ExportFormat = "pdf"
  ) => {
    return format === "pdf" ? exportToPdf() : exportToPdf();
  };

  return { exportResume };
}
