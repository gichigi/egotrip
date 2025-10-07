"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Plane, MapPin, X, ExternalLink, Cloud, CloudRain } from "lucide-react"
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

// Simple image fallback
const getImageWithFallback = (src: string) => {
  return src || "/placeholder.svg"
}

// Update the ExclusivityBadge component with better contrast and readability
const ExclusivityBadge = ({ level }: ExclusivityBadgeProps) => {
  let color = ""
  let label = "Unknown"

  switch (level) {
    case "undiscovered":
      color = "bg-zinc-100 text-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-300"
      label = "Undiscovered"
      break
    case "emerging":
      color = "bg-zinc-100 text-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-300"
      label = "Emerging"
      break
    case "popular":
      color = "bg-zinc-100 text-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-300"
      label = "Established"
      break
    case "mainstream":
      color = "bg-zinc-100 text-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-300"
      label = "Well-Known"
      break
  }

  return <Badge className={`${color} font-normal backdrop-blur-sm border-none`}>{label}</Badge>
}

// Custom circular filled sun icon component
const SunIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="8" />
  </svg>
)

// Simplified weather forecast component
const WeatherForecast = ({ forecast }: WeatherForecastProps) => {
  const getWeatherIcon = (day: any) => {
    if (day.sunny) return <SunIcon className="h-6 w-6 mx-auto text-orange-500" />
    if (day.condition?.toLowerCase().includes("rain")) return <CloudRain className="h-6 w-6 mx-auto text-blue-400" />
    return <Cloud className="h-6 w-6 mx-auto text-zinc-400" />
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {forecast.slice(0, 3).map((day, index) => (
        <div key={index} className="text-center space-y-2">
          <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
            {index === 0 ? "Today" : day.day}
          </div>
          <div className="flex justify-center">{getWeatherIcon(day)}</div>
          <div className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {Math.round(day.temp)}°
          </div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400">{day.condition}</div>
        </div>
      ))}
    </div>
  )
}

