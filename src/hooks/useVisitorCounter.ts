import { useState, useEffect } from 'react'

export const useVisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const incrementGlobalCounter = async () => {
      try {
        // First, get the current global count
        const getResponse = await fetch('/api/visitor-count')
        const getData = await getResponse.json()
        
        if (getResponse.ok) {
          // Then increment the global counter
          const postResponse = await fetch('/api/visitor-count', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          
          const postData = await postResponse.json()
          
          if (postResponse.ok) {
            setVisitorCount(postData.count)
          } else {
            // Fallback to the count we got from GET
            setVisitorCount(getData.count)
          }
        } else {
          // Fallback: try to increment anyway
          const fallbackResponse = await fetch('/api/visitor-count', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json()
            setVisitorCount(fallbackData.count)
          }
        }
      } catch (error) {
        console.error('Error updating visitor counter:', error)
        // Fallback to a default value if API fails
        setVisitorCount(1000) // Show a reasonable default
      } finally {
        setIsLoading(false)
      }
    }

    incrementGlobalCounter()
  }, [])

  return { visitorCount, isLoading }
}
