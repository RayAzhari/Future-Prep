'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import AboutSection from '../../components/AboutSection'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <AboutSection />
    </div>
  )
}
