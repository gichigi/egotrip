// Types for the destinations page

// City data type
export interface City {
  id: number
  name: string
  country: string
  region: string
  imageUrl: string
  escapeImageUrl: string
  price: number
  flightTime: number
  sunshineHours: number
  exclusivity: "undiscovered" | "emerging" | "popular" | "mainstream"
  description: string
  bestTimeToVisit: string
  currency: string
  forecast: WeatherForecast[]
  founderHistory: string[]
  workspaces?: Workspace[]
  alibis?: string[]
}

// Weather forecast type
export interface WeatherForecast {
  day: string
  temp: number
  sunny: boolean
  condition: string
  icon?: string
}

// Workspace type
export interface Workspace {
  name: string
  type: string
  wifiRating: number
}

// Filter options type
export interface FilterOptions {
  maxFlightTime: number
  minSunshineHours: number
  exclusivity: string[]
  regions: string[]
}

// Props for the CityCard component
export interface CityCardProps {
  city: City
  isSelected: boolean
  onSelect: () => void
  onClose: () => void
  usingFallbackWeather?: boolean
}

// Props for the FilterPanel component
export interface FilterPanelProps {
  show: boolean
  onClose: () => void
  onApply: (filters: FilterOptions) => void
  initialFilters: FilterOptions
}

// Props for the RedirectWarning component
export interface RedirectWarningProps {
  city: City
  onClose: () => void
}

// Props for the ExclusivityBadge component
export interface ExclusivityBadgeProps {
  level: "undiscovered" | "emerging" | "popular" | "mainstream"
}

// Props for the WeatherForecast component
export interface WeatherForecastProps {
  forecast: WeatherForecast[]
}
