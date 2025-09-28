'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = (item: { label: string; id: string; href?: string }) => {
    if (item.href) {
      // Navigate to a different page
      window.location.href = item.href
    } else {
      // For Home and Resources, navigate to home page first if not already there
      if (item.id === 'home' || item.id === 'resources') {
        if (window.location.pathname !== '/') {
          window.location.href = '/'
          return
        }
        // If already on home page, scroll to section
        const element = document.getElementById(item.id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        // Scroll to section on current page
        const element = document.getElementById(item.id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Resources', id: 'resources' },
    { label: 'Scholarships', id: 'scholarships', href: '/scholarships' },
    { label: 'Research', id: 'research', href: '/research' },
    { label: 'Extracurriculars', id: 'extracurriculars', href: '/extracurriculars' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 cursor-pointer"
            onClick={() => handleNavigation({ label: 'Home', id: 'home' })}
          >
            <Image
              src="/images/logo.svg"
              alt="Future Prep Logo"
              width={120}
              height={48}
              className="h-10 w-auto"
              priority
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2 lg:space-x-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigation(item)}
                  className="px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavigation(item)}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
              >
                {item.label}
              </motion.button>
              ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
