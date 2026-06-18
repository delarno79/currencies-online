import type { Metadata } from "next"
import StudioPageClient from "./_components/studio-client"

export const metadata: Metadata = {
  title: "Currencies Global – Admin Studio",
  robots: { index: false, follow: false },
}

export default function StudioPage() {
  return <StudioPageClient />
}
