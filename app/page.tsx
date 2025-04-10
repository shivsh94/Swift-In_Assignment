"use client";
import Insights from "@/components/Insights";
import Performance from "@/components/Performance";
import Reports from "@/components/Reports";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calendar, CirclePlus } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState("insights");
  const monthRange = "March 12, 2025 - April 10, 2025";

  const renderTabContent = () => {
    switch (activeTab) {
      case "insights":
        return (
          <div>
            <Insights />
          </div>
        );
      case "performance":
        return <div> <Performance/></div>;
      case "reports":
        return <div> <Reports/></div>;
      default:
        return null;
    }
  };

  return (
    <>
      <header className="flex  flex-wrap justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-10 w-10 rounded-lg flex items-center justify-center">
            <TrendingUp className="text-white h-5 w-5" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            Analytics Dashboard
          </h1>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" className="text-slate-700">
            <Calendar className="h-4 w-4 mr-2" />
            {monthRange}
          </Button>

          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <CirclePlus className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="mb-8">
        <nav className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm border border-slate-200 w-fit">
          <Button
            variant={activeTab === "insights" ? "default" : "ghost"}
            onClick={() => setActiveTab("insights")}
            className={
              activeTab === "insights"
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "text-slate-600"
            }
          >
            Insights
          </Button>
          <Button
            variant={activeTab === "performance" ? "default" : "ghost"}
            onClick={() => setActiveTab("performance")}
            className={
              activeTab === "performance"
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "text-slate-600"
            }
          >
            Performance
          </Button>
          <Button
            variant={activeTab === "reports" ? "default" : "ghost"}
            onClick={() => setActiveTab("reports")}
            className={
              activeTab === "reports"
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "text-slate-600"
            }
          >
            Reports
          </Button>
        </nav>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        {renderTabContent()}
      </div>
    </>
  );
}
