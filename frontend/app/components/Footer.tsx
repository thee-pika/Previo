
import { BookOpen, Facebook, Twitter, Instagram, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-gradient">Previo</span>
            </div>
            <p className="text-background/80 leading-relaxed">
              Empowering students worldwide with comprehensive past papers and exam resources for academic excellence.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-background/70 hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-background/70 hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-background/70 hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="h-6 w-6 text-background/70 hover:text-primary cursor-pointer transition-colors" />
              <Github className="h-6 w-6 text-background/70 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 text-primary">Quick Links</h3>
            <ul className="space-y-3 text-background/80">
              <li><a href="#" className="hover:text-primary transition-colors">Browse Papers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Advanced Search</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Latest Papers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Popular Subjects</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Study Guides</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 text-primary">Support</h3>
            <ul className="space-y-3 text-background/80">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Report Issue</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Feedback</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 text-primary">Legal</h3>
            <ul className="space-y-3 text-background/80">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Academic Integrity</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/20 pt-8 text-center">
          <p className="text-background/70">
            © 2024 PyQPapers. All rights reserved. Made with ❤️ for students worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
