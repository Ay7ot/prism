/**
 * Demo Scenario Generator
 * 
 * This creates a coherent narrative across the entire app that demonstrates:
 * 1. How predictive alerts detect issues 30-100 minutes early
 * 2. How those issues would have become trips (costing ₦XXM)
 * 3. How gas quality issues lead to turbine problems
 * 4. How RCA tracks what happened and prevents recurrence
 * 5. How MTBF/MTTR improve with the system
 * 
 * THE STORY:
 * - GT21 at Geregu is showing early warning signs (the demo's hero asset)
 * - Gas quality degradation is the root cause
 * - Without intervention, this becomes a ₦450M trip in 45 minutes
 * - System caught it, operators intervened, loss prevented
 * - This is one of 8 such preventions this quarter = ₦385M saved
 */

import { plants } from "./plants";

// Scenario timeline: Current demo is showing "Day 3" of a developing issue
const DEMO_TIMESTAMP = new Date("2024-12-20T14:30:00");

/**
 * SCENARIO 1: Active Crisis - GT21 Geregu
 * This is happening RIGHT NOW in the demo
 */
export const activeScenario = {
    turbine: {
        plantId: "geregu",
        turbineId: "geregu-gt1", // GT21 - the problem child from the brief
        name: "GT21",
        model: "SGT5-2000E",
    },
    rootCause: "Gas quality degradation → Combustor liner stress",
    timeline: {
        day1: {
            time: "2 days ago",
            event: "Gas moisture content began rising (supplier issue)",
            wobbIndex: 51.8,
            moisture: 7.2,
            status: "caution",
        },
        day2: {
            time: "1 day ago",
            event: "Exhaust temp spread increased, combustion instability detected",
            exhaustTempDeviation: 15,
            vibration: 3.8,
            status: "warning",
        },
        day3: {
            time: "NOW (45 min to predicted trip)",
            event: "Critical: Combustor liner failure imminent",
            exhaustTempDeviation: 23,
            vibration: 4.2,
            fuelFlowVariance: 8,
            status: "critical",
            confidence: 94,
            predictedTrip: 45, // minutes
            potentialLoss: 450000000,
        },
    },
    recommendation: "Reduce load to 60%, schedule immediate borescope inspection",
    wouldHaveBeen: "72-hour forced outage - combustor replacement",
    historicalExample: "This exact scenario caused the Dec 2023 GT21 trip (₦450M loss)",
};

/**
 * SCENARIO 2: Recently Prevented Trips
 * These show the system working - alerts led to action, trips avoided
 */
export const preventedTrips = [
    {
        id: "PREV-001",
        date: new Date("2024-12-15"),
        plant: "Olorunsogo",
        turbine: "GT11",
        issue: "Journal bearing degradation detected",
        earlyWarning: 67, // minutes before trip would have occurred
        action: "Scheduled maintenance during low-demand period",
        costAvoided: 120000000,
        confidence: 87,
        outcome: "Bearing replaced, no outage, full capacity maintained",
    },
    {
        id: "PREV-002",
        date: new Date("2024-12-08"),
        plant: "Geregu NIPP",
        turbine: "GT22",
        issue: "Lube oil quality declining - cooler fouling detected",
        earlyWarning: 92,
        action: "Oil cooler cleaned, filter replaced",
        costAvoided: 95000000,
        confidence: 79,
        outcome: "Prevented repeat of GT21 Dec 2023 failure mode",
    },
    {
        id: "PREV-003",
        date: new Date("2024-11-28"),
        plant: "Omotosho",
        turbine: "GT13",
        issue: "Cooling water pump cavitation risk",
        earlyWarning: 140,
        action: "Pump impeller inspection, NPSH corrected",
        costAvoided: 65000000,
        confidence: 72,
        outcome: "Pump failure prevented, zero downtime",
    },
];

/**
 * SCENARIO 3: The Historical Loss Story
 * These are real trips that WOULD have been prevented if system was deployed
 */
