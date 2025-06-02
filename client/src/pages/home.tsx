import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import TrustArchitecture from "@/components/trust-architecture";
import AIAnalyzer from "@/components/ai-analyzer";
import ARVisualizer from "@/components/ar-visualizer";
import ProjectGallery from "@/components/project-gallery";
import StormSimulator from "@/components/storm-simulator";
import Testimonials from "@/components/testimonials";
import LeadCapture from "@/components/lead-capture";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <HeroSection />
      <TrustArchitecture />
      <AIAnalyzer />
      <ARVisualizer />
      <ProjectGallery />
      <StormSimulator />
      <Testimonials />
      <LeadCapture />
      <Footer />
    </div>
  );
}
