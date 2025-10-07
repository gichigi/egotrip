"use client"

import { motion } from "framer-motion"
import { MapPin, Loader2 } from "lucide-react"

interface LocationLoadingProps {
  message?: string
}

export function LocationLoading({ message = "Refining your coordinates..." }: LocationLoadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50 px-3 py-2 rounded-lg"
    >
      <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
      <MapPin className="h-4 w-4 text-amber-500" />
      <span>{message}</span>
    </motion.div>
  )
}
