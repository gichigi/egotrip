"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Plane, SunMedium, MapPin, X, ExternalLink, Cloud, CloudRain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { CityCardProps, ExclusivityBadgeProps, WeatherForecastProps, RedirectWarningProps } from "./types"

// Helper function to format currency
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

// Helper function to format flight time
const formatFlightTime = (hours: number): string => {
  const wholeHours = Math.floor(hours)
  const minutes = Math.round((hours - wholeHours) * 60)
  return `${wholeHours}h ${minutes}m`
}

// Add this function near the top of the file, before the CityCard component
const getImageWithFallback = (src: string) => {
  // If the src is already a placeholder, return it
  if (src.includes("placeholder.svg")) {
    return src
  }

  // Otherwise, return the src with a fallback
  return src || "/placeholder.svg?height=600&width=800&text=Image+Not+Found"
}

// Update the ExclusivityBadge component with better contrast and readability
const ExclusivityBadge = ({ level }: ExclusivityBadgeProps) => {
  let color = ""
  let label = "Unknown"

  switch (level) {
    case "undiscovered":
      color = "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/70 dark:text-emerald-300"
      label = "Untouched Gem"
      break
    case "emerging":
      color = "bg-blue-100 text-blue-800 dark:bg-blue-900/70 dark:text-blue-300"
      label = "Hidden Secret"
      break
    case "popular":
      // Changed to a more vibrant color for "Consensus Choice"
      color = "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/70 dark:text-fuchsia-300"
      label = "Consensus Choice"
      break
    case "mainstream":
      color = "bg-purple-100 text-purple-800 dark:bg-purple-900/70 dark:text-purple-300"
      label = "Established Escape"
      break
  }

  return <Badge className={`${color} font-normal backdrop-blur-sm border-none`}>{label}</Badge>
}

// Weather forecast component with improved light mode readability
const WeatherForecast = ({ forecast }: WeatherForecastProps) => {
  // Function to get the appropriate weather icon
  const getWeatherIcon = (day: any) => {
    if (day.icon) {
      // If we have an icon from the API, use it
      return (
        <img
          src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
          alt={day.condition}
          className="h-12 w-12 mx-auto"
          onError={(e) => {
            // If image fails to load, fall back to our own icons
            e.currentTarget.style.display = "none"
            const parent = e.currentTarget.parentElement
            if (parent) {
              if (day.sunny) {
                parent.innerHTML =
                  '<svg class="h-6 w-6 mx-auto text-orange-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>'
              } else if (day.condition?.toLowerCase().includes("rain")) {
                parent.innerHTML =
                  '<svg class="h-6 w-6 mx-auto text-blue-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>'
              } else {
                parent.innerHTML =
                  '<svg class="h-6 w-6 mx-auto text-zinc-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>'
              }
            }
          }}
        />
      )
    }

    // Fallback to our own icons with updated colors
    if (day.sunny) {
      return <SunMedium className="h-6 w-6 mx-auto text-orange-500" /> // Changed to burning orange
    } else if (day.condition?.toLowerCase().includes("rain")) {
      return <CloudRain className="h-6 w-6 mx-auto text-blue-400" />
    } else {
      return <Cloud className="h-6 w-6 mx-auto text-zinc-400" />
    }
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {forecast.map((day, index) => (
        <div key={index} className="bg-white/10 dark:bg-zinc-900 p-3 rounded-lg text-center shadow-sm">
          <div className="text-xs text-zinc-600 dark:text-zinc-500 mb-1">{day.day}</div>
          {getWeatherIcon(day)}
          <div className="text-lg font-medium mt-1 text-zinc-900 dark:text-white">{day.temp}°</div>
          <div className="text-xs text-zinc-700 dark:text-zinc-500">{day.condition}</div>
          {day.errorMessage && (
            <div className="text-xs text-blue-600 dark:text-blue-400 mt-1 italic">{day.errorMessage}</div>
          )}
        </div>
      ))}
    </div>
  )
}

