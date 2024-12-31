# ResuMatch

An AI-powered resume enhancement platform that helps job seekers optimize their resumes through intelligent analysis and tailoring.

## 🌟 Features

### Core Functionality
- **Smart Resume Enhancement**: Deep analysis of experiences beyond keywords
- **Intelligent Job Tailoring**: Creates perfect-match versions for specific opportunities
- **Resume Performance Rating**: Detailed 0-100 scoring across key areas
- **Cover Letter Generation**: AI-powered customized cover letters
- **Resume Critique**: Provides detailed, honest feedback
- **Real-time Editing**: Interactive resume modification interface

## 🛠 Technical Stack

### Backend
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **AI Integration**: Google's Gemini AI
- **File Processing**: PDF.js, Mammoth.js for document parsing

### Frontend
- **Framework**: React with TypeScript
- **UI Components**: Custom-built editable components
- **Styling**: Tailwind CSS
- **State Management**: React Context/Hooks

## 🏗 Architecture

### AI Processing Pipeline
```typescript
const processingFlow = {
  1: "Document Upload & Text Extraction",
  2: "Initial Processing & Validation",
  3: "AI Analysis with Structured Prompts",
  4: "Response Parsing & Validation",
  5: "Result Presentation"
}
```

### Key Technical Features

#### 1. Sophisticated Document Processing
- Multi-format support (PDF, DOCX)
- Robust text extraction with error handling
- Link preservation from PDF documents
```typescript
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
```

#### 2. AI Response Handling
- Structured prompt engineering
- Robust error handling for AI responses
- Type-safe response parsing
```typescript
const processResponse = async (rawResponse: string): Promise<ResumeEnhancement> => {
  try {
    return cleanGeminiParse(rawResponse);
  } catch (error) {
    throw new Error('Invalid response format');
  }
};
```

#### 3. Interactive UI Components
- Real-time editable text fields
- Dynamic list management
- State preservation during edits
```typescript
export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  isEditing,
  multiline = false,
  className,
}) => {
  // Implementation details
};
```

## 🚀 Key Technical Challenges Solved

### 1. AI Response Consistency
- Implemented structured prompt templates
- Created robust response parsing system
- Handled edge cases in AI responses

### 2. Document Processing
- Built unified interface for multiple file types
- Implemented robust error handling
- Preserved document formatting and structure

### 3. Real-time Editing
- Developed state-managed editable components
- Implemented undo/redo functionality
- Maintained performance with large documents

## 📈 Future Enhancements

- Template selection for downloads
- Enhanced formatting preservation
- Additional file format support
- Real-time collaboration features

## 🛠 Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```env
   DATABASE_URL=your_postgres_url
   GEMINI_API_KEY=your_gemini_api_key
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines for details.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
