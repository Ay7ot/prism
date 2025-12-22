"use client";

import { Bell, CheckCircle2, AlertTriangle, Info, Clock } from "lucide-react";

const notifications = [
    {
        id: 1,
        type: "alert",
        title: "High Temperature Warning",
        message: "Turbine T-001 at Afam VI is operating above optimal temperature range.",
        time: "2 hours ago",
        read: false,
    },
    {
        id: 2,
        type: "success",
        title: "Maintenance Complete",
        message: "Scheduled maintenance for Alaoji Plant has been completed successfully.",
        time: "5 hours ago",
        read: false,
    },
    {
        id: 3,
        type: "info",
        title: "System Update",
        message: "IRIS monitoring system has been updated to version 2.4.1.",
        time: "1 day ago",
        read: true,
    },
    {
        id: 4,
        type: "alert",
        title: "Gas Quality Alert",
        message: "Methane levels below threshold at Geregu Gas Plant.",
        time: "2 days ago",
        read: true,
    },
    {
        id: 5,
        type: "success",
        title: "New Plant Connected",
        message: "Egbin Power Plant has been successfully integrated into the monitoring network.",
        time: "3 days ago",
        read: true,
    },
];

const getIcon = (type: string) => {
    switch (type) {
        case "alert":
            return <AlertTriangle className="w-5 h-5 text-amber-500" />;
        case "success":
            return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
        case "info":
            return <Info className="w-5 h-5 text-blue-400" />;
        default:
            return <Bell className="w-5 h-5 text-gray-400" />;
    }
};

export default function NotificationsPage() {
    return (
        <div className="px-4 py-6 lg:px-7 lg:py-7 min-h-screen w-full max-w-4xl">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <Bell className="w-8 h-8 text-[#eeac1d]" />
                    <h1
                        className="text-3xl lg:text-4xl text-white font-semibold"
                        style={{ fontFamily: "var(--font-poppins)" }}
                    >
                        Notifications
                    </h1>
                </div>
                <p className="text-[#a5a4a4] text-sm" style={{ fontFamily: "var(--font-outfit)" }}>
                    Stay updated with alerts and system messages
                </p>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`bg-[#1a1a1a] rounded-2xl p-5 border transition-all hover:border-[#eeac1d]/30 ${notification.read
                                ? "border-[#2c2c2c]"
                                : "border-[#eeac1d]/50 bg-[#1a1a1a]/80"
                            }`}
                    >
                        <div className="flex items-start gap-4">
                            <div className="shrink-0 mt-1">
                                {getIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-4 mb-1">
                                    <h3
                                        className={`text-base font-medium ${notification.read ? "text-white/80" : "text-white"
                                            }`}
                                        style={{ fontFamily: "var(--font-outfit)" }}
                                    >
                                        {notification.title}
                                    </h3>
                                    {!notification.read && (
                                        <span className="shrink-0 w-2 h-2 rounded-full bg-[#eeac1d]" />
                                    )}
                                </div>
                                <p
                                    className="text-sm text-[#a5a4a4] mb-2"
                                    style={{ fontFamily: "var(--font-outfit)" }}
                                >
                                    {notification.message}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-[#666]">
                                    <Clock className="w-3 h-3" />
                                    <span style={{ fontFamily: "var(--font-outfit)" }}>
                                        {notification.time}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Coming Soon Banner */}
            <div className="mt-8 bg-linear-to-r from-[#eeac1d]/10 to-transparent rounded-2xl p-6 border border-[#eeac1d]/20">
                <p
                    className="text-[#eeac1d] text-sm font-medium mb-1"
                    style={{ fontFamily: "var(--font-outfit)" }}
                >
                    Coming Soon
                </p>
                <p
                    className="text-white/60 text-sm"
                    style={{ fontFamily: "var(--font-outfit)" }}
                >
                    Real-time notification preferences, email alerts, and push notifications will be available in the next update.
                </p>
            </div>
        </div>
    );
}

