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

      <main className="px-4 py-10 sm:py-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex px-3 py-1 text-xs font-medium bg-amber-400/10 text-amber-400 rounded-full">
              It's always sunny somewhere
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
              Visionaries need their vitamin D
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 max-w-xl">
              EgoTrip is designed specifically for the high-performing individual (like yourself, naturally).
              <br />
              <br />
              No more bouncing between the weather app and SkyScanner. No, no. We find the sunniest destinations in your
              immediate flight radius, so you can work on your tan and your big strategic plan, all at the same time.
            </p>

            <div className="pt-2 sm:pt-4">
              <Button
                className="w-full sm:w-auto rounded-none px-6 sm:px-8 py-5 sm:py-6 text-base bg-amber-400 text-zinc-950 hover:bg-amber-300"
                onClick={handleExploreClick}
              >
                Pivot to paradise
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="bg-zinc-900 p-6 sm:p-8 border border-zinc-800 mt-4 md:mt-0">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-amber-400"></div>
                <span className="text-amber-400 text-sm font-medium">SERVICES</span>
              </div>

              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-medium">Strategic Sunlight Allocation</h3>
                  <p className="text-sm sm:text-base text-zinc-400">
                    We understand that genius requires optimal lighting. Our algorithm finds the perfect balance of
                    sunshine and Wi-Fi strength.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-medium">Plausible Deniability</h3>
                  <p className="text-sm sm:text-base text-zinc-400">
                    Automated Slack messages and email responses that suggest deep work, not deep tans. Your team will
                    never know the difference.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-medium">Founder-Worthy Accommodations</h3>
                  <p className="text-sm sm:text-base text-zinc-400">
                    Properties vetted for both Instagram potential and the availability of standing desks. For
                    appearances, of course.
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
                Where "out of office" meets "out of excuses" and "strategic thinking" is best done with a cocktail and a
                view.
              </p>
            </div>

            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-zinc-300 font-medium mb-3">Features</h4>
                <ul className="space-y-2 text-sm text-zinc-500">
                  <li>Sunshine Optimization</li>
                  <li>Flight Radius Analysis</li>
                  <li>Plausible Deniability</li>
                  <li>Workspace Alibis</li>
                </ul>
              </div>

              <div>
                <h4 className="text-zinc-300 font-medium mb-3">Resources</h4>
                <ul className="space-y-2 text-sm text-zinc-500">
                  <li>Excuse Generator</li>
                  <li>Slack Auto-Responder</li>
                  <li>Tan Concealer Guide</li>
                  <li>Strategic Thinking Poses</li>
                </ul>
              </div>

              <div>
                <h4 className="text-zinc-300 font-medium mb-3">Legal</h4>
                <ul className="space-y-2 text-sm text-zinc-500">
                  <li>Plausible Deniability</li>
                  <li>Alibi Verification</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-zinc-600 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} EgoTrip. Made with love in Portugal. All rights reserved while you pretend to
              work.
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
