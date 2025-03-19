'use client';

import { motion } from 'framer-motion';

const FeatureCard = ({ title, description, icon, delay }: { title: string; description: string; icon: string; delay: number }) => {
  return (
    <motion.div 
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-dark to-gray-800 p-8 border border-primary/20 h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(52, 144, 220, 0.25)'
      }}
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full filter blur-2xl opacity-70"></div>
      <div className="text-5xl mb-6 text-primary">{icon}</div>
      <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      title: "Strategic Planning",
      description: "Building your brand's foundation with carefully constructed marketing strategies that align with your goals.",
      icon: "🏗️",
      delay: 0.1
    },
    {
      title: "Creative Content",
      description: "Crafting engaging, innovative content that resonates with your audience and builds your brand block by block.",
      icon: "🎨",
      delay: 0.2
    },
    {
      title: "Digital Marketing",
      description: "Implementing cutting-edge digital campaigns that connect with your audience across multiple platforms.",
      icon: "📱",
      delay: 0.3
    },
    {
      title: "Brand Development",
      description: "Constructing a unique and memorable brand identity that stands out in today's competitive landscape.",
      icon: "✨",
      delay: 0.4
    },
    {
      title: "Analytics & Insights",
      description: "Using data-driven approaches to measure success and continuously improve your marketing efforts.",
      icon: "📊",
      delay: 0.5
    },
    {
      title: "Customer Engagement",
      description: "Building lasting relationships with your audience through interactive and personalized experiences.",
      icon: "🤝",
      delay: 0.6
    }
  ];

  return (
    <section className="w-full py-24 bg-dark relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 grid grid-cols-12 opacity-5 pointer-events-none">
        {Array(12).fill(0).map((_, i) => (
          <div key={`col-${i}`} className="h-full border-r border-primary/30"></div>
        ))}
      </div>
      <div className="absolute inset-0 grid grid-rows-12 opacity-5 pointer-events-none">
        {Array(12).fill(0).map((_, i) => (
          <div key={`row-${i}`} className="w-full border-b border-primary/30"></div>
        ))}
      </div>
      
      {/* Background animated blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-[100px] opacity-50 animate-float"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/10 rounded-full filter blur-[100px] opacity-50 animate-float animation-delay-2000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Building Your Success
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our services are designed to construct powerful marketing solutions, 
            one carefully placed block at a time.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 