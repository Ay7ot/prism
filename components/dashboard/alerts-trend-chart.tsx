"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const trendData = [
  { day: "Mon", alerts: 2 },
  { day: "Tue", alerts: 4 },
  { day: "Wed", alerts: 3 },
  { day: "Thu", alerts: 5 },
  { day: "Fri", alerts: 4 },
  { day: "Sat", alerts: 2 },
  { day: "Sun", alerts: 1 },
];

export function AlertsTrendChart() {
  return (
    <div className="bg-[#2c2c2c] rounded-xl p-5 mb-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-[#eeac1d] font-lato font-bold text-base">
            Alert Trends
          </p>
          <p className="text-[#a5a4a4] font-lato text-sm mt-1">
            Week to week alerts
          </p>
        </div>
      </div>
      <div className="h-32 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#a5a4a4", fontSize: 11 }}
            />
            <YAxis
              hide
              domain={[0, 6]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e1e1e",
                border: "1px solid #eeac1d",
                borderRadius: "8px",
                color: "#fff",
              }}
              cursor={{ stroke: "#eeac1d", strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="alerts"
              stroke="#eeac1d"
              strokeWidth={2}
              dot={{ fill: "#eeac1d", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

