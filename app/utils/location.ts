// Utility functions for location and distance calculations

/**
 * Get default location without requesting browser geolocation
 * @returns Default location (Lisbon, Portugal)
 */
export async function getUserLocation(): Promise<{
  location: { lat: number; lng: number }
  isDefault: boolean
  errorMessage: string | null
}> {
  // Default location (Lisbon, Portugal)
  const defaultLocation = { lat: 38.7223, lng: -9.1393 }

  // Always return the default location without requesting browser geolocation
  return {
    location: defaultLocation,
    isDefault: true,
    errorMessage: null,
  }
}

/**
 * Calculate distance between two coordinates using the Haversine formula
 * @param lat1 Latitude of first point
 * @param lng1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lng2 Longitude of second point
 * @returns Distance in kilometers
 */
export function getDistanceFromLatLonInKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // Distance in km
  return distance
}

/**
 * Convert degrees to radians
 * @param deg Degrees
 * @returns Radians
 */
function deg2rad(deg: number): number {
  return deg * (Math.PI / 180)
}

/**
 * Calculate flight time based on distance
 * @param distance Distance in kilometers
 * @returns Flight time in hours
 */
export function calculateFlightTime(distance: number): number {
  // Average commercial flight speed: ~800 km/h
  // Add 1 hour for takeoff, landing, and airport procedures
  const cruiseTime = distance / 800
  const totalTime = cruiseTime + 1

  // Round to nearest 0.5 hour for simplicity
  return Math.round(totalTime * 2) / 2
}

/**
 * Calculate distance and flight time from user location to destination
 * @param userLocation User's coordinates
 * @param destinationCoords Destination coordinates
 * @returns Object with distance and flight time
 */
export function calculateTravelInfo(
  userLocation: { lat: number; lng: number },
  destinationCoords: { lat: number; lng: number },
): { distance: number; flightTime: number } {
  const distance = getDistanceFromLatLonInKm(
    userLocation.lat,
    userLocation.lng,
    destinationCoords.lat,
    destinationCoords.lng,
  )

  const flightTime = calculateFlightTime(distance)

  return { distance, flightTime }
}
