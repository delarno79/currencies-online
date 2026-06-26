import { db } from "../lib/db"

async function main() {
  const value = "USD to INR | US dollar to Rupees, USD to GBP | US dollars to Pounds, CAD to USD | Canadian dollar to USD, MXN to USD | Pesos to US dollars, USD to EUR | US dollar to EURO, MXN to USD | Mexican Peso to USD, COP to USD | Colombian Peso to USD, GBP to USD | Pound sterling to USD, JPY to USD | Japanese yen to USD, GBP to USD | British pound to dollar, CHF to USD | Swiss Franc to USD, THB to USD | Baht to US Dollar, USD to JPY | USD to Japanese yen, THB to USD | baht to US Dollar, USD to CNY | US dollar to Rmb, USD to CNY | USD to Chinese yuan, USD to INR | American dollar to INR, GBP to USD | pounds to US dollar"

  await db.systemSetting.upsert({
    where: { key: "popular_pairs" },
    update: { value },
    create: { key: "popular_pairs", value },
  })

  console.log("Updated popular_pairs system setting successfully!")
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
