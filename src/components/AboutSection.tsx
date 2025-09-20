'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Users, BookOpen, Target, Lightbulb, Globe } from 'lucide-react'

export default function AboutSection() {
  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Resources",
      description: "Access to the best SAT, ACT, and AP study materials from trusted platforms"
    },
    {
      icon: Target,
      title: "Scholarship Database",
      description: "Find funding opportunities that match your interests and academic goals"
    },
    {
      icon: Lightbulb,
      title: "Research Opportunities",
      description: "Connect with professors and discover research programs to enhance your profile"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a community of students navigating the college admissions process"
    }
  ]

  const values = [
    {
      title: "Accessibility",
      description: "All resources are free or clearly marked with costs, ensuring equal access for all students"
    },
    {
      title: "Quality",
      description: "Only the most trusted and effective resources are featured, saving students time and effort"
    },
    {
      title: "Transparency",
      description: "Clear deadlines, requirements, and links to official sources for all opportunities"
    },
    {
      title: "Empowerment",
      description: "Providing students with the tools and knowledge to take control of their academic future"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 bg-clip-text text-transparent">
                About Future Prep
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Empowering high school students with the resources and opportunities they need to succeed in college admissions and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Our Mission
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
                College admissions can be overwhelming, confusing, and expensive. Future Prep was created to level the playing field by providing high school students with free access to the best resources, scholarships, and research opportunities.
              </p>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                We believe that every student, regardless of their background or financial situation, deserves access to the tools they need to achieve their academic dreams.
              </p>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Creator Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Meet the Creator
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="flex items-center justify-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">RA</span>
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 text-center mb-4">
                Rayan Azhari
              </h3>
              
              <p className="text-lg text-gray-600 text-center mb-6">
                Creator & Founder
              </p>

              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-6">
                  Hi! I'm Rayan Azhari, a high school student who understands the challenges of navigating college admissions firsthand. After spending countless hours researching scholarships, study resources, and research opportunities, I realized how scattered and overwhelming this information can be.
                </p>
                
                <p className="mb-6">
                  I created Future Prep to solve this problem. As someone going through the same process as many of you, I wanted to build a platform that consolidates the best resources in one place, making it easier for students to find what they need without the stress of endless searching.
                </p>
                
                <p className="mb-6">
                  My goal is simple: help other high school students like me succeed in their college admissions journey by providing free access to the resources and opportunities that can make a real difference.
                </p>
                
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6 border border-primary-200">
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    "Education should be accessible to everyone, regardless of their background or financial situation."
                  </p>
                  <p className="text-gray-600">
                    — Rayan Azhari
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Future Prep
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8 hover:bg-gray-100 transition-colors duration-300"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Explore our resources, find scholarships, and discover research opportunities that can help you achieve your academic goals.
            </p>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              <Globe className="w-5 h-5" />
              Explore Resources
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Future Prep
            </h3>
            <p className="text-gray-400 mb-4">
              Empowering students to prep smarter and apply stronger
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Created with passion by Rayan Azhari</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
