"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getUserLocation } from "../utils/location"

interface LocationContextType {
  userLocation: { lat: number; lng: number } | null
  locationName: { city: string; country: string } | null
  isLoading: boolean
  error: string | null
  isUsingDefaultLocation: boolean
  refreshLocation: () => Promise<void>
  setManualLocation: (location: { lat: number; lng: number; name: string; country: string }) => void
}

const LocationContext = createContext<LocationContextType>({
  userLocation: null,
  locationName: null,
  isLoading: true,
  error: null,
  isUsingDefaultLocation: false,
  refreshLocation: async () => {},
  setManualLocation: () => {},
})

export const useLocation = () => useContext(LocationContext)

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationName, setLocationName] = useState<{ city: string; country: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUsingDefaultLocation, setIsUsingDefaultLocation] = useState(false)

  const fetchLocation = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const { location, isDefault, errorMessage } = await getUserLocation()

      setUserLocation(location)
      setIsUsingDefaultLocation(isDefault)

      // Set default location name for Lisbon
      if (isDefault) {
        setLocationName({ city: "Lisbon", country: "Portugal" })
      } else {
        // For actual user location, we don't have the name from geolocation API
        // We'll just set it to "your location" for now
        setLocationName({ city: "your location", country: "" })
      }

      if (errorMessage) {
        setError(errorMessage)
      }
    } catch (err) {
      setError("Failed to get your location. Using default location instead.")
      // Default to Lisbon, Portugal
      setUserLocation({ lat: 38.7223, lng: -9.1393 })
      setLocationName({ city: "Lisbon", country: "Portugal" })
      setIsUsingDefaultLocation(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLocation()
  }, [])

  const refreshLocation = async () => {
    try {
      await fetchLocation()
      return Promise.resolve()
    } catch (error) {
      console.error("Error refreshing location:", error)
      return Promise.reject(error)
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
        refreshLocation,
        setManualLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}
