"use client"

import { useState, useEffect } from "react"
import { User, Settings, Clock } from "lucide-react"

interface NavigationSection {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const navigationSections: NavigationSection[] = [
  { id: "about", label: "About", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "activity", label: "Recent Activity", icon: Clock },
]

interface ProfileTabsProps {
  activeSection: string
  onSectionChange: (sectionId: string) => void
}

// Helper function for smooth scroll with offset
const smoothScrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (!element) return
  
  // Use scrollIntoView with block: 'start' to let CSS scroll-margin handle the offset
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  })
}

export default function ProfileTabs({ activeSection, onSectionChange }: ProfileTabsProps) {
  const [isSticky, setIsSticky] = useState(false)
  const [tabBarHeight, setTabBarHeight] = useState(0)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Measure tab bar height for placeholder
    const tabBar = document.querySelector('[role="tablist"]')
    if (tabBar) {
      setTabBarHeight(tabBar.getBoundingClientRect().height)
    }

    // Scroll handler to toggle sticky positioning
    const handleScroll = () => {
      // Use scroll position instead of element detection for more reliability
      const scrollY = window.scrollY
      const shouldBeSticky = scrollY > 100
      
      // Always log scroll activity for debugging
      console.log('Scroll detected:', { scrollY, shouldBeSticky })
      
      // Update sticky state
      setIsSticky((prevSticky) => {
        if (prevSticky !== shouldBeSticky) {
          console.log('Sticky state changing from', prevSticky, 'to', shouldBeSticky)
        }
        return shouldBeSticky
      })
    }

    // Initial check
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    console.log('Scroll listener attached successfully')

    // Intersection Observer for scroll spy - separate from scroll listener
    let observer: IntersectionObserver | null = null
    
    try {
      const observerOptions = {
        threshold: 0.3,
        rootMargin: '-160px 0px -50% 0px' // Conservative offset for intersection detection
      }

      observer = new IntersectionObserver((entries) => {
        try {
          const visibleSection = entries.find(entry => entry.isIntersecting)
          if (visibleSection && visibleSection.target && visibleSection.target.id) {
            onSectionChange(visibleSection.target.id)
          }
        } catch (error) {
          console.warn('Intersection observer error:', error)
        }
      }, observerOptions)

      // Observe all sections
      navigationSections.forEach((section) => {
        const element = document.getElementById(section.id)
        if (element) {
          observer?.observe(element)
        }
      })
    } catch (error) {
      console.warn('Failed to initialize intersection observer:', error)
    }

    // Cleanup function - always remove scroll listener
    return () => {
      window.removeEventListener('scroll', handleScroll)
      console.log('Scroll listener removed')
      
      if (observer) {
        try {
          observer.disconnect()
        } catch (error) {
          console.warn('Observer disconnect error:', error)
        }
      }
    }
  }, [onSectionChange])

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    try {
      e.preventDefault()
      
      if (typeof window === 'undefined') return
      
      const element = document.getElementById(sectionId)
      if (!element) {
        console.warn(`Element with id "${sectionId}" not found`)
        return
      }

      // Add highlight effect immediately
      if (element.style) {
        element.style.outline = '3px solid #0d9488'
        element.style.outlineOffset = '4px'
        element.style.borderRadius = '8px'
        element.style.transition = 'outline 0.3s ease-out'
      }

      // Use the helper function for consistent smooth scrolling
      smoothScrollToSection(sectionId)

      // Update active section immediately for visual feedback
      onSectionChange(sectionId)

      // Remove highlight after fade
      setTimeout(() => {
        try {
          if (element && element.style) {
            element.style.outline = 'none'
            element.style.outlineOffset = '0'
            element.style.borderRadius = ''
          }
        } catch (error) {
          console.warn('Error removing highlight:', error)
        }
      }, 2000)
    } catch (error) {
      console.error('Error in handleTabClick:', error)
    }
  }

  return (
    <>
      {/* Placeholder to prevent layout shift when tab bar becomes fixed */}
      {isSticky && <div style={{ height: tabBarHeight }} />}
      
      <div className={`${isSticky ? 'fixed top-20 left-0 right-0 z-50 shadow-lg ml-16 md:ml-64' : 'relative z-10'} bg-white border-b border-gray-200 transition-all duration-500`}>
        <nav className="inline-flex items-center justify-start gap-8 border-b border-gray-200 w-full px-6" role="tablist" aria-label="Profile sections">
          {navigationSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => handleTabClick(e, section.id)}
              id={`${section.id}-tab`}
              role="tab"
              aria-selected={activeSection === section.id}
              aria-controls={section.id}
              className={`inline-flex items-center justify-center whitespace-nowrap gap-2 px-0 py-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative -mb-px ${
                activeSection === section.id
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
              }`}
            >
              <section.icon className="w-4 h-4" />
              {section.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
} 