import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  BarChart3,
  TrendingUp,
  CreditCard,
  PieChart,
} from "lucide-react";

interface DataPoint {
  date: string;
  totalPayment: number;
  bookingPayment: number;
  foodPayment: number;
  upsellPayment: number;
  total: number;
  cancelled: number;
}

interface CardStat {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: React.ReactNode;
}

export default function Performance() {
  const [paymentData, setPaymentData] = useState<DataPoint[]>([]);
  const [salesData, setSalesData] = useState<DataPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      const generateData = (): DataPoint[] => {
        const dates: Date[] = [];
        const currentDate = new Date("2025-03-12");
        const endDate = new Date("2025-04-10");

        while (currentDate <= endDate) {
          dates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates.map((date: Date) => {
          const dateString = date.toISOString().split("T")[0];
          return {
            date: dateString,
            totalPayment: Math.floor(Math.random() * 30000) + 2000,
            bookingPayment: Math.floor(Math.random() * 15000) + 1000,
            foodPayment: Math.floor(Math.random() * 8000) + 500,
            upsellPayment: Math.floor(Math.random() * 5000) + 200,
            total: Math.random(),
            cancelled: Math.random() * 0.3,
          };
        });
      };

      const data = generateData();
      setPaymentData(data);
      setSalesData(data);
      setIsLoading(false);
    }, 800);
  }, []);

  // Format date for display
  const formatDate = (dateStr: string | number | Date): string => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const cardStats: CardStat[] = [
    {
      title: "Total Revenue",
      value: "$124,750.50",
      change: "+12.5%",
      description: "Compared to last month",
      icon: <TrendingUp className="h-4 w-4 text-emerald-500" />,
    },
    {
      title: "Food Orders",
      value: "8,942",
      change: "+7.2%",
      description: "Increased from previous period",
      icon: <BarChart3 className="h-4 w-4 text-blue-500" />,
    },
    {
      title: "Upsell Conversion",
      value: "24.8%",
      change: "+3.1%",
      description: "Higher than target rate",
      icon: <TrendingUp className="h-4 w-4 text-amber-500" />,
    },
    {
      title: "Avg. Order Value",
      value: "$42.35",
      change: "+5.7%",
      description: "12% above industry average",
      icon: <CreditCard className="h-4 w-4 text-violet-500" />,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-6 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Dashboard
            </h1>
            <p className="text-sm sm:text-base text-slate-500">
              Analytics and reporting for your business
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <div className="bg-white p-2 rounded-md shadow-sm flex items-center gap-2 text-xs sm:text-sm text-slate-700 w-full sm:w-auto">
              <Calendar className="h-4 w-4 text-slate-500" />
              <span>March 12, 2025 - April 10, 2025</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {cardStats.map((stat: CardStat, index: number) => (
            <Card
              key={index}
              className="overflow-hidden bg-white shadow-sm border-none transition-all duration-300 hover:shadow-md"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xs sm:text-sm font-medium text-slate-500">
                    {stat.title}
                  </CardTitle>
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-slate-800">
                  {stat.value}
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-xs font-medium text-emerald-600">
                    {stat.change}
                  </span>
                  <CardDescription className="text-xs ml-2">
                    {stat.description}
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Two different graphs section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-base sm:text-lg font-semibold text-slate-800">
                    Food Items Performance
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Sales vs. Cancellations
                  </CardDescription>
                </div>
                <PieChart className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-60 sm:h-72 flex items-center justify-center">
                  <div className="animate-pulse flex space-x-4">
                    <div className="h-3 w-3 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="h-3 w-3 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                    <div className="h-3 w-3 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              ) : (
                <div className="h-60 sm:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={salesData.slice(-14)}
                      margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={formatDate}
                        tick={{ fill: "#64748b", fontSize: 10 }}
                      />
                      <YAxis tick={{ fill: "#64748b", fontSize: 10 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          border: "none",
                          fontSize: "12px",
                        }}
                        formatter={(value: number) => [
                          `${value.toFixed(2)}`,
                          "",
                        ]}
                        labelFormatter={(label: string) =>
                          `Date: ${new Date(label).toLocaleDateString()}`
                        }
                      />
                      <Legend
                        wrapperStyle={{
                          fontSize: "12px",
                          paddingTop: "10px",
                        }}
                      />
                      <Bar
                        dataKey="total"
                        name="Total Sales"
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                        animationDuration={1500}
                      />
                      <Bar
                        dataKey="cancelled"
                        name="Cancelled"
                        fill="#f97316"
                        radius={[4, 4, 0, 0]}
                        animationDuration={1500}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-base sm:text-lg font-semibold text-slate-800">
                    Payment Analytics
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Revenue trends by category
                  </CardDescription>
                </div>
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-60 sm:h-72 flex items-center justify-center">
                  <div className="animate-pulse flex space-x-4">
                    <div className="h-3 w-3 bg-emerald-400 rounded-full animate-bounce"></div>
                    <div className="h-3 w-3 bg-emerald-400 rounded-full animate-bounce delay-75"></div>
                    <div className="h-3 w-3 bg-emerald-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              ) : (
                <div className="h-60 sm:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={paymentData}
                      margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={formatDate}
                        tick={{ fill: "#64748b", fontSize: 10 }}
                      />
                      <YAxis tick={{ fill: "#64748b", fontSize: 10 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          border: "none",
                          fontSize: "12px",
                        }}
                        formatter={(value: number) => [
                          `$${value.toLocaleString()}`,
                          "",
                        ]}
                        labelFormatter={(label: string) =>
                          `Date: ${new Date(label).toLocaleDateString()}`
                        }
                      />
                      <Legend
                        wrapperStyle={{
                          fontSize: "12px",
                          paddingTop: "10px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="totalPayment"
                        name="Total Payment"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ r: 3, strokeWidth: 2 }}
                        activeDot={{ r: 5, strokeWidth: 2 }}
                        animationDuration={1500}
                      />
                      <Line
                        type="monotone"
                        dataKey="bookingPayment"
                        name="Booking Payment"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 5 }}
                        animationDuration={1500}
                      />
                      <Line
                        type="monotone"
                        dataKey="foodPayment"
                        name="Food Payment"
                        stroke="#f97316"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 5 }}
                        animationDuration={1500}
                      />
                      <Line
                        type="monotone"
                        dataKey="upsellPayment"
                        name="Upsell Payment"
                        stroke="#eab308"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 5 }}
                        animationDuration={1500}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional detailed view with tabs */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          <Tabs defaultValue="details" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList className="bg-white">
                <TabsTrigger
                  value="details"
                  className="text-xs sm:text-sm data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                >
                  Detailed Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="comparison"
                  className="text-xs sm:text-sm data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700"
                >
                  Comparison View
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="details" className="mt-0 animate-fadeIn">
              <Card className="border-none shadow-sm bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base sm:text-lg font-semibold text-slate-800">
                    Monthly Trends Analysis
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Comprehensive view of sales and payment metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="h-60 sm:h-80 flex items-center justify-center">
                      <div className="animate-pulse flex space-x-4">
                        <div className="h-3 w-3 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="h-3 w-3 bg-purple-400 rounded-full animate-bounce delay-75"></div>
                        <div className="h-3 w-3 bg-purple-400 rounded-full animate-bounce delay-150"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-60 sm:h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={paymentData}
                          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                          />
                          <XAxis
                            dataKey="date"
                            tickFormatter={formatDate}
                            tick={{ fill: "#64748b", fontSize: 10 }}
                          />
                          <YAxis tick={{ fill: "#64748b", fontSize: 10 }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#fff",
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              border: "none",
                              fontSize: "12px",
                            }}
                            formatter={(value: number) => [
                              `$${value.toLocaleString()}`,
                              "",
                            ]}
                            labelFormatter={(label: string) =>
                              `Date: ${new Date(label).toLocaleDateString()}`
                            }
                          />
                          <Legend
                            wrapperStyle={{
                              fontSize: "12px",
                              paddingTop: "10px",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="totalPayment"
                            name="Total Payment"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            dot={{ r: 3, strokeWidth: 2 }}
                            activeDot={{ r: 5, strokeWidth: 2 }}
                            animationDuration={1500}
                          />
                          <Line
                            type="monotone"
                            dataKey="foodPayment"
                            name="Food Payment"
                            stroke="#f97316"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                            animationDuration={1500}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comparison" className="mt-0 animate-fadeIn">
              <Card className="border-none shadow-sm bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base sm:text-lg font-semibold text-slate-800">
                    Sales Comparison
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Side-by-side analysis of key metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="h-60 sm:h-80 flex items-center justify-center">
                      <div className="animate-pulse flex space-x-4">
                        <div className="h-3 w-3 bg-emerald-400 rounded-full animate-bounce"></div>
                        <div className="h-3 w-3 bg-emerald-400 rounded-full animate-bounce delay-75"></div>
                        <div className="h-3 w-3 bg-emerald-400 rounded-full animate-bounce delay-150"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-60 sm:h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={salesData.slice(-10)}
                          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                          />
                          <XAxis
                            dataKey="date"
                            tickFormatter={formatDate}
                            tick={{ fill: "#64748b", fontSize: 10 }}
                          />
                          <YAxis
                            yAxisId="left"
                            orientation="left"
                            tick={{ fill: "#64748b", fontSize: 10 }}
                          />
                          <YAxis
                            yAxisId="right"
                            orientation="right"
                            tick={{ fill: "#64748b", fontSize: 10 }}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#fff",
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              border: "none",
                              fontSize: "12px",
                            }}
                            formatter={(value: number, name: string) => {
                              if (
                                name === "Total Payment" ||
                                name === "Booking Payment"
                              ) {
                                return [`$${value.toLocaleString()}`, name];
                              }
                              return [`${value.toFixed(2)}`, name];
                            }}
                            labelFormatter={(label: string) =>
                              `Date: ${new Date(label).toLocaleDateString()}`
                            }
                          />
                          <Legend
                            wrapperStyle={{
                              fontSize: "12px",
                              paddingTop: "10px",
                            }}
                          />
                          <Bar
                            yAxisId="left"
                            dataKey="totalPayment"
                            name="Total Payment"
                            fill="#10b981"
                            radius={[4, 4, 0, 0]}
                            animationDuration={1500}
                          />
                          <Bar
                            yAxisId="left"
                            dataKey="bookingPayment"
                            name="Booking Payment"
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                            animationDuration={1500}
                          />
                          <Bar
                            yAxisId="right"
                            dataKey="total"
                            name="Sales Rate"
                            fill="#8b5cf6"
                            radius={[4, 4, 0, 0]}
                            animationDuration={1500}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
