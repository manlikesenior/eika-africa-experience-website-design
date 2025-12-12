"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { supabase } from "@/lib/auth"

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message)
        return
      }

      if (data.user) {
        router.push("/admin/dashboard")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during login")
    } finally {
      setLoading(false)
    }
  }

  const [showReset, setShowReset] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetMsg, setResetMsg] = useState("")
  const [resetLoading, setResetLoading] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setResetMsg("")
    setResetLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail)
      if (error) {
        setResetMsg(error.message)
      } else {
        setResetMsg("Password reset email sent. Check your inbox.")
      }
    } catch (err: any) {
      setResetMsg(err.message || "Error sending reset email")
    } finally {
      setResetLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-3xl font-bold">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            {!showReset ? (
              <>
                <form onSubmit={handleLogin} className="space-y-6">
                  {error && (
                    <div className="flex gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    className="text-xs text-blue-600 hover:underline"
                    onClick={() => setShowReset(true)}
                  >
                    Forgot password?
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div>
                  <Label htmlFor="resetEmail">Enter your email to reset password</Label>
                  <Input
                    id="resetEmail"
                    type="email"
                    placeholder="you@example.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    disabled={resetLoading}
                  />
                </div>
                {resetMsg && (
                  <div className="p-2 text-sm rounded bg-blue-50 border border-blue-200 text-blue-900">{resetMsg}</div>
                )}
                <div className="flex gap-2">
                  <Button type="submit" className="w-full" disabled={resetLoading}>
                    {resetLoading ? "Sending..." : "Send Reset Email"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowReset(false)} disabled={resetLoading}>
                    Back to Login
                  </Button>
                </div>
              </form>
            )}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Demo Credentials:</strong>
                <br />
                Email: admin@eikaafrica.com
                <br />
                Password: Admin@123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
