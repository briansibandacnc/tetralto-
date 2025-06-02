import { motion } from "framer-motion";

export default function Footer() {
  const services = [
    "Roof Replacement",
    "Storm Damage Repair", 
    "Insurance Claims",
    "Maintenance"
  ];

  const technology = [
    "AI Roof Analyzer",
    "AR Visualizer",
    "Drone Inspections",
    "Storm Tracking"
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-tetralto-gold mb-4">TETRALTO</h3>
            <p className="text-gray-400 mb-4">
              Precision roof protection powered by AI technology and decades of experience.
            </p>
            <div className="flex space-x-4">
              <motion.i 
                className="fab fa-facebook text-tetralto-teal hover:text-tetralto-gold cursor-pointer text-xl"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              />
              <motion.i 
                className="fab fa-instagram text-tetralto-teal hover:text-tetralto-gold cursor-pointer text-xl"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              />
              <motion.i 
                className="fab fa-linkedin text-tetralto-teal hover:text-tetralto-gold cursor-pointer text-xl"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.div>
          
          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              {services.map((service) => (
                <li key={service}>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="hover:text-tetralto-gold transition-colors text-left"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Technology */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-4">Technology</h4>
            <ul className="space-y-2 text-gray-400">
              {technology.map((tech) => (
                <li key={tech}>
                  <button 
                    onClick={() => scrollToSection(tech.includes('AI') ? 'analyzer' : 'visualizer')}
                    className="hover:text-tetralto-gold transition-colors text-left"
                  >
                    {tech}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <div>
                <i className="fas fa-phone mr-2 text-tetralto-teal"></i> 
                <a href="tel:555-123-7663" className="hover:text-tetralto-gold transition-colors">
                  (555) 123-ROOF
                </a>
              </div>
              <div>
                <i className="fas fa-envelope mr-2 text-tetralto-teal"></i> 
                <a href="mailto:info@tetralto.com" className="hover:text-tetralto-gold transition-colors">
                  info@tetralto.com
                </a>
              </div>
              <div>
                <i className="fas fa-map-marker-alt mr-2 text-tetralto-teal"></i> 
                Miami, FL
              </div>
              <div>
                <i className="fas fa-clock mr-2 text-tetralto-teal"></i> 
                24/7 Emergency Service
              </div>
            </div>
          </motion.div>
        </div>
        
        <hr className="my-8 border-gray-700" />
        
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm">© 2024 Tetralto Roofing. All rights reserved.</p>
          <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
            <a href="#" className="hover:text-tetralto-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-tetralto-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-tetralto-gold transition-colors">Licensing</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
