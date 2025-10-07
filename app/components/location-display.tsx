"use client"

import { useState } from "react"
import { MapPin, PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { LocationModal } from "./location-modal"

interface LocationDisplayProps {
  locationName: { city: string; country: string } | null
  isUsingDefaultLocation: boolean
  setManualLocation: (location: { lat: number; lng: number; name: string; country: string }) => void
}

export function LocationDisplay({ locationName, isUsingDefaultLocation, setManualLocation }: LocationDisplayProps) {
  const [showLocationModal, setShowLocationModal] = useState(false)
  const { toast } = useToast()

  const handleLocationSelect = (location: { lat: number; lng: number; name: string; country: string }) => {
    setManualLocation(location)
    toast({
      title: "Location updated",
      description: `Now showing destinations from ${location.name}, ${location.country}.`,
      variant: "default",
    })
  }

  return (
    <div className="flex items-center justify-between bg-white/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 mb-6 backdrop-blur-sm shadow-sm">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-amber-500 dark:text-amber-400" />
        <span className="text-sm text-zinc-600 dark:text-zinc-300">
          {isUsingDefaultLocation ? "Using default location:" : "Your location:"}
        </span>
        <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
          {locationName?.city || "Lisbon"}
          {locationName?.country ? `, ${locationName.country}` : ", Portugal"}
        </span>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="text-xs text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 border-zinc-300 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800"
        onClick={() => setShowLocationModal(true)}
      >
        <PenLine className="h-3 w-3 mr-1" />
        Change Location
      </Button>

      <LocationModal
        open={showLocationModal}
        onOpenChange={setShowLocationModal}
        onLocationSelect={handleLocationSelect}
      />
    </div>
  )
}
