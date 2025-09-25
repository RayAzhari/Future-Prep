import { useState, useEffect } from 'react'

export const useVisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get current visitor count from localStorage
    const currentCount = localStorage.getItem('future-prep-visitor-count')
    let count = currentCount ? parseInt(currentCount, 10) : 0
    
    // Increment the counter
    count += 1
    
    // Save the new count
    localStorage.setItem('future-prep-visitor-count', count.toString())
    
    // Set the state
    setVisitorCount(count)
    setIsLoading(false)
  }, [])

  return { visitorCount, isLoading }
}
