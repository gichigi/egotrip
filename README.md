# EgoTrip 🌞✈️

> *Find the sunniest destinations within your flight radius. For high-performing individuals who value both vitamin D and plausible deniability.*

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

## Overview

EgoTrip is a sophisticated travel discovery app designed for founders, executives, and high-performing individuals who want to "work remotely" in sunny destinations while maintaining the illusion of productivity. Because your thoughts deserve better weather than your office provides.

### Key Features

- 🌍 **Location-Based Recommendations**: Find destinations within your flight radius
- ☀️ **Sunshine Optimization**: Real-time weather data for optimal vitamin D intake
- ✈️ **Flight Time Calculations**: Know exactly how long your "strategic retreat" will take
- 🏖️ **Founder-Worthy Accommodations**: Properties vetted for both Instagram potential and standing desks
- 🎭 **Plausible Deniability**: Maintain professional appearances while enjoying paradise
- 🌙 **Dark/Light Mode**: Work in your preferred aesthetic
- 📱 **Responsive Design**: Perfect for planning escapes on any device

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/egotrip.git
   cd egotrip
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your OpenWeatherMap API key:
   ```env
   OPEN_WEATHER_MAP_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Setup

### OpenWeatherMap API

EgoTrip uses the OpenWeatherMap API for real-time weather data. To get started:

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Add it to your `.env.local` file

The free tier includes:
- 1,000 API calls per day
- 5-day weather forecast
- Current weather data

## Project Structure

```
egotrip/
├── app/                    # Next.js app directory
│   ├── actions/           # Server actions
│   │   └── weather.ts     # Weather API integration
│   ├── components/        # Reusable components
│   ├── context/           # React context providers
│   ├── destinations/       # Destinations page
│   │   ├── data.ts        # Static destination data
│   │   ├── types.ts       # TypeScript definitions
│   │   └── page.tsx       # Main destinations page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Shared UI components
│   └── ui/                # shadcn/ui components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── public/                # Static assets
│   └── images/            # Destination images
└── styles/                # Additional styles
```

## Key Components

### Weather Integration
- **Real-time data**: Fetches current weather and 3-day forecasts
- **Fallback system**: Graceful degradation when API is unavailable
- **Caching**: 1-hour cache to minimize API calls
- **Error handling**: User-friendly fallback data

### Location Services
- **Geolocation**: Automatic user location detection
- **Manual selection**: Fallback location picker
- **Flight calculations**: Distance and flight time estimates
- **Default fallback**: Lisbon, Portugal (because it's always sunny somewhere)

### Destination Data
- **20+ curated destinations**: From Bali to Bora Bora
- **Rich metadata**: Prices, exclusivity levels, workspaces, alibis
- **Filtering options**: Flight time, sunshine hours, price, region
- **Search functionality**: Find destinations by name or country

## Customization

### Adding New Destinations

1. **Update data file**: Add to `app/destinations/data.ts`
2. **Add coordinates**: Include in `app/destinations/coordinates-data.ts`
3. **Add images**: Place in `public/images/`
4. **Update types**: Ensure TypeScript compatibility

### Styling

The app uses Tailwind CSS with a custom design system:
- **Colors**: Amber accent, zinc grays, dark/light themes
- **Typography**: Inter font, various weights and sizes
- **Components**: shadcn/ui component library
- **Responsive**: Mobile-first design approach

### Brand Voice

EgoTrip maintains a sophisticated, tongue-in-cheek tone. See [BRAND_VOICE.md](./BRAND_VOICE.md) for detailed guidelines.

## Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Add environment variables** in the Vercel dashboard
3. **Deploy automatically** on every push to main

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## Contributing

We welcome contributions from fellow visionaries who understand the importance of strategic sunlight allocation.

### Development Setup

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Submit a pull request**

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended rules
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Clear commit messages

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **OpenWeatherMap** for weather data
- **shadcn/ui** for beautiful components
- **Next.js** for the amazing framework
- **All the founders** who inspired this tool for strategic escapes

## Support

Having trouble with your strategic planning? 

- **Issues**: [GitHub Issues](https://github.com/yourusername/egotrip/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/egotrip/discussions)
- **Email**: [your-email@example.com](mailto:your-email@example.com)

---

*Remember: "It's always sunny somewhere" - and now you can find exactly where that somewhere is.*

**Made with love in Portugal. All rights reserved while you pretend to work.** 🇵🇹