// Google Flights redirect warning dialog with updated copy
const RedirectWarning = ({ city, onClose }: RedirectWarningProps) => {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      // Only call onClose when dialog is closed by clicking outside
      // Not when "I'm not ready" is clicked
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full bg-amber-400 text-zinc-950 hover:bg-amber-300" onClick={() => setOpen(true)}>
          Secure your escape
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-xl">Sunshine Awaits...</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Your strategic thinking session is just a flight away.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="flex items-start gap-3">
            <SunMedium className="h-5 w-5 text-orange-500 mt-0.5" /> {/* Updated to burning orange */}
            <div className="text-sm text-zinc-300">
              <p>
                We're about to redirect you to Google Flights. Please note that EgoTrip is not responsible for any
                suspicious tan lines, sudden productivity boosts, or colleagues questioning your "strategic planning
                sessions" upon your return.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="ghost" className="text-zinc-400" onClick={() => setOpen(false)}>
            Not ready yet
          </Button>
          <Button
            onClick={() => {
              window.open(
                `https://www.google.com/travel/flights?q=flights%20to%20${city.name.toLowerCase().replace(" ", "%20")}`,
                "_blank",
              )
              setOpen(false)
              onClose()
            }}
            className="bg-amber-400 text-zinc-950 hover:bg-amber-300"
          >
            Take me to the sun
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Main CityCard component with improved light mode readability
// Removed escape velocity, previous visitors sections, and second image
const CityCard = ({ city, isSelected, onSelect, onClose, usingFallbackWeather }: CityCardProps) => {
  const [showSunshineEffect, setShowSunshineEffect] = useState(false)

  useEffect(() => {
    if (isSelected) {
      setShowSunshineEffect(true)
      const timer = setTimeout(() => {
        setShowSunshineEffect(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isSelected])

  // Handle card click - only select if not already selected
  const handleCardClick = () => {
    if (!isSelected) {
      onSelect()
    }
    // If already selected, do nothing (don't collapse)
  }

  // Handle image area click - toggle selection
  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent event from bubbling to the card
    if (isSelected) {
      onClose() // Close if already selected
    } else {
      onSelect() // Open if not selected
    }
  }

  // Get weather icon for the card
  const getWeatherIcon = (forecast: any) => {
    if (!forecast || !forecast[0]) return <SunMedium className="h-4 w-4 text-orange-500" /> // Changed to burning orange

    if (forecast[0].sunny) {
      return <SunMedium className="h-4 w-4 text-orange-500" /> // Changed to burning orange
    } else if (forecast[0].condition?.toLowerCase().includes("rain")) {
      return <CloudRain className="h-4 w-4 text-blue-400" />
    } else {
      return <Cloud className="h-4 w-4 text-zinc-400" />
    }
  }

  return (
    <div className="relative">
      {/* Sunshine transition effect */}
      <AnimatePresence>
        {showSunshineEffect && (
          <motion.div
            className="absolute inset-0 bg-amber-400/20 rounded-lg z-10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      <Card
        className={`bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 overflow-hidden transition-all duration-300 shadow-sm ${
          isSelected ? "rounded-lg" : "hover:border-zinc-400 dark:hover:border-zinc-700 cursor-pointer"
        }`}
        onClick={handleCardClick}
      >
        {/* Image area - clickable to toggle selection */}
        <div className="relative cursor-pointer" onClick={handleImageClick}>
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={getImageWithFallback(city.imageUrl) || "/placeholder.svg"}
              alt={city.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              priority
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                e.currentTarget.src = `/placeholder.svg?height=600&width=800&text=${encodeURIComponent(city.name)}`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
          </div>

          {isSelected && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 left-3 bg-zinc-900/50 hover:bg-zinc-900/80 text-zinc-400"
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}

          <div className="absolute bottom-0 left-0 w-full p-4">
            <h2 className="text-xl font-medium text-white">{city.name}</h2>
            <div className="flex items-center text-sm text-white">
              <MapPin className="h-3 w-3 mr-1" />
              {city.country}
            </div>
          </div>
        </div>

        <CardContent className={`p-4 ${isSelected ? "pb-6" : ""}`}>
          {!isSelected ? (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm">
                  <Plane className="h-4 w-4 text-zinc-500" />
                  <span className="text-zinc-700 dark:text-zinc-200">{formatFlightTime(city.flightTime)}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  {getWeatherIcon(city.forecast)}
                  <span className="text-zinc-700 dark:text-zinc-200">
                    {city.forecast && city.forecast[0]
                      ? `${city.forecast[0].temp}° Current`
                      : `${city.sunshineHours}h Current`}
                  </span>
                </div>
              </div>

              <ExclusivityBadge level={city.exclusivity} />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center p-3 bg-gray-100 dark:bg-zinc-800/50 rounded-lg">
                  <Plane className="h-5 w-5 text-zinc-500 dark:text-zinc-400 mb-1" />
                  <span className="text-lg font-medium text-zinc-800 dark:text-white">
                    {formatFlightTime(city.flightTime)}
                  </span>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">Flight Time</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-gray-100 dark:bg-zinc-800/50 rounded-lg">
                  {getWeatherIcon(city.forecast)}
                  <span className="text-lg font-medium text-zinc-800 dark:text-white">
                    {city.forecast && city.forecast[0] ? `${city.forecast[0].temp}°` : `${city.sunshineHours}h`}
                  </span>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    {city.forecast && city.forecast[0] ? "Current Weather" : "Avg. Daily Sun"}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-zinc-800 dark:text-white mb-3">3-Day Forecast</h3>
                {usingFallbackWeather && (
                  <div className="mb-2 text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    <span className="italic">Using estimated weather data</span>
                  </div>
                )}
                <WeatherForecast forecast={city.forecast} />
              </div>

              <Separator className="bg-zinc-200 dark:bg-zinc-800" />

              <Tabs defaultValue="overview">
                <TabsList className="bg-gray-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
                  <TabsTrigger value="alibis">Alibis</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="text-sm text-zinc-700 dark:text-zinc-300 space-y-3 mt-3">
                  <p>{city.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-100 dark:bg-zinc-800/30 p-2 rounded">
                      <span className="text-xs text-zinc-600 dark:text-zinc-500">Best time to visit</span>
                      <p className="font-medium text-zinc-800 dark:text-zinc-200">{city.bestTimeToVisit}</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-zinc-800/30 p-2 rounded">
                      <span className="text-xs text-zinc-600 dark:text-zinc-500">Local currency</span>
                      <p className="font-medium text-zinc-800 dark:text-zinc-200">{city.currency}</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="workspaces" className="text-sm text-zinc-700 dark:text-zinc-300 space-y-3 mt-3">
                  <p>Strategic locations with reliable Wi-Fi and impressive Zoom backgrounds.</p>
                  <div className="space-y-2">
                    {city.workspaces?.map((workspace, index) => (
                      <div key={index} className="bg-gray-100 dark:bg-zinc-800/30 p-2 rounded flex justify-between">
                        <div>
                          <p className="font-medium text-zinc-800 dark:text-zinc-200">{workspace.name}</p>
                          <span className="text-xs text-zinc-600 dark:text-zinc-500">{workspace.type}</span>
                        </div>
                        <Badge className="bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200 self-center">
                          {workspace.wifiRating}/5
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="alibis" className="text-sm text-zinc-700 dark:text-zinc-300 space-y-3 mt-3">
                  <p>Pre-crafted excuses for your sudden interest in {city.name}.</p>
                  <div className="space-y-2">
                    {city.alibis?.map((alibi, index) => (
                      <div key={index} className="bg-gray-100 dark:bg-zinc-800/30 p-2 rounded">
                        <p className="italic text-zinc-800 dark:text-zinc-200">"{alibi}"</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <RedirectWarning city={city} onClose={onClose} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default CityCard
