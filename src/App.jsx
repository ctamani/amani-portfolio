import Intro from "./components/Intro.jsx";
import NavBar from "./components/NavBar.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import FadeInSection from "./components/FadeInSection.jsx";
import TechStack from "./components/TechStack.jsx";
import ProjectsConsole from "./components/ProjectsConsole.jsx";
import Connect from "./components/Connect.jsx";

export default function App() {
  return (
    <>
      <NavBar />

      <main>
        <FadeInSection>
          <Intro />
        </FadeInSection>
        <FadeInSection>
          <About />
        </FadeInSection>
        <FadeInSection>
          <Experience />
        </FadeInSection>
        <FadeInSection>
          <TechStack />
        </FadeInSection>
        <FadeInSection>
          <ProjectsConsole />
        </FadeInSection>
        <FadeInSection>
          <Connect />
        </FadeInSection>
      </main>
    </>
  );
}