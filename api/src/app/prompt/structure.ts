export const RESUME_RESPONSE_STRUCTURE = `{
  "enhancedContent": {
    "header": {
      "name": string,
      "title": string,
      "contacts": {
        "phone": string,
        "email": string,
        "linkedin": string,
        "location": string
      }
    },
    "professionalSummary": {
      "content": string,
      "highlights": string[]
    },
    "experience": {
      "positions": [
        {
          "role": string,
          "company": string,
          "duration": string,
          "achievements": string[],
          "impactMetrics": string[]
        }
      ]
    },
    "certifications": [
      {
      "title": string,
      "issuer": string,
      "description": string
      }
    ]
   }
    "skills": {
      "technical": string[],
      "domain": string[],
      "leadership": string[]
    },
    "education": {
      "entries": [
        {
          "degree": string,
          "institution": string,
          "year": string,
          "highlights": string[]
        }
      ]
    }
  },
  "optimization": {
    "keyStrengths": string[],
    "impactMetrics": string[],
    "uniqueValue": string[]
  }
}`;
