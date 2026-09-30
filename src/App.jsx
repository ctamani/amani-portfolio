import Intro from "./components/Intro/Intro.jsx";
import NavBar from "./components/Intro/NavBar.jsx";
import About from "./components/About/About.jsx";
import Experience from "./components/Experience/Experience.jsx";
import FadeInSection from "./components/FadeInSection.jsx";
import TechStack from "./components/TechStack.jsx";
import ProjectsConsole from "./components/Projects/Console.jsx";
import Connect from "./components/Connect/Connect.jsx";

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