import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navigation() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const timeLeftMs = endOfDay.getTime() - now.getTime();
      
      const hours = Math.floor(timeLeftMs / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeftMs % (1000 * 60)) / 1000);
      
      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Emergency Rainbow Gradient Bar */}
      <div className="gradient-animation text-white text-center py-2 px-4 text-sm font-bold fixed top-0 w-full z-50">
        <i className="fas fa-exclamation-triangle mr-2"></i>
STORM DAMAGE ALERT! Free Emergency Inspection - Call (555) 123-ROOF Now!
        <span className="ml-2 bg-black bg-opacity-30 px-2 py-1 rounded">
          {timeLeft}
        </span>
      </div>

      {/* Sticky Navigation */}
      <motion.nav 
        className="bg-tetralto-teal shadow-lg sticky top-8 z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">TETRALTO</h1>
              <span className="ml-2 text-white text-sm">Precision Roofing</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-white hover:text-tetralto-gold transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('analyzer')} 
                className="text-white hover:text-tetralto-gold transition-colors"
              >
                AI Analyzer
              </button>
              <button 
                onClick={() => scrollToSection('visualizer')} 
                className="text-white hover:text-tetralto-gold transition-colors"
              >
                AR Visualizer
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-white hover:text-tetralto-gold transition-colors"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-white hover:text-tetralto-gold transition-colors"
              >
                Contact
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button className="text-white">
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
