"use client"

import { useEffect, useState } from "react"

export function Copyright() {
  const [year, setYear] = useState<number>(2026) // Default fallback matching current year

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return <span>&copy; {year} Currencies.online. All rights reserved.</span>
}
