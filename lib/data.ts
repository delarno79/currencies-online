export interface Country {
  id: string // slug e.g. "united-states"
  name: string
  flag: string // emoji flag e.g. "🇺🇸"
  capital: string
  population: string
  currencyCode: string
  currencyName: string
  currencySymbol: string
  usdRate: number // how much of this currency = 1 USD
  relatedCountries: string[] // ids of related countries
  description: string
  region: string
  purchasingPowerIndex: number // Out of 100
  inflationRate: number // Percentage
}

export interface Currency {
  id: string // slug e.g. "us-dollar"
  name: string
  code: string
  symbol: string
  usdRate: number // how much of this currency = 1 USD
  overview: string
  countries: { name: string; id: string; flag: string }[]
  faqs: { question: string; answer: string }[]
}

export interface BlogPost {
  id: string
  title: string
  summary: string
  content: string
  date: string
  author: string
  readTime: string
  category: string
  imageUrl: string
}

// Deterministic historical chart generator based on base rate
export function generateHistory(baseRate: number, days = 30) {
  const history = []
  // Start from June 6, 2026 backwards
  const baseTime = new Date(2026, 5, 6).getTime()
  for (let i = days; i >= 0; i--) {
    const date = new Date(baseTime - i * 24 * 60 * 60 * 1000)
    const dateStr = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })

    // Deterministic pseudo-random variation
    const wave1 = Math.sin(i * 0.35 + baseRate)
    const wave2 = Math.cos(i * 0.15 - baseRate)
    const fluctuation = (wave1 * 0.012 + wave2 * 0.008) * baseRate

    history.push({
      date: dateStr,
      rate: Number((baseRate + fluctuation).toFixed(4)),
      inverseRate: Number((1 / (baseRate + fluctuation)).toFixed(4)),
    })
  }
  return history
}

