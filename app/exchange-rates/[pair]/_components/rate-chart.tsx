"use client"

import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import React, { useEffect, useState } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { generateHistory } from "@/lib/data"
import type { HistoryPoint } from "@/lib/historical-rates"

interface RateChartProps {
  rate: number
  fromCode: string
  toCode: string
  /** Pre-fetched server-side history. When omitted the chart fetches from /api/historical-rates. */
  historyData?: HistoryPoint[]
}

export function RateChart({
  rate,
  fromCode,
  toCode,
  historyData,
}: RateChartProps) {
  const [mounted, setMounted] = useState(false)
  const [fetchedData, setFetchedData] = useState<HistoryPoint[] | null>(null)
  const [isFetching, setIsFetching] = useState(false)

  // When server-side data is NOT provided (converter context), fetch client-side
  useEffect(() => {
    if (historyData && historyData.length > 0) return // already have data
    if (!fromCode || !toCode) return

    setIsFetching(true)
    setFetchedData(null)

    const url = `/api/historical-rates?from=${fromCode}&to=${toCode}&fallback=${rate}`
    fetch(url)
      .then((r) => r.json())
      .then((data: HistoryPoint[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setFetchedData(data)
        }
      })
      .catch(() => {
        // silently fall back to generated data
      })
      .finally(() => setIsFetching(false))
  }, [fromCode, toCode, rate, historyData])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Resolve which data to show (priority: server-side → client-fetched → generated)
  const chartData = React.useMemo(() => {
    if (historyData && historyData.length > 0) return historyData
    if (fetchedData && fetchedData.length > 0) return fetchedData
    return generateHistory(rate, 30)
  }, [historyData, fetchedData, rate])

  if (!mounted) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center rounded-lg border border-border bg-muted/20">
        <div className="animate-pulse text-muted-foreground text-sm">
          Loading Historical Chart...
        </div>
      </div>
    )
  }

  if (isFetching && !fetchedData) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center rounded-lg border border-border bg-muted/20">
        <div className="animate-pulse text-muted-foreground text-sm">
          Fetching Historical Data...
        </div>
      </div>
    )
  }

  const ratesArray = chartData.map((d) => d.rate)
  const minRate = Math.min(...ratesArray)
  const maxRate = Math.max(...ratesArray)
  const startRate = ratesArray[0]
  const endRate = ratesArray[ratesArray.length - 1]
  const rateDiff = endRate - startRate
  const isUp = rateDiff >= 0
  const percentChange = ((rateDiff / startRate) * 100).toFixed(2)

  return (
    <Card className="border border-border shadow-sm">
      <CardContent className="p-6">
        {/* Header stats */}
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
              {fromCode} to {toCode} Historical Trend (30 Days)
            </span>
            <div className="mt-0.5 font-bold text-foreground text-lg">
              1 {fromCode} = {endRate.toFixed(4)} {toCode}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 font-semibold text-xs ${isUp ? "bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"}`}
            >
              {isUp ? (
                <ArrowUpRight className="h-3.5 w-3.5" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5" />
              )}
              {isUp ? "+" : ""}
              {percentChange}% (30d)
            </span>
            <span className="text-muted-foreground text-xs">
              Min: {minRate.toFixed(3)} | Max: {maxRate.toFixed(3)}
            </span>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRatePair" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-primary, #10b981)"
                    stopOpacity={0.25}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-primary, #10b981)"
                    stopOpacity={0.01}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(156, 163, 175, 0.15)"
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{
                  fontSize: 10,
                  fill: "var(--color-muted-foreground, #6b7280)",
                }}
              />
              <YAxis
                domain={["auto", "auto"]}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.toFixed(2)}
                tick={{
                  fontSize: 10,
                  fill: "var(--color-muted-foreground, #6b7280)",
                }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    const data = payload[0].payload
                    return (
                      <div className="rounded-lg border border-border bg-popover p-3 shadow-xl backdrop-blur-md">
                        <p className="font-bold text-[10px] text-muted-foreground uppercase">
                          {data.date}
                        </p>
                        <p className="mt-1 font-bold text-foreground text-sm">
                          1 {fromCode} ={" "}
                          <span className="text-primary">
                            {data.rate.toFixed(4)}
                          </span>{" "}
                          {toCode}
                        </p>
                        <p className="mt-0.5 text-[10px] text-muted-foreground/85">
                          1 {toCode} = {data.inverseRate.toFixed(4)} {fromCode}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="var(--color-primary, #10b981)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRatePair)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
