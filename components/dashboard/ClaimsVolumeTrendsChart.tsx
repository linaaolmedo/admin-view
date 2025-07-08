"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ClaimsVolumeData } from "@/lib/types/dashboard"
import { TrendingUp, TrendingDown } from "lucide-react"

interface ClaimsVolumeTrendsChartProps {
  data: ClaimsVolumeData[]
  timeRange: string
}

const chartConfig = {
  totalClaims: {
    label: "Total Claims",
    color: "hsl(var(--chart-1))"
  },
  speechTherapy: {
    label: "Speech Therapy",
    color: "hsl(var(--chart-1))"
  },
  occupationalTherapy: {
    label: "Occupational Therapy",
    color: "hsl(var(--chart-3))"
  },
  physicalTherapy: {
    label: "Physical Therapy",
    color: "hsl(var(--chart-2))"
  },
  psychology: {
    label: "Psychology",
    color: "hsl(var(--chart-5))"
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-6))"
  }
}

export function ClaimsVolumeTrendsChart({ data, timeRange }: ClaimsVolumeTrendsChartProps) {
  // Generate unique ID for this chart instance
  const chartId = useMemo(() => `claims-volume-chart-${Math.random().toString(36).substr(2, 9)}`, [])
  
  // Filter data based on time range
  const filteredData = data.slice(-getMonthsFromTimeRange(timeRange))
  
  // Calculate overall growth rate
  const firstMonth = filteredData[0]
  const lastMonth = filteredData[filteredData.length - 1]
  const overallGrowthRate = firstMonth && lastMonth 
    ? ((lastMonth.totalClaims - firstMonth.totalClaims) / firstMonth.totalClaims) * 100
    : 0

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          Monthly Claims Volume Trends
          {overallGrowthRate > 0 ? (
            <TrendingUp className="w-5 h-5 text-green-500" />
          ) : (
            <TrendingDown className="w-5 h-5 text-red-500" />
          )}
        </CardTitle>
        <p className="text-sm text-gray-600">
          Tracks monthly claims for different therapy types. Thick line shows total claims, thinner lines show individual services.
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart key={chartId} data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={70}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value, name) => [value, name]}
              />
              <Legend />
              
              <Line
                type="monotone"
                dataKey="totalClaims"
                stroke="var(--color-totalClaims)"
                strokeWidth={4}
                dot={{ fill: "var(--color-totalClaims)", strokeWidth: 2, r: 5 }}
                name="Total Claims"
              />
              <Line
                type="monotone"
                dataKey="speechTherapy"
                stroke="var(--color-speechTherapy)"
                strokeWidth={2}
                dot={{ fill: "var(--color-speechTherapy)", strokeWidth: 2, r: 3 }}
                name="Speech Therapy"
              />
              <Line
                type="monotone"
                dataKey="occupationalTherapy"
                stroke="var(--color-occupationalTherapy)"
                strokeWidth={2}
                dot={{ fill: "var(--color-occupationalTherapy)", strokeWidth: 2, r: 3 }}
                name="Occupational Therapy"
              />
              <Line
                type="monotone"
                dataKey="physicalTherapy"
                stroke="var(--color-physicalTherapy)"
                strokeWidth={2}
                dot={{ fill: "var(--color-physicalTherapy)", strokeWidth: 2, r: 3 }}
                name="Physical Therapy"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        {/* Growth Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-6 border-t">
          <div className="text-center">
            <div className={`text-2xl font-bold ${overallGrowthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {overallGrowthRate >= 0 ? '+' : ''}{overallGrowthRate.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Overall Growth</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(filteredData.reduce((sum, item) => sum + item.speechTherapy, 0) / filteredData.length)}
            </div>
            <div className="text-sm text-gray-600">Avg Speech Therapy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(filteredData.reduce((sum, item) => sum + item.totalClaims, 0) / filteredData.length)}
            </div>
            <div className="text-sm text-gray-600">Monthly Average</div>
          </div>
        </div>
        
        {/* Service Type Breakdown */}
        <div className="mt-6 pt-6 border-t">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Top Service Types (Latest Month)</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {lastMonth && [
              { label: 'Total Claims', value: lastMonth.totalClaims, color: 'bg-chart-1', desc: 'All services combined' },
              { label: 'Speech Therapy', value: lastMonth.speechTherapy, color: 'bg-chart-1', desc: 'Communication services' },
              { label: 'Occupational Therapy', value: lastMonth.occupationalTherapy, color: 'bg-chart-3', desc: 'Daily living skills' },
              { label: 'Physical Therapy', value: lastMonth.physicalTherapy, color: 'bg-chart-2', desc: 'Movement & mobility' }
            ].map((item, index) => (
              <div key={`service-type-${index}`} className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 ${item.color} rounded-sm`}></div>
                  <span className="text-sm font-medium text-gray-900">{item.label}</span>
                </div>
                <div className="text-lg font-bold text-gray-900">{item.value}</div>
                <div className="text-xs text-gray-600">{item.desc}</div>
              </div>
            ))}
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