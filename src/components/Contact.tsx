import { Mail, Github, Linkedin, Phone, Download } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

const Contact = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadResume = async () => {
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
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <p className="text-lg text-muted-foreground mb-12">
            I'm always open to new opportunities and interesting projects.
            Feel free to reach out!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <a
              href="mailto:akash.karuturi00@gmail.com"
              className="group flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 hover:scale-105"
            >
              <Mail className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm group-hover:text-primary transition-colors">Email</span>
              <span className="text-xs text-muted-foreground">akash.karuturi00@gmail.com</span>
            </a>
            <a
              href="https://github.com/akash0218"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 hover:scale-105"
            >
              <Github className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm group-hover:text-primary transition-colors">GitHub</span>
              <span className="text-xs text-muted-foreground">github.com/akash0218</span>
            </a>
            <a
              href="https://www.linkedin.com/in/akash1802"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 hover:scale-105"
            >
              <Linkedin className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm group-hover:text-primary transition-colors">LinkedIn</span>
              <span className="text-xs text-muted-foreground">linkedin.com/in/akash1802</span>
            </a>
            <a
              href="tel:+14699228740"
              className="group flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 hover:scale-105"
            >
              <Phone className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm group-hover:text-primary transition-colors">Phone</span>
              <span className="text-xs text-muted-foreground">+1 (469) 922-8740</span>
            </a>
          </div>
          <Button
            className="gap-2 hover:scale-105 transition-transform"
            onClick={handleDownloadResume}
            disabled={isDownloading}
          >
            <Download className="w-4 h-4" />
            {isDownloading ? 'Downloading...' : 'Download Resume'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;