export const countries: Country[] = [
  {
    id: "united-states",
    name: "United States",
    flag: "🇺🇸",
    capital: "Washington, D.C.",
    population: "333.2 million",
    currencyCode: "USD",
    currencyName: "US Dollar",
    currencySymbol: "$",
    usdRate: 1.0,
    relatedCountries: ["canada", "united-kingdom", "germany", "japan"],
    description:
      "The United States of America is a federal republic comprising 50 states. It is the world's largest economy by nominal GDP and the primary issuer of the US Dollar, the world's dominant reserve currency.",
    region: "Americas",
    purchasingPowerIndex: 100.0,
    inflationRate: 3.1,
  },
  {
    id: "japan",
    name: "Japan",
    flag: "🇯🇵",
    capital: "Tokyo",
    population: "125.1 million",
    currencyCode: "JPY",
    currencyName: "Japanese Yen",
    currencySymbol: "¥",
    usdRate: 155.45,
    relatedCountries: ["south-korea", "china", "united-states", "australia"],
    description:
      "Japan is an island country in East Asia. It is a highly developed country with the world's fourth-largest economy. The Japanese Yen is heavily traded and considered a safe-haven asset in global financial markets.",
    region: "Asia",
    purchasingPowerIndex: 68.2,
    inflationRate: 2.5,
  },
  {
    id: "india",
    name: "India",
    flag: "🇮🇳",
    capital: "New Delhi",
    population: "1.417 billion",
    currencyCode: "INR",
    currencyName: "Indian Rupee",
    currencySymbol: "₹",
    usdRate: 83.42,
    relatedCountries: [
      "united-kingdom",
      "united-states",
      "singapore",
      "united-arab-emirates",
    ],
    description:
      "India is a country in South Asia, the second-most populous country, and the fastest-growing major economy. The Indian Rupee is managed by the Reserve Bank of India.",
    region: "Asia",
    purchasingPowerIndex: 42.1,
    inflationRate: 4.8,
  },
  {
    id: "brazil",
    name: "Brazil",
    flag: "🇧🇷",
    capital: "Brasília",
    population: "215.3 million",
    currencyCode: "BRL",
    currencyName: "Brazilian Real",
    currencySymbol: "R$",
    usdRate: 5.25,
    relatedCountries: ["mexico", "argentina", "united-states", "germany"],
    description:
      "Brazil is the largest country in South America and Latin America. Its economy is the largest in Latin America, and the Brazilian Real is its official legal tender.",
    region: "Americas",
    purchasingPowerIndex: 35.6,
    inflationRate: 3.9,
  },
  {
    id: "germany",
    name: "Germany",
    flag: "🇩🇪",
    capital: "Berlin",
    population: "83.8 million",
    currencyCode: "EUR",
    currencyName: "Euro",
    currencySymbol: "€",
    usdRate: 0.922,
    relatedCountries: [
      "france",
      "italy",
      "spain",
      "netherlands",
      "united-kingdom",
    ],
    description:
      "Germany is a country in Central Europe. It has the largest economy in Europe and is a founding member of the European Union, utilizing the shared Euro currency.",
    region: "Europe",
    purchasingPowerIndex: 88.5,
    inflationRate: 2.2,
  },
  {
    id: "france",
    name: "France",
    flag: "🇫🇷",
    capital: "Paris",
    population: "67.9 million",
    currencyCode: "EUR",
    currencyName: "Euro",
    currencySymbol: "€",
    usdRate: 0.922,
    relatedCountries: ["germany", "italy", "spain", "united-kingdom", "canada"],
    description:
      "France is a country located in Western Europe. It is a key member of the Eurozone and one of the largest economies globally, known for tourism, fashion, and technology.",
    region: "Europe",
    purchasingPowerIndex: 82.4,
    inflationRate: 2.1,
  },
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    capital: "Ottawa",
    population: "38.9 million",
    currencyCode: "CAD",
    currencyName: "Canadian Dollar",
    currencySymbol: "CA$",
    usdRate: 1.372,
    relatedCountries: [
      "united-states",
      "united-kingdom",
      "australia",
      "germany",
    ],
    description:
      "Canada is a country in North America. It is the second-largest country by total area and has close financial ties to the United States. Its currency is the Canadian Dollar.",
    region: "Americas",
    purchasingPowerIndex: 89.1,
    inflationRate: 2.7,
  },
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    capital: "Canberra",
    population: "26.0 million",
    currencyCode: "AUD",
    currencyName: "Australian Dollar",
    currencySymbol: "A$",
    usdRate: 1.508,
    relatedCountries: [
      "new-zealand",
      "united-kingdom",
      "united-states",
      "singapore",
    ],
    description:
      "Australia is a sovereign country comprising the mainland of the Australian continent. The Australian Dollar is a major currency in foreign exchange trading, popular for its commodity exposure.",
    region: "Oceania",
    purchasingPowerIndex: 91.3,
    inflationRate: 3.6,
  },
  {
    id: "united-kingdom",
    name: "United Kingdom",
    flag: "🇬🇧",
    capital: "London",
    population: "67.3 million",
    currencyCode: "GBP",
    currencyName: "British Pound",
    currencySymbol: "£",
    usdRate: 0.784,
    relatedCountries: [
      "united-states",
      "ireland",
      "germany",
      "france",
      "australia",
    ],
    description:
      "The United Kingdom of Great Britain and Northern Ireland is an island country in Northwestern Europe. The British Pound Sterling is the oldest currency in continuous use.",
    region: "Europe",
    purchasingPowerIndex: 85.6,
    inflationRate: 2.0,
  },
  {
    id: "china",
    name: "China",
    flag: "🇨🇳",
    capital: "Beijing",
    population: "1.412 billion",
    currencyCode: "CNY",
    currencyName: "Chinese Yuan",
    currencySymbol: "¥",
    usdRate: 7.24,
    relatedCountries: ["japan", "south-korea", "united-states", "singapore"],
    description:
      "China is a country in East Asia. It is the world's second-largest economy by nominal GDP. The Chinese Yuan (also known as Renminbi) is heavily managed by the People's Bank of China.",
    region: "Asia",
    purchasingPowerIndex: 52.8,
    inflationRate: 0.3,
  },
  {
    id: "mexico",
    name: "Mexico",
    flag: "🇲🇽",
    capital: "Mexico City",
    population: "127.5 million",
    currencyCode: "MXN",
    currencyName: "Mexican Peso",
    currencySymbol: "Mex$",
    usdRate: 16.95,
    relatedCountries: ["united-states", "brazil", "spain", "canada"],
    description:
      "Mexico is a country in the southern portion of North America. It is a major manufacturing and trading hub, and the Mexican Peso is the most traded currency in Latin America.",
    region: "Americas",
    purchasingPowerIndex: 44.2,
    inflationRate: 4.6,
  },
  {
    id: "switzerland",
    name: "Switzerland",
    flag: "🇨🇭",
    capital: "Bern",
    population: "8.7 million",
    currencyCode: "CHF",
    currencyName: "Swiss Franc",
    currencySymbol: "CHF",
    usdRate: 0.898,
    relatedCountries: ["germany", "france", "italy", "united-states"],
    description:
      "Switzerland is a landlocked country at the confluence of Western, Central, and Southern Europe. The Swiss Franc is widely recognized as a preeminent safe-haven currency due to Swiss economic stability.",
    region: "Europe",
    purchasingPowerIndex: 115.4,
    inflationRate: 1.4,
  },
  {
    id: "south-korea",
    name: "South Korea",
    flag: "🇰🇷",
    capital: "Seoul",
    population: "51.7 million",
    currencyCode: "KRW",
    currencyName: "South Korean Won",
    currencySymbol: "₩",
    usdRate: 1362.4,
    relatedCountries: ["japan", "china", "united-states", "singapore"],
    description:
      "South Korea is a sovereign state in East Asia, constituting the southern part of the Korean Peninsula. It is highly technologically advanced, with the South Korean Won serving as its official currency.",
    region: "Asia",
    purchasingPowerIndex: 72.8,
    inflationRate: 2.7,
  },
  {
    id: "singapore",
    name: "Singapore",
    flag: "🇸🇬",
    capital: "Singapore",
    population: "5.6 million",
    currencyCode: "SGD",
    currencyName: "Singapore Dollar",
    currencySymbol: "S$",
    usdRate: 1.348,
    relatedCountries: [
      "malaysia",
      "indonesia",
      "australia",
      "china",
      "united-states",
    ],
    description:
      "Singapore is a sovereign island country and city-state in maritime Southeast Asia. It is a global financial center, and the Singapore Dollar is one of the strongest currencies in Asia.",
    region: "Asia",
    purchasingPowerIndex: 87.2,
    inflationRate: 2.7,
  },
  {
    id: "south-africa",
    name: "South Africa",
    flag: "🇿🇦",
    capital: "Pretoria",
    population: "59.8 million",
    currencyCode: "ZAR",
    currencyName: "South African Rand",
    currencySymbol: "R",
    usdRate: 18.52,
    relatedCountries: ["united-kingdom", "germany", "nigeria", "egypt"],
    description:
      "South Africa is the southernmost country in Africa. It is a major industrial hub, and the South African Rand is widely used and traded across the southern African region.",
    region: "Africa",
    purchasingPowerIndex: 41.5,
    inflationRate: 5.2,
  },
  {
    id: "sweden",
    name: "Sweden",
    flag: "🇸🇪",
    capital: "Stockholm",
    population: "10.4 million",
    currencyCode: "SEK",
    currencyName: "Swedish Krona",
    currencySymbol: "kr",
    usdRate: 10.65,
    relatedCountries: ["norway", "denmark", "germany", "finland"],
    description:
      "Sweden is a Nordic country in Scandinavia. Sweden is a highly developed industrial nation, and the Swedish Krona is its official currency.",
    region: "Europe",
    purchasingPowerIndex: 84.7,
    inflationRate: 2.3,
  },
  {
    id: "norway",
    name: "Norway",
    flag: "🇳🇴",
    capital: "Oslo",
    population: "5.4 million",
    currencyCode: "NOK",
    currencyName: "Norwegian Krone",
    currencySymbol: "kr",
    usdRate: 10.58,
    relatedCountries: ["sweden", "denmark", "united-kingdom", "germany"],
    description:
      "Norway is a Nordic country in Northern Europe. It is wealthy in natural resources, especially oil and gas. The Norwegian Krone is its official tender.",
    region: "Europe",
    purchasingPowerIndex: 94.2,
    inflationRate: 3.0,
  },
  {
    id: "denmark",
    name: "Denmark",
    flag: "🇩🇰",
    capital: "Copenhagen",
    population: "5.9 million",
    currencyCode: "DKK",
    currencyName: "Danish Krone",
    currencySymbol: "kr",
    usdRate: 6.88,
    relatedCountries: ["germany", "sweden", "norway", "united-kingdom"],
    description:
      "Denmark is a Nordic country in Northern Europe. The Danish Krone is pegged to the Euro via the European Exchange Rate Mechanism (ERM II).",
    region: "Europe",
    purchasingPowerIndex: 90.8,
    inflationRate: 0.8,
  },
  {
    id: "united-arab-emirates",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    capital: "Abu Dhabi",
    population: "9.4 million",
    currencyCode: "AED",
    currencyName: "UAE Dirham",
    currencySymbol: "د.إ",
    usdRate: 3.673,
    relatedCountries: [
      "saudi-arabia",
      "india",
      "united-kingdom",
      "united-states",
    ],
    description:
      "The United Arab Emirates is a country in West Asia. It is a major petroleum exporter and tourism center. The UAE Dirham has been pegged to the US Dollar at a rate of 3.6725 since 1997.",
    region: "Middle East",
    purchasingPowerIndex: 95.1,
    inflationRate: 1.6,
  },
  {
    id: "saudi-arabia",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    capital: "Riyadh",
    population: "32.2 million",
    currencyCode: "SAR",
    currencyName: "Saudi Riyal",
    currencySymbol: "ر.س",
    usdRate: 3.75,
    relatedCountries: [
      "united-arab-emirates",
      "egypt",
      "united-states",
      "india",
    ],
    description:
      "Saudi Arabia is a country in West Asia, constituting the bulk of the Arabian Peninsula. The Saudi Riyal is pegged to the US Dollar at a fixed rate of 3.75.",
    region: "Middle East",
    purchasingPowerIndex: 78.4,
    inflationRate: 1.6,
  },
  {
    id: "egypt",
    name: "Egypt",
    flag: "🇪🇬",
    capital: "Cairo",
    population: "109.3 million",
    currencyCode: "EGP",
    currencyName: "Egyptian Pound",
    currencySymbol: "E£",
    usdRate: 47.15,
    relatedCountries: [
      "saudi-arabia",
      "united-arab-emirates",
      "turkey",
      "south-africa",
    ],
    description:
      "Egypt is a country spanning the northeast corner of Africa and southwest corner of Asia. The Egyptian Pound is heavily influenced by domestic inflation and international trade routes.",
    region: "Africa",
    purchasingPowerIndex: 22.3,
    inflationRate: 32.5,
  },
  {
    id: "nigeria",
    name: "Nigeria",
    flag: "🇳🇬",
    capital: "Abuja",
    population: "218.5 million",
    currencyCode: "NGN",
    currencyName: "Nigerian Naira",
    currencySymbol: "₦",
    usdRate: 1480.0,
    relatedCountries: [
      "south-africa",
      "united-kingdom",
      "united-states",
      "egypt",
    ],
    description:
      "Nigeria is a country in West Africa, the most populous in Africa. The Nigerian Naira has undergone significant exchange rate revisions and volatility in recent years.",
    region: "Africa",
    purchasingPowerIndex: 18.7,
    inflationRate: 33.7,
  },
  {
    id: "turkey",
    name: "Turkey",
    flag: "🇹🇷",
    capital: "Ankara",
    population: "85.3 million",
    currencyCode: "TRY",
    currencyName: "Turkish Lira",
    currencySymbol: "₺",
    usdRate: 32.24,
    relatedCountries: ["germany", "egypt", "saudi-arabia", "united-kingdom"],
    description:
      "Turkey is a transcontinental country located mainly on the Anatolian Peninsula in West Asia. The Turkish Lira has faced high inflation rates and currency depreciation over the past decade.",
    region: "Middle East",
    purchasingPowerIndex: 39.5,
    inflationRate: 69.8,
  },
  {
    id: "new-zealand",
    name: "New Zealand",
    flag: "🇳🇿",
    capital: "Wellington",
    population: "5.1 million",
    currencyCode: "NZD",
    currencyName: "New Zealand Dollar",
    currencySymbol: "NZ$",
    usdRate: 1.628,
    relatedCountries: [
      "australia",
      "united-kingdom",
      "united-states",
      "singapore",
    ],
    description:
      "New Zealand is an island country in the southwestern Pacific Ocean. The New Zealand Dollar is one of the top ten most traded currencies in the global foreign exchange market.",
    region: "Oceania",
    purchasingPowerIndex: 82.5,
    inflationRate: 4.0,
  },
]

