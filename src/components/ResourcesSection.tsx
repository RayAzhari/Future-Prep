'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Filter, Search } from 'lucide-react'
import resourcesData from '../data/resources.json'
import type { Resource } from '../types/data'

export default function ResourcesSection() {
  // source-of-truth: never overwrite this array
  const [allResources] = useState<Resource[]>(resourcesData)

  // UI sort state
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', 'SAT', 'ACT', 'AP General', 'AP Psychology', 'AP Biology', 'AP Chemistry', 'AP Physics', 'AP Calculus', 'AP Statistics', 'AP Computer Science', 'AP US History', 'AP World History', 'AP Economics', 'AP English', 'AP Spanish', 'AP French', 'AP Environmental Science', 'AP Music Theory', 'AP Latin']

  // derived sorted list — always sort from original data, never from sorted results
  const sortedResources = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    
    // Always start with the original full list
    let sorted = [...allResources]
    
    // Apply search filter first (if searching)
    if (query) {
      sorted = sorted.filter(resource => 
        resource.title.toLowerCase().includes(query) ||
        resource.platform.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query)
      )
    }

    // Apply category sorting (selected category first, then others)
    if (selectedCategory !== 'All') {
      sorted.sort((a, b) => {
        if (a.category === selectedCategory && b.category !== selectedCategory) return -1
        if (a.category !== selectedCategory && b.category === selectedCategory) return 1
        return 0
      })
    }

    return sorted
  }, [allResources, searchTerm, selectedCategory])

  // Reset function to clear all filters
  const resetFilters = () => {
    setSearchTerm('')
    setSelectedCategory('All')
    // do NOT call setAllResources or mutate any arrays here
  }

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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            Study Resources
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Access free SAT, ACT, and AP prep materials from trusted platforms
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="text-gray-400 w-4 h-4" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 sm:flex-none px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent min-w-[200px]"
              >
                {categories.map((category) => (
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
                className="w-full sm:w-auto px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 text-sm font-medium"
              >
                Reset Filters
              </motion.button>
            )}
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
          {sortedResources.map((resource) => (
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
                    : resource.category.includes('AP Psychology')
                    ? 'bg-pink-100 text-pink-800'
                    : resource.category.includes('AP Biology')
                    ? 'bg-emerald-100 text-emerald-800'
                    : resource.category.includes('AP Chemistry')
                    ? 'bg-orange-100 text-orange-800'
                    : resource.category.includes('AP Physics')
                    ? 'bg-indigo-100 text-indigo-800'
                    : resource.category.includes('AP Calculus')
                    ? 'bg-teal-100 text-teal-800'
                    : resource.category.includes('AP Statistics')
                    ? 'bg-cyan-100 text-cyan-800'
                    : resource.category.includes('AP Computer Science')
                    ? 'bg-slate-100 text-slate-800'
                    : resource.category.includes('AP US History')
                    ? 'bg-red-100 text-red-800'
                    : resource.category.includes('AP World History')
                    ? 'bg-amber-100 text-amber-800'
                    : resource.category.includes('AP Economics')
                    ? 'bg-yellow-100 text-yellow-800'
                    : resource.category.includes('AP English')
                    ? 'bg-rose-100 text-rose-800'
                    : resource.category.includes('AP Spanish')
                    ? 'bg-lime-100 text-lime-800'
                    : resource.category.includes('AP French')
                    ? 'bg-violet-100 text-violet-800'
                    : resource.category.includes('AP Environmental Science')
                    ? 'bg-green-100 text-green-800'
                    : resource.category.includes('AP Music Theory')
                    ? 'bg-purple-100 text-purple-800'
                    : resource.category.includes('AP Latin')
                    ? 'bg-stone-100 text-stone-800'
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
        {sortedResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No resources found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms
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
              {allResources.length}+
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
