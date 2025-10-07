"use client"

import { useState } from "react"
import { LoadingInterstitial } from "@/components/loading-interstitial"

export default function Loading() {
  const [showContent, setShowContent] = useState(false)

  return (
    <>
      {!showContent ? (
        <LoadingInterstitial onComplete={() => setShowContent(true)} minDuration={6000} />
      ) : (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center">
          <p className="text-zinc-500 mt-4 text-sm italic max-w-md text-center">
            Currently showing destinations based on Lisbon, Portugal.
          </p>
        </div>
      )}
    </>
  )
}
