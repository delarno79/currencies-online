"use client"

import { useActionState, useState } from "react"
import {
  Activity,
  AlertTriangle,
  Coins,
  Compass,
  FileText,
  HelpCircle,
  Key,
  Layout,
  MapPin,
  Megaphone,
  TrendingUp,
} from "lucide-react"
import {
  updateAdminCredentialsAction,
  updateSystemSettingsAction,
} from "../actions"

interface SettingsFormsProps {
  currentUsername: string
  heroTitle: string
  heroSubtitle: string
  card1Title: string
  card1Desc: string
  card1Btn: string
  card1Href: string
  card2Title: string
  card2Desc: string
  card2Btn: string
  card2Href: string
  card3Title: string
  card3Desc: string
  card3Btn: string
  card3Href: string
  card4Title: string
  card4Desc: string
  card4Btn: string
  card4Href: string
  directoryTitle: string
  directorySubtitle: string
  popcurrencyTitle: string
  popcurrencySubtitle: string
  popularCurrencies: string
  popularPairs: string
  liveRatesTitle: string
  liveRatesSubtitle: string
  factsTitle: string
  factsSubtitle: string
  factsContent: string
  mistakesTitle: string
  mistakesSubtitle: string
  mistakesContent: string
  regionsTitle: string
  regionsSubtitle: string
  adsenseClientId: string
  adsenseEnabled: string
  adsenseGlobalCode: string
}

type TabType =
  | "login"
  | "hero"
  | "cards"
  | "nearme"
  | "popcurrency"
  | "pop_exchange"
  | "live_rates"
  | "facts"
  | "mistakes"
  | "regions"
  | "adsense"

