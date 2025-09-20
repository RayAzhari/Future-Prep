'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Filter } from 'lucide-react'
import resourcesData from '../data/resources.json'
import type { Resource } from '../types/data'

export default function ResourcesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredResources, setFilteredResources] = useState<Resource[]>(resourcesData)

  const categories = ['All', 'SAT', 'ACT', 'AP']

  useEffect(() => {
    let filtered = resourcesData

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(resource => resource.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredResources(filtered)
  }, [selectedCategory, searchTerm])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="resources" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Study Resources
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access free SAT, ACT, and AP prep materials from trusted platforms
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredResources.map((resource) => (
            <motion.div
              key={resource.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  resource.category === 'SAT' 
                    ? 'bg-blue-100 text-blue-800'
                    : resource.category === 'ACT'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {resource.category}
                </span>
                <span className="text-sm text-gray-500">{resource.platform}</span>
              </div>

              {/* Resource Info */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {resource.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {resource.description}
              </p>

              {/* Link Button */}
              <motion.a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm font-medium"
              >
                Visit Resource
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No resources found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or category filter
            </p>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {resourcesData.length}+
            </div>
            <div className="text-gray-600">Free Resources</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">3</div>
            <div className="text-gray-600">Test Types</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">10+</div>
            <div className="text-gray-600">Trusted Platforms</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
