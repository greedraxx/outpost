"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    try {
      const supabase = createClient()
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message)
        setIsLoading(false)
        return
      }

      if (data.user) {
        // 로그인 성공
        router.push("/admin")
        router.refresh()
      }
    } catch (err) {
      setError("An unexpected error occurred")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-8">
      <div className="w-full max-w-[480px]">
        <div className="text-center mb-12">
          <Link href="/" className="inline-block">
            <h1 className="text-[64px] font-bold text-foreground leading-none mb-3">
              OUT POST
            </h1>
          </Link>
          <p className="text-[14px] text-muted-foreground">
            Admin Login
          </p>
        </div>

        <div className="bg-[#e8e8e8] p-10 rounded-sm border border-border/10">
          <h2 className="text-[28px] font-bold text-card-foreground mb-8">
            Sign in to continue
          </h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-sm p-4 mb-6">
              <p className="text-[13px] text-red-600 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className="block text-[13px] font-medium text-card-foreground mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-12 px-4 bg-white border border-card-foreground/20 rounded-sm text-[15px] text-card-foreground placeholder:text-card-foreground/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                placeholder="admin@outpost.com"
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-[13px] font-medium text-card-foreground mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-12 px-4 bg-white border border-card-foreground/20 rounded-sm text-[15px] text-card-foreground placeholder:text-card-foreground/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-[13px]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-card-foreground/20 text-accent focus:ring-accent"
                />
                <span className="text-card-foreground/70">Remember me</span>
              </label>
              <a href="#" className="text-accent hover:text-accent/90 font-medium">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-accent hover:bg-accent/90 text-white text-[15px] font-semibold rounded-full transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-card-foreground/10 text-center">
            <p className="text-[13px] text-card-foreground/60">
              Don't have an account?{" "}
              <a href="#" className="text-accent hover:text-accent/90 font-medium">
                Contact admin
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="text-[13px] text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}

