"use client"

import { useState, useEffect } from "react"
import { Plane } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingInterstitialProps {
  onComplete: () => void
  minDuration?: number
}

export function LoadingInterstitial({ onComplete, minDuration = 6000 }: LoadingInterstitialProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [shouldComplete, setShouldComplete] = useState(false)

  const messages = [
    "Calculating optimal sunshine coefficients",
    "Cross-referencing flight paths with your schedule",
    "Ensuring all recommendations meet your standards",
    "Refining selections to match your sensibilities",
    "Curating destinations worthy of your consideration",
    "Analyzing atmospheric conditions for your approval",
    "Preparing sophisticated alternatives to your current location",
    "Verifying that each destination meets your standards",
    "Cross-referencing exclusivity with accessibility",
    "Finalizing selections for the discerning traveler"
  ]

  useEffect(() => {
    // Set timer for overall minimum duration
    const timer = setTimeout(() => {
      setShouldComplete(true)
    }, minDuration)

    return () => clearTimeout(timer)
  }, [minDuration])

  useEffect(() => {
    // Change message every 3 seconds to give enough time to read
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
    }, 3000)

    return () => clearInterval(messageInterval)
  }, [messages.length])

  // Only complete when both minimum duration has passed and current animation has finished
  useEffect(() => {
    if (shouldComplete) {
      onComplete()
    }
  }, [shouldComplete, onComplete])

  return (
    <div className="fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center z-50">
      <div className="max-w-md w-full px-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-12 flex items-center"
        >
          <Plane className="h-8 w-8 text-amber-400 mr-3" />
          <span className="text-2xl font-light text-zinc-100">EgoTrip</span>
        </motion.div>

        <div className="h-8 text-center mb-16">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMessageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              className="text-zinc-400"
            >
              {messages[currentMessageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Plane className="h-10 w-10 text-amber-400/50" />
        </motion.div>
      </div>
    </div>
  )
}
