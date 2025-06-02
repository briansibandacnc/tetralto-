import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProjectGallery() {
  const projects = [
    {
      title: "Miami Beach Residence",
      description: "Complete roof replacement with storm-resistant materials",
      cost: "$12,500",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
      alt: "Recently completed residential roofing project with new shingles"
    },
    {
      title: "Fort Lauderdale Office",
      description: "Emergency storm damage repair and waterproofing",
      cost: "$8,200",
      image: "https://pixabay.com/get/g940311aebf8172d6c4cc7d1a7a1868ac4c2e2e09e9110677743b6bff173c930c6ccf46ce13aa7adac2000aeba5f3063d3c6d10e20b5769816b91b4fc35652b7b_1280.jpg",
      alt: "Commercial building roof repair and maintenance work"
    },
    {
      title: "Coral Gables Estate",
      description: "Premium tile roofing with 30-year warranty",
      cost: "$28,900",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
      alt: "Luxury home with premium tile roofing installation"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-tetralto-orange">100+</span> Local Projects Completed
          </motion.h2>
          <p className="text-xl text-gray-600">Explore our work throughout South Florida</p>
        </div>
        
        {/* Project Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="roofing-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <div className="relative overflow-hidden">
                  <motion.img 
                    src={project.image}
                    alt={project.alt}
                    className="w-full h-48 object-cover transition-transform duration-300"
                    whileHover={{ scale: 1.1 }}
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-tetralto-orange font-semibold">{project.cost}</span>
                    <Button 
                      variant="ghost" 
                      className="text-tetralto-teal hover:text-tetralto-orange hover:bg-transparent p-0"
                    >
                      View Details <i className="fas fa-arrow-right ml-1"></i>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* View All Projects CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button className="bg-tetralto-orange hover:bg-tetralto-teal text-white font-bold py-3 px-8 rounded-lg">
            View All 100+ Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
