import type { NextRequest } from "next/server"
import { LRUCache } from "lru-cache"

type RateLimitOptions = {
  uniqueTokenPerInterval?: number
  interval?: number
}

export default function rateLimit(options?: RateLimitOptions) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  })

  return {
    check: (request: NextRequest, limit: number, token: string) =>
      new Promise<{ success: boolean; limit: number; remaining: number; reset: Date }>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0]
        const currentUsage = tokenCount[0] || 0
        const date = new Date()
        const resetTime = new Date(date.getTime() + (options?.interval || 60000))

        if (currentUsage >= limit) {
          return resolve({
            success: false,
            limit,
            remaining: 0,
            reset: resetTime,
          })
        }

        tokenCount[0] = currentUsage + 1
        tokenCache.set(token, tokenCount)

        return resolve({
          success: true,
          limit,
          remaining: Math.max(0, limit - currentUsage - 1),
          reset: resetTime,
        })
      }),
  }
}
