import { db } from "@/lib/db"
import { SettingsForms } from "./settings-forms"

export default async function AdminSettingsPage() {
  const admin = await db.admin.findFirst()
  const settingsList = await db.systemSetting.findMany()

  const getSetting = (key: string, defaultValue: string) => {
    return settingsList.find((s) => s.key === key)?.value ?? defaultValue
  }

  const currentUsername = admin?.username ?? "admin"
  
  // Hero Settings
  const heroTitle = getSetting("hero_title", "World's Currency Directory & Exchange Rates Database")
  const heroSubtitle = getSetting("hero_subtitle", "Search any country's official currency, currency code, symbol, and live exchange rates. Your ultimate global currency converter resource.")

  // 4 Cards View
  const card1Title = getSetting("card_1_title", "Currency Converter")
  const card1Desc = getSetting("card_1_desc", "Convert between any currencies instantly with real-time exchange rates.")
  const card1Btn = getSetting("card_1_btn", "Convert Now")
  const card1Href = getSetting("card_1_href", "/converter")

  const card2Title = getSetting("card_2_title", "Compare Currencies")
  const card2Desc = getSetting("card_2_desc", "Compare currencies, countries, exchange rates, and purchasing power side by side.")
  const card2Btn = getSetting("card_2_btn", "Compare Now")
  const card2Href = getSetting("card_2_href", "/compare")

  const card3Title = getSetting("card_3_title", "Exchange Rates")
  const card3Desc = getSetting("card_3_desc", "View live, historical, and forecast exchange rates for any currency pair.")
  const card3Btn = getSetting("card_3_btn", "View Rates")
  const card3Href = getSetting("card_3_href", "/exchange-rates")

  const card4Title = getSetting("card_4_title", "Currency Guides")
  const card4Desc = getSetting("card_4_desc", "Read expert articles, guides, and insights about global currencies.")
  const card4Btn = getSetting("card_4_btn", "Read Blog")
  const card4Href = getSetting("card_4_href", "/blog")

  // Directory Search Settings
  const directoryTitle = getSetting("directory_title", "Currency Exchange Near Me")
  const directorySubtitle = getSetting("directory_subtitle", "Find physical currency exchange stores, bureaus, and local offices across the United States. Search by city or ZIP code to view listings, directions, ratings, and phone numbers.")

  // Popular Currency Settings
  const popcurrencyTitle = getSetting("popcurrency_title", "Popular Currencies")
  const popcurrencySubtitle = getSetting("popcurrency_subtitle", "Explore the world's most used currencies.")
  const popularCurrencies = getSetting("popular_currencies", "USD,EUR,JPY,GBP,CAD,AUD,CHF,CNY,INR,MXN,BRL,SGD,NZD,HKD,SEK,KRW")

  // Most Popular Currency Exchange Settings
  const popularPairs = getSetting(
    "popular_pairs",
    "USD-EUR, EUR-USD, USD-INR, INR-USD, USD-GBP, GBP-USD, USD-CAD, CAD-USD, USD-AUD, AUD-USD, USD-MXN, USD-JPY, USD-PHP, PHP-USD, MXN-USD, USD-MXN, USD-THB, THB-USD, VND-USD, USD-VND, JPY-USD, USD-JPY, COP-USD, USD-COP, USD-KRW, KRW-USD, CHF-USD, USD-CHF, MXN-USD, USD-PKR, PKR-USD, USD-SGD, SGD-USD, USD-ZAR, ZAR-USD, USD-NPR, NPR-USD, USD-MYR, USD-IDR, NZD-USD, USD-NZD, USD-BDT, USD-PLN, USD-KES, CNY-USD, SEK-USD, CZK-USD, USD-LKR, TRY-USD, USD-NOK, MYR-USD, USD-EGP, HKD-USD"
  )

  // Live Exchange Range Settings
  const liveRatesTitle = getSetting("live_rates_title", "Live Exchange Rates")
  const liveRatesSubtitle = getSetting("live_rates_subtitle", "Real-time exchange rates updated every second")

  // 8 Fascinating Currency Settings
  const factsTitle = getSetting("facts_title", "8 Fascinating Currency Facts")
  const factsSubtitle = getSetting("facts_subtitle", "Did you know? Explore these interesting facts about foreign exchange markets and global currencies.")
  const factsContent = getSetting(
    "facts_content",
    "🌎 | Largest Financial Market | More than $7 trillion is traded in the foreign exchange market every day, making it the largest financial market in the world by volume.\n" +
    "💵 | USD Dominance | The US Dollar (USD) is involved in nearly 90% of all global currency transactions, serving as the world's primary reserve currency.\n" +
    "💶 | New Kid on the Block | The Euro (EUR) became an official currency in 1999, making it one of the newest major world currencies in circulation.\n" +
    "💴 | Safe-Haven JPY | The Japanese Yen (JPY) is among the most traded currencies and is widely considered a safe-haven asset during global economic uncertainty.\n" +
    "🦆 | The Canadian 'Loonie' | The Canadian Dollar is often called the 'Loonie' because of the common loon bird featured on the reverse of its one-dollar coin.\n" +
    "💳 | Polymer Currency Pioneers | The Australian Dollar was the first currency to be produced using polymer (plastic) banknotes to prevent counterfeiting.\n" +
    "📊 | Most Traded Pairs | The most traded currency pairs in the foreign exchange market are typically EUR/USD, USD/JPY, GBP/USD, and USD/CHF.\n" +
    "🏔️ | Ultra-Stable Swiss Franc | The Swiss Franc (CHF) is widely regarded as one of the world's most stable currencies, backed by a strong, neutral national economy."
  )

  // 8 Common Currency Exchange Mistakes Settings
  const mistakesTitle = getSetting("mistakes_title", "8 Common Currency Exchange Mistakes to Avoid")
  const mistakesSubtitle = getSetting("mistakes_subtitle", "Keep these pitfalls in mind to secure the best rates and keep more of your funds during exchange transactions.")
  const mistakesContent = getSetting(
    "mistakes_content",
    "Exchanging Money at Airports | Airport exchange counters often offer less favorable rates and higher fees than banks or local exchange providers.\n" +
    "Ignoring Hidden Conversion Fees | Many banks, credit cards, and transfer services add hidden markups to the exchange rate rather than offering the interbank value.\n" +
    "Accepting Dynamic Currency Conversion (DCC) | When paying abroad, merchants may offer to charge you in your home currency. This convenience often comes with a heavy exchange rate markup.\n" +
    "Failing to Compare Exchange Rates | Rates can vary significantly between different providers. Comparing rates online before booking can save a substantial amount on large transactions.\n" +
    "Waiting Until the Last Minute | Exchanging currency during emergencies or immediately before travel limits your options and often forces you to accept high exchange costs.\n" +
    "Not Checking Transfer Fees | A seemingly favorable exchange rate can easily be offset by high flat service charges or hidden transaction transfer fees.\n" +
    "Using Unlicensed Exchange Services | Always use reputable financial institutions and licensed currency exchange providers to protect your money from fraud.\n" +
    "Assuming the Advertised Rate Is Final | The advertised rate in street-level booths often does not include service charges, commissions, or local transaction fees."
  )

  // Browse Countries by Region Settings
  const regionsTitle = getSetting("regions_title", "Browse Countries by Region")
  const regionsSubtitle = getSetting("regions_subtitle", "Explore global currencies and economic indicators divided by continent.")

  // AdSense Settings
  const adsenseClientId = getSetting("adsense_client_id", "")
  const adsenseEnabled = getSetting("adsense_enabled", "false")
  const adsenseGlobalCode = getSetting("adsense_global_code", "")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-extrabold text-3xl tracking-tight">
          System Settings
        </h1>
        <p className="mt-2 text-slate-400">
          Manage your administration profile credentials and global settings.
        </p>
      </div>

      <SettingsForms
        currentUsername={currentUsername}
        heroTitle={heroTitle}
        heroSubtitle={heroSubtitle}
        card1Title={card1Title}
        card1Desc={card1Desc}
        card1Btn={card1Btn}
        card1Href={card1Href}
        card2Title={card2Title}
        card2Desc={card2Desc}
        card2Btn={card2Btn}
        card2Href={card2Href}
        card3Title={card3Title}
        card3Desc={card3Desc}
        card3Btn={card3Btn}
        card3Href={card3Href}
        card4Title={card4Title}
        card4Desc={card4Desc}
        card4Btn={card4Btn}
        card4Href={card4Href}
        directoryTitle={directoryTitle}
        directorySubtitle={directorySubtitle}
        popcurrencyTitle={popcurrencyTitle}
        popcurrencySubtitle={popcurrencySubtitle}
        popularCurrencies={popularCurrencies}
        popularPairs={popularPairs}
        liveRatesTitle={liveRatesTitle}
        liveRatesSubtitle={liveRatesSubtitle}
        factsTitle={factsTitle}
        factsSubtitle={factsSubtitle}
        factsContent={factsContent}
        mistakesTitle={mistakesTitle}
        mistakesSubtitle={mistakesSubtitle}
        mistakesContent={mistakesContent}
        regionsTitle={regionsTitle}
        regionsSubtitle={regionsSubtitle}
        adsenseClientId={adsenseClientId}
        adsenseEnabled={adsenseEnabled}
        adsenseGlobalCode={adsenseGlobalCode}
      />
    </div>
  )
}
