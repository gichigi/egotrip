# EgoTrip 🌞✈️

> *For the discerning traveler who refuses to settle for pedestrian weather. Sophisticated destination recommendations with workspace intelligence for maintaining appearances.*

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

## Overview

EgoTrip is a sophisticated travel discovery platform for those who refuse to settle for pedestrian atmospheric conditions. We've prepared destinations within your immediate flight radius with weather that meets your standards. Naturally, we've included workspace intelligence for maintaining appearances.

### Key Features

- 🌍 **Your Closest Escapes**: Location-based recommendations within your flight radius
- ☀️ **Atmospheric Excellence**: Real-time weather data for superior climate selection
- ✈️ **Flight Time Intelligence**: Precise calculations for your strategic retreats
- 🏖️ **Refined Destinations**: Curated properties that understand sophistication
- 🎭 **Executive Arrangements**: Pre-crafted alibis for maintaining professional appearances
- 🌙 **Dark/Light Mode**: Work in your preferred aesthetic
- 📱 **Responsive Design**: Perfect for planning escapes on any device
- 📱 **PWA Support**: Install as a mobile app for on-the-go planning

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gichigi/egotrip.git
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
   
   Create a `.env` file and add your OpenWeatherMap API key:
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
4. Add it to your `.env` file

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
├── lib/                   # Utility functions
├── public/                # Static assets
│   ├── images/            # Destination images
│   ├── manifest.json      # PWA manifest
│   ├── robots.txt         # SEO crawling rules
│   ├── sitemap.xml        # SEO sitemap
│   ├── og-image.svg       # Social media preview
│   ├── twitter-image.svg  # Twitter card image
│   └── favicon files      # App icons and favicons
└── scripts/               # Utility scripts
```

## Key Components

### Weather Integration
- **Real-time data**: Fetches current weather and 3-day forecasts
- **Fallback system**: Graceful degradation when API is unavailable
- **Caching**: 1-hour cache to minimize API calls
- **Error handling**: User-friendly fallback data

### Location Services
- **Geolocation**: Automatic user location detection
- **IP-based fallback**: Sophisticated location detection
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

EgoTrip maintains a sophisticated, travel agent-focused tone. See [BRAND_VOICE.md](./BRAND_VOICE.md) for detailed guidelines on the elite travel agent archetype.

## Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Add environment variables** in the Vercel dashboard
3. **Deploy automatically** on every push to main

**Live Demo**: [egotrip.vercel.app](https://egotrip.vercel.app)

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## SEO & Social Media

### Built-in Features
- **Open Graph tags**: Professional social media previews
- **Twitter Cards**: Optimized for Twitter sharing
- **PWA support**: Install as mobile app
- **Sitemap**: Automatic SEO crawling
- **Robots.txt**: Search engine optimization
- **Favicons**: Complete icon set for all devices

### Social Media Preview
The app includes professionally designed social media preview images that automatically display when shared on:
- LinkedIn
- Twitter/X
- Facebook
- Discord
- Slack

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

- **Issues**: [GitHub Issues](https://github.com/gichigi/egotrip/issues)
- **Discussions**: [GitHub Discussions](https://github.com/gichigi/egotrip/discussions)

---

*Remember: "Weather... matters" - and now you can find exactly where that weather meets your standards.*

**Made with sophistication in Portugal. All rights reserved for those who refuse to settle for... pedestrian weather.** 🇵🇹
