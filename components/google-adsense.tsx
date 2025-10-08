"use client"

import { useEffect, useState } from "react"

interface GoogleAdSenseProps {
  adSlot: string
  adFormat?: string
  fullWidthResponsive?: boolean
  style?: React.CSSProperties
}

export function GoogleAdSense({ 
  adSlot, 
  adFormat = "auto", 
  fullWidthResponsive = true,
  style = { display: "block" }
}: GoogleAdSenseProps) {
  const [isProduction, setIsProduction] = useState(false)

  useEffect(() => {
    // Only load ads in production
    setIsProduction(process.env.NODE_ENV === 'production')
    
    if (process.env.NODE_ENV === 'production') {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (err) {
        // Silently fail in development
        if (process.env.NODE_ENV !== 'production') {
          console.log("AdSense: Development mode - ads disabled")
        }
      }
    }
  }, [])

  // Show placeholder in development
  if (!isProduction) {
    return (
      <div 
        style={{ 
          ...style, 
          minHeight: '100px',
          backgroundColor: '#f5f5f5',
          border: '2px dashed #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
          fontSize: '14px',
          padding: '20px'
        }}
      >
        [AdSense Placeholder - Production Only]
      </div>
    )
  }

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client="ca-pub-6886018593254363"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive.toString()}
    />
  )
}
