export const PROJECTS = [
  {
    id: "language-app",
    title: "Language App",
    image: "/images/projects/language-app.png",
    detailImage: "/images/projects/language-app-ui.png",
    alt: "Preview of the language learning app project",
    description:
      "Currently developing a speech-first language learning app that combines real conversation practice with adaptive spaced repetition and personalized review to help people actually learn how to speak a new language.",
    stack: ["FastAPI", "Flutter", "SQLite", "Python"],
    //liveLink: "#",
    },
  {
    id: "rag-chatbot",
    title: "IIT Chatbot",
    image: "/images/projects/rag-chatbot.png",
    detailImage: "/images/projects/rag-chatbot-ui.png",
    alt: "Preview of the IIT RAG chatbot project",
    description:
      "An academic support chatbot grounded in official university policy sources using retrieval-augmented generation pipelines.",
    stack: ["Python", "FAISS", "FastAPI", "Streamlit"],
    githubLink: "#",
  },
  {
    id: "forecasting-recessions",
    title: "Forecasting Recessions",
    image: "/images/projects/forecasting-recessions.png",
    detailImage: "/images/projects/forecasting-recessions-ui.png",
    alt: "Preview of the recession forecasting project",
    description:
      "Machine learning project using 50+ years of Federal Reserve data to forecast U.S recession risk 3-6 months ahead. Compared Logistic Regression, Random Forest, and XGBoost, with the tuned XGBoost model achieving ~0.99 ROC-AUC. ",
    stack: ["R", "XGBoost", "Random Forest", "ggplot2"],
    githubLink: "#",
  },
];