import { useState, useEffect } from "react";
import { Sun, Moon, Palette } from "lucide-react";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState('default');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    document.documentElement.setAttribute('data-theme', newTheme === 'default' ? '' : newTheme);
    setTheme(newTheme);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-xl font-bold">
          Akash Karuturi
        </a>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="hover:text-primary transition-colors">
              About
            </a>
            <a href="#projects" className="hover:text-primary transition-colors">
              Projects
            </a>
            <a href="#contact" className="hover:text-primary transition-colors">
              Contact
            </a>
          </div>
          <div className="flex gap-2 bg-background/80 backdrop-blur-sm p-2 rounded-lg border border-border/50">
            <button
              onClick={() => handleThemeChange('default')}
              className={`p-2 rounded-lg transition-all ${theme === 'default' ? 'bg-primary text-primary-foreground scale-110' : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:scale-105'}`}
              aria-label="Dark theme"
            >
              <Moon className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleThemeChange('pastel')}
              className={`p-2 rounded-lg transition-all ${theme === 'pastel' ? 'bg-primary text-primary-foreground scale-110' : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:scale-105'}`}
              aria-label="Light theme"
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleThemeChange('vivid')}
              className={`p-2 rounded-lg transition-all ${theme === 'vivid' ? 'bg-primary text-primary-foreground scale-110' : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:scale-105'}`}
              aria-label="Vivid theme"
            >
              <Palette className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;