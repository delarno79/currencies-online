import { db } from "../lib/db"

async function main() {
  const cities = [
    {
      name: "New York",
      slug: "new-york-ny",
      state: "NY",
      country: "United States",
      countryCode: "US",
    },
    {
      name: "Miami",
      slug: "miami-fl",
      state: "FL",
      country: "United States",
      countryCode: "US",
    },
    {
      name: "Los Angeles",
      slug: "los-angeles-ca",
      state: "CA",
      country: "United States",
      countryCode: "US",
    },
  ]

  for (const city of cities) {
    await db.city.upsert({
      where: { slug: city.slug },
      update: {},
      create: city,
    })
  }

  console.log("Seeded test cities successfully!")
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
