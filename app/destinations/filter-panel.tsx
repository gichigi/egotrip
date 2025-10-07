"use client"

import { useState, useEffect } from "react"
import { SunMedium, Clock, Globe, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import type { FilterPanelProps, FilterOptions } from "./types"

// Helper function to format flight time
const formatFlightTime = (hours: number): string => {
  const wholeHours = Math.floor(hours)
  const minutes = Math.round((hours - wholeHours) * 60)
  return `${wholeHours}h ${minutes}m`
}

// Helper function to get exclusivity badge color
const getExclusivityColor = (level: string): string => {
  switch (level) {
    case "undiscovered":
      return "bg-emerald-400/20 text-emerald-400"
    case "emerging":
      return "bg-blue-400/20 text-blue-400"
    case "popular":
      return "bg-fuchsia-400/20 text-fuchsia-400" // Updated to match the new color
    case "mainstream":
      return "bg-purple-400/20 text-purple-400"
    default:
      return "bg-zinc-700 text-zinc-300"
  }
}

export const FilterPanel = ({ show, onClose, onApply, initialFilters }: FilterPanelProps) => {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters)

  // Reset filters when initialFilters change
  useEffect(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  // Update a specific filter
  const updateFilter = (key: keyof FilterOptions, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Toggle a filter value in an array
  const toggleArrayFilter = (key: "exclusivity" | "regions", value: string) => {
    setFilters((prev) => {
      const currentValues = prev[key]
      return {
        ...prev,
        [key]: currentValues.includes(value) ? currentValues.filter((v) => v !== value) : [...currentValues, value],
      }
    })
  }

  // Apply filters and close panel
  const handleApply = () => {
    onApply(filters)
  }

  // Reset filters to initial values
  const handleReset = () => {
    setFilters({
      maxFlightTime: 8,
      minSunshineHours: 6,
      exclusivity: [],
      regions: [],
    })
  }

  return (
    <Sheet open={show} onOpenChange={onClose}>
      <SheetContent className="bg-zinc-950 border-zinc-800 w-full sm:max-w-md p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 pb-4 border-b border-zinc-800">
            <SheetTitle className="text-zinc-100">Filter Destinations</SheetTitle>
          </SheetHeader>

          <ScrollArea className="flex-1 px-6 py-4 overflow-auto">
            <div className="space-y-6">
              {/* Exclusivity Filter - Moved to top for prominence */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-amber-400" />
                  <h3 className="text-base font-medium text-zinc-100">Acceptable for Your Status</h3>
                </div>

                <p className="text-sm text-zinc-400 italic">
                  Because not all destinations are worthy of your presence.
                </p>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center space-x-3 p-3 rounded-md bg-zinc-900 border border-zinc-800">
                    <Checkbox
                      id="undiscovered"
                      checked={filters.exclusivity.includes("undiscovered")}
                      onCheckedChange={() => toggleArrayFilter("exclusivity", "undiscovered")}
                      className="border-emerald-400/50"
                    />
                    <div className="flex flex-col">
                      <Label htmlFor="undiscovered" className="text-sm font-medium cursor-pointer">
                        Untouched Gem
                      </Label>
                      <span className="text-xs text-zinc-500">Your secret</span>
                    </div>
                    <Badge className="ml-auto bg-emerald-400/20 text-emerald-400">Elite</Badge>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-md bg-zinc-900 border border-zinc-800">
                    <Checkbox
                      id="emerging"
                      checked={filters.exclusivity.includes("emerging")}
                      onCheckedChange={() => toggleArrayFilter("exclusivity", "emerging")}
                      className="border-blue-400/50"
                    />
                    <div className="flex flex-col">
                      <Label htmlFor="emerging" className="text-sm font-medium cursor-pointer">
                        Hidden Secret
                      </Label>
                      <span className="text-xs text-zinc-500">Ahead of the curve</span>
                    </div>
                    <Badge className="ml-auto bg-blue-400/20 text-blue-400">Premium</Badge>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-md bg-zinc-900 border border-zinc-800">
                    <Checkbox
                      id="popular"
                      checked={filters.exclusivity.includes("popular")}
                      onCheckedChange={() => toggleArrayFilter("exclusivity", "popular")}
                      className="border-fuchsia-400/50" // Updated to match the new color
                    />
                    <div className="flex flex-col">
                      <Label htmlFor="popular" className="text-sm font-medium cursor-pointer">
                        Consensus Choice
                      </Label>
                      <span className="text-xs text-zinc-500">Acceptable company</span>
                    </div>
                    <Badge className="ml-auto bg-fuchsia-400/20 text-fuchsia-400">Standard</Badge>{" "}
                    {/* Updated to match the new color */}
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-md bg-zinc-900 border border-zinc-800">
                    <Checkbox
                      id="mainstream"
                      checked={filters.exclusivity.includes("mainstream")}
                      onCheckedChange={() => toggleArrayFilter("exclusivity", "mainstream")}
                      className="border-purple-400/50"
                    />
                    <div className="flex flex-col">
                      <Label htmlFor="mainstream" className="text-sm font-medium cursor-pointer">
                        Established Escape
                      </Label>
                      <span className="text-xs text-zinc-500">Familiar comfort</span>
                    </div>
                    <Badge className="ml-auto bg-purple-400/20 text-purple-400">Classic</Badge>
                  </div>
                </div>
              </div>

              <Separator className="bg-zinc-800" />

              {/* Flight Time Filter */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-zinc-400" />
                    <h3 className="text-sm font-medium text-zinc-100">Maximum Flight Time</h3>
                  </div>
                  <span className="text-sm text-zinc-400">{formatFlightTime(filters.maxFlightTime)}</span>
                </div>

                <Slider
                  value={[filters.maxFlightTime]}
                  min={1}
                  max={12}
                  step={0.5}
                  onValueChange={(value) => updateFilter("maxFlightTime", value[0])}
                  className="py-2"
                />

                <div className="flex justify-between text-xs text-zinc-500">
                  <span>1h</span>
                  <span>12h</span>
                </div>
              </div>

              <Separator className="bg-zinc-800" />

              {/* Sunshine Hours Filter */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SunMedium className="h-4 w-4 text-orange-500" /> {/* Updated to burning orange */}
                    <h3 className="text-sm font-medium text-zinc-100">Minimum Sunshine</h3>
                  </div>
                  <span className="text-sm text-zinc-400">{filters.minSunshineHours} hours/day</span>
                </div>

                <Slider
                  value={[filters.minSunshineHours]}
                  min={0}
                  max={12}
                  step={1}
                  onValueChange={(value) => updateFilter("minSunshineHours", value[0])}
                  className="py-2"
                />

                <div className="flex justify-between text-xs text-zinc-500">
                  <span>0h</span>
                  <span>12h</span>
                </div>
              </div>

              <Separator className="bg-zinc-800" />

              {/* Region Filter */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-zinc-400" />
                  <h3 className="text-sm font-medium text-zinc-100">Regions</h3>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="europe"
                      checked={filters.regions.includes("Europe")}
                      onCheckedChange={() => toggleArrayFilter("regions", "Europe")}
                    />
                    <Label htmlFor="europe" className="text-sm font-normal cursor-pointer">
                      Europe
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="asia"
                      checked={filters.regions.includes("Asia")}
                      onCheckedChange={() => toggleArrayFilter("regions", "Asia")}
                    />
                    <Label htmlFor="asia" className="text-sm font-normal cursor-pointer">
                      Asia
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="americas"
                      checked={filters.regions.includes("Americas")}
                      onCheckedChange={() => toggleArrayFilter("regions", "Americas")}
                    />
                    <Label htmlFor="americas" className="text-sm font-normal cursor-pointer">
                      Americas
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="africa"
                      checked={filters.regions.includes("Africa")}
                      onCheckedChange={() => toggleArrayFilter("regions", "Africa")}
                    />
                    <Label htmlFor="africa" className="text-sm font-normal cursor-pointer">
                      Africa
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="oceania"
                      checked={filters.regions.includes("Oceania")}
                      onCheckedChange={() => toggleArrayFilter("regions", "Oceania")}
                    />
                    <Label htmlFor="oceania" className="text-sm font-normal cursor-pointer">
                      Oceania
                    </Label>
                  </div>
                </div>
              </div>

              {/* Add padding at the bottom to ensure buttons are visible when scrolling */}
              <div className="h-24 md:h-0"></div>
            </div>
          </ScrollArea>

          {/* Action buttons at the bottom */}
          <div className="p-6 border-t border-zinc-800 mt-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={handleReset}
                className="w-full sm:w-auto bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
              >
                Reset
              </Button>
              <Button onClick={handleApply} className="w-full sm:w-auto bg-amber-400 text-zinc-950 hover:bg-amber-300">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