export const currencies: Currency[] = [
  {
    id: "us-dollar",
    name: "US Dollar",
    code: "USD",
    symbol: "$",
    usdRate: 1.0,
    overview:
      "The United States Dollar (USD) is the official currency of the United States and its territories. As the primary global reserve currency, it is widely held by central banks and used extensively in international transactions. It is managed by the Federal Reserve System, the central banking system of the United States.",
    countries: [{ name: "United States", id: "united-states", flag: "🇺🇸" }],
    faqs: [
      {
        question: "Is the US Dollar pegged to gold?",
        answer:
          "No, the US Dollar is a fiat currency and has not been linked to gold since 1971 when President Richard Nixon terminated the convertibility of US Dollars to gold.",
      },
      {
        question: "Which bank issues the US Dollar?",
        answer:
          "The Federal Reserve Board of Governors and the Federal Reserve Banks (together, the Fed) issue USD banknotes.",
      },
    ],
  },
  {
    id: "euro",
    name: "Euro",
    code: "EUR",
    symbol: "€",
    usdRate: 0.922,
    overview:
      "The Euro (EUR) is the official currency of the Eurozone, which consists of 20 of the 27 member states of the European Union. It is the second-most traded currency in the world after the US Dollar. The European Central Bank (ECB), based in Frankfurt, determines the monetary policy of the Eurozone.",
    countries: [
      { name: "Germany", id: "germany", flag: "🇩🇪" },
      { name: "France", id: "france", flag: "🇫🇷" },
    ],
    faqs: [
      {
        question: "When was the Euro introduced?",
        answer:
          "The Euro was introduced virtually on January 1, 1999, for accounting and electronic payments. Physical banknotes and coins entered circulation on January 1, 2002.",
      },
      {
        question: "What is the role of the ECB?",
        answer:
          "The European Central Bank manages the euro, maintains price stability, and implements EU economic & monetary policy.",
      },
    ],
  },
  {
    id: "japanese-yen",
    name: "Japanese Yen",
    code: "JPY",
    symbol: "¥",
    usdRate: 155.45,
    overview:
      "The Japanese Yen (JPY) is the official currency of Japan. It is the third-most traded currency in the foreign exchange market and is widely used as a reserve currency. The Bank of Japan (BOJ) implements monetary policy, which has historically focused on low-interest rates to stimulate economic growth.",
    countries: [{ name: "Japan", id: "japan", flag: "🇯🇵" }],
    faqs: [
      {
        question: "Why is the Japanese Yen considered a safe-haven asset?",
        answer:
          "Japan's large net foreign assets, steady trade surpluses, and historically low-interest rates make the Yen attractive during global economic uncertainty.",
      },
      {
        question: "Who controls JPY currency supply?",
        answer:
          "The Bank of Japan (BOJ) controls the supply and issues JPY banknotes.",
      },
    ],
  },
  {
    id: "british-pound",
    name: "British Pound",
    code: "GBP",
    symbol: "£",
    usdRate: 0.784,
    overview:
      "The British Pound Sterling (GBP) is the official currency of the United Kingdom, its crown dependencies, and several overseas territories. It is the oldest currency still in continuous use and is one of the most traded currencies worldwide. The Bank of England oversees the currency's policy.",
    countries: [{ name: "United Kingdom", id: "united-kingdom", flag: "🇬🇧" }],
    faqs: [
      {
        question: "What does 'Sterling' mean?",
        answer:
          "Sterling is the official name of the currency unit itself, while Pound is the denomination. It is derived from old silver coins called sterlings.",
      },
      {
        question: "Does Scotland use a different pound?",
        answer:
          "Scottish banks issue their own banknotes, but they are fully pegged and interchangeable with Bank of England pounds.",
      },
    ],
  },
  {
    id: "canadian-dollar",
    name: "Canadian Dollar",
    code: "CAD",
    symbol: "C$",
    usdRate: 1.372,
    overview:
      "The Canadian Dollar (CAD) is the currency of Canada. Because of Canada's vast natural resource exports, the Canadian Dollar is often categorized as a commodity currency, strongly correlated with oil and metal prices. It is issued by the Bank of Canada.",
    countries: [{ name: "Canada", id: "canada", flag: "🇨🇦" }],
    faqs: [
      {
        question: "Why is the CAD called the 'Loonie'?",
        answer:
          "The nickname comes from the common loon, a bird featured on the reverse side of the 1-dollar coin.",
      },
    ],
  },
  {
    id: "australian-dollar",
    name: "Australian Dollar",
    code: "AUD",
    symbol: "A$",
    usdRate: 1.508,
    overview:
      "The Australian Dollar (AUD) is the official currency of the Commonwealth of Australia. It is highly popular in foreign exchange trading due to Australia's resource-rich economy, high interest rates relative to other nations, and proximity to major Asian markets.",
    countries: [{ name: "Australia", id: "australia", flag: "🇦🇺" }],
    faqs: [
      {
        question: "Is the Australian Dollar a commodity currency?",
        answer:
          "Yes, it is highly sensitive to prices of major Australian commodity exports like iron ore, coal, and gold.",
      },
    ],
  },
  {
    id: "swiss-franc",
    name: "Swiss Franc",
    code: "CHF",
    symbol: "CHF",
    usdRate: 0.898,
    overview:
      "The Swiss Franc (CHF) is the currency of Switzerland and Liechtenstein. It is issued by the Swiss National Bank (SNB). It is widely regarded as one of the ultimate safe-haven currencies due to Switzerland's high neutrality, political stability, and strong economic structure.",
    countries: [{ name: "Switzerland", id: "switzerland", flag: "🇨🇭" }],
    faqs: [
      {
        question: "What makes Swiss Francs so stable?",
        answer:
          "Switzerland's low national debt, independent monetary policy, and historical gold backing (until 2000) have solidified CHF as a premier store of value.",
      },
    ],
  },
  {
    id: "chinese-yuan",
    name: "Chinese Yuan",
    code: "CNY",
    symbol: "¥",
    usdRate: 7.24,
    overview:
      "The Chinese Yuan (CNY), officially known as the Renminbi (RMB), is the currency of the People's Republic of China. It is managed under a crawling peg system by the People's Bank of China (PBOC) to maintain currency competitiveness.",
    countries: [{ name: "China", id: "china", flag: "🇨🇳" }],
    faqs: [
      {
        question: "What is the difference between Yuan and Renminbi?",
        answer:
          "Renminbi is the official name of the currency system, whereas Yuan is the actual unit of account.",
      },
    ],
  },
  {
    id: "indian-rupee",
    name: "Indian Rupee",
    code: "INR",
    symbol: "₹",
    usdRate: 83.42,
    overview:
      "The Indian Rupee (INR) is the currency of the Republic of India. The currency symbol (₹) was officially adopted in 2010. It is issued and regulated by the Reserve Bank of India (RBI).",
    countries: [{ name: "India", id: "india", flag: "🇮🇳" }],
    faqs: [
      {
        question: "Can foreigners bring Indian Rupees out of India?",
        answer:
          "No, the export and import of Indian Rupees are highly restricted for non-residents by the RBI.",
      },
    ],
  },
  {
    id: "mexican-peso",
    name: "Mexican Peso",
    code: "MXN",
    symbol: "Mex$",
    usdRate: 16.95,
    overview:
      "The Mexican Peso (MXN) is the official currency of Mexico. It is the most heavily traded currency in Latin America and is extensively used as an emerging-market indicator due to its high liquidity.",
    countries: [{ name: "Mexico", id: "mexico", flag: "🇲🇽" }],
    faqs: [
      {
        question: "Is the Mexican Peso volatile?",
        answer:
          "While it can fluctuate during global trade developments, it is backed by Mexico's solid trade relationships, primarily under the USMCA.",
      },
    ],
  },
  {
    id: "brazilian-real",
    name: "Brazilian Real",
    code: "BRL",
    symbol: "R$",
    usdRate: 5.25,
    overview:
      "The Brazilian Real (BRL) is the currency of Brazil, introduced in 1994 as part of the 'Plano Real' to combat hyperinflation. It is managed by the Central Bank of Brazil.",
    countries: [{ name: "Brazil", id: "brazil", flag: "🇧🇷" }],
    faqs: [
      {
        question: "How did the Real stop hyperinflation?",
        answer:
          "It replaced the old currency via a transitional unit of value pegged to the US Dollar before becoming the primary currency.",
      },
    ],
  },
  {
    id: "singapore-dollar",
    name: "Singapore Dollar",
    code: "SGD",
    symbol: "S$",
    usdRate: 1.348,
    overview:
      "The Singapore Dollar (SGD) is the official currency of Singapore. It is managed by the Monetary Authority of Singapore (MAS) using an exchange rate-centered monetary policy, rather than interest rates.",
    countries: [{ name: "Singapore", id: "singapore", flag: "🇸🇬" }],
    faqs: [
      {
        question: "Is SGD pegged to any currency?",
        answer:
          "No, it floats within an undisclosed bandwidth against a basket of currencies of its major trade partners.",
      },
    ],
  },
  {
    id: "south-african-rand",
    name: "South African Rand",
    code: "ZAR",
    symbol: "R",
    usdRate: 18.52,
    overview:
      "The South African Rand (ZAR) is the legal tender of South Africa. It is also used in a common monetary area with Lesotho, Namibia, and Eswatini. The Rand is highly liquid and frequently traded against major currencies.",
    countries: [{ name: "South Africa", id: "south-africa", flag: "🇿🇦" }],
    faqs: [
      {
        question: "Where does the name ZAR come from?",
        answer:
          "It stands for Zuid-Afrikaanse Rand, referring to Witwatersrand ('white waters ridge'), where South Africa's largest gold deposits were found.",
      },
    ],
  },
  {
    id: "swedish-krona",
    name: "Swedish Krona",
    code: "SEK",
    symbol: "kr",
    usdRate: 10.65,
    overview:
      "The Swedish Krona (SEK) is the official currency of Sweden. Sweden has opted out of adopting the Euro, preserving the Krona as its independent currency under the control of the Riksbank, the world's oldest central bank.",
    countries: [{ name: "Sweden", id: "sweden", flag: "🇸🇪" }],
    faqs: [
      {
        question: "Is Sweden going cash-free?",
        answer:
          "Sweden is one of the most cashless societies in the world, with card and digital payments accounting for over 95% of retail transactions.",
      },
    ],
  },
  {
    id: "norwegian-krone",
    name: "Norwegian Krone",
    code: "NOK",
    symbol: "kr",
    usdRate: 10.58,
    overview:
      "The Norwegian Krone (NOK) is the currency of Norway. It is heavily affected by global oil and natural gas prices, as crude exports represent a massive sector of the Norwegian economy.",
    countries: [{ name: "Norway", id: "norway", flag: "🇳🇴" }],
    faqs: [
      {
        question: "What is the relation between NOK and oil?",
        answer:
          "As Norway is a leading European exporter of petroleum, the Krone tends to appreciate when Brent crude oil prices rise, and depreciate when they fall.",
      },
    ],
  },
  {
    id: "danish-krone",
    name: "Danish Krone",
    code: "DKK",
    symbol: "kr",
    usdRate: 6.88,
    overview:
      "The Danish Krone (DKK) is the official currency of Denmark, Greenland, and the Faroe Islands. DKK is pegged to the Euro at a central rate of 7.46 kroner per Euro.",
    countries: [{ name: "Denmark", id: "denmark", flag: "🇩🇰" }],
    faqs: [
      {
        question: "What is the peg range of DKK to EUR?",
        answer:
          "Under the ERM II mechanism, the Danish Krone fluctuates within a tight band of +/- 2.25% around the central rate.",
      },
    ],
  },
  {
    id: "uae-dirham",
    name: "UAE Dirham",
    code: "AED",
    symbol: "د.إ",
    usdRate: 3.673,
    overview:
      "The United Arab Emirates Dirham (AED) is the official currency of the UAE. It has been pegged to the US Dollar since 1997, ensuring exchange rate stability for its petroleum-rich economy.",
    countries: [
      { name: "United Arab Emirates", id: "united-arab-emirates", flag: "🇦🇪" },
    ],
    faqs: [
      {
        question: "Is the UAE Dirham rate fixed?",
        answer:
          "Yes, it is fixed to the US Dollar at approximately 3.6725 AED per USD.",
      },
    ],
  },
  {
    id: "saudi-riyal",
    name: "Saudi Riyal",
    code: "SAR",
    symbol: "ر.س",
    usdRate: 3.75,
    overview:
      "The Saudi Riyal (SAR) is the official currency of Saudi Arabia. It is pegged to the US Dollar at a rate of 3.75 SAR per USD, a policy maintained to stabilize domestic imports and government spending.",
    countries: [{ name: "Saudi Arabia", id: "saudi-arabia", flag: "🇸🇦" }],
    faqs: [
      {
        question: "Why does Saudi Arabia peg its currency to USD?",
        answer:
          "Mainly because oil, which dominates Saudi exports, is priced and traded internationally in US Dollars.",
      },
    ],
  },
  {
    id: "egyptian-pound",
    name: "Egyptian Pound",
    code: "EGP",
    symbol: "E£",
    usdRate: 47.15,
    overview:
      "The Egyptian Pound (EGP) is the currency of Egypt. It is managed by the Central Bank of Egypt and has historically faced multiple devaluations to align with international monetary standards.",
    countries: [{ name: "Egypt", id: "egypt", flag: "🇪🇬" }],
    faqs: [
      {
        question: "What is the history of EGP flotation?",
        answer:
          "The Egyptian Pound was fully floated in 2016 and went through further currency adjustments in 2022-2024 to curb inflation and secure IMF loans.",
      },
    ],
  },
  {
    id: "nigerian-naira",
    name: "Nigerian Naira",
    code: "NGN",
    symbol: "₦",
    usdRate: 1480.0,
    overview:
      "The Nigerian Naira (NGN) is the currency of Nigeria. The Central Bank of Nigeria manages the Naira, dealing with complex parallel exchange market rates and foreign currency availability.",
    countries: [{ name: "Nigeria", id: "nigeria", flag: "🇳🇬" }],
    faqs: [
      {
        question: "Why is there a black market rate for the Naira?",
        answer:
          "Restrictions on official dollar access lead businesses to source USD from informal parallel channels, driving up informal rates.",
      },
    ],
  },
  {
    id: "turkish-lira",
    name: "Turkish Lira",
    code: "TRY",
    symbol: "₺",
    usdRate: 32.24,
    overview:
      "The Turkish Lira (TRY) is the official currency of Turkey and Northern Cyprus. In recent years, it has experienced high inflation and depreciation due to unique interest rate policies implemented in Turkey.",
    countries: [{ name: "Turkey", id: "turkey", flag: "🇹🇷" }],
    faqs: [
      {
        question: "What are the notes denominations for Turkish Lira?",
        answer:
          "Banknotes circulate in denominations of 5, 10, 20, 50, 100, and 200 Lira.",
      },
    ],
  },
  {
    id: "new-zealand-dollar",
    name: "New Zealand Dollar",
    code: "NZD",
    symbol: "NZ$",
    usdRate: 1.628,
    overview:
      "The New Zealand Dollar (NZD) is the currency of New Zealand and several island territories. It is issued by the Reserve Bank of New Zealand. Often nicknamed the 'Kiwi', it is highly traded globally.",
    countries: [{ name: "New Zealand", id: "new-zealand", flag: "🇳🇿" }],
    faqs: [
      {
        question: "What is the Kiwi dollar?",
        answer:
          "The nickname 'Kiwi' refers to the flightless national bird shown on the reverse side of the 1-dollar coin.",
      },
    ],
  },
]