export function SettingsForms({
  currentUsername,
  heroTitle,
  heroSubtitle,
  card1Title,
  card1Desc,
  card1Btn,
  card1Href,
  card2Title,
  card2Desc,
  card2Btn,
  card2Href,
  card3Title,
  card3Desc,
  card3Btn,
  card3Href,
  card4Title,
  card4Desc,
  card4Btn,
  card4Href,
  directoryTitle,
  directorySubtitle,
  popcurrencyTitle,
  popcurrencySubtitle,
  popularCurrencies,
  popularPairs,
  liveRatesTitle,
  liveRatesSubtitle,
  factsTitle,
  factsSubtitle,
  factsContent,
  mistakesTitle,
  mistakesSubtitle,
  mistakesContent,
  regionsTitle,
  regionsSubtitle,
  adsenseClientId,
  adsenseEnabled,
  adsenseGlobalCode,
}: SettingsFormsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("login")

  const [credState, credAction, isCredPending] = useActionState(
    updateAdminCredentialsAction,
    null
  )
  const [sysState, sysAction, isSysPending] = useActionState(
    updateSystemSettingsAction,
    null
  )

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: "login", label: "Admin Login", icon: Key },
    { id: "adsense", label: "Google AdSense", icon: Megaphone },
    { id: "hero", label: "Hero Banner", icon: Layout },
    { id: "cards", label: "4 Cards View", icon: FileText },
    { id: "nearme", label: "Near Me Search", icon: MapPin },
    { id: "popcurrency", label: "Popular Badges", icon: Coins },
    { id: "pop_exchange", label: "Exchange Pairs Grid", icon: TrendingUp },
    { id: "live_rates", label: "Live Rates", icon: Activity },
    { id: "facts", label: "Currency Facts", icon: HelpCircle },
    { id: "mistakes", label: "Exchange Mistakes", icon: AlertTriangle },
    { id: "regions", label: "Regions Map", icon: Compass },
  ]

  return (
    <div className="space-y-6">
      {/* Sleek Premium Tab Bar Container */}
      <div className="rounded-xl border border-slate-700 bg-slate-900/30 p-2 backdrop-blur-md shadow-inner">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 font-bold text-xs uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/10 -translate-y-[1px]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white animate-pulse" : "text-slate-500"}`} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* 1. Admin Login Tab */}
      {activeTab === "login" && (
        <div className="space-y-6 rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
          <div>
            <h2 className="font-bold text-white text-xl">
              Administrator Login Settings
            </h2>
            <p className="mt-2 text-slate-400 text-sm">
              Manage username and update password credentials for admin dashboard access.
            </p>
          </div>

          {credState?.error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400 text-sm">
              {credState.error}
            </div>
          )}
          {credState?.success && (
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-400 text-sm">
              {credState.success}
            </div>
          )}

          <form action={credAction} className="space-y-6" autoComplete="off">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  defaultValue={currentUsername}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 transition focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">
                  Current Password (to confirm)
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Enter current password"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 placeholder-slate-600 transition focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Leave empty to keep current"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 placeholder-slate-600 transition focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isCredPending}
              className="rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-500 disabled:opacity-50"
            >
              {isCredPending ? "Updating Credentials..." : "Update Credentials"}
            </button>
          </form>
        </div>
      )}

      {/* 2. System Settings Form (all other tabs) */}
      {activeTab !== "login" && (
        <div className="space-y-6 rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
          {sysState?.error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400 text-sm">
              {sysState.error}
            </div>
          )}
          {sysState?.success && (
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-400 text-sm">
              {sysState.success}
            </div>
          )}

          <form action={sysAction} className="space-y-6" autoComplete="off">
            
            {/* Tab: Homepage Hero */}
            <div className={activeTab === "hero" ? "space-y-6" : "hidden"}>
              <div>
                <h2 className="font-bold text-white text-xl">Homepage Hero Section</h2>
                <p className="mt-2 text-slate-400 text-sm">Edit the global search banner titles.</p>
              </div>
              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">Hero Title</label>
                <input
                  type="text"
                  name="heroTitle"
                  defaultValue={heroTitle}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 transition focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">Hero Subtitle</label>
                <textarea
                  name="heroSubtitle"
                  defaultValue={heroSubtitle}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 transition focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Tab: 4 Cards View */}
            <div className={activeTab === "cards" ? "space-y-6" : "hidden"}>
              <div>
                <h2 className="font-bold text-white text-xl">4 Navigation Cards Settings</h2>
                <p className="mt-2 text-slate-400 text-sm">Customize text, action button labels, and link destinations for the 4 core card actions.</p>
              </div>

              {/* Card 1 */}
              <div className="border-slate-700 border-b pb-6 space-y-4">
                <h3 className="text-blue-400 font-bold text-sm uppercase tracking-wider">Card 1: Converter Card</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-300">Card 1 Title</label>
                    <input type="text" name="card1Title" defaultValue={card1Title} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-300">Card 1 Button Label</label>
                    <input type="text" name="card1Btn" defaultValue={card1Btn} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-300">Card 1 Description</label>
                  <input type="text" name="card1Desc" defaultValue={card1Desc} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-300">Card 1 Destination (Href)</label>
                  <input type="text" name="card1Href" defaultValue={card1Href} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              {/* Card 2 */}
              <div className="border-slate-700 border-b pb-6 space-y-4">
                <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-wider">Card 2: Compare Card</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-300">Card 2 Title</label>
                    <input type="text" name="card2Title" defaultValue={card2Title} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-300">Card 2 Button Label</label>
                    <input type="text" name="card2Btn" defaultValue={card2Btn} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-300">Card 2 Description</label>
                  <input type="text" name="card2Desc" defaultValue={card2Desc} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-300">Card 2 Destination (Href)</label>
                  <input type="text" name="card2Href" defaultValue={card2Href} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              {/* Card 3 */}
              <div className="border-slate-700 border-b pb-6 space-y-4">
                <h3 className="text-purple-400 font-bold text-sm uppercase tracking-wider">Card 3: Rates Card</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-300">Card 3 Title</label>
                    <input type="text" name="card3Title" defaultValue={card3Title} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-300">Card 3 Button Label</label>
                    <input type="text" name="card3Btn" defaultValue={card3Btn} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-300">Card 3 Description</label>
                  <input type="text" name="card3Desc" defaultValue={card3Desc} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-300">Card 3 Destination (Href)</label>
                  <input type="text" name="card3Href" defaultValue={card3Href} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              {/* Card 4 */}
              <div className="pb-2 space-y-4">
                <h3 className="text-amber-400 font-bold text-sm uppercase tracking-wider">Card 4: Guides Card</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-300">Card 4 Title</label>
                    <input type="text" name="card4Title" defaultValue={card4Title} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-300">Card 4 Button Label</label>
                    <input type="text" name="card4Btn" defaultValue={card4Btn} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-300">Card 4 Description</label>
                  <input type="text" name="card4Desc" defaultValue={card4Desc} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-300">Card 4 Destination (Href)</label>
                  <input type="text" name="card4Href" defaultValue={card4Href} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500" />
                </div>
              </div>
            </div>

            {/* Tab: Exchange Near Me */}
            <div className={activeTab === "nearme" ? "space-y-6" : "hidden"}>
              <div>
                <h2 className="font-bold text-white text-xl">Currency Exchange Near Me Section</h2>
                <p className="mt-2 text-slate-400 text-sm">Configure directory header text and description settings.</p>
              </div>
              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">Directory Title</label>
                <input
                  type="text"
                  name="directoryTitle"
                  defaultValue={directoryTitle}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 transition focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">Directory Subtitle</label>
                <textarea
                  name="directorySubtitle"
                  defaultValue={directorySubtitle}
                  rows={4}
                  className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 transition focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Tab: Popular Currency */}
            <div className={activeTab === "popcurrency" ? "space-y-6" : "hidden"}>
              <div>
                <h2 className="font-bold text-white text-xl">Popular Currency Section Settings</h2>
                <p className="mt-2 text-slate-400 text-sm">Customize titles and edit the display order of featured currency badges.</p>
              </div>
              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">Section Title</label>
                <input
                  type="text"
                  name="popcurrencyTitle"
                  defaultValue={popcurrencyTitle}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 transition focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">Section Subtitle</label>
                <textarea
                  name="popcurrencySubtitle"
                  defaultValue={popcurrencySubtitle}
                  rows={2}
                  className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 transition focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">Featured Currencies (Comma-separated codes)</label>
                <input
                  type="text"
                  name="popularCurrencies"
                  defaultValue={popularCurrencies}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 transition focus:border-blue-500 focus:outline-none"
                />
                <p className="mt-1 text-slate-500 text-xs">Specify exactly 16 codes (e.g. USD,EUR,JPY,GBP) for optimal layout grid alignment.</p>
              </div>
            </div>

            {/* Tab: Most Popular Currency Exchange */}
            <div className={activeTab === "pop_exchange" ? "space-y-6" : "hidden"}>
              <div>
                <h2 className="font-bold text-white text-xl">Most Popular Currency Exchange Settings</h2>
                <p className="mt-2 text-slate-400 text-sm">Configure pipe-separated values to specify SEO pairs and custom display names for Block 2 grid.</p>
              </div>
              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">Exchange Pairs Matrix (Comma and Pipe-separated)</label>
                <textarea
                  name="popularPairs"
                  defaultValue={popularPairs}
                  rows={6}
                  className="w-full resize-none font-mono text-sm rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 transition focus:border-blue-500 focus:outline-none"
                />
                <p className="mt-1 text-slate-500 text-xs">Example: USD to INR | US dollar to Rupees, USD to GBP | US dollars to Pounds</p>
              </div>
            </div>

            {/* Tab: Live Exchange Range */}
            <div className={activeTab === "live_rates" ? "space-y-6" : "hidden"}>
              <div>
                <h2 className="font-bold text-white text-xl">Live Exchange Rates Section</h2>
                <p className="mt-2 text-slate-400 text-sm">Edit rates widget headers and descriptions.</p>
              </div>
              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">Section Title</label>
                <input
                  type="text"
                  name="liveRatesTitle"
                  defaultValue={liveRatesTitle}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 transition focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">Section Subtitle</label>
                <textarea
                  name="liveRatesSubtitle"
                  defaultValue={liveRatesSubtitle}
                  rows={2}
                  className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 transition focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Tab: 8 Fascinating Currency */}
            <div className={activeTab === "facts" ? "space-y-6" : "hidden"}>
              <div>
                <h2 className="font-bold text-white text-xl">Fascinating Currency Facts Settings</h2>
                <p className="mt-2 text-slate-400 text-sm">Customize the title, descriptions, and individual facts content list.</p>
              </div>
              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">Facts Title</label>
                <input
                  type="text"
                  name="factsTitle"
                  defaultValue={factsTitle}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 transition focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">Facts Subtitle</label>
                <textarea
                  name="factsSubtitle"
                  defaultValue={factsSubtitle}
                  rows={2}
                  className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 transition focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">Facts Content (Icon | Title | Description per line)</label>
                <textarea
                  name="factsContent"
                  defaultValue={factsContent}
                  rows={8}
                  className="w-full font-mono text-sm rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 transition focus:border-blue-500 focus:outline-none"
                />
                <p className="mt-1 text-slate-500 text-xs">Example: 🌎 | Largest Financial Market | More than $7 trillion is traded...</p>
              </div>
            </div>

            {/* Tab: 8 Common Mistakes */}
            <div className={activeTab === "mistakes" ? "space-y-6" : "hidden"}>
              <div>
                <h2 className="font-bold text-white text-xl">Currency Exchange Mistakes Settings</h2>
                <p className="mt-2 text-slate-400 text-sm">Customize the title, descriptions, and individual mistakes to avoid.</p>
              </div>
              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">Mistakes Section Title</label>
                <input
                  type="text"
                  name="mistakesTitle"
                  defaultValue={mistakesTitle}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 transition focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">Mistakes Section Subtitle</label>
                <textarea
                  name="mistakesSubtitle"
                  defaultValue={mistakesSubtitle}
                  rows={2}
                  className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 transition focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">Mistakes Content (Title | Description per line)</label>
                <textarea
                  name="mistakesContent"
                  defaultValue={mistakesContent}
                  rows={8}
                  className="w-full font-mono text-sm rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 transition focus:border-blue-500 focus:outline-none"
                />
                <p className="mt-1 text-slate-500 text-xs">Example: Exchanging Money at Airports | Airport exchange counters often...</p>
              </div>
            </div>

            {/* Tab: Browse Countries by Region */}
            <div className={activeTab === "regions" ? "space-y-6" : "hidden"}>
              <div>
                <h2 className="font-bold text-white text-xl">Browse Countries by Region Settings</h2>
                <p className="mt-2 text-slate-400 text-sm">Configure section header texts representing region directories.</p>
              </div>
              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">Section Title</label>
                <input
                  type="text"
                  name="regionsTitle"
                  defaultValue={regionsTitle}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 transition focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">Section Subtitle</label>
                <textarea
                  name="regionsSubtitle"
                  defaultValue={regionsSubtitle}
                  rows={2}
                  className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 transition focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Tab: Google AdSense Settings */}
            <div className={activeTab === "adsense" ? "space-y-6" : "hidden"}>
              <div>
                <h2 className="font-bold text-white text-xl">Google AdSense & Ad Management</h2>
                <p className="mt-2 text-slate-400 text-sm">Toggle AdSense statuses, update Publisher IDs, and paste global tracking script codes.</p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">AdSense Status</label>
                  <select
                     name="adsenseEnabled"
                     defaultValue={adsenseEnabled}
                     className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 transition focus:border-blue-500 focus:outline-none"
                  >
                    <option value="false">Disabled (Show Placeholder Banners)</option>
                    <option value="true">Enabled (Render Active Adsense Tags)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">Google Publisher ID</label>
                  <input
                    type="text"
                    name="adsenseClientId"
                    defaultValue={adsenseClientId}
                    placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 transition focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-300 text-xs uppercase">Global Header Script / Ad Code</label>
                <textarea
                  name="adsenseGlobalCode"
                  defaultValue={adsenseGlobalCode}
                  rows={6}
                  placeholder="<!-- Google AdSense tag or other analytics codes -->"
                  className="w-full font-mono text-sm rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 transition focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Hidden field helpers to ensure fields from inactive tabs are submitted correctly */}
            {activeTab !== "hero" && (
              <>
                <input type="hidden" name="heroTitle" value={heroTitle} />
                <input type="hidden" name="heroSubtitle" value={heroSubtitle} />
              </>
            )}
            {activeTab !== "cards" && (
              <>
                <input type="hidden" name="card1Title" value={card1Title} />
                <input type="hidden" name="card1Desc" value={card1Desc} />
                <input type="hidden" name="card1Btn" value={card1Btn} />
                <input type="hidden" name="card1Href" value={card1Href} />
                <input type="hidden" name="card2Title" value={card2Title} />
                <input type="hidden" name="card2Desc" value={card2Desc} />
                <input type="hidden" name="card2Btn" value={card2Btn} />
                <input type="hidden" name="card2Href" value={card2Href} />
                <input type="hidden" name="card3Title" value={card3Title} />
                <input type="hidden" name="card3Desc" value={card3Desc} />
                <input type="hidden" name="card3Btn" value={card3Btn} />
                <input type="hidden" name="card3Href" value={card3Href} />
                <input type="hidden" name="card4Title" value={card4Title} />
                <input type="hidden" name="card4Desc" value={card4Desc} />
                <input type="hidden" name="card4Btn" value={card4Btn} />
                <input type="hidden" name="card4Href" value={card4Href} />
              </>
            )}
            {activeTab !== "nearme" && (
              <>
                <input type="hidden" name="directoryTitle" value={directoryTitle} />
                <input type="hidden" name="directorySubtitle" value={directorySubtitle} />
              </>
            )}
            {activeTab !== "popcurrency" && (
              <>
                <input type="hidden" name="popcurrencyTitle" value={popcurrencyTitle} />
                <input type="hidden" name="popcurrencySubtitle" value={popcurrencySubtitle} />
                <input type="hidden" name="popularCurrencies" value={popularCurrencies} />
              </>
            )}
            {activeTab !== "pop_exchange" && (
              <input type="hidden" name="popularPairs" value={popularPairs} />
            )}
            {activeTab !== "live_rates" && (
              <>
                <input type="hidden" name="liveRatesTitle" value={liveRatesTitle} />
                <input type="hidden" name="liveRatesSubtitle" value={liveRatesSubtitle} />
              </>
            )}
            {activeTab !== "facts" && (
              <>
                <input type="hidden" name="factsTitle" value={factsTitle} />
                <input type="hidden" name="factsSubtitle" value={factsSubtitle} />
                <input type="hidden" name="factsContent" value={factsContent} />
              </>
            )}
            {activeTab !== "mistakes" && (
              <>
                <input type="hidden" name="mistakesTitle" value={mistakesTitle} />
                <input type="hidden" name="mistakesSubtitle" value={mistakesSubtitle} />
                <input type="hidden" name="mistakesContent" value={mistakesContent} />
              </>
            )}
            {activeTab !== "regions" && (
              <>
                <input type="hidden" name="regionsTitle" value={regionsTitle} />
                <input type="hidden" name="regionsSubtitle" value={regionsSubtitle} />
              </>
            )}
            {activeTab !== "adsense" && (
              <>
                <input type="hidden" name="adsenseEnabled" value={adsenseEnabled} />
                <input type="hidden" name="adsenseClientId" value={adsenseClientId} />
                <input type="hidden" name="adsenseGlobalCode" value={adsenseGlobalCode} />
              </>
            )}

            <button
              type="submit"
              disabled={isSysPending}
              className="rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-500 disabled:opacity-50"
            >
              {isSysPending ? "Saving Settings..." : "Save Settings"}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
