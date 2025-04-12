import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Calendar,
  Clock,
  Activity,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react";

// Sample data for check-in tracking
const checkinData = [
  {
    date: "2025-03-12",
    totalCheckins: 30,
    contactlessCheckins: 20,
    totalCheckout: 15,
  },
  {
    date: "2025-03-13",
    totalCheckins: 20,
    contactlessCheckins: 10,
    totalCheckout: 18,
  },
  {
    date: "2025-03-14",
    totalCheckins: 29,
    contactlessCheckins: 18,
    totalCheckout: 22,
  },
  {
    date: "2025-03-15",
    totalCheckins: 22,
    contactlessCheckins: 8,
    totalCheckout: 36,
  },
  {
    date: "2025-03-16",
    totalCheckins: 15,
    contactlessCheckins: 5,
    totalCheckout: 18,
  },
  {
    date: "2025-03-17",
    totalCheckins: 12,
    contactlessCheckins: 7,
    totalCheckout: 15,
  },
  {
    date: "2025-03-18",
    totalCheckins: 25,
    contactlessCheckins: 15,
    totalCheckout: 18,
  },
  {
    date: "2025-03-19",
    totalCheckins: 24,
    contactlessCheckins: 12,
    totalCheckout: 22,
  },
  {
    date: "2025-03-20",
    totalCheckins: 18,
    contactlessCheckins: 8,
    totalCheckout: 19,
  },
  {
    date: "2025-03-21",
    totalCheckins: 27,
    contactlessCheckins: 17,
    totalCheckout: 25,
  },
  {
    date: "2025-03-22",
    totalCheckins: 32,
    contactlessCheckins: 22,
    totalCheckout: 28,
  },
];

// Sample data for WhatsApp template usage
const whatsappData = [
  { name: "ask_for_booking_payment", delivered: 80, read: 160 },
  { name: "checkin_default", delivered: 120, read: 85 },
  { name: "feedback", delivered: 20, read: 15 },
  { name: "price_quotation", delivered: 10, read: 6 },
  { name: "review", delivered: 60, read: 55 },
  { name: "test_template", delivered: 30, read: 20 },
  { name: "today_unpaid", delivered: 8, read: 12 },
  { name: "tomorrow_unpaid", delivered: 4, read: 7 },
];

// Sample summary data
const summaryData = [
  {
    title: "Total Check-ins",
    value: 284,
    icon: Users,
    change: "+12%",
    color: "bg-green-500",
  },
  {
    title: "Contactless Check-ins",
    value: 154,
    icon: Activity,
    change: "+5%",
    color: "bg-blue-500",
  },
  {
    title: "Total Check-outs",
    value: 237,
    icon: Clock,
    change: "+8%",
    color: "bg-orange-500",
  },
  {
    title: "WhatsApp Messages",
    value: 354,
    icon: MessageSquare,
    change: "+22%",
    color: "bg-purple-500",
  },
];

export default function Reports() {
  //   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      //   setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 transition-all">
      <div className="flex flex-col gap-6 max-w-7xl mx-auto animate-fade-in">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Analytics and statistics for your business
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Badge variant="outline" className="text-sm font-medium py-1">
              <Calendar className="mr-1 h-4 w-4" />
              March 12, 2025 - April 10, 2025
            </Badge>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryData.map((item, index) => (
            <Card
              key={index}
              className={`overflow-hidden border-0 shadow-md transform transition-all hover:scale-105 hover:shadow-lg`}
            >
              <div className={`h-1 ${item.color}`}></div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {item.title}
                    </p>
                    <h3 className="text-2xl font-bold mt-1">{item.value}</h3>
                    <p className="text-xs font-medium text-green-500 mt-1">
                      {item.change} from last month
                    </p>
                  </div>
                  <div
                    className={`${item.color} bg-opacity-20 p-3 rounded-full`}
                  >
                    <item.icon
                      className={`h-6 w-6 text-${item.color.split("-")[1]}-600`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="check-ins" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
            <TabsTrigger value="check-ins">Check-ins Track</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp Usage</TabsTrigger>
          </TabsList>

          <TabsContent value="check-ins" className="mt-6">
            <Card className="border-0 shadow-md overflow-hidden">
              <CardHeader className="bg-white dark:bg-gray-800">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-green-500" />
                  Check-in Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={checkinData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      className="animate-slide-up"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="totalCheckins"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ stroke: "#10b981", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 8 }}
                        animationDuration={1500}
                      />
                      <Line
                        type="monotone"
                        dataKey="contactlessCheckins"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ stroke: "#3b82f6", strokeWidth: 2, r: 4 }}
                        animationDuration={1500}
                      />
                      <Line
                        type="monotone"
                        dataKey="totalCheckout"
                        stroke="#f97316"
                        strokeWidth={2}
                        dot={{ stroke: "#f97316", strokeWidth: 2, r: 4 }}
                        animationDuration={1500}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="whatsapp" className="mt-6">
            <Card className="border-0 shadow-md overflow-hidden">
              <CardHeader className="bg-white dark:bg-gray-800">
                <CardTitle className="text-lg font-medium flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-green-500" />
                  WhatsApp Template Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={whatsappData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      className="animate-slide-up"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="delivered"
                        fill="#94a3b8"
                        radius={[4, 4, 0, 0]}
                        animationDuration={1500}
                      />
                      <Bar
                        dataKey="read"
                        fill="#60a5fa"
                        radius={[4, 4, 0, 0]}
                        animationDuration={1500}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader className="bg-white dark:bg-gray-800">
              <CardTitle className="text-lg font-medium flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-purple-500" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">
                      Check-in Completion Rate
                    </p>
                    <p className="text-sm font-medium">78%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">WhatsApp Read Rate</p>
                    <p className="text-sm font-medium">65%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">Template Efficiency</p>
                    <p className="text-sm font-medium">92%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader className="bg-white dark:bg-gray-800">
              <CardTitle className="text-lg font-medium flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  {
                    action: "New check-in",
                    user: "Room 304",
                    time: "5 minutes ago",
                    badge: "Check-in",
                  },
                  {
                    action: "WhatsApp template sent",
                    user: "Emily Parker",
                    time: "12 minutes ago",
                    badge: "Message",
                  },
                  {
                    action: "Check-out completed",
                    user: "Room 215",
                    time: "43 minutes ago",
                    badge: "Check-out",
                  },
                  {
                    action: "Payment received",
                    user: "Alex Johnson",
                    time: "1 hour ago",
                    badge: "Payment",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.action}</p>
                      <p className="text-xs text-gray-500">{item.user}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">
                        {item.badge}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
          <p>© 2025 Swyftin.com. All rights reserved.</p>
          <div className="flex items-center">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2 bg-green-500 text-white hover:bg-green-600">
              <MessageSquare className="mr-2 h-4 w-4" />
              Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
