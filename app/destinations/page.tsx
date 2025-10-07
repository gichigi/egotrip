"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ChevronDown,
  Filter,
  Plane,
  Search,
  SunMedium,
  Wifi,
  Wind,
  Heart,
  Check,
  Loader2,
  Globe,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cities as staticCities } from "./data"
import { destinationCoordinates } from "./coordinates-data"
import CityCard from "./city-card"
import { FilterPanel } from "./filter-panel"
import { useLocation } from "../context/location-context"
import { calculateTravelInfo } from "../utils/location"
import { getWeatherForecast } from "../actions/weather"
import type { City, FilterOptions, WeatherForecast } from "./types"
import { LocationModal } from "../components/location-modal"
import { useToast } from "@/components/ui/use-toast"
import { LocationDisplay } from "../components/location-display"
import { LoadingInterstitial } from "@/components/loading-interstitial"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DestinationsPage() {
  const {
    userLocation,
    locationName,
    isLoading: isLoadingLocation,
    error: locationError,
    isUsingDefaultLocation,
    refreshLocation,
    setManualLocation,
  } = useLocation()

  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [cities, setCities] = useState<City[]>([])
  const [filteredCities, setFilteredCities] = useState<City[]>([])
  const [sortOption, setSortOption] = useState<"flightTime" | "sunshine">("flightTime")
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoadingWeather, setIsLoadingWeather] = useState(true)
  const [weatherErrors, setWeatherErrors] = useState<Record<string, boolean>>({})
  const [showInitialLoading, setShowInitialLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    maxFlightTime: 8,
    minSunshineHours: 6,
    maxPrice: 1000,
    exclusivity: [],
    regions: [],
  })

  const [showLocationModal, setShowLocationModal] = useState(false)

  const { toast } = useToast()

  // Initialize cities with calculated flight times based on user location
  useEffect(() => {
    if (!userLocation) return

    const initializeCities = async () => {
      setIsLoadingWeather(true)
      const errors: Record<string, boolean> = {}

      // Start with static city data
      const updatedCities = await Promise.all(
        staticCities.map(async (city) => {
          // Find coordinates for this city
          const cityCoords = destinationCoordinates.find(
            (coord) => coord.name === city.name && coord.country === city.country,
          )

          if (!cityCoords) {
            console.warn(`No coordinates found for ${city.name}, ${city.country}`)
            errors[city.name] = true
            return city // Return original city if no coordinates found
          }

          // Calculate distance and flight time
          const { flightTime } = calculateTravelInfo(userLocation, cityCoords.coordinates)

          // Fetch weather forecast using coordinates
          let forecast: WeatherForecast[] = city.forecast
          let usingFallbackWeather = false

          try {
            const weatherForecast = await getWeatherForecast(
              city.name,
              city.country,
              cityCoords.coordinates, // Pass coordinates for more reliable API calls
            )

            if (weatherForecast && weatherForecast.length > 0) {
              forecast = weatherForecast
            } else {
              usingFallbackWeather = true
            }
          } catch (error) {
            console.error(`Error fetching weather for ${city.name}:`, error)
            usingFallbackWeather = true
          }

          if (usingFallbackWeather) {
            errors[city.name] = true
          }

          // Return updated city with calculated flight time and real weather
          return {
            ...city,
            flightTime,
            forecast,
            usingFallbackWeather,
          }
        }),
      )

      setCities(updatedCities)
      setWeatherErrors(errors)
      setIsLoadingWeather(false)
    }

    initializeCities()
  }, [userLocation])

  // Add this new useEffect to show toast only after initial loading is complete
  useEffect(() => {
    if (!showInitialLoading && userLocation && !isLoadingLocation) {
      // Only show toast when location is loaded and initial loading is complete
      toast({
        title: isUsingDefaultLocation ? "Using default location" : "Location detected",
        description: isUsingDefaultLocation
          ? `Showing destinations from ${locationName?.city || "Lisbon"}, ${locationName?.country || "Portugal"}.`
          : "We've personalized destinations based on your location.",
        variant: "default",
      })
    }
  }, [showInitialLoading, userLocation, isLoadingLocation, isUsingDefaultLocation, locationName, toast])

  // Sort and filter cities based on selected options
  useEffect(() => {
    if (cities.length === 0) return

    let result = [...cities]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (city) =>
          city.name.toLowerCase().includes(query) ||
          city.country.toLowerCase().includes(query) ||
          city.region.toLowerCase().includes(query),
      )
    }

    // Apply other filters
    result = result.filter((city) => {
      // Apply flight time filter
      if (city.flightTime > activeFilters.maxFlightTime) return false

      // Apply sunshine hours filter
      if (city.sunshineHours < activeFilters.minSunshineHours) return false

      // Apply price filter
      if (city.price > activeFilters.maxPrice) return false

      // Apply exclusivity filter
      if (activeFilters.exclusivity.length > 0 && !activeFilters.exclusivity.includes(city.exclusivity)) return false

      // Apply region filter
      if (activeFilters.regions.length > 0 && !activeFilters.regions.includes(city.region)) return false

      return true
    })

    // Sort results
    result.sort((a, b) => {
      if (sortOption === "flightTime") {
        return a.flightTime - b.flightTime
      } else if (sortOption === "sunshine") {
        return b.sunshineHours - a.sunshineHours
      }
      return 0
    })

    setFilteredCities(result)
  }, [cities, sortOption, activeFilters, searchQuery])

  // Apply filters
  const applyFilters = (filters: FilterOptions) => {
    setActiveFilters(filters)
    setShowFilters(false)
  }

  // Check if any filters are active
  const hasActiveFilters = () => {
    return (
      activeFilters.maxFlightTime !== 8 ||
      activeFilters.minSunshineHours !== 6 ||
      activeFilters.maxPrice !== 1000 ||
      activeFilters.exclusivity.length > 0 ||
      activeFilters.regions.length > 0
    )
  }

  // Handle city selection/deselection
  const handleCitySelect = (city: City) => {
    if (selectedCity?.id === city.id) {
      // If the same city is clicked again, close it
      setSelectedCity(null)
    } else {
      // Otherwise, select the city
      setSelectedCity(city)
    }
  }

  // Show loading interstitial for at least 4 seconds
  if (showInitialLoading) {
    return <LoadingInterstitial onComplete={() => setShowInitialLoading(false)} minDuration={6000} />
  }

  // Only show loading state when we have no cities data
  if (cities.length === 0 && isLoadingWeather) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-4">
        <Loader2 className="h-12 w-12 text-amber-400 animate-spin mb-4" />
        <h2 className="text-xl font-light">Finding your perfect escape...</h2>
        <p className="text-zinc-400 mt-2 max-w-md text-center">
          We're calculating sunshine hours and flight times based on your location.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden">
      <header className="w-full py-4 sm:py-6 px-4 sm:px-8 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-10 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm">
        <Link
          href="/"
          className="flex items-center gap-2 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
        >
          <Plane className="h-5 w-5 text-amber-500 dark:text-amber-400" />
          <span className="font-medium tracking-tight">EgoTrip</span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="px-4 py-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight">Your exit strategy</h1>
            <p className="text-zinc-400 max-w-2xl">
              Based on your location, we've shortlisted escapes with minimal travel time and maximum rays. We've even
              included a few workspaces so you can keep up appearances.
            </p>

            {/* Location display */}
            {userLocation && (
              <LocationDisplay
                locationName={locationName}
                isUsingDefaultLocation={isUsingDefaultLocation}
                refreshLocation={refreshLocation}
                setManualLocation={setManualLocation}
              />
            )}

            {Object.keys(weatherErrors).length > 0 && (
              <div className="text-xs text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-1">
                <InfoIcon className="h-3 w-3" />
                <span>Using estimated weather data for some destinations</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
              <Input
                placeholder="Search destinations"
                className="pl-10 bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300"
                  >
                    Sort by: {sortOption === "flightTime" ? "Flight Time" : "Sunshine"}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800">
                  <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />
                  <DropdownMenuItem onClick={() => setSortOption("flightTime")} className="flex items-center gap-2">
                    <Plane className="h-4 w-4" />
                    Flight Time
                    {sortOption === "flightTime" && <Check className="h-4 w-4 ml-auto" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("sunshine")} className="flex items-center gap-2">
                    <SunMedium className="h-4 w-4" />
                    Sunshine Hours
                    {sortOption === "sunshine" && <Check className="h-4 w-4 ml-auto" />}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant={hasActiveFilters() ? "default" : "outline"}
                className={
                  hasActiveFilters()
                    ? "bg-amber-400 text-zinc-950 hover:bg-amber-300"
                    : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300"
                }
                onClick={() => setShowFilters(true)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter
                {hasActiveFilters() && (
                  <Badge variant="secondary" className="ml-2 bg-zinc-950 text-amber-400">
                    Active
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Filter Panel */}
          <FilterPanel
            show={showFilters}
            onClose={() => setShowFilters(false)}
            onApply={applyFilters}
            initialFilters={activeFilters}
          />

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCities.map((city) => (
              <CityCard
                key={city.id}
                city={city}
                isSelected={selectedCity?.id === city.id}
                onSelect={() => handleCitySelect(city)}
                onClose={() => setSelectedCity(null)}
                usingFallbackWeather={weatherErrors[city.name] || false}
              />
            ))}

            {filteredCities.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <div className="space-y-4">
                  <SunMedium className="h-12 w-12 text-zinc-700 mx-auto" />
                  <h3 className="text-xl font-medium">No destinations match your criteria</h3>
                  <p className="text-zinc-500 max-w-md mx-auto">
                    Perhaps your standards exceed what reality can offer. Consider adjusting your filters or accepting
                    mediocrity.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setActiveFilters({
                        maxFlightTime: 8,
                        minSunshineHours: 6,
                        maxPrice: 1000,
                        exclusivity: [],
                        regions: [],
                      })
                      setSearchQuery("")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Coming Soon Features - Updated for better light mode readability */}
          <div className="mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-xl font-light mb-6 text-zinc-800 dark:text-zinc-100">Coming Soon</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/80 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Wind className="h-5 w-5 text-zinc-600 dark:text-zinc-500" />
                  <h3 className="font-medium text-zinc-800 dark:text-zinc-300">Air Cleanliness Index</h3>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-500">
                  Because your lungs deserve the same exclusivity as your calendar.
                </p>
              </div>

              <div className="bg-white/80 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Wifi className="h-5 w-5 text-zinc-600 dark:text-zinc-500" />
                  <h3 className="font-medium text-zinc-800 dark:text-zinc-300">Wi-Fi Strength Mapping</h3>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-500">
                  For maintaining the illusion of productivity from any beach.
                </p>
              </div>

              <div className="bg-white/80 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="h-5 w-5 text-zinc-600 dark:text-zinc-500" />
                  <h3 className="font-medium text-zinc-800 dark:text-zinc-300">Tinder Match Index</h3>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-500">
                  Optimize for both sunshine and "networking opportunities."
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Location Selection Modal */}
      <LocationModal
        open={showLocationModal}
        onOpenChange={setShowLocationModal}
        onLocationSelect={setManualLocation}
      />

      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Plane className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                <span className="font-medium tracking-tight text-zinc-800 dark:text-zinc-100">EgoTrip</span>
              </div>
              <p className="text-zinc-700 dark:text-zinc-500 text-sm">
                Where "out of office" meets "out of excuses" and "strategic thinking" is best done with a cocktail and a
                view.
              </p>
            </div>

            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-zinc-800 dark:text-zinc-300 font-medium mb-3">Features</h4>
                <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-500">
                  <li>Sunshine Optimization</li>
                  <li>Flight Radius Analysis</li>
                  <li>Plausible Deniability</li>
                  <li>Workspace Alibis</li>
                </ul>
              </div>

              <div>
                <h4 className="text-zinc-800 dark:text-zinc-300 font-medium mb-3">Resources</h4>
                <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-500">
                  <li>Excuse Generator</li>
                  <li>Slack Auto-Responder</li>
                  <li>Tan Concealer Guide</li>
                  <li>Strategic Thinking Poses</li>
                </ul>
              </div>

              <div>
                <h4 className="text-zinc-800 dark:text-zinc-300 font-medium mb-3">Legal</h4>
                <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-500">
                  <li>Plausible Deniability</li>
                  <li>Alibi Verification</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-zinc-700 dark:text-zinc-600 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} EgoTrip. Made with love in Portugal. All rights reserved while you pretend to
              work.
            </p>

            <div className="flex space-x-6">
              <a href="https://x.com/tahigichigi" target="_blank" rel="noopener noreferrer">
                <Globe className="h-5 w-5 text-zinc-600 hover:text-amber-500 dark:hover:text-amber-400 cursor-pointer" />
              </a>
              <Shield className="h-5 w-5 text-zinc-600 hover:text-amber-500 dark:hover:text-amber-400 cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Missing InfoIcon component
function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}