// Redirect warning component
const RedirectWarning = ({ city, onClose }: RedirectWarningProps) => {
  return (
    <Dialog>
      <DialogContent className="sm:max-w-md bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-zinc-900 dark:text-zinc-100">Redirect Notice</DialogTitle>
          <DialogDescription className="text-zinc-600 dark:text-zinc-400">
            We're about to redirect you to Google Flights. Please note that EgoTrip is not responsible for any
            suspicious tan lines, sudden productivity boosts, or colleagues questioning your "strategic planning
            sessions" upon your return.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="flex items-start gap-3">
            <SunIcon className="h-5 w-5 text-orange-500 mt-0.5" /> {/* Updated to burning orange */}
            <div className="text-sm text-zinc-300">
              <p>
                We're about to redirect you to Google Flights. Please note that EgoTrip is not responsible for any
                suspicious tan lines, sudden productivity boosts, or colleagues questioning your "strategic planning
                sessions" upon your return.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={() => {
            const searchQuery = encodeURIComponent(`${city.name} ${city.country} flights`)
            window.open(`https://www.google.com/travel/flights?q=${searchQuery}`, "_blank")
            onClose()
          }} className="flex-1 bg-amber-500 hover:bg-amber-600 text-zinc-950">
            Proceed to Booking
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Main CityCard component - now using modal instead of expanding cards
const CityCard = ({ city, usingFallbackWeather }: CityCardProps) => {
  const [showRedirectWarning, setShowRedirectWarning] = useState(false)

  // Get weather icon for the card
  const getWeatherIcon = (forecast: any) => {
    const day = forecast?.[0]
    if (!day) return <SunIcon className="h-4 w-4 text-orange-500" />
    
    if (day.sunny) return <SunIcon className="h-4 w-4 text-orange-500" />
    if (day.condition?.toLowerCase().includes("rain")) return <CloudRain className="h-4 w-4 text-blue-400" />
    return <Cloud className="h-4 w-4 text-zinc-400" />
  }

  const handleBookingClick = () => {
    setShowRedirectWarning(true)
  }


  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 overflow-hidden transition-all duration-300 shadow-sm hover:border-zinc-400 dark:hover:border-zinc-700 cursor-pointer">
            {/* Image area */}
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={city.imageUrl}
                alt={city.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-4 z-10">
                <h2 className="text-2xl font-bold text-white drop-shadow-2xl tracking-wide mb-1">{city.name}</h2>
                <div className="flex items-center text-sm text-white/90 drop-shadow-lg font-medium">
                  <MapPin className="h-3 w-3 mr-1" />
                  {city.country}
                </div>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Plane className="h-4 w-4 text-zinc-500" />
                    <span className="text-zinc-700 dark:text-zinc-200">{formatFlightTime(city.flightTime)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    {getWeatherIcon(city.forecast)}
                    <span className="text-zinc-700 dark:text-zinc-200">
                      {Math.round(city.forecast[0]?.temp || 0)}°
                    </span>
                  </div>
                </div>
                <ExclusivityBadge level={city.exclusivity} />
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>

        <DialogContent className="max-w-4xl max-h-[90vh] bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 flex flex-col">
          {/* Fixed header */}
          <div className="flex-shrink-0">
            <DialogHeader>
              <DialogTitle className="heading-secondary text-zinc-900 dark:text-zinc-100">
                {city.name}, {city.country}
              </DialogTitle>
              <DialogDescription className="text-zinc-600 dark:text-zinc-400">
                {formatFlightTime(city.flightTime)} flight • {city.region}
              </DialogDescription>
            </DialogHeader>

            {/* Large image */}
            <div className="relative h-64 w-full overflow-hidden rounded-lg mt-6">
              <Image
                src={city.imageUrl}
                alt={city.name}
                fill
                className="object-cover"
                priority
              />
              {/* Badge positioned top right above image */}
              <div className="absolute top-4 right-4">
                <ExclusivityBadge level={city.exclusivity} />
              </div>
            </div>

            {/* Fixed tabs */}
            <Tabs defaultValue="overview" className="w-full mt-6 flex flex-col h-full">
              <TabsList className="grid w-full grid-cols-2 bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
                <TabsTrigger value="overview" className="text-zinc-700 dark:text-zinc-300">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="workspace" className="text-zinc-700 dark:text-zinc-300">
                  Workspace
                </TabsTrigger>
              </TabsList>

              {/* Scrollable content area */}
              <div className="flex-1 overflow-y-auto min-h-0">

              <TabsContent value="overview" className="space-y-8">
                <div className="space-y-8">
                  {/* Destination Overview Section */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-zinc-900 dark:text-zinc-100 text-lg">Destination Overview</h4>
                    <div className="prose prose-zinc dark:prose-invert max-w-none">
                      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {city.description}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-zinc-200 dark:border-zinc-700"></div>

                  {/* Weather forecast */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-zinc-900 dark:text-zinc-100 text-lg">3-Day Forecast</h4>
                      {usingFallbackWeather && (
                        <Badge variant="outline" className="text-xs text-zinc-500">
                          Estimated
                        </Badge>
                      )}
                    </div>
                    <WeatherForecast forecast={city.forecast} />
                  </div>

                </div>
              </TabsContent>

              <TabsContent value="workspace" className="space-y-4">
                <div className="space-y-4">
                  <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg">
                    <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">Strategic Meetings</h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                      Maintain your professional facade with these sophisticated workspace options.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-700 dark:text-zinc-300">Wi-Fi Rating</span>
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">Excellent</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-700 dark:text-zinc-300">Noise Level</span>
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">Professional</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg">
                    <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">Plausible Deniability</h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                      Pre-crafted explanations for your absence, naturally.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="text-zinc-700 dark:text-zinc-300">
                        • "Pre-scheduled quarterly review with international partners"
                      </div>
                      <div className="text-zinc-700 dark:text-zinc-300">
                        • "Strategic planning session with key stakeholders"
                      </div>
                      <div className="text-zinc-700 dark:text-zinc-300">
                        • "Client relationship building in emerging markets"
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="weather" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-zinc-900 dark:text-zinc-100">5-Day Forecast</h4>
                    {usingFallbackWeather && (
                      <Badge variant="outline" className="text-xs text-zinc-500">
                        Estimated
                      </Badge>
                    )}
                  </div>
                  <WeatherForecast forecast={city.forecast} />
                </div>
              </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Fixed footer */}
          <div className="flex-shrink-0 pt-6">
            <Button 
              className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950"
              onClick={handleBookingClick}
            >
              Proceed to Booking
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {showRedirectWarning && (
        <RedirectWarning
          city={city}
          onClose={() => setShowRedirectWarning(false)}
        />
      )}
    </>
  )
}

export default CityCard