"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { PractitionerPerformanceData } from "@/lib/types/dashboard"
import { Users, Award, Clock, TrendingUp } from "lucide-react"

interface PractitionerPerformanceChartProps {
  data: PractitionerPerformanceData[]
}

const chartConfig = {
  claimsCompleted: {
    label: "Claims Completed",
    color: "hsl(var(--chart-1))"
  },
  approvalRate: {
    label: "Approval Rate (%)",
    color: "hsl(var(--chart-3))"
  },
  qualityScore: {
    label: "Quality Score (%)",
    color: "hsl(var(--chart-2))"
  }
}

export function PractitionerPerformanceChart({ data }: PractitionerPerformanceChartProps) {
  // Generate unique ID for this chart instance
  const chartId = useMemo(() => `practitioner-chart-${Math.random().toString(36).substr(2, 9)}`, [])
  
  // Sort practitioners by claims completed
  const sortedData = [...data].sort((a, b) => b.claimsCompleted - a.claimsCompleted)
  
  // Get top performers
  const topPerformers = sortedData.slice(0, 5)
  
  // Calculate averages
  const avgClaimsCompleted = Math.round(data.reduce((sum, item) => sum + item.claimsCompleted, 0) / data.length)
  const avgApprovalRate = Math.round(data.reduce((sum, item) => sum + item.approvalRate, 0) / data.length)
  const avgQualityScore = Math.round(data.reduce((sum, item) => sum + item.qualityScore, 0) / data.length)
  const avgProcessingSpeed = Math.round(data.reduce((sum, item) => sum + item.avgProcessingSpeed, 0) / data.length)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Practitioner Performance Analysis
        </CardTitle>
        <p className="text-sm text-gray-600">
          Shows top 8 practitioners by number of claims completed. See detailed performance metrics below.
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart key={chartId} data={sortedData.slice(0, 8)} layout="horizontal" margin={{ left: 120, right: 30, top: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tick={{ fontSize: 12 }} label={{ value: 'Claims Completed', position: 'insideBottom', offset: -5 }} />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ fontSize: 11 }}
                width={110}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value, name) => {
                  if (name === 'claimsCompleted') {
                    return [`${value} claims`, 'Completed']
                  }
                  return [value, name]
                }}
              />
              
              <Bar 
                dataKey="claimsCompleted" 
                fill="var(--color-claimsCompleted)" 
                name="Claims Completed" 
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        {/* Performance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {avgClaimsCompleted}
            </div>
            <div className="text-sm text-gray-600">Avg Claims Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {avgApprovalRate}%
            </div>
            <div className="text-sm text-gray-600">Avg Approval Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {avgQualityScore}%
            </div>
            <div className="text-sm text-gray-600">Avg Quality Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {avgProcessingSpeed}
            </div>
            <div className="text-sm text-gray-600">Avg Processing Days</div>
          </div>
        </div>
        
        {/* Top Performers */}
        <div className="mt-6 pt-6 border-t">
          <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-4 h-4" />
            Top 5 Performers
          </h4>
          <div className="space-y-3">
            {topPerformers.slice(0, 5).map((practitioner, index) => (
              <div key={`performer-${practitioner.practitionerId}`} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-semibold text-sm">
                      #{index + 1}
                    </div>
                    <div className="font-medium text-gray-900">{practitioner.name}</div>
                  </div>
                  <div className="text-lg font-bold text-teal-600">{practitioner.claimsCompleted}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-green-600">{practitioner.approvalRate.toFixed(0)}%</div>
                    <div className="text-gray-600">Approval Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">{practitioner.avgProcessingSpeed.toFixed(0)} days</div>
                    <div className="text-gray-600">Avg Speed</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-purple-600">{practitioner.qualityScore.toFixed(0)}%</div>
                    <div className="text-gray-600">Quality Score</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Performance Insights */}
        <div className="mt-6 pt-6 border-t">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Performance Insights
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900">Highest Quality Score</div>
              <div className="text-lg font-semibold text-blue-600">
                {Math.max(...data.map(d => d.qualityScore)).toFixed(1)}%
              </div>
              <div className="text-sm text-blue-700">
                {data.find(d => d.qualityScore === Math.max(...data.map(d => d.qualityScore)))?.name}
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm font-medium text-green-900">Best Approval Rate</div>
              <div className="text-lg font-semibold text-green-600">
                {Math.max(...data.map(d => d.approvalRate)).toFixed(1)}%
              </div>
              <div className="text-sm text-green-700">
                {data.find(d => d.approvalRate === Math.max(...data.map(d => d.approvalRate)))?.name}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 