export const blogs: BlogPost[] = [
  {
    id: "strongest-currencies-world",
    title: "The Strongest Currencies in the World",
    summary:
      "Discover which global currencies hold the highest purchasing power and exchange rates, and why the US Dollar is not at the top of the list.",
    date: "May 25, 2026",
    author: "Elena Petrova",
    readTime: "6 min read",
    category: "Currency Rankings",
    imageUrl: "/blog/strongest.jpg",
    content: `
      <p>When people think of the strongest currencies in the world, the US Dollar (USD), Euro (EUR), and British Pound (GBP) are usually the first to come to mind. However, these famous currencies do not actually hold the highest value in terms of nominal exchange rates.</p>
      
      <h3>1. Kuwaiti Dinar (KWD)</h3>
      <p>The Kuwaiti Dinar is officially the highest-value currency in the world. As of 2026, 1 KWD is worth over $3.20 USD. The strength of the Dinar is backed by Kuwait's massive oil reserves and tax-free economy, which have built up a colossal sovereign wealth fund.</p>
      
      <h3>2. Bahraini Dinar (BHD)</h3>
      <p>Close behind is the Bahraini Dinar, with 1 BHD pegged at approximately $2.65 USD. Similar to Kuwait, Bahrain's economy relies heavily on oil and gas exports, creating a highly stable and valuable currency.</p>
      
      <h3>3. Omani Rial (OMR)</h3>
      <p>The Omani Rial is pegged to the USD at a rate of 1 OMR = $2.60 USD. Due to strict monetary policies and substantial oil production, Oman has successfully maintained this peg for decades.</p>
      
      <h3>Why the US Dollar is Still the King</h3>
      <p>While the Kuwaiti Dinar holds the highest value, the <strong>US Dollar is the most traded currency</strong> in the world, comprising over 85% of all daily foreign exchange transactions. The USD serves as the primary currency for global trade, commodity pricing (like gold and crude oil), and central bank reserves, giving it unmatched global economic power.</p>
    `,
  },
  {
    id: "weakest-currencies-world",
    title: "Understanding the World's Weakest Currencies",
    summary:
      "A deep dive into the factors that cause hyperinflation and currency depreciation in emerging economies.",
    date: "June 2, 2026",
    author: "Marcus Vance",
    readTime: "8 min read",
    category: "Economics",
    imageUrl: "/blog/weakest.jpg",
    content: `
      <p>While some currencies are worth multiple dollars, others require thousands or millions of units to buy a single cup of coffee. These are the world's weakest currencies, often plagued by hyperinflation, economic sanctions, or political turmoil.</p>
      
      <h3>The Venezuelan Bolívar (VES) & Iranian Rial (IRR)</h3>
      <p>The Iranian Rial and Venezuelan Bolívar are currently among the lowest-valued currencies. In Iran, international sanctions, high inflation, and economic mismanagement have depreciated the Rial significantly. In Venezuela, hyperinflation in the late 2010s rendered the old Bolívar almost worthless, prompting currency re-denominations.</p>
      
      <h3>What Causes a Currency to Depreciate?</h3>
      <ul>
        <li><strong>Hyperinflation:</strong> When a government prints money excessively, the supply skyrockets, and the value of each note falls.</li>
        <li><strong>Political Instability:</strong> Unstable governance deters foreign investment, lowering demand for the local currency.</li>
        <li><strong>Trade Deficits:</strong> Importing significantly more than exporting requires selling domestic currency to buy foreign currency, reducing value.</li>
      </ul>
    `,
  },
  {
    id: "why-japanese-yen-falling",
    title: "Why is the Japanese Yen Falling?",
    summary:
      "Analyzing the monetary policies of the Bank of Japan and their impact on the Yen's value against the US Dollar.",
    date: "June 5, 2026",
    author: "Kenji Sato",
    readTime: "5 min read",
    category: "Market Analysis",
    imageUrl: "/blog/yen-falling.jpg",
    content: `
      <p>The Japanese Yen (JPY) has experienced significant pressure, reaching historical lows against the US Dollar. For a currency traditionally viewed as a reliable 'safe haven,' this shift has surprised many investors.</p>
      
      <h3>The Interest Rate Divergence</h3>
      <p>The primary driver behind the falling Yen is the divergence in monetary policies between the <strong>Bank of Japan (BOJ)</strong> and the <strong>US Federal Reserve</strong>. While the Fed raised interest rates to combat inflation, the BOJ maintained near-zero or negative interest rates to combat deflationary pressures.</p>
      
      <p>Investors borrow in low-yielding Yen to invest in higher-yielding US assets, a strategy known as the <strong>'carry trade'</strong>. This constant selling of JPY for USD creates significant downward pressure on the Yen.</p>
      
      <h3>Impact on Japan's Economy</h3>
      <p>A weak Yen is a double-edged sword:
        <ul>
          <li><strong>Pros:</strong> Japanese exports (like cars and electronics) become cheaper and more competitive globally. Tourism in Japan booms.</li>
          <li><strong>Cons:</strong> Imports of food, energy, and raw materials become much more expensive, fueling inflation in Japan.</li>
        </ul>
      </p>
    `,
  },
  {
    id: "currency-symbols-explained",
    title: "Global Currency Symbols Explained",
    summary:
      "From the dollar sign to the euro symbol, learn the fascinating history behind the characters that represent money.",
    date: "May 12, 2026",
    author: "Alice Cooper",
    readTime: "4 min read",
    category: "History",
    imageUrl: "/blog/symbols.jpg",
    content: `
      <p>Every currency has a symbol that acts as a visual shorthand. But where did these symbols originate? Many have deep historical roots dating back hundreds of years.</p>
      
      <h3>The Dollar Sign ($)</h3>
      <p>The origin of the dollar sign is widely believed to stem from the Spanish-American peso abbreviation 'p<sup>s</sup>'. Over time, the 's' was written over the 'p', evolving into the familiar $ symbol. The dollar sign is now shared by dozens of countries, including Canada, Australia, and Singapore.</p>
      
      <h3>The Euro (€)</h3>
      <p>The Euro symbol was designed by the European Commission. Inspired by the Greek epsilon (ε), it honors the cradle of European civilization. The two parallel lines crossing the center symbolize the stability of the Euro currency.</p>
      
      <h3>The British Pound (£)</h3>
      <p>The symbol £ is derived from the letter 'L', standing for 'Libra', the Latin word for scales or a pound weight. It reflects the currency's historical link to silver weights in the Roman Empire.</p>
    `,
  },
  {
    id: "most-traded-currencies",
    title: "The Most Traded Currencies in the World",
    summary:
      "A deep dive into the top foreign exchange currencies, their global trading share, and the factors driving their popularity.",
    date: "June 4, 2026",
    author: "Elena Petrova",
    readTime: "5 min read",
    category: "Currency Rankings",
    imageUrl: "/blog/traded.jpg",
    content: `
      <p>The global foreign exchange (Forex) market is the largest and most liquid financial market in the world, with trillions of dollars changing hands every day. At the heart of this market are a handful of dominant currencies that facilitate international trade and investment.</p>
      
      <h3>1. The US Dollar (USD)</h3>
      <p>Accounting for nearly 88% of all daily Forex trades, the US Dollar is the undisputed king of global finance. It serves as the primary global reserve currency, the main medium for pricing commodities like oil and gold, and the standard benchmark for currency valuations worldwide.</p>
      
      <h3>2. The Euro (EUR)</h3>
      <p>Representing the 20 member states of the Eurozone, the Euro is the second most traded currency, involved in approximately 31% of transactions. The Euro provides high liquidity and represents a unified economic bloc with one of the highest GDPs globally.</p>
      
      <h3>3. The Japanese Yen (JPY)</h3>
      <p>The Japanese Yen holds the third spot, trading in about 17% of transactions. Renowned as a 'safe-haven' asset, investors frequently turn to the Yen during times of geopolitical or macroeconomic uncertainty due to Japan's stable trade surpluses.</p>
      
      <h3>Other Major Currencies</h3>
      <p>The list of highly traded currencies is rounded out by the British Pound (GBP), the Australian Dollar (AUD), and the Canadian Dollar (CAD), each reflecting strong resource integration or historical financial influence.</p>
    `,
  },
  {
    id: "highest-inflation-countries",
    title: "Countries with the Highest Inflation Rates",
    summary:
      "Explore the nations dealing with extreme hyperinflation and the socioeconomic causes behind currency devaluation.",
    date: "May 30, 2026",
    author: "Marcus Vance",
    readTime: "7 min read",
    category: "Economics",
    imageUrl: "/blog/inflation.jpg",
    content: `
      <p>Inflation measures the rate at which prices rise and purchasing power falls. While moderate inflation is a sign of a growing economy, extreme hyperinflation can destroy a country's economic fabric and make the local currency virtually worthless.</p>
      
      <h3>Nations Facing Extreme Inflation</h3>
      <p>As of recent years, several countries have struggled with hyperinflationary pressures caused by complex fiscal policies, political instability, and trade sanctions:</p>
      <ul>
        <li><strong>Venezuela:</strong> Historically plagued by hyperinflation, Venezuela has struggled with monetary expansion and falling oil revenues, leading to multiple currency re-denominations.</li>
        <li><strong>Zimbabwe:</strong> Zimbabwe experienced one of the most famous hyperinflations in history in 2008, and still faces high inflation and currency instability as it attempts to stabilize its dollar structure.</li>
        <li><strong>Turkey:</strong> Turkey has experienced unique monetary policies with low-interest rates despite high inflation, resulting in significant Turkish Lira depreciation.</li>
      </ul>
      
      <h3>The Consequences of Hyperinflation</h3>
      <p>When inflation reaches extreme levels, citizens lose trust in the local currency. They often resort to bartering or converting their wealth into stable foreign currencies like the US Dollar or Euro to preserve value.</p>
    `,
  },
  {
    id: "usd-vs-euro-comparison",
    title: "USD vs Euro: A Comprehensive Comparison",
    summary:
      "Analyze the differences between the two most powerful currencies in the global financial system.",
    date: "May 18, 2026",
    author: "Kenji Sato",
    readTime: "6 min read",
    category: "Market Analysis",
    imageUrl: "/blog/usd-eur.jpg",
    content: `
      <p>The relationship between the US Dollar (USD) and the Euro (EUR) represents the main axis of the global financial system. Together, the two currencies account for the vast majority of international trade settlement and central bank reserves.</p>
      
      <h3>Reserve Currency Dominance</h3>
      <p>The US Dollar has served as the world's primary reserve currency since the Bretton Woods Agreement of 1944. Currently, over 58% of allocated foreign exchange reserves are held in USD. The Euro, introduced in 1999, stands as the second-largest reserve currency, accounting for about 20% of global allocations.</p>
      
      <h3>Economic Foundations</h3>
      <p>While the USD is backed by a single country's federal government and central bank (the Federal Reserve), the Euro is backed by the collective economic output of 20 Eurozone nations, managed by the European Central Bank (ECB). This creates unique political and monetary challenges for the Euro, as it must reconcile the fiscal differences between sovereign states.</p>
      
      <h3>Trading Dynamics</h3>
      <p>The EUR/USD currency pair is the most traded pair in the world, serving as a primary indicator of economic health and risk appetite. When global markets face turmoil, capital frequently flows back into the US Dollar due to its perceived safety, impacting the EUR/USD exchange rate.</p>
    `,
  },
]

