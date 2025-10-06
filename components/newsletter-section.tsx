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
    <section className="bg-[#e8e8e8] py-20">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="border border-card-foreground/15 rounded-sm p-8 bg-white/50 hover:border-accent/30 transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <Checkbox
                  id="weekly"
                  checked={weekly}
                  onCheckedChange={(checked) => setWeekly(checked as boolean)}
                  className="mt-1"
                />
                <div>
                  <p className="text-[11px] text-card-foreground/50 uppercase tracking-[0.15em] mb-3 font-medium">
                    Every Saturday
                  </p>
                  <h3 className="text-[20px] font-bold text-card-foreground mb-3 leading-tight">Weekly Highlights</h3>
                  <p className="text-[14px] text-card-foreground/70 leading-relaxed">
                    Stay updated with a curated roundup of the week's most talked-about content.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[13px] text-card-foreground font-medium">
                <Checkbox checked={weekly} className="pointer-events-none" />
                <span>Subscribe</span>
              </div>
            </div>

            <div className="border border-card-foreground/15 rounded-sm p-8 bg-white/50 hover:border-accent/30 transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <Checkbox
                  id="monthly"
                  checked={monthly}
                  onCheckedChange={(checked) => setMonthly(checked as boolean)}
                  className="mt-1"
                />
                <div>
                  <p className="text-[11px] text-card-foreground/50 uppercase tracking-[0.15em] mb-3 font-medium">
                    Last week of the month
                  </p>
                  <h3 className="text-[20px] font-bold text-card-foreground mb-3 leading-tight">Monthly Digest</h3>
                  <p className="text-[14px] text-card-foreground/70 leading-relaxed">
                    Take a step back and savor a well-rounded recap of the month's highlights.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[13px] text-card-foreground font-medium">
                <Checkbox checked={monthly} className="pointer-events-none" />
                <span>Subscribe</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-[56px] font-bold text-card-foreground mb-10 leading-[1.1]">
              Sign Up for Our Newsletter
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                type="email"
                placeholder="Enter your email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white border-card-foreground/20 text-card-foreground placeholder:text-card-foreground/40 h-14 text-[15px] rounded-sm focus:border-accent focus:ring-accent"
              />
              <button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-white w-full h-14 text-[15px] font-semibold rounded-full transition-all duration-300 hover:shadow-lg"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
