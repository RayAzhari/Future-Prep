'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Copy, Check, MapPin, Clock, DollarSign, Calendar, Search, Filter } from 'lucide-react'
import researchData from '../data/research.json'
import type { ResearchOpportunity } from '../types/data'

export default function ResearchSection() {
  const [activeTab, setActiveTab] = useState<'templates' | 'opportunities'>('templates')
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null)
  
  // Research opportunities sorting
  const [allOpportunities] = useState<ResearchOpportunity[]>(researchData)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedInstitution, setSelectedInstitution] = useState<string>('All')

  // Get unique institutions for sorting
  const allInstitutions = useMemo(() => 
    Array.from(new Set(allOpportunities.map(o => o.institution))).sort(),
    [allOpportunities]
  )
  const institutionOptions = ['All', ...allInstitutions]

  // Sorted opportunities — always sort from original data, never from sorted results
  const sortedOpportunities = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    
    // Always start with the original full list
    let sorted = [...allOpportunities]
    
    // Apply search sorting first (if searching) - show matching items first, then the rest
    if (query) {
      sorted.sort((a, b) => {
        const aMatches = a.title.toLowerCase().includes(query) ||
                        a.description.toLowerCase().includes(query) ||
                        a.institution.toLowerCase().includes(query) ||
                        a.location.toLowerCase().includes(query)
        const bMatches = b.title.toLowerCase().includes(query) ||
                        b.description.toLowerCase().includes(query) ||
                        b.institution.toLowerCase().includes(query) ||
                        b.location.toLowerCase().includes(query)
        
        if (aMatches && !bMatches) return -1
        if (!aMatches && bMatches) return 1
        return 0
      })
    }

    // Apply institution sorting (selected institution first, then others)
    if (selectedInstitution !== 'All') {
      sorted.sort((a, b) => {
        if (a.institution === selectedInstitution && b.institution !== selectedInstitution) return -1
        if (a.institution !== selectedInstitution && b.institution === selectedInstitution) return 1
        return 0
      })
    }

    return sorted
  }, [allOpportunities, searchTerm, selectedInstitution])

  // Reset function to clear all filters
  const resetFilters = () => {
    setSearchTerm('')
    setSelectedInstitution('All')
  }

  const emailTemplates = [
    {
      id: 'short-intro',
      title: 'Short Introduction Email',
      description: 'Brief email to introduce yourself and express interest in research',
      template: `Subject: High School Student Interested in Research Opportunities

Dear Professor [Last Name],

I hope this email finds you well. My name is [Your Name], and I am a high school [junior/senior] at [Your School]. I am writing to express my strong interest in the research being conducted in your [specific area] laboratory.

I have been following your work on [specific topic] and am particularly fascinated by your recent publication on [specific paper/topic]. As someone passionate about [related field], I would love to learn more about the research process and potentially contribute to ongoing projects.

I would be grateful for the opportunity to discuss potential research opportunities or even just to learn more about your work. Would you be available for a brief conversation or meeting?

Thank you for your time and consideration. I look forward to hearing from you.

Best regards,
[Your Name]
[Your Email]
[Your Phone Number]`
    },
    {
      id: 'mentorship-request',
      title: 'Mentorship Request Email',
      description: 'Detailed email requesting mentorship and research collaboration',
      template: `Subject: Research Mentorship Inquiry from High School Student

Dear Professor [Last Name],

I hope this message finds you in good health and high spirits. My name is [Your Name], and I am a high school [junior/senior] at [Your School] with a deep passion for [specific field]. I am writing to inquire about potential research mentorship opportunities in your laboratory.

Academic Background:
- Current GPA: [Your GPA]
- Relevant coursework: [List relevant courses]
- Previous research experience: [Any relevant experience, even if limited]
- Extracurricular activities: [Relevant clubs, competitions, etc.]

Research Interests:
I am particularly interested in [specific research area] and have been following your work on [specific topic]. Your recent publication on [specific paper] particularly resonated with me because [explain why].

What I Hope to Gain:
- Hands-on experience in [specific techniques/methods]
- Understanding of the research process from hypothesis to publication
- Mentorship in academic and career development
- Opportunity to contribute meaningfully to ongoing research

Availability:
I am available [time period, e.g., "during summer 2024" or "on weekends and after school"] and can commit [X hours per week] to research activities.

I understand that research opportunities are competitive, and I am prepared to start with smaller tasks to prove my commitment and capability. I am also willing to learn any necessary skills or software that would make me a valuable addition to your team.

I would be honored to discuss this opportunity with you further. Would you be available for a brief meeting or phone call in the coming weeks?

Thank you for considering my request. I have attached my resume and unofficial transcript for your review.

Respectfully,
[Your Name]
[Your Email]
[Your Phone Number]
[Your School]
[Your Address]`
    }
  ]

  const copyToClipboard = async (text: string, templateId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedTemplate(templateId)
      setTimeout(() => setCopiedTemplate(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const formatCurrency = (stipend: string | number) => {
    if (typeof stipend === 'string') return stipend
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(stipend)
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <section id="research" className="py-20 bg-gray-50">
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
            Research Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with professors and find research opportunities to enhance your academic profile
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'templates'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Email Templates
            </button>
            <button
              onClick={() => setActiveTab('opportunities')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'opportunities'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Research Programs
            </button>
          </div>
        </motion.div>

        {/* Email Templates Tab */}
        {activeTab === 'templates' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {emailTemplates.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {template.title}
                    </h3>
                    <p className="text-gray-600">
                      {template.description}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyToClipboard(template.template, template.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                  >
                    {copiedTemplate === template.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Template
                      </>
                    )}
                  </motion.button>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-700 whitespace-pre-wrap overflow-x-auto">
                  {template.template}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Research Opportunities Tab */}
        {activeTab === 'opportunities' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                {/* Search Bar */}
                <div className="relative flex-1 w-full sm:max-w-md">
                  <input
                    type="text"
                    placeholder="Search opportunities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>

                {/* Institution Filter */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="text-gray-400 w-4 h-4" />
                  <select
                    value={selectedInstitution}
                    onChange={(e) => setSelectedInstitution(e.target.value)}
                    className="flex-1 sm:flex-none px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {institutionOptions.map((institution) => (
                      <option key={institution} value={institution}>
                        {institution}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Reset Button */}
                {(searchTerm || selectedInstitution !== 'All') && (
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

            {/* Opportunities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedOpportunities.map((opportunity) => {
              const daysLeft = getDaysUntilDeadline(opportunity.deadline)
              const isUrgent = daysLeft <= 30 && daysLeft > 0

              return (
                <motion.div
                  key={opportunity.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative"
                >
                  {/* Urgent Badge */}
                  {isUrgent && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Urgent!
                    </div>
                  )}

                  {/* Institution */}
                  <div className="text-sm font-medium text-primary-600 mb-2">
                    {opportunity.institution}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 pr-8">
                    {opportunity.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {opportunity.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {opportunity.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {opportunity.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      {formatCurrency(opportunity.stipend)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <div>
                        <div>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</div>
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
                  </div>

                  {/* Apply Button */}
                  <motion.a
                    href={opportunity.link}
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
                    {daysLeft < 0 ? 'Deadline Passed' : 'Learn More'}
                    {daysLeft >= 0 && <ExternalLink className="w-4 h-4" />}
                  </motion.a>
                </motion.div>
              )
            })}
            </div>

            {/* No Results */}
            {sortedOpportunities.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No opportunities found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search terms
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Tips for Successful Research Applications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 font-bold text-lg">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Personalize Your Emails</h4>
              <p className="text-gray-600 text-sm">Mention specific papers or research that interests you</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 font-bold text-lg">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Show Enthusiasm</h4>
              <p className="text-gray-600 text-sm">Express genuine interest and willingness to learn</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 font-bold text-lg">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Be Professional</h4>
              <p className="text-gray-600 text-sm">Use proper email etiquette and proofread carefully</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
