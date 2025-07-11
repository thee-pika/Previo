import './globals.css';
import Features from "./components/Features";
import CTA from "./components/CTA";
import HeroPage from "./components/HeroPage";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroPage />
      <Features />
      <CTA />
    </div>
  )
}


