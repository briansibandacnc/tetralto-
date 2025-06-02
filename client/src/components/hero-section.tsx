import { motion } from "framer-motion";
import { useAnimations } from "@/hooks/use-animations";

export default function HeroSection() {
  const { animatedCounter } = useAnimations();

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black">
        <img 
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080" 
          alt="Aerial view of residential rooftops at sunset" 
          className="w-full h-full object-cover opacity-70"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60"></div>
      
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-tetralto-orange">Precision</span> Roof Protection
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            AI-Powered Analysis • Instant AR Previews • Storm-Ready Solutions
          </motion.p>
          
          {/* Main CTA Button */}
          <motion.div 
            className="relative inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-tetralto-gold rounded-full pulse-ring"></div>
            <button className="relative bg-tetralto-gold hover:bg-tetralto-orange text-black hover:text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
              <i className="fas fa-drone mr-2"></i>
              Free Drone Inspection
            </button>
          </motion.div>
          
          {/* Trust Indicators */}
          <motion.div 
            className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center">
              <motion.div 
                className="text-3xl font-bold text-tetralto-gold"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {animatedCounter(1247)}
              </motion.div>
              <div className="text-sm">Roofs Protected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tetralto-gold">24/7</div>
              <div className="text-sm">Emergency Service</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tetralto-gold">40min</div>
              <div className="text-sm">Response Time</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