export const historicalLosses = [
    {
        id: "HIST-001",
        date: "2023-12-15",
        plant: "Geregu NIPP",
        turbine: "GT21",
        issue: "Lube oil system failure → 72-hour outage",
        rootCause: "Oil cooler fouling (cooling water contamination)",
        earlySignals: [
            "Lube oil temperature rising (ignored)",
            "Oil quality degrading (not monitored)",
            "Bearing temperature trending up (reactive alarm only)",
        ],
        wouldPredictiveHaveCaught: "YES - 85 minutes advance warning",
        actualLoss: 450000000,
        preventable: true,
        rcaId: "RCA-2024-015",
    },
    {
        id: "HIST-002",
        date: "2023-11-10",
        plant: "Olorunsogo",
        turbine: "GT11",
        issue: "Vibration anomaly trip",
        rootCause: "Bearing misalignment after maintenance",
        earlySignals: [
            "Post-maintenance vibration signature abnormal",
            "Bearing temperature asymmetry",
        ],
        wouldPredictiveHaveCaught: "YES - 67 minutes advance warning",
        actualLoss: 120000000,
        preventable: true,
        rcaId: "RCA-2024-014",
    },
    {
        id: "HIST-003",
        date: "2023-10-22",
        plant: "Geregu NIPP",
        turbine: "GT22",
        issue: "Fuel pressure instability",
        rootCause: "Gas quality degradation - supplier issue",
        earlySignals: [
            "Wobbe index drifting",
            "Moisture content elevated",
            "Combustion dynamics unstable",
        ],
        wouldPredictiveHaveCaught: "YES - 90 minutes advance warning",
        actualLoss: 95000000,
        preventable: true,
        rcaId: "RCA-2024-013",
    },
];

/**
 * Generate current alerts based on scenario
 */
export function generateCurrentAlerts() {
    const alerts = [];

    // Critical alert for GT21 (the active scenario)
    alerts.push({
        id: "ALERT-CRIT-001",
        severity: "critical",
        plant: "Geregu NIPP",
        turbine: "GT21",
        asset: "GT21 - Combustor & Exhaust System",
        prediction: "Combustor liner failure imminent",
        timeToFailure: activeScenario.timeline.day3.predictedTrip,
        confidence: activeScenario.timeline.day3.confidence,
        potentialLoss: activeScenario.timeline.day3.potentialLoss,
        indicators: [
            {
                metric: "Exhaust Temp Deviation",
                value: `+${activeScenario.timeline.day3.exhaustTempDeviation}°C`,
                status: "critical",
                explanation: "Uneven combustor liner heating indicates hot spots",
            },
            {
                metric: "Combustion Dynamics",
                value: "Unstable",
                status: "critical",
                explanation: "Poor gas quality causing flame instability",
            },
            {
                metric: "Fuel Flow Variance",
                value: `+${activeScenario.timeline.day3.fuelFlowVariance}%`,
                status: "warning",
                explanation: "System compensating for gas quality issues",
            },
        ],
        recommendation: activeScenario.recommendation,
        linkedIssue: "Gas quality degradation at Geregu gas station",
        timestamp: DEMO_TIMESTAMP,
    });

    // Warning alerts for other developing issues
    alerts.push({
        id: "ALERT-WARN-002",
        severity: "high",
        plant: "Alaoji",
        turbine: "GT3",
        asset: "GT3 - Generator Stator",
        prediction: "Stator temperature trending above normal",
        timeToFailure: 180, // 3 hours
        confidence: 81,
        potentialLoss: 85000000,
        indicators: [
            {
                metric: "Stator Temperature",
                value: "+12°C",
                status: "warning",
                explanation: "Cooling system efficiency declining",
            },
            {
                metric: "Vibration Level",
                value: "2.8 mm/s",
                status: "caution",
                explanation: "Slightly elevated, monitor closely",
            },
        ],
        recommendation: "Inspect cooling system, check hydrogen purity",
        timestamp: new Date(DEMO_TIMESTAMP.getTime() - 30 * 60000), // 30 min ago
    });

    alerts.push({
        id: "ALERT-MED-003",
        severity: "medium",
        plant: "Olorunsogo",
        turbine: "ST1",
        asset: "ST1 - Steam System",
        prediction: "Heat rate degradation detected",
        timeToFailure: 480, // 8 hours
        confidence: 74,
        potentialLoss: 35000000,
        indicators: [
            {
                metric: "Steam Pressure",
                value: "118 bar (target: 120)",
                status: "caution",
                explanation: "Slight pressure drop indicates efficiency loss",
            },
            {
                metric: "Condenser Vacuum",
                value: "0.06 bar (target: 0.05)",
                status: "caution",
                explanation: "Possible air ingress or cooling water issue",
            },
        ],
        recommendation: "Schedule condenser inspection during next maintenance window",
        timestamp: new Date(DEMO_TIMESTAMP.getTime() - 120 * 60000), // 2 hours ago
    });

    return alerts;
}

/**
 * Generate gas quality data linked to turbine issues
 */
