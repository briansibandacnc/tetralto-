import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

export default function TrustArchitecture() {
  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
    staleTime: 60000, // 1 minute
  });

  const badges = [
    { icon: "fas fa-medal", title: "GAF Master Elite®", color: "text-tetralto-orange" },
    { icon: "fas fa-shield-alt", title: "BBB A+ Rating", color: "text-tetralto-teal" },
    { icon: "fas fa-tools", title: "Licensed & Insured", color: "text-tetralto-gold" },
    { icon: "fas fa-clock", title: "15+ Years Experience", color: "text-tetralto-terracotta" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Trusted by <span className="text-tetralto-orange">{stats?.totalProjects || 1200}+</span> Florida Homeowners
          </motion.h2>
          <p className="text-lg text-gray-600">Certified experts with unmatched warranties</p>
        </div>
        
        {/* Certification Badges */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {badges.map((badge, index) => (
            <motion.div 
              key={badge.title}
              className="trust-badge bg-gray-100 p-6 rounded-lg transition-all duration-300 cursor-pointer"
              whileHover={{ y: -4, scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <i className={`${badge.icon} text-4xl ${badge.color} mb-2`}></i>
              <div className="text-sm font-semibold">{badge.title}</div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Live Statistics */}
        <motion.div 
          className="bg-tetralto-teal text-white rounded-2xl p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <motion.div 
                className="text-4xl font-bold mb-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                {stats?.customerSatisfaction || 98.7}%
              </motion.div>
              <div className="text-lg">Customer Satisfaction</div>
            </div>
            <div>
              <motion.div 
                className="text-4xl font-bold mb-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                {stats?.warrantyYears || 25}
              </motion.div>
              <div className="text-lg">Year Warranty</div>
            </div>
            <div>
              <motion.div 
                className="text-4xl font-bold mb-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                viewport={{ once: true }}
              >
                ${((stats?.insuranceClaims || 2100000) / 1000000).toFixed(1)}M
              </motion.div>
              <div className="text-lg">Insurance Claims Won</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
