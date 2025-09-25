import { useState, useEffect } from 'react'

export const useVisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const incrementGlobalCounter = async () => {
      // Check if we've already incremented in this session
      const hasIncremented = sessionStorage.getItem('future-prep-counter-incremented')
      
      if (hasIncremented) {
        // Just get the current count without incrementing
        console.log('🔄 Already incremented this session, getting current count')
        try {
          const response = await fetch('/api/visitor-count')
          const data = await response.json()
          if (response.ok) {
            setVisitorCount(data.count)
            console.log('📊 Current count:', data.count)
          }
        } catch (error) {
          console.error('💥 Error getting current count:', error)
          setVisitorCount(1000)
        } finally {
          setIsLoading(false)
        }
        return
      }

      console.log('🚀 Visitor counter hook triggered - first time this session')
      try {
        console.log('📡 Making POST request to /api/visitor-count')
        // Increment the global counter
        const response = await fetch('/api/visitor-count', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        const data = await response.json()
        console.log('📊 API response:', data)
        
        if (response.ok) {
          setVisitorCount(data.count)
          console.log('✅ Counter updated to:', data.count)
          // Mark that we've incremented in this session
          sessionStorage.setItem('future-prep-counter-incremented', 'true')
        } else {
          console.error('❌ Failed to increment counter:', data)
          // Fallback: try to get current count
          const getResponse = await fetch('/api/visitor-count')
          const getData = await getResponse.json()
          if (getResponse.ok) {
            setVisitorCount(getData.count)
          } else {
            setVisitorCount(1000)
          }
        }
      } catch (error) {
        console.error('💥 Error updating visitor counter:', error)
        setVisitorCount(1000)
      } finally {
        setIsLoading(false)
      }
    }

    incrementGlobalCounter()
  }, [])

  return { visitorCount, isLoading }
}
