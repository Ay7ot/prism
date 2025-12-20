export interface AIAlert {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "warning" | "info";
  timestamp: string;
  timeAgo: string;
  plantId?: string;
  turbineId?: string;
  plantName?: string;
}

export interface AIInsight {
  id: string;
  message: string;
  timestamp: string;
  timeAgo: string;
  type: "positive" | "negative" | "neutral";
  icon: "trending-up" | "trending-down" | "alert" | "info";
}

export const engineerAlerts: AIAlert[] = [
  {
    id: "alert-1",
    title: "GT-1 High Exhaust Temp",
    description: "Immediate Shutdown Recommended",
    severity: "critical",
    timestamp: "2024-12-20T10:30:00Z",
    timeAgo: "10m",
    plantId: "alaoji",
    turbineId: "alaoji-gt1",
    plantName: "Alaoji Power Plant",
  },
  {
    id: "alert-2",
    title: "GT-3 Generator Stator",
    description: "Stator Temperature Exceeded Safe Limit",
    severity: "critical",
    timestamp: "2024-12-20T08:30:00Z",
    timeAgo: "2h",
    plantId: "alaoji",
    turbineId: "alaoji-gt3",
    plantName: "Alaoji Power Plant",
  },
  {
    id: "alert-3",
    title: "GT-5 Lube Oil Pressure",
    description: "Stator Temperature Exceeded Safe Limit",
    severity: "warning",
    timestamp: "2024-12-20T06:30:00Z",
    timeAgo: "4h",
    plantId: "geregu",
    turbineId: "geregu-gt1",
    plantName: "Geregu Power Plant",
  },
  {
    id: "alert-4",
    title: "GT-5 Check Supply Pump",
    description: "Raw Water Tank Level Low",
    severity: "warning",
    timestamp: "2024-12-19T10:30:00Z",
    timeAgo: "1d",
    plantId: "calabar",
    plantName: "Calabar Power Plant",
  },
  {
    id: "alert-5",
    title: "GT-2 Risk of Overheating",
    description: "Cooling Water Flow Rate Below Minimum",
    severity: "warning",
    timestamp: "2024-12-17T10:30:00Z",
    timeAgo: "3d",
    plantId: "olorunsogo",
    turbineId: "olorunsogo-gt2",
    plantName: "Olorunsogo Power Plant",
  },
];

export const executiveAlerts: AIAlert[] = [
  {
    id: "exec-alert-1",
    title: "Immediate intervention",
    description: "Forced outage risk rising: 3 turbines show severe vibration trend patterns",
    severity: "critical",
    timestamp: "2024-12-20T10:30:00Z",
    timeAgo: "10m",
  },
  {
    id: "exec-alert-2",
    title: "GT-4 at Alaoji Plant",
    description: "Exceeding exhaust temperature limits — probability of trip event is 78%",
    severity: "critical",
    timestamp: "2024-12-20T08:30:00Z",
    timeAgo: "2h",
    plantId: "alaoji",
  },
  {
    id: "exec-alert-3",
    title: "Plant availability dropping",
    description: "4 units entered unplanned maintenance within 10 days.",
    severity: "warning",
    timestamp: "2024-12-20T06:30:00Z",
    timeAgo: "4h",
  },
  {
    id: "exec-alert-4",
    title: "HSE risk",
    description: "Near-miss reports increasing during turbine startups in two locations.",
    severity: "warning",
    timestamp: "2024-12-20T00:30:00Z",
    timeAgo: "10m",
  },
  {
    id: "exec-alert-5",
    title: "Maintenance target",
    description: "18 maintenance overdue work orders affecting reliability.",
    severity: "warning",
    timestamp: "2024-12-19T19:30:00Z",
    timeAgo: "5h",
  },
  {
    id: "exec-alert-6",
    title: "Reporting",
    description: "No disruption signals detected around plant operations this week.",
    severity: "info",
    timestamp: "2024-12-19T10:30:00Z",
    timeAgo: "1d",
  },
];

export const mdInsights: AIInsight[] = [
  {
    id: "insight-1",
    message: "Operational efficiency increased by 6.4% this quarter due to optimized turbine performance.",
    timestamp: "2024-12-20T10:30:00Z",
    timeAgo: "10m",
    type: "positive",
    icon: "trending-up",
  },
  {
    id: "insight-2",
    message: "Procurement costs projected to drop 12% next quarter if current contract compliance is maintained.",
    timestamp: "2024-12-20T10:30:00Z",
    timeAgo: "10m",
    type: "positive",
    icon: "trending-down",
  },
  {
    id: "insight-3",
    message: "Two turbines across the fleet show early-stage compressor fouling",
    timestamp: "2024-12-20T10:30:00Z",
    timeAgo: "10m",
    type: "negative",
    icon: "alert",
  },
  {
    id: "insight-4",
    message: "Most financial risks originate from delays in gas supply agreements.",
    timestamp: "2024-12-20T10:30:00Z",
    timeAgo: "10m",
    type: "neutral",
    icon: "info",
  },
];

