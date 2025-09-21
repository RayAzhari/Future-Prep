'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, Search, Filter, Star } from 'lucide-react'
import extracurricularsData from '../data/extracurriculars.json'
import type { Extracurricular } from '../types/data'

export default function ExtracurricularsSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [filteredExtracurriculars, setFilteredExtracurriculars] = useState<Extracurricular[]>(extracurricularsData)

  // Reset function to clear all filters
  const resetFilters = () => {
    setSearchTerm('')
    setSelectedCategory('All')
  }

  // Get unique categories for filter - memoize to prevent unnecessary re-renders
  const allCategories = useMemo(() => 
    Array.from(new Set(extracurricularsData.map(e => e.category))).sort(), 
    []
  )
  const categoryOptions = ['All', ...allCategories]

  useEffect(() => {
    // Start with all data
    let filtered = [...extracurricularsData]

    // Apply search filter
    if (searchTerm && searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(extracurricular =>
        extracurricular.title.toLowerCase().includes(searchLower) ||
        extracurricular.description.toLowerCase().includes(searchLower) ||
        extracurricular.benefits.toLowerCase().includes(searchLower) ||
        extracurricular.category.toLowerCase().includes(searchLower)
      )
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(extracurricular =>
        extracurricular.category === selectedCategory
      )
    }
    
    setFilteredExtracurriculars(filtered)
  }, [searchTerm, selectedCategory])

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

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Leadership': 'bg-blue-100 text-blue-800',
      'Academic': 'bg-green-100 text-green-800',
      'STEM': 'bg-purple-100 text-purple-800',
      'Service': 'bg-red-100 text-red-800',
      'Media': 'bg-yellow-100 text-yellow-800',
      'Arts': 'bg-pink-100 text-pink-800',
      'Athletics': 'bg-orange-100 text-orange-800',
      'Cultural': 'bg-indigo-100 text-indigo-800',
      'Technology': 'bg-cyan-100 text-cyan-800',
      'Life Skills': 'bg-teal-100 text-teal-800',
      'Business': 'bg-amber-100 text-amber-800',
      'Health': 'bg-rose-100 text-rose-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <section className="py-20 bg-white">
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
            Extracurricular Activities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover opportunities to develop skills, pursue passions, and build your college application
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
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-4 h-4" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            {(searchTerm || selectedCategory !== 'All') && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetFilters}
                className="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 text-sm font-medium"
              >
                Reset Filters
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Extracurriculars Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredExtracurriculars.map((extracurricular) => (
            <motion.div
              key={extracurricular.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Category Badge */}
              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(extracurricular.category)}`}>
                  {extracurricular.category}
                </span>
              </div>

              {/* Activity Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {extracurricular.title}
              </h3>

              {/* Time Commitment */}
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{extracurricular.timeCommitment}</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {extracurricular.description}
              </p>

              {/* Benefits */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <div className="text-sm font-medium text-gray-700">Benefits:</div>
                </div>
                <p className="text-gray-600 text-sm">{extracurricular.benefits}</p>
              </div>

              {/* Requirements */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <div className="text-sm font-medium text-gray-700">Requirements:</div>
                </div>
                <p className="text-gray-600 text-sm">{extracurricular.requirements}</p>
              </div>

              {/* Learn More Button */}
              {extracurricular.website ? (
                <motion.a
                  href={extracurricular.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm font-medium text-center inline-block"
                >
                  Learn More
                </motion.a>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed text-sm font-medium"
                  disabled
                >
                  No Website Available
                </motion.button>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredExtracurriculars.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No activities found
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
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {extracurricularsData.length}+
            </div>
            <div className="text-gray-600">Total Activities</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {filteredExtracurriculars.length}
            </div>
            <div className="text-gray-600">Showing Now</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {allCategories.length}+
            </div>
            <div className="text-gray-600">Different Categories</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">
              100%
            </div>
            <div className="text-gray-600">Skill Development</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
