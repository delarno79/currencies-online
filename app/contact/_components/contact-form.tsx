"use client"

import { CheckCircle2, Mail, MapPin, MessageSquare, Send } from "lucide-react"
import type React from "react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Toaster } from "@/components/ui/sonner"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) {
      toast.error("Please fill in all required fields.")
      return
    }

    setSubmitted(true)
    toast.success("Thank you! Your message has been received.")
  }

  return (
    <div className="container mx-auto max-w-5xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
      <Toaster position="top-right" />

      <div className="space-y-3 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary text-xs uppercase tracking-widest">
          <Mail className="h-3 w-3" />
          Get In Touch
        </span>
        <h1 className="font-extrabold font-heading text-3xl text-foreground tracking-tight sm:text-4xl">
          Contact Currencies.online
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground text-sm leading-relaxed sm:text-base">
          Have questions about our database, advertisements, or suggestions?
          Reach out using the form below.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Contact Info column */}
        <div className="space-y-6">
          <Card className="border border-border shadow-sm">
            <CardContent className="space-y-6 p-6">
              <h2 className="flex items-center gap-2 font-bold text-base text-foreground">
                Contact Details
              </h2>

              <div className="space-y-4 text-muted-foreground text-xs">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h4 className="font-bold text-foreground">Email Support</h4>
                    <p className="mt-1">support@currencies.online</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground/60">
                      Average reply time: 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-border border-t pt-4">
                  <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h4 className="font-bold text-foreground">
                      Advertising Enquiries
                    </h4>
                    <p className="mt-1">partners@currencies.online</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-border border-t pt-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h4 className="font-bold text-foreground">
                      Global Operations
                    </h4>
                    <p className="mt-1">San Francisco, California, USA</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form column */}
        <div className="lg:col-span-2">
          <Card className="border border-border shadow-sm">
            <CardContent className="p-6 sm:p-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name-input"
                        className="font-semibold text-muted-foreground text-xs"
                      >
                        Your Name *
                      </label>
                      <Input
                        id="name-input"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-md border-border"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="email-input"
                        className="font-semibold text-muted-foreground text-xs"
                      >
                        Email Address *
                      </label>
                      <Input
                        id="email-input"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-md border-border"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="subject-input"
                      className="font-semibold text-muted-foreground text-xs"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject-input"
                      type="text"
                      placeholder="Feedback, Ad enquiry, Database request..."
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="rounded-md border-border"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="message-input"
                      className="font-semibold text-muted-foreground text-xs"
                    >
                      Message *
                    </label>
                    <Textarea
                      id="message-input"
                      placeholder="Write your query details here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[120px] rounded-md border-border"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full gap-2 rounded-md px-5 py-4 font-semibold shadow-sm sm:w-auto"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              ) : (
                <div className="space-y-4 py-10 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg">
                    Message Submitted Successfully
                  </h3>
                  <p className="mx-auto max-w-md text-muted-foreground text-sm">
                    Thank you, {name}! We have received your query regarding "
                    {subject || "General Inquiry"}" and will get back to you
                    shortly at {email}.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                    className="rounded-md border-border"
                  >
                    Send Another Message
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
