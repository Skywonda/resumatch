import mammoth from "mammoth";
// Assuming the pdf.js library adds `pdfjsLib` to the window object once it's loaded.
declare global {
  interface Window {
    pdfjsLib: any;
  }
}

export const extractTextFromDocx = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!(file instanceof Blob)) {
      return reject(new Error("The file must be a Blob or File object."));
    }

    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const arrayBuffer = reader.result as ArrayBuffer;
        const result = await mammoth.extractRawText({
          arrayBuffer: arrayBuffer,
        });
        resolve(result.value);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading the file."));
    };

    reader.readAsArrayBuffer(file);
  });
};

export const extractTextFromPDF = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!(file instanceof Blob)) {
      return reject(new Error("The file must be a Blob or File object."));
    }

    const reader = new FileReader();

    reader.onload = async () => {
      try {
        if (!window.pdfjsLib) {
          throw new Error("PDF.js is not loaded yet");
        }

        const arrayBuffer = reader.result as ArrayBuffer;
        const typedArray = new Uint8Array(arrayBuffer);
        const loadingTask = window.pdfjsLib.getDocument({ data: typedArray });
        const pdf = await loadingTask.promise;
        let url = "### LINKS \n";
        let extractedText = "";

        // const url = await pdf.getUrlProp()

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          const page = await pdf.getPage(pageNumber);
          const links = await page.getAnnotations();
          const textContent = await page.getTextContent();
          const pageLinks = links.map((link: any) => link.url).join("\n");
          const pageText = textContent.items
            .map((item: any) => item.str)
            .join(" ");
          url += pageLinks + "\n";
          extractedText += pageText + "\n";
        }

        if (!extractedText.trim()) {
          throw new Error(
            "This document appears to be image-based and may not contain selectable text."
          );
        }

        resolve(extractedText + url);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading the file."));
    };

    reader.readAsArrayBuffer(file);
  });
};

export const extractTextFromFile = (file: File): Promise<string> => {
  const fileType = file.name.split(".").pop();
  switch (fileType) {
    case "pdf":
      return extractTextFromPDF(file);
    case "docx":
      return extractTextFromDocx(file);
    default:
      return Promise.reject(new Error("Unsupported file type."));
  }
};

export default extractTextFromFile;
