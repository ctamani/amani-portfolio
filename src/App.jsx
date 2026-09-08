import Intro from "./components/Intro.jsx";
import NavBar from "./components/NavBar.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";

export default function App() {
  return (
    <>
      <NavBar />

      <main>
        <Intro />
        <About />
        <Experience />
      </main>
    </>
  );
}