import { jsPDF } from "jspdf";
import type { ResumeData } from "@/types/resume";

export type ExportFormat = "pdf" | "docx";

function constructResumeHtml(resume: string) {
  return ` 
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Resume</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
      ${resume}
    </body>
  </html>`;
}

function triggerFileDownload(
  file: Blob,
  ext: "pdf" | "docx",
  name: string = "resume"
) {
  const link = document.createElement("a");
  const fileURL = URL.createObjectURL(file);
  link.href = fileURL;
  link.setAttribute("download", `${name}.${ext}`);
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
}

export function useResumeExport() {
  const exportToPdf = async () => {
    try {
      const resumeElement = document.getElementById("resume-content");
      if (!resumeElement) throw new Error("Resume content not found");

      const htmlContent = constructResumeHtml(resumeElement.outerHTML);

      const pdf = new jsPDF({
        format: "a4",
        unit: "pt",
        hotfixes: ["px_scaling"],
        compress: true,
      });

      await pdf.html(htmlContent, {
        html2canvas: {
          scale: 2, // Higher scale for better quality
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
          windowWidth: 800, // Match your resume max-width
          removeContainer: true,
          scrollX: 0,
          scrollY: 0,
          imageTimeout: 0,
          onclone: (doc) => {
            const element = doc.getElementById("resume-content");
            if (element) {
              element.style.transform = "none";
              element.style.padding = "40px";
              element.style.margin = "0";
            }
          },
        },
        margin: [40, 40, 40, 40],
        x: 0,
        y: 0,
        width: 595.28, // A4 width in points
        autoPaging: "text",
        image: { type: "jpeg", quality: 1 },
        callback: function (doc) {
          const pdfBlob = new Blob([doc.output("blob")], {
            type: "application/pdf",
          });
          triggerFileDownload(pdfBlob, "pdf");
        },
      });
    } catch (error) {
      console.error("PDF export failed:", error);
      throw error instanceof Error ? error : new Error("PDF export failed");
    }
  };

  const exportResume = async (_: ResumeData, format: ExportFormat = "pdf") => {
    return format === "pdf" ? exportToPdf() : exportToPdf();
  };

  return { exportResume };
}
