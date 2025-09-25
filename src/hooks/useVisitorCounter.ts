import { useState, useEffect } from 'react'

export const useVisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const incrementVisitorCount = async () => {
      try {
        // Use absolute URL for production deployment
        const baseUrl = typeof window !== 'undefined' 
          ? window.location.origin 
          : 'https://future-prep.vercel.app'
        
        const response = await fetch(`${baseUrl}/api/visitor-count`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (response.ok) {
          const data = await response.json()
          setVisitorCount(data.count)
        } else {
          // If POST fails, try to get current count
          const getResponse = await fetch(`${baseUrl}/api/visitor-count`)
          if (getResponse.ok) {
            const getData = await getResponse.json()
            setVisitorCount(getData.count)
          }
        }
      } catch (error) {
        console.error('Error updating visitor counter:', error)
        // Don't set fallback value, just show 0
      } finally {
        setIsLoading(false)
      }
    }

    incrementVisitorCount()
  }, [])

  return { visitorCount, isLoading }
}