import type { Metadata } from "next"
import { ContactForm } from "./_components/contact-form"

export const metadata: Metadata = {
  title: "Contact Us | Currencies.global",
  description:
    "Get in touch with the team at Currencies.global. For questions regarding exchange rate accuracy, advertisement placements, or database feedback, contact us today.",
  alternates: {
    canonical: "https://currencies.global/contact",
  },
}

export default function ContactPage() {
  return <ContactForm />
}
