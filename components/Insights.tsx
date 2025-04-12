"use client";
import { useState } from "react";
import {
  Send,
  MessageSquare,
  Link,
  ArrowRight,
  CreditCard,
  Wallet,
  ArrowUpIcon,
  ArrowDownIcon,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function Insights() {
  const [activeStatsTab, setActiveStatsTab] = useState<"byAge" | "byGender">(
    "byAge"
  );
  const [activePaymentTab, setActivePaymentTab] = useState<
    "reservation" | "food" | "upsell"
  >("reservation");

  const monthRange = "March 12, 2025 - April 10, 2025";

  // Chart data
  const ageData = [
    { name: "Children (00-14 years)", value: 5, color: "#f87171" },
    { name: "Youth (15-24 years)", value: 25, color: "#10b981" },
    { name: "Adults (25-35 years)", value: 45, color: "#fb923c" },
    { name: "Middle Aged (36-50 years)", value: 20, color: "#a3e635" },
    { name: "Seniors (50+ years)", value: 5, color: "#818cf8" },
  ];

  const genderData = [
    { name: "Male", value: 55, color: "#60a5fa" },
    { name: "Female", value: 42, color: "#f472b6" },
    { name: "Other", value: 3, color: "#a78bfa" },
  ];

  const paymentData = [
    { name: "Cash", value: 10, color: "#f87171" },
    { name: "Swipe", value: 5, color: "#10b981" },
    { name: "Hotel UPI", value: 7, color: "#fb923c" },
    { name: "Card", value: 38, color: "#84cc16" },
    { name: "UPI", value: 30, color: "#22d3ee" },
    { name: "Internet Banking", value: 5, color: "#fcd34d" },
    { name: "Wallet", value: 3, color: "#d1d5db" },
    { name: "Paylater", value: 2, color: "#60a5fa" },
  ];

  return (
    <div className=" space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<Send className="h-5 w-5 text-blue-500" />}
          label="Email Sent"
          value="2,436"
          trend="+12.5%"
          trendUp={true}
          color="bg-blue-50"
          hoverColor="hover:bg-blue-100"
        />
        <MetricCard
          icon={<Link className="h-5 w-5 text-purple-500" />}
          label="Email Link Opened"
          value="350"
          trend="+8.2%"
          trendUp={true}
          color="bg-purple-50"
          hoverColor="hover:bg-purple-100"
        />
        <MetricCard
          icon={<MessageSquare className="h-5 w-5 text-green-500" />}
          label="WhatsApp Sent"
          value="8,768"
          trend="+24.3%"
          trendUp={true}
          color="bg-green-50"
          hoverColor="hover:bg-green-100"
        />
        <MetricCard
          icon={<Link className="h-5 w-5 text-amber-500" />}
          label="WhatsApp Link Opened"
          value="452"
          trend="+6.7%"
          trendUp={true}
          color="bg-amber-50"
          hoverColor="hover:bg-amber-100"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Guest Stats Chart */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Guest Stats</CardTitle>
              <div className="flex items-center space-x-2">
                <CardDescription>{monthRange}</CardDescription>
                <button className="p-1 rounded hover:bg-accent">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeStatsTab}
              onValueChange={(v: string) =>
                setActiveStatsTab(v as "byAge" | "byGender")
              }
              className="mb-6"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="byAge">By Age</TabsTrigger>
                <TabsTrigger value="byGender">By Gender</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-wrap gap-3 mb-6">
              {(activeStatsTab === "byAge" ? ageData : genderData).map(
                (entry, index) => (
                  <Legend key={index} color={entry.color} label={entry.name} />
                )
              )}
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activeStatsTab === "byAge" ? ageData : genderData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    dataKey="value"
                  >
                    {(activeStatsTab === "byAge" ? ageData : genderData).map(
                      (entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      )
                    )}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Percentage"]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      borderRadius: "var(--radius)",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Payments Chart */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Payments</CardTitle>
              <div className="flex items-center space-x-2">
                <CardDescription>{monthRange}</CardDescription>
                <button className="p-1 rounded hover:bg-accent">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activePaymentTab}
              onValueChange={(v: string) =>
                setActivePaymentTab(v as "reservation" | "food" | "upsell")
              }
              className="mb-6"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="reservation">Reservation</TabsTrigger>
                <TabsTrigger value="food">Food</TabsTrigger>
                <TabsTrigger value="upsell">Upsell</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-wrap gap-3 mb-6">
              {paymentData.map((entry, index) => (
                <Legend key={index} color={entry.color} label={entry.name} />
              ))}
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    dataKey="value"
                  >
                    {paymentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Percentage"]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      borderRadius: "var(--radius)",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickStat
          icon={<CreditCard className="h-5 w-5 text-indigo-500" />}
          label="Average Order"
          value="$124.32"
          change="+12.5%"
          isPositive={true}
        />
        <QuickStat
          icon={<Wallet className="h-5 w-5 text-emerald-500" />}
          label="Total Revenue"
          value="$45,678"
          change="+8.2%"
          isPositive={true}
        />
        <QuickStat
          icon={<MessageSquare className="h-5 w-5 text-amber-500" />}
          label="Conversion Rate"
          value="5.16%"
          change="+0.8%"
          isPositive={true}
        />
        <QuickStat
          icon={<Send className="h-5 w-5 text-blue-500" />}
          label="Click Rate"
          value="14.38%"
          change="-2.1%"
          isPositive={false}
        />
      </div>
    </div>
  );
}

// Components
interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  color: string;
  hoverColor: string;
}

function MetricCard({
  icon,
  label,
  value,
  trend,
  trendUp,
  color,
  hoverColor,
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        "transition-all group hover:scale-[1.02]",
        color,
        hoverColor
      )}
    >
      <CardContent className="p-2">
        <div className="flex justify-between items-start">
          <div className="bg-background p-2 rounded-lg shadow-sm">{icon}</div>
          {trend && (
            <span
              className={cn(
                "text-xs font-medium px-2 py-1 rounded-full flex items-center",
                trendUp
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              )}
            >
              {trendUp ? (
                <ArrowUpIcon className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownIcon className="h-3 w-3 mr-1" />
              )}
              {trend}
            </span>
          )}
        </div>
        <h3 className="text-3xl font-bold mt-4 text-foreground group-hover:translate-x-1 transition-transform">
          {value}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{label}</p>
      </CardContent>
    </Card>
  );
}

interface LegendProps {
  color: string;
  label: string;
}

function Legend({ color, label }: LegendProps) {
  return (
    <div className="flex items-center space-x-2">
      <div
        className="h-3 w-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

interface QuickStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

function QuickStat({ icon, label, value, change, isPositive }: QuickStatProps) {
  return (
    <Card className="hover:shadow-md transition-all">
      <CardContent className="p-4 flex items-center space-x-4">
        <div className="bg-muted p-3 rounded-lg">{icon}</div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <div className="flex items-center mt-1">
            <span className="text-lg font-semibold">{value}</span>
            <span
              className={cn(
                "ml-2 text-xs",
                isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              {change}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
