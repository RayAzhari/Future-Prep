'use client'

import React from 'react'
import { motion } from 'framer-motion'
import HeroSection from '../components/HeroSection'
import ResourcesSection from '../components/ResourcesSection'
import AboutSection from '../components/AboutSection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ResourcesSection />
      <AboutSection />
    </div>
  )
}
