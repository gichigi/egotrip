"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getUserLocation } from "../utils/location"

// IP-based geolocation function
const getLocationFromIP = async (): Promise<{ lat: number; lng: number; city: string; country: string } | null> => {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    
    if (data.latitude && data.longitude) {
      return {
        lat: data.latitude,
        lng: data.longitude,
        city: data.city || 'Unknown',
        country: data.country_name || 'Unknown'
      }
    }
    return null
  } catch (error) {
    console.error('IP geolocation failed:', error)
    return null
  }
}

interface LocationContextType {
  userLocation: { lat: number; lng: number } | null
  locationName: { city: string; country: string } | null
  isLoading: boolean
  error: string | null
  isUsingDefaultLocation: boolean
  requestLocation: () => Promise<{ lat: number; lng: number }>
  setManualLocation: (location: { lat: number; lng: number; name: string; country: string }) => void
}

const LocationContext = createContext<LocationContextType>({
  userLocation: null,
  locationName: null,
  isLoading: true,
  error: null,
  isUsingDefaultLocation: false,
  requestLocation: async () => ({ lat: 0, lng: 0 }),
  setManualLocation: () => {},
})

export const useLocation = () => useContext(LocationContext)

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationName, setLocationName] = useState<{ city: string; country: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUsingDefaultLocation, setIsUsingDefaultLocation] = useState(false)

  const requestLocation = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const { location, isDefault, errorMessage } = await getUserLocation()

      setUserLocation(location)
      setIsUsingDefaultLocation(isDefault)

      // Set location name
      if (isDefault) {
        setLocationName({ city: "Lisbon", country: "Portugal" })
      } else {
        setLocationName({ city: "Current position", country: "" })
      }

      if (errorMessage) {
        setError(errorMessage)
      }

      // Return the location for immediate use
      return location
    } catch (err) {
      // Try IP-based geolocation as fallback
      try {
        const ipLocation = await getLocationFromIP()
        if (ipLocation) {
          setUserLocation({ lat: ipLocation.lat, lng: ipLocation.lng })
          setLocationName({ city: ipLocation.city, country: ipLocation.country })
          setIsUsingDefaultLocation(false)
          setError(null)
          return { lat: ipLocation.lat, lng: ipLocation.lng }
        }
      } catch (ipError) {
        console.error('IP geolocation also failed:', ipError)
      }
      
      setError("Failed to get your location. Using default location instead.")
      // Default to Lisbon, Portugal
      const defaultLocation = { lat: 38.7223, lng: -9.1393 }
      setUserLocation(defaultLocation)
      setLocationName({ city: "Lisbon", country: "Portugal" })
      setIsUsingDefaultLocation(true)
      return defaultLocation
    } finally {
      setIsLoading(false)
    }
  }


  const setManualLocation = (location: { lat: number; lng: number; name: string; country: string }) => {
    setUserLocation({ lat: location.lat, lng: location.lng })
    setLocationName({ city: location.name, country: location.country })
    setIsUsingDefaultLocation(false)
    setError(null)
  }

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        locationName,
        isLoading,
        error,
        isUsingDefaultLocation,
        requestLocation,
        setManualLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}
