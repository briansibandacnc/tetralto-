import { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export default function StormSimulator() {
  const [windSpeed, setWindSpeed] = useState([75]);
  const [selectedHail, setSelectedHail] = useState("tennis");

  const hailSizes = [
    { id: "pea", name: "Pea", size: "0.25\"" },
    { id: "golf", name: "Golf Ball", size: "1.75\"" },
    { id: "tennis", name: "Tennis Ball", size: "2.5\"" },
    { id: "baseball", name: "Baseball", size: "2.75\"" }
  ];

  const materials = [
    { name: "Standard Shingles", performance: 33, color: "bg-red-500", rating: "Poor" },
    { name: "Impact Resistant", performance: 66, color: "bg-yellow-500", rating: "Good" },
    { name: "Metal Roofing", performance: 100, color: "bg-green-500", rating: "Excellent" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <i className="fas fa-cloud-rain text-tetralto-gold mr-3"></i>
            Storm Damage Simulator
          </motion.h2>
          <p className="text-xl max-w-3xl mx-auto">
            See how different roofing materials withstand Florida's extreme weather conditions
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Simulator Controls */}
          <motion.div 
            className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6">Weather Intensity</h3>
            
            {/* Wind Speed Slider */}
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-2">Wind Speed</label>
              <div className="relative">
                <Slider
                  value={windSpeed}
                  onValueChange={setWindSpeed}
                  max={200}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm mt-2">
                  <span>0 mph</span>
                  <span className="text-tetralto-gold font-semibold">{windSpeed[0]} mph</span>
                  <span>200 mph</span>
                </div>
              </div>
            </div>
            
            {/* Hail Size Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-4">Hail Size</label>
              <div className="grid grid-cols-4 gap-3">
                {hailSizes.map((hail) => (
                  <Button
                    key={hail.id}
                    variant={selectedHail === hail.id ? "default" : "secondary"}
                    className={`text-sm ${
                      selectedHail === hail.id 
                        ? 'bg-tetralto-orange text-white' 
                        : 'bg-gray-600 hover:bg-tetralto-orange text-white'
                    }`}
                    onClick={() => setSelectedHail(hail.id)}
                  >
                    {hail.name}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Material Comparison */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Material Performance</h4>
              
              {materials.map((material, index) => (
                <motion.div 
                  key={material.name}
                  className="flex justify-between items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-sm w-32">{material.name}</span>
                  <div className="w-32 bg-gray-600 rounded-full h-2">
                    <motion.div 
                      className={`${material.color} h-2 rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${material.performance}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <span className={`text-sm ${
                    material.rating === 'Poor' ? 'text-red-500' :
                    material.rating === 'Good' ? 'text-yellow-500' :
                    'text-green-500'
                  }`}>
                    {material.rating}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Visual Simulation */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="House during severe storm with heavy rain and wind" 
              className="rounded-xl shadow-2xl w-full h-auto"
            />
            
            {/* Storm Effect Overlay */}
            <div className="absolute inset-0 bg-blue-900 bg-opacity-30 rounded-xl"></div>
            
            {/* Damage Indicators */}
            <motion.div 
              className="absolute top-1/4 right-1/4 text-red-500"
              animate={{ 
                y: [0, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <i className="fas fa-exclamation-triangle text-2xl"></i>
            </motion.div>
            
            {/* Weather Stats */}
            <motion.div 
              className="absolute bottom-4 left-4 bg-black bg-opacity-80 rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-sm space-y-1">
                <div><i className="fas fa-wind mr-2 text-tetralto-gold"></i>Wind: {windSpeed[0]} mph</div>
                <div><i className="fas fa-cloud-hail mr-2 text-blue-400"></i>Hail: {hailSizes.find(h => h.id === selectedHail)?.name}</div>
                <div><i className="fas fa-thermometer-half mr-2 text-red-400"></i>Risk: {windSpeed[0] > 100 ? 'Extreme' : windSpeed[0] > 75 ? 'High' : 'Moderate'}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
