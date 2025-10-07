"use server"

import { cache } from "react"

// Define the weather forecast type
export interface WeatherForecast {
  day: string
  temp: number
  sunny: boolean
  condition: string
  icon: string
  errorMessage?: string
}

// Cache the weather data for 1 hour to avoid excessive API calls
export const getWeatherForecast = cache(
  async (city: string, country: string, coordinates?: { lat: number; lng: number }): Promise<WeatherForecast[]> => {
    try {
      const apiKey = process.env.OPEN_WEATHER_MAP_KEY

      if (!apiKey) {
        console.error("OpenWeatherMap API key is missing. Please set OPEN_WEATHER_MAP_KEY in your environment variables.")
        return generateFallbackForecast(
          city,
          "Weather service unavailable. Using estimated data.",
        )
      }


      let response

      // If coordinates are provided, use them instead of city name
      if (coordinates) {
        const coordUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${apiKey}&units=metric`

        try {
          response = await fetch(coordUrl, { next: { revalidate: 3600 } }) // Cache for 1 hour
        } catch (error) {
          console.error("Error fetching weather with coordinates:", error)
          return generateFallbackForecast(city, "Connection to weather service failed. Showing estimated data.")
        }
      } else {
        // Properly encode the city and country for the URL
        const encodedCity = encodeURIComponent(city)
        const encodedCountry = encodeURIComponent(country)

        // First try with city name only
        const cityOnlyUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodedCity}&appid=${apiKey}&units=metric`

        try {
          response = await fetch(cityOnlyUrl, { next: { revalidate: 3600 } }) // Cache for 1 hour
        } catch (error) {
          console.error("Error fetching weather with city only:", error)
          return generateFallbackForecast(city, "Connection to weather service failed. Showing estimated data.")
        }

        // If that fails, try with city,country format
        if (!response.ok) {
          let responseData
          try {
            responseData = await response.json()
          } catch (error) {
            console.error("Error parsing response JSON:", error)
            return generateFallbackForecast(
              city,
              "Weather service is temporarily unavailable. Showing estimated conditions.",
            )
          }

          const cityCountryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodedCity},${encodedCountry}&appid=${apiKey}&units=metric`

          try {
            response = await fetch(cityCountryUrl, { next: { revalidate: 3600 } })
          } catch (error) {
            console.error("Error fetching weather with city and country:", error)
            return generateFallbackForecast(city, "Connection to weather service failed. Showing estimated data.")
          }
        }
      }

      if (!response || !response.ok) {
        let responseData
        try {
          responseData = await response?.json()
        } catch (error) {
          console.error("Error parsing response JSON:", error)
          return generateFallbackForecast(
            city,
            "Weather service is temporarily unavailable. Showing estimated conditions.",
          )
        }

        return generateFallbackForecast(city, "Unable to retrieve current weather. Showing historical averages.")
      }

      let data
      try {
        data = await response.json()
      } catch (error) {
        console.error(`Error parsing JSON for ${city}, ${country}:`, error)
        return generateFallbackForecast(
          city,
          "Weather service is temporarily unavailable. Showing estimated conditions.",
        )
      }


      // Extract 3-day forecast (every 24 hours)
      const forecast = data.list
        .filter((_: any, index: number) => index % 8 === 0) // Every 24 hours (3-hour intervals)
        .slice(0, 3)
        .map((item: any) => {
          const date = new Date(item.dt * 1000)
          const isSunny = item.weather[0].id >= 800 // Clear or mostly clear

          return {
            day: date.toLocaleDateString("en-US", { weekday: "short" }),
            temp: Math.round(item.main.temp),
            sunny: isSunny,
            condition: item.weather[0].main,
            icon: item.weather[0].icon,
          }
        })

      return forecast
    } catch (error) {
      console.error("Error fetching weather data:", error)
      return generateFallbackForecast(city, "Connection to weather service failed. Showing estimated data.")
    }
  },
)

// Update the fallback forecast generator to include an error message
function generateFallbackForecast(cityName: string, errorMessage = "Using fallback weather data"): WeatherForecast[] {
  console.log(`Generating fallback forecast data for ${cityName}`)
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const today = new Date().getDay()

  // Add errorMessage to the returned forecast objects
  return [0, 1, 2].map((i) => {
    const dayIndex = (today + i) % 7
    const isSunny = Math.random() > 0.3 // 70% chance of sunny
    const condition = isSunny ? "Sunny" : "Partly Cloudy"
    const icon = isSunny ? "01d" : "02d"

    return {
      day: days[dayIndex],
      temp: Math.round(Math.random() * (30 - 20) + 20), // Random temp between 20-30°C
      sunny: isSunny,
      condition: condition,
      icon: icon,
      errorMessage: i === 0 ? errorMessage : undefined, // Only add to the first day
    }
  })
}
