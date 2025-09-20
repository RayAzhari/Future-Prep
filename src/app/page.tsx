'use client'

import React from 'react'
import { motion } from 'framer-motion'
import HeroSection from '../components/HeroSection'
import ResourcesSection from '../components/ResourcesSection'
import ScholarshipsSection from '../components/ScholarshipsSection'
import ResearchSection from '../components/ResearchSection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ResourcesSection />
      <ScholarshipsSection />
      <ResearchSection />
    </div>
  )
}