export const exchangeRatesMatrix = [
  // USD → Major currencies
  {
    from: "USD",
    to: "EUR",
    rate: 0.922,
    dailyChange: -0.15,
    weeklyChange: 0.22,
    monthlyChange: -0.45,
  },
  {
    from: "USD",
    to: "JPY",
    rate: 155.45,
    dailyChange: 0.45,
    weeklyChange: 1.12,
    monthlyChange: 2.34,
  },
  {
    from: "USD",
    to: "GBP",
    rate: 0.784,
    dailyChange: -0.05,
    weeklyChange: -0.12,
    monthlyChange: 0.15,
  },
  {
    from: "USD",
    to: "CAD",
    rate: 1.372,
    dailyChange: 0.12,
    weeklyChange: 0.35,
    monthlyChange: -0.1,
  },
  {
    from: "USD",
    to: "AUD",
    rate: 1.508,
    dailyChange: -0.22,
    weeklyChange: 0.05,
    monthlyChange: -1.25,
  },
  {
    from: "USD",
    to: "INR",
    rate: 83.42,
    dailyChange: 0.08,
    weeklyChange: -0.18,
    monthlyChange: 0.52,
  },
  {
    from: "USD",
    to: "MXN",
    rate: 16.95,
    dailyChange: 0.55,
    weeklyChange: 1.45,
    monthlyChange: -2.15,
  },
  {
    from: "USD",
    to: "CHF",
    rate: 0.898,
    dailyChange: -0.1,
    weeklyChange: -0.52,
    monthlyChange: 0.85,
  },
  {
    from: "USD",
    to: "CNY",
    rate: 7.24,
    dailyChange: 0.02,
    weeklyChange: 0.15,
    monthlyChange: 0.32,
  },
  {
    from: "USD",
    to: "BRL",
    rate: 5.25,
    dailyChange: 0.62,
    weeklyChange: 2.1,
    monthlyChange: -1.05,
  },
  {
    from: "USD",
    to: "NZD",
    rate: 1.628,
    dailyChange: -0.18,
    weeklyChange: 0.08,
    monthlyChange: -0.95,
  },
  {
    from: "USD",
    to: "SGD",
    rate: 1.348,
    dailyChange: 0.04,
    weeklyChange: -0.12,
    monthlyChange: 0.22,
  },
  {
    from: "USD",
    to: "ZAR",
    rate: 18.52,
    dailyChange: 0.75,
    weeklyChange: 2.35,
    monthlyChange: -3.1,
  },
  {
    from: "USD",
    to: "NOK",
    rate: 10.58,
    dailyChange: -0.28,
    weeklyChange: 0.65,
    monthlyChange: 1.45,
  },
  {
    from: "USD",
    to: "SEK",
    rate: 10.65,
    dailyChange: -0.22,
    weeklyChange: 0.55,
    monthlyChange: 1.18,
  },
  // Reverse pairs (non-USD → USD)
  {
    from: "EUR",
    to: "USD",
    rate: 1.0846,
    dailyChange: 0.15,
    weeklyChange: -0.22,
    monthlyChange: 0.45,
  },
  {
    from: "JPY",
    to: "USD",
    rate: 0.00643,
    dailyChange: -0.45,
    weeklyChange: -1.12,
    monthlyChange: -2.34,
  },
  {
    from: "GBP",
    to: "USD",
    rate: 1.2755,
    dailyChange: 0.05,
    weeklyChange: 0.12,
    monthlyChange: -0.15,
  },
  {
    from: "CAD",
    to: "USD",
    rate: 0.7288,
    dailyChange: -0.12,
    weeklyChange: -0.35,
    monthlyChange: 0.1,
  },
  {
    from: "AUD",
    to: "USD",
    rate: 0.6631,
    dailyChange: 0.22,
    weeklyChange: -0.05,
    monthlyChange: 1.25,
  },
  {
    from: "CHF",
    to: "USD",
    rate: 1.1136,
    dailyChange: 0.1,
    weeklyChange: 0.52,
    monthlyChange: -0.85,
  },
  {
    from: "CNY",
    to: "USD",
    rate: 0.1381,
    dailyChange: -0.02,
    weeklyChange: -0.15,
    monthlyChange: -0.32,
  },
  {
    from: "INR",
    to: "USD",
    rate: 0.01199,
    dailyChange: -0.08,
    weeklyChange: 0.18,
    monthlyChange: -0.52,
  },
  {
    from: "MXN",
    to: "USD",
    rate: 0.059,
    dailyChange: -0.55,
    weeklyChange: -1.45,
    monthlyChange: 2.15,
  },
  {
    from: "BRL",
    to: "USD",
    rate: 0.1905,
    dailyChange: -0.62,
    weeklyChange: -2.1,
    monthlyChange: 1.05,
  },
  {
    from: "NZD",
    to: "USD",
    rate: 0.6143,
    dailyChange: 0.18,
    weeklyChange: -0.08,
    monthlyChange: 0.95,
  },
  {
    from: "SGD",
    to: "USD",
    rate: 0.7419,
    dailyChange: -0.04,
    weeklyChange: 0.12,
    monthlyChange: -0.22,
  },
  // EUR cross-pairs
  {
    from: "EUR",
    to: "GBP",
    rate: 0.8503,
    dailyChange: 0.08,
    weeklyChange: -0.18,
    monthlyChange: 0.32,
  },
  {
    from: "EUR",
    to: "JPY",
    rate: 168.6,
    dailyChange: 0.35,
    weeklyChange: 0.95,
    monthlyChange: 2.8,
  },
  {
    from: "EUR",
    to: "CHF",
    rate: 0.9741,
    dailyChange: -0.06,
    weeklyChange: -0.28,
    monthlyChange: 0.42,
  },
  {
    from: "EUR",
    to: "CAD",
    rate: 1.4882,
    dailyChange: 0.18,
    weeklyChange: 0.52,
    monthlyChange: -0.65,
  },
  {
    from: "EUR",
    to: "AUD",
    rate: 1.6356,
    dailyChange: -0.14,
    weeklyChange: 0.22,
    monthlyChange: -1.72,
  },
  {
    from: "EUR",
    to: "CNY",
    rate: 7.854,
    dailyChange: 0.12,
    weeklyChange: 0.38,
    monthlyChange: -0.18,
  },
  {
    from: "EUR",
    to: "INR",
    rate: 90.46,
    dailyChange: 0.22,
    weeklyChange: -0.08,
    monthlyChange: 1.05,
  },
  // GBP cross-pairs
  {
    from: "GBP",
    to: "EUR",
    rate: 1.1759,
    dailyChange: -0.08,
    weeklyChange: 0.18,
    monthlyChange: -0.32,
  },
  {
    from: "GBP",
    to: "JPY",
    rate: 198.28,
    dailyChange: 0.42,
    weeklyChange: 1.05,
    monthlyChange: 2.55,
  },
  {
    from: "GBP",
    to: "CAD",
    rate: 1.7501,
    dailyChange: 0.14,
    weeklyChange: 0.28,
    monthlyChange: -0.12,
  },
  {
    from: "GBP",
    to: "AUD",
    rate: 1.9235,
    dailyChange: -0.18,
    weeklyChange: 0.15,
    monthlyChange: -1.45,
  },
  {
    from: "GBP",
    to: "CHF",
    rate: 1.1454,
    dailyChange: -0.04,
    weeklyChange: -0.38,
    monthlyChange: 0.72,
  },
  {
    from: "GBP",
    to: "INR",
    rate: 106.4,
    dailyChange: 0.12,
    weeklyChange: -0.32,
    monthlyChange: 0.62,
  },
  // Other major cross-pairs
  {
    from: "CAD",
    to: "JPY",
    rate: 113.3,
    dailyChange: 0.28,
    weeklyChange: 0.82,
    monthlyChange: 2.48,
  },
  {
    from: "AUD",
    to: "JPY",
    rate: 103.08,
    dailyChange: 0.22,
    weeklyChange: 1.1,
    monthlyChange: 1.15,
  },
  {
    from: "CHF",
    to: "JPY",
    rate: 173.1,
    dailyChange: 0.5,
    weeklyChange: 1.65,
    monthlyChange: 3.25,
  },
  {
    from: "AUD",
    to: "CAD",
    rate: 0.9095,
    dailyChange: -0.1,
    weeklyChange: 0.3,
    monthlyChange: -1.15,
  },
  {
    from: "AUD",
    to: "NZD",
    rate: 1.0783,
    dailyChange: 0.05,
    weeklyChange: 0.12,
    monthlyChange: -0.28,
  },
  {
    from: "NZD",
    to: "AUD",
    rate: 0.9274,
    dailyChange: -0.05,
    weeklyChange: -0.12,
    monthlyChange: 0.28,
  },
  {
    from: "CHF",
    to: "EUR",
    rate: 1.0266,
    dailyChange: 0.06,
    weeklyChange: 0.28,
    monthlyChange: -0.42,
  },
]
