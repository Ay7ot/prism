"use client";

import { Settings, User, Bell, Shield, Palette, Globe, Database, HelpCircle } from "lucide-react";

const settingsSections = [
  {
    id: "profile",
    icon: User,
    title: "Profile Settings",
    description: "Manage your account details and preferences",
    items: ["Display Name", "Email Address", "Phone Number", "Profile Photo"],
  },
  {
    id: "notifications",
    icon: Bell,
    title: "Notification Preferences",
    description: "Configure how you receive alerts and updates",
    items: ["Email Notifications", "Push Notifications", "SMS Alerts", "Alert Thresholds"],
  },
  {
    id: "security",
    icon: Shield,
    title: "Security",
    description: "Password, two-factor authentication, and sessions",
    items: ["Change Password", "Two-Factor Auth", "Active Sessions", "Login History"],
  },
  {
    id: "appearance",
    icon: Palette,
    title: "Appearance",
    description: "Customize the look and feel of your dashboard",
    items: ["Theme Selection", "Color Scheme", "Dashboard Layout", "Chart Preferences"],
  },
  {
    id: "language",
    icon: Globe,
    title: "Language & Region",
    description: "Set your preferred language and regional settings",
    items: ["Language", "Timezone", "Date Format", "Number Format"],
  },
  {
    id: "data",
    icon: Database,
    title: "Data & Privacy",
    description: "Manage your data and privacy settings",
    items: ["Export Data", "Data Retention", "Privacy Settings", "API Access"],
  },
];

export default function SettingsPage() {
  return (
    <div className="px-4 py-6 lg:px-7 lg:py-7 min-h-screen w-full max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Settings className="w-8 h-8 text-[#eeac1d]" />
          <h1
            className="text-3xl lg:text-4xl text-white font-semibold"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Settings
          </h1>
        </div>
        <p className="text-[#a5a4a4] text-sm" style={{ fontFamily: "var(--font-outfit)" }}>
          Manage your account and application preferences
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {settingsSections.map((section) => (
          <div
            key={section.id}
            className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#2c2c2c] hover:border-[#eeac1d]/30 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#2c2c2c] flex items-center justify-center group-hover:bg-[#eeac1d]/10 transition-colors">
                <section.icon className="w-6 h-6 text-[#eeac1d]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className="text-lg font-medium text-white mb-1"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {section.title}
                </h3>
                <p
                  className="text-sm text-[#a5a4a4] mb-3"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {section.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {section.items.map((item, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-md bg-[#2c2c2c] text-[#666]"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-[#1a1a1a] rounded-2xl p-6 border border-[#2c2c2c]">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#2c2c2c] flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-[#a5a4a4]" />
          </div>
          <div className="flex-1">
            <h3
              className="text-lg font-medium text-white mb-1"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Need Help?
            </h3>
            <p
              className="text-sm text-[#a5a4a4]"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Contact our support team for assistance with your IRIS dashboard
            </p>
          </div>
          <button
            className="px-5 py-2.5 bg-[#eeac1d] text-black font-medium rounded-xl hover:bg-[#eeac1d]/90 transition-colors"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Contact Support
          </button>
        </div>
      </div>

      {/* Coming Soon Banner */}
      <div className="mt-6 bg-gradient-to-r from-[#eeac1d]/10 to-transparent rounded-2xl p-6 border border-[#eeac1d]/20">
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
          Full settings functionality will be available in the next release. Stay tuned for complete customization options.
        </p>
      </div>
    </div>
  );
}

