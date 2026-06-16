import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function BrowseRegions() {
  const regions = [
    {
      name: "Asia",
      countries: "49 Countries",
      imageUrl:
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80", // Taj Mahal
      href: "/countries?region=Asia",
    },
    {
      name: "Europe",
      countries: "44 Countries",
      imageUrl:
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80", // Colosseum
      href: "/countries?region=Europe",
    },
    {
      name: "North America",
      countries: "23 Countries",
      imageUrl:
        "https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=600&q=80", // Statue of Liberty
      href: "/countries?region=Americas", // In database, it's mapped under Americas
    },
    {
      name: "South America",
      countries: "13 Countries",
      imageUrl:
        "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=600&q=80", // Machu Picchu
      href: "/countries?region=Americas",
    },
    {
      name: "Africa",
      countries: "54 Countries",
      imageUrl:
        "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80", // Pyramids
      href: "/countries?region=Africa",
    },
    {
      name: "Oceania",
      countries: "14 Countries",
      imageUrl:
        "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80", // Sydney Opera House
      href: "/countries?region=Oceania",
    },
  ]

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="font-bold font-heading text-2xl text-foreground tracking-tight sm:text-3xl">
          Browse Countries by Region
        </h2>
        <p className="mt-2 text-muted-foreground text-sm">
          Explore global currencies and economic indicators divided by
          continent.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
        {regions.map((region) => (
          <Link
            key={region.name}
            href={region.href}
            className="group relative block h-48 overflow-hidden rounded-xl border border-border shadow-sm transition-all duration-300 hover:shadow-lg"
          >
            {/* Background Image */}
            <Image
              src={region.imageUrl}
              alt={region.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 16vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-linear-to-t from-[#051124]/90 via-[#051124]/40 to-transparent" />

            {/* Content overlay */}
            <div className="absolute right-0 bottom-0 left-0 z-20 flex h-full flex-col justify-end p-4 text-white">
              <h3 className="font-bold text-lg leading-tight transition-colors group-hover:text-primary">
                {region.name}
              </h3>
              <p className="mt-1 font-medium text-slate-300 text-xs">
                {region.countries}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link href="/countries">
          <Button
            variant="outline"
            className="gap-2 border-border px-6 py-5 font-semibold shadow-sm transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
          >
            <span>View All Countries</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
