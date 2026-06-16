import { HelpCircle } from "lucide-react"
import type { Metadata } from "next"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Currencies.online",
  description:
    "Browse the general FAQs about Currencies.online. Learn about our database compilation, calculation methods, and reference rates accuracy.",
}

const faqList = [
  {
    question: "What is Currencies.online?",
    answer:
      "Currencies.online is a comprehensive, automated world currency directory and exchange rate database. We resolve global queries regarding flags, populations, capitals, currency codes, and symbols, alongside live-like exchange conversions.",
  },
  {
    question: "How frequently is the exchange rate data updated?",
    answer:
      "Our database maps live reference cross rates statically. In real deployment configurations, these matrices are updated programmatically via scheduled API integrations (95% automation rate) to capture latest interbank levels.",
  },
  {
    question: "How are the cross-currency rates calculated?",
    answer:
      "All rates are derived using the US Dollar (USD) reference rates. For any pair A-to-B, the calculation is computed as: (Rate B vs USD) / (Rate A vs USD). This ensures mathematical integrity and consistency across all directory modules.",
  },
  {
    question: "Can I use Currencies.online for commercial trading?",
    answer:
      "No. The information, calculators, and rate metrics provided on this site are for reference and educational purposes only. They do not constitute financial advice. For commercial operations, consult licensed brokers.",
  },
  {
    question: "How can I advertise on Currencies.online?",
    answer:
      "Our layouts are pre-optimized for Google AdSense display ads (immediately below search heroes and at page footers). For custom integration campaigns or partnership proposals, contact us at partners@currencies.online.",
  },
]

export default function FaqsPage() {
  return (
    <div className="container mx-auto max-w-3xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-3 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary text-xs uppercase tracking-widest">
          <HelpCircle className="h-3 w-3" />
          Got Questions?
        </span>
        <h1 className="font-extrabold font-heading text-3xl text-foreground tracking-tight sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto max-w-xl text-muted-foreground text-sm">
          Find answers to common questions about our platform data accuracy,
          calculation mechanisms, and features.
        </p>
      </div>

      <Accordion className="w-full space-y-3">
        {faqList.map((faq) => (
          <AccordionItem
            key={faq.question}
            value={`general-faq-${faq.question}`}
            className="overflow-hidden rounded-lg border border-border bg-card px-5 shadow-sm"
          >
            <AccordionTrigger className="py-4 text-left font-semibold text-foreground text-sm hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-5 text-muted-foreground text-xs leading-relaxed sm:text-sm">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
