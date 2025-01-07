import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import VisitorChat from "@/components/VisitorChat";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <VisitorChat />
    </div>
  );
};

export default Index;