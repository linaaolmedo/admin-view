"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { FinancialImpactData } from "@/lib/types/dashboard"
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react"

interface FinancialImpactChartProps {
  data: FinancialImpactData[]
  timeRange: string
}

const chartConfig = {
  totalClaimValue: {
    label: "Total Claim Value",
    color: "hsl(var(--chart-6))"
  },
  approvedValue: {
    label: "Approved Value",
    color: "hsl(var(--chart-3))"
  },
  paidValue: {
    label: "Paid Value",
    color: "hsl(var(--chart-1))"
  },
  revenueRealized: {
    label: "Revenue Realized",
    color: "hsl(var(--chart-1))"
  },
  pendingValue: {
    label: "Pending Value",
    color: "hsl(var(--chart-2))"
  }
}

export function FinancialImpactChart({ data, timeRange }: FinancialImpactChartProps) {
  // Generate unique ID for this chart instance
  const chartId = useMemo(() => `financial-impact-chart-${Math.random().toString(36).substr(2, 9)}`, [])
  
  // Filter data based on time range
  const filteredData = data.slice(-getMonthsFromTimeRange(timeRange))
  
  // Calculate totals and averages
  const totalClaimValue = filteredData.reduce((sum, item) => sum + item.totalClaimValue, 0)
  const totalRevenueRealized = filteredData.reduce((sum, item) => sum + item.revenueRealized, 0)
  const totalPendingValue = filteredData.reduce((sum, item) => sum + item.pendingValue, 0)
  const totalRejectedValue = filteredData.reduce((sum, item) => sum + item.rejectedValue, 0)
  
  const avgClaimValue = Math.round(filteredData.reduce((sum, item) => sum + item.averageClaimValue, 0) / filteredData.length)
  const revenueRealizationRate = totalClaimValue > 0 ? (totalRevenueRealized / totalClaimValue) * 100 : 0

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Claims Financial Impact Analysis
        </CardTitle>
        <p className="text-sm text-gray-600">
          Shows total claim value (light), actual payments received (dark), and pending amounts (medium) over time.
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart key={chartId} data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={70}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value, name) => [
                  `$${Number(value).toLocaleString()}`,
                  name
                ]}
              />
              
              <Area
                type="monotone"
                dataKey="totalClaimValue"
                stroke="var(--color-totalClaimValue)"
                fill="var(--color-totalClaimValue)"
                fillOpacity={0.1}
                name="Total Claim Value"
              />
              <Area
                type="monotone"
                dataKey="paidValue"
                stroke="var(--color-paidValue)"
                fill="var(--color-paidValue)"
                fillOpacity={0.6}
                name="Paid Value"
              />
              <Area
                type="monotone"
                dataKey="pendingValue"
                stroke="var(--color-pendingValue)"
                fill="var(--color-pendingValue)"
                fillOpacity={0.4}
                name="Pending Value"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        {/* Financial Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              ${(totalClaimValue / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-600">Total Claim Value</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              ${(totalRevenueRealized / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-600">Revenue Realized</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              ${(totalPendingValue / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-600">Value at Risk</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {revenueRealizationRate.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Realization Rate</div>
          </div>
        </div>
        
        {/* Financial Insights */}
        <div className="mt-6 pt-6 border-t">
          <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Financial Insights
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <div className="text-sm font-medium text-green-900">Revenue Performance</div>
              </div>
              <div className="text-lg font-semibold text-green-600">
                ${avgClaimValue.toLocaleString()}
              </div>
              <div className="text-sm text-green-700">Average Claim Value</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <div className="text-sm font-medium text-orange-900">Financial Risk</div>
              </div>
              <div className="text-lg font-semibold text-orange-600">
                ${(totalRejectedValue / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-orange-700">Lost Revenue (Rejections)</div>
            </div>
          </div>
        </div>
        
        {/* Monthly Breakdown */}
        <div className="mt-6 pt-6 border-t">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Latest Month Breakdown</h4>
          {filteredData.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { 
                  label: 'Total Claims', 
                  value: filteredData[filteredData.length - 1].totalClaimValue,
                  color: 'text-blue-600',
                  bg: 'bg-blue-50'
                },
                { 
                  label: 'Approved', 
                  value: filteredData[filteredData.length - 1].approvedValue,
                  color: 'text-green-600',
                  bg: 'bg-green-50'
                },
                { 
                  label: 'Paid', 
                  value: filteredData[filteredData.length - 1].paidValue,
                  color: 'text-purple-600',
                  bg: 'bg-purple-50'
                },
                { 
                  label: 'Pending', 
                  value: filteredData[filteredData.length - 1].pendingValue,
                  color: 'text-orange-600',
                  bg: 'bg-orange-50'
                }
              ].map((item, index) => (
                <div key={`financial-metric-${index}`} className={`p-3 ${item.bg} rounded-lg`}>
                  <div className={`text-sm font-medium ${item.color}`}>
                    ${(item.value / 1000).toFixed(0)}K
                  </div>
                  <div className="text-xs text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          )}
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