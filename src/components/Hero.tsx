import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  return (
    <section className="min-h-[70vh] flex items-center justify-center relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("/your-image.jpg")',
          filter: 'brightness(0.3)'
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-up">
          <h1 className="text-4xl md:text-6xl font-medium mb-4">
            Hi, I'm{" "}
            <TypeAnimation
              sequence={[
                'Akash Karuturi',
                2000,
                'Software Developer',
                2000,
              ]}
              wrapper="span"
              speed={50}
              className="text-primary font-normal"
              repeat={Infinity}
            />
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6">
            A passionate developer crafting digital experiences
          </p>
          <div className="flex flex-col items-center gap-3">
            <a
              href="#contact"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-md hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </a>
            <div className="flex items-center gap-4 text-muted-foreground">
              <a 
                href="https://github.com/akash0218" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/akash1802" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;