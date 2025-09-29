'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, DollarSign, Search, Users } from 'lucide-react'

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const features = [
    {
      icon: BookOpen,
      title: "Practice",
      description: "SAT, ACT, AP resources",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: DollarSign,
      title: "Money",
      description: "Scholarships database",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Search,
      title: "Experience",
      description: "Research opportunities",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Users,
      title: "Support",
      description: "Email templates for professors",
      color: "from-orange-500 to-orange-600"
    }
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-200 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 bg-clip-text text-transparent">
              Future Prep
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-3 sm:mb-4 max-w-3xl mx-auto px-4 leading-relaxed">
            Prep smarter, apply stronger
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-8 sm:mb-12 max-w-4xl mx-auto px-4 leading-relaxed">
            Free SAT/ACT/AP resources, scholarships, and research opportunities for high schoolers.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('resources')}
            className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          >
            Explore Resources
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('scholarships')}
            className="group px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-600 border-2 border-primary-600 rounded-full font-semibold text-base sm:text-lg hover:bg-primary-50 transition-all duration-300 flex items-center justify-center"
          >
            Find Scholarships
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto px-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 leading-tight">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
