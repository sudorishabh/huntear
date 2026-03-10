"use client";

import { useMemo } from "react";
import { DemoJobCard } from "./job-tracking";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { 
  AreaChart, Area, 
  LineChart, Line, 
  RadialBarChart, RadialBar, 
  CartesianGrid, XAxis, YAxis 
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Simulated activity data roughly shaped like the glowing double-curve chart
const activityData = [
  { date: "Apr 2", desktop: 10, mobile: 5 },
  { date: "Apr 7", desktop: 30, mobile: 18 },
  { date: "Apr 12", desktop: 15, mobile: 8 },
  { date: "Apr 17", desktop: 45, mobile: 25 },
  { date: "Apr 22", desktop: 20, mobile: 12 },
  { date: "Apr 27", desktop: 35, mobile: 20 },
  { date: "May 2", desktop: 10, mobile: 5 },
  { date: "May 7", desktop: 65, mobile: 35 },
  { date: "May 12", desktop: 25, mobile: 15 },
  { date: "May 17", desktop: 45, mobile: 28 },
  { date: "May 23", desktop: 15, mobile: 8 },
  { date: "May 29", desktop: 60, mobile: 32 },
  { date: "Jun 3",  desktop: 25, mobile: 12 },
  { date: "Jun 8",  desktop: 80, mobile: 45 },
  { date: "Jun 13", desktop: 35, mobile: 18 },
  { date: "Jun 18", desktop: 55, mobile: 28 },
  { date: "Jun 23", desktop: 20, mobile: 10 },
  { date: "Jun 30", desktop: 85, mobile: 48 },
];

export function AnalyticsTab({ columns }: { columns: Record<string, DemoJobCard[]> }) {
  // 1. Job Activity Trend (Area Chart) matches the visual request
  const areaConfig = {
    desktop: { label: "Profile Views", color: "#93c5fd" },   // Lighter top line
    mobile: { label: "Applications", color: "#2563eb" },     // Darker bottom line
  } satisfies ChartConfig;

  // 2. Average Match Percent by Stage (Line Chart)
  const matchData = useMemo(() => {
    const calculateAvg = (key: string) => {
      const arr = columns[key] || [];
      if (arr.length === 0) return 0;
      const sum = arr.reduce((acc, job) => acc + job.matchPercent, 0);
      return Math.round(sum / arr.length);
    };

    return [
      { stage: "Interested", avgMatch: calculateAvg("interested") },
      { stage: "Applied", avgMatch: calculateAvg("applied") },
      { stage: "Interviewing", avgMatch: calculateAvg("interviewing") },
      { stage: "Offers", avgMatch: calculateAvg("offers") },
    ];
  }, [columns]);

  const matchConfig = {
    avgMatch: { label: "Avg Match %", color: "#60a5fa" }, // a blue shade
  } satisfies ChartConfig;

  // 3. Job Status Funnel (Radial Bar Chart)
  const radialData = useMemo(() => {
    return [
      { status: "Interested", count: columns["interested"]?.length || 0, fill: "#334155" },
      { status: "Applied", count: columns["applied"]?.length || 0, fill: "#3b82f6" },
      { status: "Interviewing", count: columns["interviewing"]?.length || 0, fill: "#2563eb" },
      { status: "Offers", count: columns["offers"]?.length || 0, fill: "#1d4ed8" },
    ].filter(d => d.count > 0);
  }, [columns]);

  const radialConfig = {
    count: { label: "Jobs" },
    interested: { label: "Interested", color: "#334155" },
    applied: { label: "Applied", color: "#3b82f6" },
    interviewing: { label: "Interviewing", color: "#2563eb" },
    offers: { label: "Offers", color: "#1d4ed8" },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col gap-6 pb-12 w-full max-w-full">
      {/* Chart 1: Activity Trend (Full Width Area Chart matching the picture exactly) */}
      <Card className="bg-[#111111] border-[#2E2E2E] text-white overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-medium">Activity Over Time</CardTitle>
          <CardDescription>Track your profile views vs applications</CardDescription>
        </CardHeader>
        <CardContent className="px-2 pt-0 sm:px-6">
          <ChartContainer config={areaConfig} className="h-[250px] w-full aspect-auto">
            <AreaChart data={activityData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#93c5fd" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#1e3a8a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} horizontal={true} stroke="#222" strokeDasharray="0" />
              <XAxis 
                dataKey="date" 
                tickLine={false} 
                axisLine={false} 
                stroke="#666" 
                fontSize={11} 
                tickMargin={8} 
                minTickGap={20} 
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                stroke="#666" 
                fontSize={11} 
                tickMargin={8} 
              />
              <ChartTooltip cursor={{ stroke: '#444', strokeWidth: 1 }} content={<ChartTooltipContent />} />
              {/* the main blue glowing area */}
              <Area 
                type="monotone" 
                dataKey="desktop" 
                stroke="#93c5fd" 
                strokeWidth={1.5} 
                fillOpacity={1} 
                fill="url(#fillDesktop)" 
                activeDot={{ r: 4, strokeWidth: 0, fill: "#93c5fd" }}
              />
              {/* the bottom solid blue line without fill */}
              <Area 
                type="monotone" 
                dataKey="mobile" 
                stroke="#2563eb" 
                strokeWidth={1.5} 
                fillOpacity={0} 
                activeDot={{ r: 4, strokeWidth: 0, fill: "#2563eb" }}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart 2: Match Consistency (Line Chart) */}
        <Card className="bg-[#111111] border-[#2E2E2E] text-white">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Average Match Score by Stage</CardTitle>
            <CardDescription>Line chart comparing match accuracy between stages</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={matchConfig} className="h-[250px] w-full">
              <LineChart data={matchData} margin={{ top: 20, right: 20, bottom: 0, left: -20 }}>
                <CartesianGrid vertical={false} stroke="#222" />
                <XAxis
                  dataKey="stage"
                  tickLine={false}
                  tickMargin={12}
                  axisLine={false}
                  stroke="#666"
                  fontSize={11}
                />
                <YAxis tickLine={false} axisLine={false} stroke="#666" fontSize={11} domain={[0, 100]} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="avgMatch" 
                  stroke="var(--color-avgMatch)" 
                  strokeWidth={2} 
                  dot={{ r: 4, fill: "var(--color-avgMatch)", strokeWidth: 0 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Chart 3: Pipeline Distribution (Radial Chart) */}
        <Card className="bg-[#111111] border-[#2E2E2E] text-white">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Job Pipeline Distribution</CardTitle>
            <CardDescription>Radial chart for funnel stages</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <ChartContainer config={radialConfig} className="h-[250px] w-full max-w-[280px]">
              <RadialBarChart 
                cx="50%" cy="50%" 
                innerRadius="30%" outerRadius="100%" 
                barSize={12} data={radialData}
                startAngle={180} endAngle={-180}
              >
                <RadialBar 
                  background={{ fill: "#222" }} 
                  cornerRadius={10} 
                  dataKey="count" 
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              </RadialBarChart>
            </ChartContainer>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-1 text-xs text-gray-400">
              {radialData.map(d => (
                <div key={d.status} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.fill }}></div>
                  <span>{d.status}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
