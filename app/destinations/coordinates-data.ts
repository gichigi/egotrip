// Coordinates for popular sunny destinations
export interface DestinationCoordinates {
  id: number
  name: string
  country: string
  coordinates: {
    lat: number
    lng: number
  }
}

export const destinationCoordinates: DestinationCoordinates[] = [
  {
    id: 1,
    name: "Lisbon",
    country: "Portugal",
    coordinates: {
      lat: 38.7223,
      lng: -9.1393,
    },
  },
  {
    id: 2,
    name: "Bali",
    country: "Indonesia",
    coordinates: {
      lat: -8.4095,
      lng: 115.1889,
    },
  },
  {
    id: 3,
    name: "Tulum",
    country: "Mexico",
    coordinates: {
      lat: 20.2114,
      lng: -87.4654,
    },
  },
  {
    id: 4,
    name: "Mallorca",
    country: "Spain",
    coordinates: {
      lat: 39.6953,
      lng: 3.0176,
    },
  },
  {
    id: 5,
    name: "Cape Town",
    country: "South Africa",
    coordinates: {
      lat: -33.9249,
      lng: 18.4241,
    },
  },
  {
    id: 6,
    name: "Koh Samui",
    country: "Thailand",
    coordinates: {
      lat: 9.512,
      lng: 100.0136,
    },
  },
  {
    id: 7,
    name: "Santorini",
    country: "Greece",
    coordinates: {
      lat: 36.3932,
      lng: 25.4615,
    },
  },
  {
    id: 8,
    name: "Cancun",
    country: "Mexico",
    coordinates: {
      lat: 21.1619,
      lng: -86.8515,
    },
  },
  {
    id: 9,
    name: "Miami",
    country: "United States",
    coordinates: {
      lat: 25.7617,
      lng: -80.1918,
    },
  },
  {
    id: 10,
    name: "Dubai",
    country: "United Arab Emirates",
    coordinates: {
      lat: 25.2048,
      lng: 55.2708,
    },
  },
  {
    id: 11,
    name: "Maldives",
    country: "Maldives",
    coordinates: {
      lat: 3.2028,
      lng: 73.2207,
    },
  },
  {
    id: 12,
    name: "Phuket",
    country: "Thailand",
    coordinates: {
      lat: 7.9519,
      lng: 98.3381,
    },
  },
  {
    id: 13,
    name: "Ibiza",
    country: "Spain",
    coordinates: {
      lat: 38.9067,
      lng: 1.4206,
    },
  },
  {
    id: 14,
    name: "Maui",
    country: "United States",
    coordinates: {
      lat: 20.7984,
      lng: -156.3319,
    },
  },
  {
    id: 15,
    name: "Rio de Janeiro",
    country: "Brazil",
    coordinates: {
      lat: -22.9068,
      lng: -43.1729,
    },
  },
  {
    id: 16,
    name: "Marrakech",
    country: "Morocco",
    coordinates: {
      lat: 31.6295,
      lng: -7.9811,
    },
  },
  {
    id: 17,
    name: "Sydney",
    country: "Australia",
    coordinates: {
      lat: -33.8688,
      lng: 151.2093,
    },
  },
  {
    id: 18,
    name: "Amalfi Coast",
    country: "Italy",
    coordinates: {
      lat: 40.6333,
      lng: 14.6029,
    },
  },
  {
    id: 19,
    name: "Seychelles",
    country: "Seychelles",
    coordinates: {
      lat: -4.6796,
      lng: 55.492,
    },
  },
  {
    id: 20,
    name: "Bora Bora",
    country: "French Polynesia",
    coordinates: {
      lat: -16.5004,
      lng: -151.7415,
    },
  },
]
