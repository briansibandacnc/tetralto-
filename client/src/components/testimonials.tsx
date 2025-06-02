import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Mike Rodriguez",
      location: "Miami Beach, FL",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
      alt: "Happy customer portrait",
      review: "Tetralto saved my home after Hurricane Ian. Their AI analyzer spotted damage I couldn't see, and the AR visualizer helped me choose the perfect materials."
    },
    {
      name: "Sarah Chen",
      location: "Fort Lauderdale, FL",
      image: "https://pixabay.com/get/g0b8a7d985c564726b9ac35239b0880f8f7459d6d08d87dfc940f5db497d98256821fb250e020ed10eb2f880745fe570014ec6bcd9724230b0f1160dca02d12e9_1280.jpg",
      alt: "Satisfied customer headshot",
      review: "Professional, fast, and their technology is incredible. The drone inspection was so detailed, and they had my insurance claim approved in days."
    },
    {
      name: "David Thompson",
      location: "Coral Gables, FL",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
      alt: "Testimonial customer photo",
      review: "The storm damage simulator convinced me to upgrade to impact-resistant materials. Best investment I've made for my home's protection."
    }
  ];

  const StarRating = () => (
    <div className="text-tetralto-gold">
      {[...Array(5)].map((_, i) => (
        <i key={i} className="fas fa-star"></i>
      ))}
    </div>
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            What Our Customers Say
          </motion.h2>
          <p className="text-xl text-gray-600">Real stories from satisfied homeowners</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white rounded-xl shadow-lg h-full">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <motion.img 
                      src={testimonial.image}
                      alt={testimonial.alt}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <StarRating />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.review}"</p>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
