import { useState } from "react";
import ProfileCarousel from "./ProfileCarousel";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const About = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadResume = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDownloading(true);
    try {
      const { data, error } = await supabase.storage
        .from('resumes')
        .list();

      if (error) {
        console.error('Error listing resumes:', error);
        toast.error('Error fetching resume');
        return;
      }

      // Get the most recent resume file (PDF or DOCX)
      const resumeFile = data
        ?.filter(file => file.name.toLowerCase().match(/\.(pdf|docx)$/))
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];

      if (!resumeFile) {
        toast.error('No resume found');
        return;
      }

      const { data: fileData, error: downloadError } = await supabase.storage
        .from('resumes')
        .download(resumeFile.name);

      if (downloadError) {
        console.error('Error downloading resume:', downloadError);
        toast.error('Error downloading resume');
        return;
      }

      // Create blob URL and trigger download
      const mimeType = resumeFile.name.toLowerCase().endsWith('.pdf') 
        ? 'application/pdf'
        : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      
      const blob = new Blob([fileData], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', resumeFile.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('Resume downloaded successfully');
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast.error('Error downloading resume');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section id="about" className="py-16 bg-muted/10 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-12 mb-8">
            <div className="w-full md:w-72 lg:w-96 animate-bounce-slow">
              <div className="bg-card/50 p-4 rounded-lg border border-border/50 shadow-lg">
                <ProfileCarousel />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6 text-center md:text-left">About Me</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Hello! I'm a passionate developer with a Master's in Computer Science from The University of Texas at Dallas.
                </p>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">Email:</span>
                    <a href="mailto:akash.karuturi00@gmail.com" className="hover:text-primary transition-colors">
                      akash.karuturi00@gmail.com
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">Phone:</span>
                    <a href="tel:+14699228740" className="hover:text-primary transition-colors">
                      +1 (469) 922-8740
                    </a>
                  </p>
                </div>
                <div className="pt-4">
                  <Button 
                    onClick={handleDownloadResume}
                    disabled={isDownloading}
                    className="w-full md:w-auto"
                  >
                    {isDownloading ? 'Downloading...' : 'Download Resume'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">LeetCode Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/30 rounded-md backdrop-blur-sm">
                <p className="text-2xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Problems Solved</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-md backdrop-blur-sm">
                <p className="text-2xl font-bold text-primary">200+</p>
                <p className="text-sm text-muted-foreground">Medium Problems</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-md backdrop-blur-sm">
                <p className="text-2xl font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground">Hard Problems</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;