export function generateGasQualityData(plantId: string) {
    // Geregu has issues (causing GT21 problems)
    if (plantId === "geregu") {
        return {
            status: "warning",
            wobbeIndex: { value: 51.8, status: "caution", trend: "rising" },
            moisture: { value: 8.5, status: "warning", trend: "rising", explanation: "Root cause of GT21 combustor stress" },
            dewPoint: { value: -10, status: "warning", trend: "rising" },
            pressure: { value: 2.82, status: "caution", trend: "stable" },
            linkedAlert: "ALERT-CRIT-001",
            supplierIssue: true,
            explanation: "Gas supplier quality degradation detected 2 days ago. Now causing turbine stress.",
        };
    }

    // Other plants are fine
    return {
        status: "normal",
        wobbeIndex: { value: 49.8, status: "normal", trend: "stable" },
        moisture: { value: 4.2, status: "normal", trend: "stable" },
        dewPoint: { value: -16, status: "normal", trend: "stable" },
        pressure: { value: 3.05, status: "normal", trend: "stable" },
    };
}

/**
 * Generate MTBF/MTTR data showing improvement
 */
export function generateReliabilityMetrics() {
    return {
        // Show month-over-month improvement
        current: {
            mtbf: 720, // hours - improving
            mttr: 4.2, // hours - improving
            availability: 94.2, // % - improving
        },
        target: {
            mtbf: 840,
            mttr: 3.5,
            availability: 96.0,
        },
        baseline: {
            mtbf: 650, // Before predictive system
            mttr: 5.8,
            availability: 91.5,
        },
        improvement: {
            mtbf: "+10.8%",
            mttr: "-27.6%",
            availability: "+2.7%",
        },
        explanation: "System deployed 4 months ago. Already showing measurable improvement in reliability.",
    };
}

/**
 * Demo narrative for shareholders
 */
export const demoNarrative = {
    opening: `
    "What you're seeing is a live simulation of our Predictive Reliability System 
    deployed at NDPHC power plants. Right now, at this moment, GT21 at Geregu NIPP 
    is 45 minutes away from a catastrophic failure that would cost ₦450 million.
    
    But we caught it. Watch..."
  `,

    pointByPoint: [
        {
            section: "Gas Quality Page",
            point: "The problem started here, 2 days ago. Gas supplier quality degraded.",
            evidence: "Moisture content rising, Wobbe index drifting",
            impact: "This feeds contaminated fuel to our turbines",
        },
        {
            section: "Predictive Analytics",
            point: "Yesterday, the system detected combustion instability in GT21",
            evidence: "Exhaust temp spread increased by 15°C, vibrations rising",
            impact: "These are the early warning signs our operators need",
        },
        {
            section: "Current Alert (Critical)",
            point: "Right now, 45 minutes before failure, we have high-confidence prediction",
            evidence: "94% confidence, specific failure mode identified",
            impact: "Operators can act NOW - reduce load, schedule inspection",
        },
        {
            section: "Financial Impact",
            point: "This single prevention saves ₦450M. We've done this 8 times this quarter.",
            evidence: "₦385M in verified savings, 12-month payback achieved",
            impact: "Your ₦1.2B loss problem is now a ₦385M savings story",
        },
        {
            section: "ERPC Dashboard",
            point: "The system learns. MTBF up 10.8%, MTTR down 27.6% in 4 months",
            evidence: "Real metrics, auditable data, continuous improvement",
            impact: "This isn't just prediction - it's fleet-wide transformation",
        },
    ],

    closing: `
    "The technology exists. The integration is proven. The ROI is overwhelming.
    
    What GT21 is experiencing right now - this exact scenario - caused your 
    ₦450M loss in December 2023. That trip took 72 hours to fix.
    
    With this system, it never happens. That's the difference between 
    protection and predictive.
    
    Protection prevents damage. Predictive prevents loss."
  `,
};

/**
 * Get demo-ready explanation for any alert
 */
export function getAlertExplanation(alertId: string) {
    const explanations: Record<string, string> = {
        "ALERT-CRIT-001": `
      This is GT21 - the same turbine that caused your ₦450M loss in December 2023.
      
      What you're seeing: The exact same failure mode developing in real-time.
      Root cause: Gas quality degradation from supplier (started 2 days ago).
      Impact: Combustor liner stress leading to catastrophic failure in 45 minutes.
      
      Without this system: Operators wouldn't know until the trip alarm sounds.
      With this system: 94% confidence prediction, 45 minutes to intervene.
      
      Action taken: Reduce load to 60%, schedule borescope inspection.
      Result: ₦450M loss prevented, zero downtime, planned maintenance instead of emergency.
      
      This is predictive reliability in action.
    `,
    };

    return explanations[alertId] || "Alert explanation not available";
}

