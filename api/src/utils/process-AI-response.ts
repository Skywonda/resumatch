export async function processResponse<T>(rawResponse: string): Promise<T> {
  try {
    return cleanGeminiParse(rawResponse);
  } catch (error) {
    console.error('Cover letter generation failed:', error);
    throw new Error('Invalid cover letter response format');
  }
}

function cleanGeminiParse<T>(response: string) {
  const cleanedResponse = response
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();

  return JSON.parse(cleanedResponse);
}
