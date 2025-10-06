"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [weekly, setWeekly] = useState(false)
  const [monthly, setMonthly] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Newsletter signup:", { email, weekly, monthly })
    setEmail("")
  }

  return (
    <section className="bg-card py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="border border-card-foreground/20 rounded-xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <Checkbox
                  id="weekly"
                  checked={weekly}
                  onCheckedChange={(checked) => setWeekly(checked as boolean)}
                  className="mt-1"
                />
                <div>
                  <p className="text-xs text-card-foreground/60 uppercase tracking-wider mb-2">Every Saturday</p>
                  <h3 className="text-xl font-bold text-card-foreground mb-2">Weekly Highlights</h3>
                  <p className="text-sm text-card-foreground/70">
                    Stay updated with a curated roundup of the week's most talked-about content.
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 text-sm text-card-foreground hover:text-accent transition-colors">
                <Checkbox checked={weekly} className="pointer-events-none" />
                <span>Subscribe</span>
              </button>
            </div>

            <div className="border border-card-foreground/20 rounded-xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <Checkbox
                  id="monthly"
                  checked={monthly}
                  onCheckedChange={(checked) => setMonthly(checked as boolean)}
                  className="mt-1"
                />
                <div>
                  <p className="text-xs text-card-foreground/60 uppercase tracking-wider mb-2">
                    Last week of the month
                  </p>
                  <h3 className="text-xl font-bold text-card-foreground mb-2">Monthly Digest</h3>
                  <p className="text-sm text-card-foreground/70">
                    Take a step back and savor a well-rounded recap of the month's highlights.
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 text-sm text-card-foreground hover:text-accent transition-colors">
                <Checkbox checked={monthly} className="pointer-events-none" />
                <span>Subscribe</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-5xl font-bold text-card-foreground mb-8 text-balance leading-tight">
              Sign Up for Our Newsletter
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white border-card-foreground/20 text-card-foreground placeholder:text-card-foreground/40 h-12"
              />
              <Button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-white w-full h-12 text-base rounded-full"
              >
                Sign Up
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
