"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function RefreshInterval() {
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh()
    }, 15000) // refresh every 15 seconds

    return () => clearInterval(interval)
  }, [router])

  return null
}
