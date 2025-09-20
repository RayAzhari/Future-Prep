'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, DollarSign, Calendar, Search, Filter } from 'lucide-react'
import scholarshipsData from '../data/scholarships.json'
import type { Scholarship } from '../types/data'

export default function ScholarshipsSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMajor, setSelectedMajor] = useState<string>('All')
  const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>(scholarshipsData)

  // Get unique majors for filter
  const allMajors = Array.from(new Set(scholarshipsData.flatMap(s => s.majors))).sort()
  const majorOptions = ['All', ...allMajors]

  useEffect(() => {
    let filtered = scholarshipsData

    if (searchTerm) {
      filtered = filtered.filter(scholarship =>
        scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.eligibility.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedMajor !== 'All') {
      filtered = filtered.filter(scholarship =>
        scholarship.majors.includes(selectedMajor) || scholarship.majors.includes('All Majors')
      )
    }

    setFilteredScholarships(filtered)
  }, [searchTerm, selectedMajor])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
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
    <section id="scholarships" className="py-20 bg-white">
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
            Scholarships & Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find funding opportunities that match your interests and academic goals
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
                placeholder="Search scholarships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            {/* Major Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-4 h-4" />
              <select
                value={selectedMajor}
                onChange={(e) => setSelectedMajor(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {majorOptions.map((major) => (
                  <option key={major} value={major}>
                    {major}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Scholarships Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredScholarships.map((scholarship) => {
            const daysLeft = getDaysUntilDeadline(scholarship.deadline)
            const isUrgent = daysLeft <= 30 && daysLeft > 0
            
            return (
              <motion.div
                key={scholarship.id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative"
              >
                {/* Urgent Badge */}
                {isUrgent && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Urgent!
                  </div>
                )}

                {/* Scholarship Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 pr-8">
                  {scholarship.title}
                </h3>

                {/* Amount */}
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="text-2xl font-bold text-green-600">
                    {formatCurrency(scholarship.amount)}
                  </span>
                </div>

                {/* Majors */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Eligible Majors:</div>
                  <div className="flex flex-wrap gap-1">
                    {scholarship.majors.slice(0, 3).map((major, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full"
                      >
                        {major}
                      </span>
                    ))}
                    {scholarship.majors.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{scholarship.majors.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Deadline */}
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div className="text-sm">
                    <div className="text-gray-700">
                      Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
                    </div>
                    <div className={`font-medium ${
                      daysLeft < 0 
                        ? 'text-red-600' 
                        : daysLeft <= 30 
                        ? 'text-orange-600' 
                        : 'text-green-600'
                    }`}>
                      {daysLeft < 0 
                        ? 'Deadline passed' 
                        : daysLeft === 0 
                        ? 'Due today!' 
                        : `${daysLeft} days left`
                      }
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {scholarship.description}
                </p>

                {/* Eligibility */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-1">Eligibility:</div>
                  <p className="text-gray-600 text-sm">{scholarship.eligibility}</p>
                </div>

                {/* Apply Button */}
                <motion.a
                  href={scholarship.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium w-full justify-center ${
                    daysLeft < 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  {daysLeft < 0 ? 'Deadline Passed' : 'Apply Now'}
                  {daysLeft >= 0 && <ExternalLink className="w-4 h-4" />}
                </motion.a>
              </motion.div>
            )
          })}
        </motion.div>

        {/* No Results */}
        {filteredScholarships.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No scholarships found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or major filter
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
              {scholarshipsData.length}+
            </div>
            <div className="text-gray-600">Scholarships Available</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {formatCurrency(scholarshipsData.reduce((sum, s) => sum + s.amount, 0))}
            </div>
            <div className="text-gray-600">Total Award Amount</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {allMajors.length}+
            </div>
            <div className="text-gray-600">Different Majors</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