export const financeInsights: AIInsight[] = [
  {
    id: "fin-insight-1",
    message: "Fuel costs account for 72% of generation expense this month – 6% above historical average.",
    timestamp: "2024-12-20T10:30:00Z",
    timeAgo: "10m",
    type: "negative",
    icon: "trending-up",
  },
  {
    id: "fin-insight-2",
    message: "Gas compressor maintenance expected to reduce monthly OPEX by 3.8% if carried out on schedule.",
    timestamp: "2024-12-20T10:30:00Z",
    timeAgo: "10m",
    type: "positive",
    icon: "trending-down",
  },
  {
    id: "fin-insight-3",
    message: "Budget leakage predicted at ₦48M if current high vibration turbine continues running unserviced.",
    timestamp: "2024-12-20T10:30:00Z",
    timeAgo: "10m",
    type: "negative",
    icon: "alert",
  },
];

export const gridInsights: AIInsight[] = [
  {
    id: "grid-insight-1",
    message: "Transmission losses increased from 4.7% → 5.9% – probable overhead line degradation or grounding issue.",
    timestamp: "2024-12-20T10:30:00Z",
    timeAgo: "10m",
    type: "negative",
    icon: "trending-up",
  },
  {
    id: "grid-insight-2",
    message: "Peak load expected to exceed safe limits between 6pm-9pm unless distribution balancing is adjusted.",
    timestamp: "2024-12-20T10:30:00Z",
    timeAgo: "10m",
    type: "negative",
    icon: "alert",
  },
  {
    id: "grid-insight-3",
    message: "Peak load expected to exceed safe limits between 6pm-9pm unless distribution balancing is adjusted.",
    timestamp: "2024-12-20T10:30:00Z",
    timeAgo: "10m",
    type: "neutral",
    icon: "info",
  },
];

export const workforceAlerts: AIAlert[] = [
  {
    id: "wf-alert-1",
    title: "Training Certification Due",
    description: "25 operators require safety recertification by month end",
    severity: "warning",
    timestamp: "2024-12-20T10:30:00Z",
    timeAgo: "10m",
  },
  {
    id: "wf-alert-2",
    title: "Certification expiry",
    description: "5 technicians approaching certification expiry within 30 days",
    severity: "warning",
    timestamp: "2024-12-20T08:30:00Z",
    timeAgo: "2h",
  },
  {
    id: "wf-alert-3",
    title: "Logistics delay",
    description: "Logistics delay causing maintenance outage extension at Omotosho Plant.",
    severity: "warning",
    timestamp: "2024-12-20T06:30:00Z",
    timeAgo: "4h",
  },
  {
    id: "wf-alert-4",
    title: "Admin approvals pending",
    description: "13 requests exceeded SLA time.",
    severity: "info",
    timestamp: "2024-12-19T19:30:00Z",
    timeAgo: "5h",
  },
];

export const contractAlerts: AIAlert[] = [
  {
    id: "contract-alert-1",
    title: "Contract renewal",
    description: "Three contracts approaching renewal with performance gaps unresolved",
    severity: "warning",
    timestamp: "2024-12-20T10:30:00Z",
    timeAgo: "10m",
  },
  {
    id: "contract-alert-2",
    title: "Regulatory Audit at risk",
    description: "Missing HSE documentation for two incidents - regulatory audit at risk",
    severity: "critical",
    timestamp: "2024-12-20T08:30:00Z",
    timeAgo: "2h",
  },
];

export const gridAlerts: AIAlert[] = [
  {
    id: "grid-alert-1",
    title: "Line 22KV/NG",
    description: "Line 22KV/NG Stable Load exceeded rated limit – load shedding may be required.",
    severity: "critical",
    timestamp: "2024-12-20T10:30:00Z",
    timeAgo: "10m",
  },
  {
    id: "grid-alert-2",
    title: "IT link at risk",
    description: "Substation SCADA polling delays rising beyond 200ms – IT link at risk",
    severity: "warning",
    timestamp: "2024-12-20T08:30:00Z",
    timeAgo: "2h",
  },
  {
    id: "grid-alert-3",
    title: "Wildfire risk detected",
    description: "Near Tower 81 – vegetation proximity sensor triggered",
    severity: "warning",
    timestamp: "2024-12-20T08:30:00Z",
    timeAgo: "2h",
  },
];

export const financeAlerts: AIAlert[] = [
  {
    id: "fin-alert-1",
    title: "Olorunsogo plant",
    description: "Unplanned maintenance cost spike of ₦32M detected this month.",
    severity: "warning",
    timestamp: "2024-12-20T10:30:00Z",
    timeAgo: "10m",
  },
  {
    id: "fin-alert-2",
    title: "Gas Contract Alaoji Plant",
    description: "Gas contract delivery falling below SLA – penalties may apply.",
    severity: "critical",
    timestamp: "2024-12-20T08:30:00Z",
    timeAgo: "2h",
  },
  {
    id: "fin-alert-3",
    title: "Plant Budget",
    description: "Budget utilization reached 85% – 6 weeks before quarter-end.",
    severity: "warning",
    timestamp: "2024-12-20T06:30:00Z",
    timeAgo: "4h",
  },
  {
    id: "fin-alert-4",
    title: "Maintenance target",
    description: "18 maintenance overdue work orders affecting reliability.",
    severity: "warning",
    timestamp: "2024-12-19T19:30:00Z",
    timeAgo: "5h",
  },
];

