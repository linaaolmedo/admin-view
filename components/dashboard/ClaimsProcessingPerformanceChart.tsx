"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ClaimsProcessingData } from "@/lib/types/dashboard"

interface ClaimsProcessingPerformanceChartProps {
  data: ClaimsProcessingData[]
  timeRange: string
}

const chartConfig = {
  totalClaims: {
    label: "Total Claims",
    color: "hsl(var(--chart-1))"
  },
  pendingClaims: {
    label: "Pending",
    color: "hsl(var(--chart-2))"
  },
  approvedClaims: {
    label: "Approved",
    color: "hsl(var(--chart-3))"
  },
  rejectedClaims: {
    label: "Rejected",
    color: "hsl(var(--chart-4))"
  },
  paidClaims: {
    label: "Paid",
    color: "hsl(var(--chart-1))"
  },
  avgProcessingTime: {
    label: "Avg Processing Time (days)",
    color: "hsl(var(--chart-6))"
  }
}

export function ClaimsProcessingPerformanceChart({ data, timeRange }: ClaimsProcessingPerformanceChartProps) {
  // Generate unique ID for this chart instance
  const chartId = useMemo(() => `claims-processing-chart-${Math.random().toString(36).substr(2, 9)}`, [])
  
  // Filter data based on time range
  const filteredData = data.slice(-getMonthsFromTimeRange(timeRange))

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Claims Processing Performance Over Time
        </CardTitle>
        <p className="text-sm text-gray-600">
          Bars show claims volume by status each month. Blue line shows how many days claims take to process.
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart key={chartId} data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={70}
              />
              <YAxis yAxisId="left" orientation="left" tick={{ fontSize: 12 }} label={{ value: 'Claims Count', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} label={{ value: 'Processing Days', angle: 90, position: 'insideRight' }} />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value, name) => {
                  if (name === 'avgProcessingTime') {
                    return [`${Number(value).toFixed(1)} days`, 'Processing Time']
                  }
                  if (name === 'paidClaims') {
                    return [value, 'Paid']
                  }
                  if (name === 'approvedClaims') {
                    return [value, 'Approved']
                  }
                  if (name === 'pendingClaims') {
                    return [value, 'Pending']
                  }
                  if (name === 'rejectedClaims') {
                    return [value, 'Rejected']
                  }
                  return [value, name]
                }}
              />
              
              {/* Stacked Bar Chart for Claims Volume */}
              <Bar 
                yAxisId="left" 
                dataKey="paidClaims" 
                stackId="claims" 
                fill="var(--color-paidClaims)" 
                name="Paid"
              />
              <Bar 
                yAxisId="left" 
                dataKey="approvedClaims" 
                stackId="claims" 
                fill="var(--color-approvedClaims)" 
                name="Approved"
              />
              <Bar 
                yAxisId="left" 
                dataKey="pendingClaims" 
                stackId="claims" 
                fill="var(--color-pendingClaims)" 
                name="Pending"
              />
              <Bar 
                yAxisId="left" 
                dataKey="rejectedClaims" 
                stackId="claims" 
                fill="var(--color-rejectedClaims)" 
                name="Rejected"
              />
              
              {/* Line Chart for Processing Time */}
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="avgProcessingTime"
                stroke="var(--color-avgProcessingTime)"
                strokeWidth={3}
                dot={{ fill: "var(--color-avgProcessingTime)", strokeWidth: 2, r: 4 }}
                name="Processing Time"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-1 rounded-sm"></div>
            <span>Paid Claims</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-3 rounded-sm"></div>
            <span>Approved Claims</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-2 rounded-sm"></div>
            <span>Pending Claims</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-4 rounded-sm"></div>
            <span>Rejected Claims</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-6 rounded-sm"></div>
            <span>Processing Time</span>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {filteredData.reduce((sum, item) => sum + item.totalClaims, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Claims</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(filteredData.reduce((sum, item) => sum + item.completionRate, 0) / filteredData.length)}%
            </div>
            <div className="text-sm text-gray-600">Avg Completion Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(filteredData.reduce((sum, item) => sum + item.avgProcessingTime, 0) / filteredData.length)}
            </div>
            <div className="text-sm text-gray-600">Avg Processing Days</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(filteredData.reduce((sum, item) => sum + item.processingVelocity, 0) / filteredData.length)}
            </div>
            <div className="text-sm text-gray-600">Claims/Day</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function getMonthsFromTimeRange(timeRange: string): number {
  switch (timeRange) {
    case '30d': return 1
    case '3m': return 3
    case '6m': return 6
    case '1y': return 12
    case 'all': return 24
    default: return 12
  }
} 