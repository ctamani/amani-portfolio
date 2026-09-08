export const EXPERIENCE_ITEMS = [
  {
    id: "language-app",
    label: "Language App",
    title: "Language Learning App Dev",
    context: "Founder & Full-Stack Developer",
    duration: "2026 — PRESENT",
    description: [
      "Building a speech-centered English-to-Spanish learning app from the ground up, taking full ownership of the backend, mobile, speech, and learning systems.",
      "Built FastAPI/SQLite backend APIs, persistent lesson state, session recovery, and a custom spaced-repetition system that schedules vocabulary review based on retention decay.",
      "Built a speech and dialogue pipeline using Google WaveNet TTS and cloud/offline STT, allowing users to practice real-world conversations with targeted feedback on mistakes.",
      "Designed and built the Flutter mobile UI and async state machine managing lesson flow, audio playback, speech recognition, transcripts, feedback, and 10+ UI states.",
    ],
  },
  {
    id: "rag-team-lead",
    label: "RAG Team Lead",
    title: "RAG Chatbot Developer",
    context: "Data Science Practicum · Illinois Tech",
    duration: "JAN 2026 — MAY 2026",
    description: [
      "Led a team of 5 data science students to build and deploy an LLM-powered academic chatbot to help Illinois Tech students quickly find accurate answers to university information.",
      "Coordinated scraping and preprocessing of 50+ Illinois Tech sources, preserving metadata for MPNet embeddings and FAISS-based semantic retrieval.",
      "Developed a Traffic Cop retrieval pipeline with clarification, query expansion, filtering, and rule-based reranking to handle ambiguous student questions.",
      "Integrated Streamlit and FastAPI for real-time A/B testing of pipeline performance and accuracy of source citations.",
      "Automated evaluation of multiple RAG pipelines across 100 questions in Python, exporting results to CSV/Excel for further quantitative comparison before deploying the strongest-performing pipeline.",
    ],
  },
  {
    id: "cs-104-ta",
    label: "CS 104 TA",
    title: "CS Teaching Assistant",
    context: "Illinois Institute of Technology",
    duration: "JAN 2026 — MAY 2026",
    description: [
      "Taught algorithm design, data structures, and MATLAB as a problem-solving tool to 40+ students",
      "Graded 20+ coding assignments weekly and provided detailed feedback on code quality and best debugging practices to ensure students find success in the classroom.",
      "Guided students with diverse technical backgrounds through assignments in real time by explaining technical ideas clearly and adapting my teaching style to meet their needs.",
    ],
  },
];
