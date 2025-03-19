'use client';

import { motion } from 'framer-motion';

const AboutSection = () => {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Creative Director",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      delay: 0.1
    },
    {
      name: "Sam Rivera",
      role: "Marketing Strategist",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      delay: 0.2
    },
    {
      name: "Taylor Kim",
      role: "Digital Specialist",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      delay: 0.3
    },
    {
      name: "Jordan Lee",
      role: "Content Creator",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      delay: 0.4
    }
  ];

  return (
    <section className="w-full py-24 bg-gradient-to-b from-dark to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute w-full h-full top-0 left-0 opacity-20">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/30 filter blur-[100px] top-0 -left-64 animate-spin-slow"></div>
        <div className="absolute w-[300px] h-[300px] rounded-full bg-secondary/20 filter blur-[100px] bottom-20 right-0 animate-float"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Our Building Blocks Approach
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              Just like our Brix characters, we believe great marketing is built piece by piece, 
              with each element carefully designed to create something remarkable.
            </p>
            <p className="text-lg text-gray-400 mb-8">
              We take a systematic approach to constructing your brand's presence, 
              ensuring that each campaign, each piece of content, and each interaction 
              with your audience adds to a cohesive and powerful marketing structure.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <motion.div 
                className="bg-dark/50 p-6 rounded-xl border border-primary/20"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-white mb-2">Creative</h3>
                <p className="text-gray-300">Innovative solutions that stand out in today's crowded market.</p>
              </motion.div>
              <motion.div 
                className="bg-dark/50 p-6 rounded-xl border border-primary/20"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-white mb-2">Constructive</h3>
                <p className="text-gray-300">Building lasting brand value with every marketing effort.</p>
              </motion.div>
              <motion.div 
                className="bg-dark/50 p-6 rounded-xl border border-primary/20"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-white mb-2">Systematic</h3>
                <p className="text-gray-300">Methodical approaches that deliver consistent results.</p>
              </motion.div>
              <motion.div 
                className="bg-dark/50 p-6 rounded-xl border border-primary/20"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-white mb-2">Adaptive</h3>
                <p className="text-gray-300">Flexible strategies that evolve with your business needs.</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2 grid grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-2xl group"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: member.delay }}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 