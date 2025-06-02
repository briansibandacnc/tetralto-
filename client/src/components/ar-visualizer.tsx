import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ARVisualizer() {
  const [selectedMaterial, setSelectedMaterial] = useState("shingles");
  const [selectedColor, setSelectedColor] = useState("gray");

  const materials = [
    { id: "shingles", name: "Asphalt Shingles", icon: "fas fa-home" },
    { id: "metal", name: "Metal Roofing", icon: "fas fa-industry" },
    { id: "tiles", name: "Clay Tiles", icon: "fas fa-chess-board" },
  ];

  const colors = [
    { id: "gray", name: "Gray", class: "bg-gray-600" },
    { id: "red", name: "Red", class: "bg-red-600" },
    { id: "green", name: "Green", class: "bg-green-600" },
  ];

  const launchAR = () => {
    // In a real implementation, this would launch the AR experience
    alert("AR Visualizer would launch here on a mobile device with camera access");
  };

  return (
    <section id="visualizer" className="py-20 bg-tetralto-teal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <i className="fas fa-eye text-tetralto-gold mr-3"></i>
            AR Material Studio
          </motion.h2>
          <p className="text-xl max-w-3xl mx-auto">
            See how different roofing materials look on your actual home with augmented reality
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* AR Interface */}
          <motion.div 
            className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6">Try on Your Mobile Device</h3>
            
            {/* Material Selector */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {materials.map((material) => (
                <motion.div 
                  key={material.id}
                  className={`bg-white bg-opacity-20 rounded-lg p-4 text-center transition-all cursor-pointer ${
                    selectedMaterial === material.id ? 'bg-opacity-30 ring-2 ring-tetralto-gold' : 'hover:bg-opacity-30'
                  }`}
                  onClick={() => setSelectedMaterial(material.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={`${material.icon} text-2xl mb-2`}></i>
                  <div className="text-sm font-semibold">{material.name}</div>
                </motion.div>
              ))}
            </div>
            
            {/* AR Launch Button */}
            <Button 
              className="w-full bg-tetralto-gold hover:bg-tetralto-orange text-black hover:text-white font-bold py-4 px-6 rounded-lg mb-6"
              onClick={launchAR}
            >
              <i className="fas fa-camera mr-2"></i>
              Launch AR Visualizer
            </Button>
            
            {/* QR Code for Mobile */}
            <div className="text-center">
              <motion.div 
                className="bg-white rounded-lg p-4 inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center">
                  <i className="fas fa-qrcode text-white text-3xl"></i>
                </div>
              </motion.div>
              <p className="text-sm mt-2 opacity-80">Scan with mobile for AR experience</p>
            </div>
          </motion.div>
          
          {/* 3D House Preview */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Modern house exterior with various roofing material options" 
              className="rounded-xl shadow-2xl w-full h-auto"
            />
            
            {/* Material Switch Controls */}
            <motion.div 
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 rounded-lg p-4 flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {colors.map((color) => (
                <button 
                  key={color.id}
                  className={`${color.class} hover:bg-tetralto-gold text-white hover:text-black px-3 py-2 rounded transition-all ${
                    selectedColor === color.id ? 'ring-2 ring-tetralto-gold' : ''
                  }`}
                  onClick={() => setSelectedColor(color.id)}
                >
                  {color.name}
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
