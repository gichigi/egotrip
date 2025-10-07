"use client"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Plane, Globe, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  const router = useRouter()

  const handleExploreClick = () => {
    router.push("/destinations")
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="w-full py-4 sm:py-6 px-4 sm:px-8 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Plane className="h-5 w-5 text-amber-500 dark:text-amber-400" />
          <span className="font-medium tracking-tight">EgoTrip</span>
        </div>
        <ThemeToggle />
      </header>

      <main className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            <div className="inline-flex px-3 py-1 text-xs font-medium bg-zinc-100 text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-400 rounded-full">
              For the discerning traveler
            </div>

            <h1 className="heading-primary">
              For those who find bad weather rather... unacceptable.
            </h1>

            <p className="body-large text-zinc-400 max-w-2xl">
              EgoTrip identifies the sunniest escapes within your immediate flight radius. Naturally.
            </p>

            <div className="pt-4 sm:pt-6">
              <Button
                className="w-full sm:w-auto rounded-none px-8 sm:px-10 py-6 sm:py-7 text-lg sm:text-xl bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-colors"
                onClick={handleExploreClick}
              >
                Secure your escape
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="bg-zinc-900 p-6 sm:p-8 lg:p-10 border border-zinc-800 mt-8 lg:mt-0">
            <div className="space-y-6 lg:space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-amber-400"></div>
                <span className="label text-amber-400">SERVICES</span>
              </div>

              <div className="space-y-8 lg:space-y-10">
                <div className="space-y-3">
                  <h3 className="heading-tertiary">Weather Intelligence</h3>
                  <p className="body-normal text-zinc-400">
                    We've eliminated the pedestrian process of cross-referencing weather apps. Instead, we present destinations with weather that meets your standards.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="heading-tertiary">Flight Radius Analysis</h3>
                  <p className="body-normal text-zinc-400">
                    Naturally, we calculate destinations within your immediate flight radius. No more settling for whatever escapes your current location provides.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="heading-tertiary">Workspace Intelligence</h3>
                  <p className="body-normal text-zinc-400">
                    Curated workspaces with Wi-Fi ratings and pre-crafted alibis. The sophisticated traveler requires both connectivity and... plausible deniability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 mb-12 sm:mb-16 border-t border-zinc-800 pt-8 sm:pt-10">
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-zinc-500 text-xs sm:text-sm uppercase tracking-wider">As seen advertised in</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center">
            <div className="flex justify-center">
              <div className="text-zinc-600 font-serif italic text-base sm:text-xl">The Founder's Ego</div>
            </div>
            <div className="flex justify-center">
              <div className="text-zinc-600 font-mono text-base sm:text-lg tracking-tight">BURN.RATE</div>
            </div>
            <div className="flex justify-center">
              <div className="text-zinc-600 font-sans font-bold text-base sm:text-xl">
                <span className="text-amber-400">Sun</span>Seeker<span className="text-xs align-top">™</span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="text-zinc-600 font-serif text-base sm:text-xl">Plausible Deniability</div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Plane className="h-5 w-5 text-amber-400" />
                <span className="font-medium tracking-tight">EgoTrip</span>
              </div>
              <p className="text-zinc-500 text-sm">
                For the discerning traveler who understands that weather is non-negotiable. We've prepared sophisticated alternatives for those who refuse to settle for pedestrian atmospheric conditions.
              </p>
            </div>

            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-zinc-300 font-medium mb-3">Our Services</h4>
                <ul className="space-y-2 text-sm text-zinc-500">
                  <li>Weather Intelligence</li>
                  <li>Flight Radius Analysis</li>
                  <li>Workspace Intelligence</li>
                  <li>Atmospheric Standards</li>
                </ul>
              </div>

              <div>
                <h4 className="text-zinc-300 font-medium mb-3">For the Sophisticated</h4>
                <ul className="space-y-2 text-sm text-zinc-500">
                  <li>Curated Destinations</li>
                  <li>Wi-Fi Ratings</li>
                  <li>Pre-crafted Alibis</li>
                  <li>Exclusive Access</li>
                </ul>
              </div>

              <div>
                <h4 className="text-zinc-300 font-medium mb-3">Discretion</h4>
                <ul className="space-y-2 text-sm text-zinc-500">
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Plausible Deniability</li>
                  <li>Confidentiality</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-zinc-600 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} EgoTrip. Curated in Portugal for the discerning traveler. All rights reserved for those who refuse to settle for... pedestrian weather.
            </p>

            <div className="flex space-x-6">
              <a href="https://x.com/tahigichigi" target="_blank" rel="noopener noreferrer">
                <Globe className="h-5 w-5 text-zinc-600 hover:text-amber-400 cursor-pointer" />
              </a>
              <Shield className="h-5 w-5 text-zinc-600 hover:text-amber-400 cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
