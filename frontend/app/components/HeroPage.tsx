
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Award, Users, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

const HeroPage = () => {
  return (
    <section className="bg-gradient-secondary py-24 px-4 relative overflow-hidden">
     
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-primary mb-6 shadow-sm">
            <Star className="h-4 w-4 fill-current text-accent" />
            Trusted by 100,000+ students worldwide
          </div>
          
          <h1 className="text-6xl md:text-7xl font-extrabold text-foreground mb-6 leading-tight">
            Find Your <span className="text-gradient">Past Papers</span>
            <br />
            <span className="text-3xl md:text-4xl font-semibold text-muted-foreground">
              Ace Your Exams with Confidence
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Access thousands of verified past papers from top universities and exam boards. 
            Practice with real questions, understand exam patterns, and boost your academic performance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
           <Link href="/dashboard">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 px-8 py-6 text-lg font-semibold shadow-xl"
            >
              <Search className="mr-2 h-5 w-5" />
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
           </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-primary/30 text-primary hover:bg-primary/10 px-8 py-6 text-lg font-semibold backdrop-blur-sm"
            >
              Browse Papers
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">10,000+</div>
              <div className="text-muted-foreground">Past Papers Available</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Award className="h-8 w-8 text-accent mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">200+</div>
              <div className="text-muted-foreground">Top Universities</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Users className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">100K+</div>
              <div className="text-muted-foreground">Happy Students</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPage;
