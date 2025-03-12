import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";

const Home = () => (
  <div className="flex flex-col items-center justify-center">
    <Hero />
    <Projects />
    <About />
    <Contact />
  </div>
);

export default Home;
