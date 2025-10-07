"use client"

import { useState, useEffect } from "react"
import { MapPin, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

// Popular cities with their coordinates - doubled from 10 to 20
const popularLocations = [
  { name: "Lisbon", country: "Portugal", lat: 38.7223, lng: -9.1393, climate: "Sunny" },
  { name: "New York", country: "United States", lat: 40.7128, lng: -74.006, climate: "Variable" },
  { name: "London", country: "United Kingdom", lat: 51.5074, lng: -0.1278, climate: "Cloudy" },
  { name: "Paris", country: "France", lat: 48.8566, lng: 2.3522, climate: "Moderate" },
  { name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503, climate: "Temperate" },
  { name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093, climate: "Sunny" },
  { name: "San Francisco", country: "United States", lat: 37.7749, lng: -122.4194, climate: "Mild" },
  { name: "Berlin", country: "Germany", lat: 52.52, lng: 13.405, climate: "Seasonal" },
  { name: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708, climate: "Hot" },
  { name: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198, climate: "Tropical" },
  // Additional 10 cities
  { name: "Barcelona", country: "Spain", lat: 41.3851, lng: 2.1734, climate: "Sunny" },
  { name: "Rome", country: "Italy", lat: 41.9028, lng: 12.4964, climate: "Mediterranean" },
  { name: "Amsterdam", country: "Netherlands", lat: 52.3676, lng: 4.9041, climate: "Mild" },
  { name: "Hong Kong", country: "China", lat: 22.3193, lng: 114.1694, climate: "Subtropical" },
  { name: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lng: -43.1729, climate: "Tropical" },
  { name: "Cape Town", country: "South Africa", lat: -33.9249, lng: 18.4241, climate: "Mediterranean" },
  { name: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018, climate: "Tropical" },
  { name: "Vancouver", country: "Canada", lat: 49.2827, lng: -123.1207, climate: "Temperate" },
  { name: "Istanbul", country: "Turkey", lat: 41.0082, lng: 28.9784, climate: "Mediterranean" },
  { name: "Melbourne", country: "Australia", lat: -37.8136, lng: 144.9631, climate: "Temperate" },
]

// Get climate icon based on climate description
const getClimateIcon = (climate: string) => {
  switch (climate.toLowerCase()) {
    case "sunny":
      return "☀️"
    case "hot":
      return "🔥"
    case "tropical":
      return "🌴"
    case "cloudy":
      return "☁️"
    case "variable":
      return "🌦️"
    case "moderate":
    case "mild":
      return "🌤️"
    case "temperate":
    case "seasonal":
      return "🌈"
    case "mediterranean":
      return "🏖️"
    case "subtropical":
      return "🌞"
    default:
      return "🌍"
  }
}

interface LocationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLocationSelect: (location: { lat: number; lng: number; name: string; country: string }) => void
}

export function LocationModal({ open, onOpenChange, onLocationSelect }: LocationModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredLocations, setFilteredLocations] = useState(popularLocations)

  // Filter locations based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredLocations(popularLocations)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = popularLocations.filter(
      (location) => location.name.toLowerCase().includes(query) || location.country.toLowerCase().includes(query),
    )
    setFilteredLocations(filtered)
  }, [searchQuery])

  // Handle location selection
  const handleSelectLocation = (location: (typeof popularLocations)[0]) => {
    onLocationSelect({
      lat: location.lat,
      lng: location.lng,
      name: location.name,
      country: location.country,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-950 border-zinc-800 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-light">Where are you pretending to work from today?</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
            <Input
              placeholder="Search locations..."
              className="pl-10 bg-zinc-900 border-zinc-800 text-zinc-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-md">
            <ScrollArea className="h-60">
              {filteredLocations.length === 0 ? (
                <div className="p-4 text-center text-zinc-500">No locations found. Try a different search.</div>
              ) : (
                <div className="p-1">
                  {filteredLocations.map((location) => (
                    <div
                      key={`${location.name}-${location.country}`}
                      className="flex items-center justify-between p-3 hover:bg-zinc-800 rounded-sm cursor-pointer"
                      onClick={() => handleSelectLocation(location)}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-zinc-500" />
                        <div>
                          <div className="font-medium">{location.name}</div>
                          <div className="text-xs text-zinc-500">{location.country}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500">{location.climate}</span>
                        <span>{getClimateIcon(location.climate)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          <div className="text-xs text-zinc-500 italic">
            Select a location to see destinations within your flight radius.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
