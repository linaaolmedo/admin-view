"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ClaimsAgingData } from "@/lib/types/dashboard"
import { Clock, AlertTriangle, CheckCircle2, XCircle } from "lucide-react"

interface ClaimsAgingChartProps {
  data: ClaimsAgingData[]
}

const chartConfig = {
  days0to7: {
    label: "0-7 Days",
    color: "hsl(var(--chart-3))"
  },
  days8to14: {
    label: "8-14 Days",
    color: "hsl(var(--chart-1))"
  },
  days15to30: {
    label: "15-30 Days",
    color: "hsl(var(--chart-2))"
  },
  days31plus: {
    label: "31+ Days",
    color: "hsl(var(--chart-6))"
  },
  overdue: {
    label: "Overdue",
    color: "hsl(var(--chart-4))"
  }
}

export function ClaimsAgingChart({ data }: ClaimsAgingChartProps) {
  // Generate unique ID for this chart instance
  const chartId = useMemo(() => `claims-aging-chart-${Math.random().toString(36).substr(2, 9)}`, [])
  // Calculate totals and metrics
  const totalClaims = data.reduce((sum, item) => sum + item.total, 0)
  const totalOverdue = data.reduce((sum, item) => sum + item.overdue, 0)
  const totalOld = data.reduce((sum, item) => sum + item.days31plus, 0)
  const totalRecent = data.reduce((sum, item) => sum + item.days0to7, 0)
  
  const overdueRate = totalClaims > 0 ? (totalOverdue / totalClaims) * 100 : 0
  const recentRate = totalClaims > 0 ? (totalRecent / totalClaims) * 100 : 0

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Claims Aging Analysis
        </CardTitle>
        <p className="text-sm text-gray-600">
          How long claims have been in each status - Green is good, Red needs attention
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart key={chartId} data={data} margin={{ left: 10, top: 20, right: 30, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="status" 
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
              
              <Bar 
                dataKey="days0to7" 
                stackId="aging" 
                fill="var(--color-days0to7)" 
                name="0-7 Days"
              />
              <Bar 
                dataKey="days8to14" 
                stackId="aging" 
                fill="var(--color-days8to14)" 
                name="8-14 Days"
              />
              <Bar 
                dataKey="days15to30" 
                stackId="aging" 
                fill="var(--color-days15to30)" 
                name="15-30 Days"
              />
              <Bar 
                dataKey="days31plus" 
                stackId="aging" 
                fill="var(--color-days31plus)" 
                name="31+ Days"
              />
              <Bar 
                dataKey="overdue" 
                stackId="aging" 
                fill="var(--color-overdue)" 
                name="Overdue"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-3 rounded-sm"></div>
            <span>0-7 Days</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-1 rounded-sm"></div>
            <span>8-14 Days</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-2 rounded-sm"></div>
            <span>15-30 Days</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-6 rounded-sm"></div>
            <span>31+ Days</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-4 rounded-sm"></div>
            <span>Overdue</span>
          </div>
        </div>
        
        {/* Aging Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {totalClaims}
            </div>
            <div className="text-sm text-gray-600">Total Claims</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {recentRate.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Recent (0-7 days)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {totalOld}
            </div>
            <div className="text-sm text-gray-600">Aged (31+ days)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {overdueRate.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Overdue Rate</div>
          </div>
        </div>
        
        {/* Status Summary */}
        <div className="mt-6 pt-6 border-t">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Claims by Status</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item, index) => (
              <div key={`status-${item.status}-${index}`} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  {item.overdue > 0 && <AlertTriangle className="w-4 h-4 text-red-500" />}
                  <span className="font-medium text-gray-900">{item.status}</span>
                  <span className="text-lg font-bold text-gray-700">({item.total})</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-600">✓ Recent (0-7 days):</span>
                    <span className="font-semibold">{item.days0to7}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600">◦ Normal (8-30 days):</span>
                    <span className="font-semibold">{item.days8to14 + item.days15to30}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-600">⚠ Aging (31+ days):</span>
                    <span className="font-semibold">{item.days31plus}</span>
                  </div>
                  {item.overdue > 0 && (
                    <div className="flex justify-between">
                      <span className="text-red-600">🚨 Overdue:</span>
                      <span className="font-semibold text-red-600">{item.overdue}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Action Items */}
        <div className="mt-6 pt-6 border-t">
          <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Priority Actions
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-4 h-4 text-red-600" />
                <div className="text-sm font-medium text-red-900">Immediate Attention</div>
              </div>
              <div className="text-lg font-semibold text-red-600">
                {totalOverdue}
              </div>
              <div className="text-sm text-red-700">Overdue claims requiring immediate action</div>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <div className="text-sm font-medium text-amber-900">Monitor Closely</div>
              </div>
              <div className="text-lg font-semibold text-amber-600">
                {totalOld}
              </div>
              <div className="text-sm text-amber-700">Claims aging beyond 30 days</div>
            </div>
          </div>
        </div>
        
        {/* Performance Indicators */}
        <div className="mt-6 pt-6 border-t">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Performance Indicators</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <div className="text-sm">
                <div className="font-medium text-green-900">Healthy Pipeline</div>
                <div className="text-green-700">{recentRate.toFixed(0)}% claims under 7 days</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              <div className="text-sm">
                <div className="font-medium text-orange-900">Needs Attention</div>
                <div className="text-orange-700">{((totalOld / totalClaims) * 100).toFixed(0)}% claims over 30 days</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
              <XCircle className="w-4 h-4 text-red-600" />
              <div className="text-sm">
                <div className="font-medium text-red-900">Critical Issues</div>
                <div className="text-red-700">{overdueRate.toFixed(0)}% overdue claims</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 