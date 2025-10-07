"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  ChevronDown,
  Filter,
  Plane,
  Search,
  Wifi,
  Wind,
  Heart,
  Check,
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

// InfoIcon component
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

// Custom circular filled sun icon component
const SunIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="8" />
  </svg>
)

export default function DestinationsPage() {
  const {
    userLocation,
    locationName,
    isLoading: isLoadingLocation,
    error: locationError,
    isUsingDefaultLocation,
    requestLocation,
    setManualLocation,
  } = useLocation()

  const [cities, setCities] = useState<City[]>([])
  const [filteredCities, setFilteredCities] = useState<City[]>([])
  const [sortOption, setSortOption] = useState<"flightTime" | "sunshine">("flightTime")
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [weatherErrors, setWeatherErrors] = useState<Record<string, boolean>>({})
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    maxFlightTime: 8,
    minSunshineHours: 6,
    maxPrice: 1000,
    exclusivity: [],
    regions: [],
  })

  const [showLocationModal, setShowLocationModal] = useState(false)
  const isInitializing = useRef(false)

  const { toast } = useToast()

  // Single consolidated initialization effect
  useEffect(() => {
    if (isInitializing.current) return
    
    const initialize = async () => {
      isInitializing.current = true
      
      // Request location (will fallback to Lisbon if needed)
      const currentLocation = await requestLocation()
      
      // Initialize cities with weather data
      const errors: Record<string, boolean> = {}
      
      try {
        const updatedCities = await Promise.all(
          staticCities.map(async (city) => {
            const cityCoords = destinationCoordinates.find(
              (coord) => coord.name === city.name && coord.country === city.country,
            )

            if (!cityCoords) {
              errors[city.name] = true
              return city
            }

            const { flightTime } = calculateTravelInfo(currentLocation, cityCoords.coordinates)

            let forecast: WeatherForecast[] = city.forecast
            let usingFallbackWeather = false

            try {
              const weatherForecast = await getWeatherForecast(
                city.name,
                city.country,
                cityCoords.coordinates,
              )

              if (weatherForecast && weatherForecast.length > 0) {
                forecast = weatherForecast
              } else {
                usingFallbackWeather = true
              }
            } catch (error) {
              usingFallbackWeather = true
            }

            if (usingFallbackWeather) {
              errors[city.name] = true
            }

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
        setIsLoading(false)
        
        // Show completion toast
        toast({
          title: isUsingDefaultLocation ? "Proceeding with Lisbon fallback" : "Location refined",
          description: isUsingDefaultLocation
            ? "Using Lisbon as your reference point for flight calculations."
            : "Your location has been refined for accurate flight time calculations.",
        })
      } catch (error) {
        setIsLoading(false)
      }
    }
    
    initialize()
  }, [])


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


  // Show loading interstitial while initializing
  if (isLoading) {
    return <LoadingInterstitial onComplete={() => setIsLoading(false)} minDuration={6000} />
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
            <h1 className="heading-primary">Your Closest Escapes</h1>
            <p className="body-large text-zinc-400 max-w-2xl">
We've prepared destinations within your immediate flight radius with weather that meets your standards. Naturally, we've included workspace intelligence for maintaining appearances.
            </p>

            {/* Location display */}
            <LocationDisplay
              locationName={locationName}
              isUsingDefaultLocation={isUsingDefaultLocation}
              setManualLocation={setManualLocation}
            />

            {Object.keys(weatherErrors).length > 0 && (
              <div className="text-xs text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-1">
                <InfoIcon className="h-3 w-3" />
                <span>The weather service is being rather pedestrian today</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
              <Input
                placeholder="Refine your search"
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
                  <DropdownMenuLabel>Refinement Options</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />
                  <DropdownMenuItem onClick={() => setSortOption("flightTime")} className="flex items-center gap-2">
                    <Plane className="h-4 w-4" />
                    Flight Time
                    {sortOption === "flightTime" && <Check className="h-4 w-4 ml-auto" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("sunshine")} className="flex items-center gap-2">
                    <SunIcon className="h-4 w-4 text-orange-500" />
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
                  <Badge variant="secondary" className="ml-2 bg-zinc-100 text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-400">
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
                usingFallbackWeather={weatherErrors[city.name] || false}
              />
            ))}

            {filteredCities.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <div className="space-y-4">
                  <SunIcon className="h-12 w-12 text-orange-500 mx-auto" />
                  <h3 className="text-xl font-medium">No destinations meet your standards</h3>
                  <p className="text-zinc-500 max-w-md mx-auto">
                    Your criteria appear rather... particular. Consider refining your requirements or accepting that not all destinations meet your elevated standards.
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
                For the discerning traveler who understands that weather is non-negotiable. We've prepared sophisticated alternatives for those who refuse to settle for pedestrian atmospheric conditions.
              </p>
            </div>

            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-zinc-800 dark:text-zinc-300 font-medium mb-3">Our Services</h4>
                <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-500">
                  <li>Weather Intelligence</li>
                  <li>Flight Radius Analysis</li>
                  <li>Workspace Intelligence</li>
                  <li>Atmospheric Standards</li>
                </ul>
              </div>

              <div>
                <h4 className="text-zinc-800 dark:text-zinc-300 font-medium mb-3">For the Sophisticated</h4>
                <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-500">
                  <li>Curated Destinations</li>
                  <li>Wi-Fi Ratings</li>
                  <li>Pre-crafted Alibis</li>
                  <li>Exclusive Access</li>
                </ul>
              </div>

              <div>
                <h4 className="text-zinc-800 dark:text-zinc-300 font-medium mb-3">Discretion</h4>
                <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-500">
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Plausible Deniability</li>
                  <li>Confidentiality</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-zinc-700 dark:text-zinc-600 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} EgoTrip. Curated in Portugal for the discerning traveler. All rights reserved for those who refuse to settle for pedestrian weather.
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

