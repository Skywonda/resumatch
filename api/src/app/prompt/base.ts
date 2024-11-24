export const BaseResumePrompts = {
  resumeFormat: `
Expected Resume Format & Examples:

PROFESSIONAL SUMMARY EXAMPLE
[Technical Role] + [Years of Experience] + [Key Technical Domains] | [2-3 Impactful Metrics]
Example: "Senior Backend Engineer with 6 years of expertise in distributed systems and cloud architecture. Led development of high-throughput payment processing system handling $500M annually. Improved system reliability from 99.9% to 99.99% while reducing infrastructure costs by 35%."

EXPERIENCE SECTION EXAMPLES
Company Name | Role | Date Range
[Project/Initiative] + [Action] + [Technology/Method] + [Quantified Impact]

Strong Examples:
• "Architected and deployed microservices-based payment processing system using Node.js/TypeScript, handling 1M+ daily transactions with 99.99% uptime"
• "Led 5-person engineering team in redesigning core authentication service, reducing login latency by 65% and supporting 2M+ active users"
• "Implemented automated CI/CD pipeline using GitHub Actions, reducing deployment time from 45 minutes to 8 minutes and eliminating 90% of deployment-related issues"

Weak Examples (Don't Use):
❌ "Responsible for backend development"
❌ "Worked on various projects using different technologies"
❌ "Helped improve system performance"

SKILLS SECTION FORMAT
Technical Skills:
• Languages: [Primary] → [Proficient] → [Familiar]
• Frameworks: [Most Relevant] → [Secondary]
• Infrastructure: [Core] → [Supporting]
• Tools & Practices: [Essential] → [Complementary]

Example:
Technical Skills:
• Languages: TypeScript, Python, Go, Java
• Frameworks: Node.js, Express, React, Django
• Infrastructure: AWS (ECS, Lambda, S3), Docker, Kubernetes
• Tools & Practices: CI/CD, TDD, Agile, Git

EDUCATION SECTION EXAMPLE
University Name
Degree - Major (GPA if >3.5)
Relevant Coursework: [Only if recent graduate]
`,

  metricFormats: `
QUANTIFICATION TEMPLATES BY CATEGORY:

Technical Impact:
• Performance: "Reduced latency by X%, from Y to Z milliseconds"
• Scale: "Scaled system to handle X requests/second, supporting Y concurrent users"
• Reliability: "Improved system uptime from X% to Y%, reducing downtime by Z hours/month"

Business Impact:
• Cost: "Reduced infrastructure costs by $X annually through Y optimization"
• Revenue: "Implemented features driving X% increase in user conversion, resulting in $Y additional revenue"
• Efficiency: "Automated X processes, saving Y hours per week across Z team members"

Team Impact:
• Leadership: "Led X-person team across Y projects, delivering Z key initiatives ahead of schedule"
• Mentorship: "Mentored X junior developers, with Y promoted to senior roles within Z months"
• Collaboration: "Coordinated with X teams across Y time zones to deliver Z critical features"
`,

  skillsByLevel: `
SKILL EXPECTATIONS BY LEVEL:

Junior Level (0-2 years):
• Core: Git, REST APIs, Basic AWS/Cloud
• Languages: JavaScript/TypeScript, Python
• Practices: Unit Testing, Code Review
• Tools: Docker basics, CI/CD fundamentals

Mid Level (2-5 years):
• Architecture: Microservices, System Design
• Advanced: Performance Optimization, Security
• Infrastructure: Kubernetes, Advanced Cloud
• Leadership: Tech Lead experience, Mentoring

Senior Level (5+ years):
• Expert: Distributed Systems, Scalability
• Strategy: Technical Strategy, Architecture
• Leadership: Team Leadership, Cross-functional
• Business: Technical ROI, Strategic Planning
`,

  avoidPatterns: `
PATTERNS TO AVOID:

Buzzwords (Replace with Specifics):
❌ "Detail-oriented" → ✅ "Reduced bug rate by 40% through comprehensive test coverage"
❌ "Team player" → ✅ "Collaborated with 3 teams to deliver cross-functional feature"
❌ "Problem solver" → ✅ "Debugged and fixed critical production issue affecting 10k users"

Passive Voice (Use Active):
❌ "Was responsible for" → ✅ "Led", "Drove", "Implemented"
❌ "Helped with" → ✅ "Delivered", "Developed", "Architected"
❌ "Was involved in" → ✅ "Spearheaded", "Orchestrated", "Executed"

Vague Statements (Add Specifics):
❌ "Improved performance" → ✅ "Reduced load time by 60% (3s to 1.2s)"
❌ "Worked on features" → ✅ "Implemented real-time chat supporting 100k concurrent users"
❌ "Fixed bugs" → ✅ "Resolved 40 critical production issues, improving uptime by 15%"
`,
};
