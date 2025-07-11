
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Download, Clock, Shield, BookOpen, TrendingUp } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description: "Find papers by subject, year, university, or exam board with our intelligent search system.",
      color: "text-primary"
    },
    {
      icon: Download,
      title: "Instant Download",
      description: "Download papers in PDF format instantly. No waiting, no complicated processes.",
      color: "text-accent"
    },
    {
      icon: Clock,
      title: "Latest Papers",
      description: "Access the most recent past papers as soon as they're available.",
      color: "text-primary"
    },
    {
      icon: Shield,
      title: "Verified Content",
      description: "All papers are verified and sourced from official exam boards and universities.",
      color: "text-accent"
    },
    {
      icon: BookOpen,
      title: "Multiple Subjects",
      description: "Cover all major subjects from Science, Math, Literature to Business and more.",
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your practice sessions and track your improvement over time.",
      color: "text-accent"
    }
  ];

  return (
    <section id="features" className="py-24 px-4 bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block bg-gradient-primary px-4 py-2 rounded-full text-white text-sm font-medium mb-4">
            Why Choose Us
          </div>
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Everything You Need to <span className="text-gradient">Excel</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive tools and resources designed to help you succeed in your academic journey
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group border-2 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl bg-white/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-primary rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
