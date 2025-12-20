"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface PowerChartProps {
  data: { name: string; value: number }[];
  title: string;
}

export function PowerChart({ data, title }: PowerChartProps) {
  return (
    <div className="bg-[#1e1e1e] rounded-2xl lg:rounded-3xl p-4 lg:p-6">
      <div className="mb-3 lg:mb-4">
        <h3 className="text-sm font-medium text-white tracking-tight">
          {title}
        </h3>
        <div className="mt-2 border-b border-white/10" />
      </div>

      <div className="flex gap-2 lg:gap-4">
        {/* Y-Axis Labels */}
        <div className="flex flex-col justify-between text-[9px] lg:text-[10px] text-[#a5a4a4] opacity-50 py-1">
          <span>800</span>
          <span>600</span>
          <span>400</span>
          <span>200</span>
          <span>0</span>
        </div>

        {/* Chart */}
        <div className="flex-1 h-[180px] lg:h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={8}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#a5a4a4", fontSize: 8 }}
                interval={0}
              />
              <YAxis hide domain={[0, 800]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2c2c2c",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                cursor={{ fill: "rgba(238, 172, 29, 0.1)" }}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#eeac1d" />
                  <stop offset="100%" stopColor="#eeac1d" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <Bar
                dataKey="value"
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
                maxBarSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Sample data
export const weeklyPowerData = [
  { name: "MON", value: 320 },
  { name: "TUE", value: 450 },
  { name: "WED", value: 680 },
  { name: "THU", value: 520 },
  { name: "FRI", value: 390 },
  { name: "SAT", value: 580 },
  { name: "SUN", value: 420 },
];

export const monthlyPowerData = [
  { name: "JAN", value: 420 },
  { name: "FEB", value: 380 },
  { name: "MAR", value: 350 },
  { name: "APR", value: 320 },
  { name: "MAY", value: 290 },
  { name: "JUN", value: 310 },
  { name: "JUL", value: 580 },
  { name: "AUG", value: 450 },
  { name: "SEP", value: 390 },
  { name: "OCT", value: 520 },
  { name: "NOV", value: 480 },
  { name: "DEC", value: 510 },
];

