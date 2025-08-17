"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  name: string
  created_on: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (name: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (name: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (name: string, password: string) => {
        try {
          const response = await fetch("/api/auth/already", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, password }),
          })

          const data = await response.json()

          if (response.ok && data.status === "success") {
            set({ user: data.user, isAuthenticated: true })
            return { success: true }
          } else {
            return { success: false, error: data.error || "Login failed" }
          }
        } catch (error) {
          return { success: false, error: "Network error" }
        }
      },

      signup: async (name: string, password: string) => {
        try {
          const response = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, password }),
          })

          const data = await response.json()

          if (response.ok && data.status === "success") {
            // Auto-login after successful signup
            return await get().login(name, password)
          } else {
            return { success: false, error: data.error || "Signup failed" }
          }
        } catch (error) {
          return { success: false, error: "Network error" }
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: "kamatv-auth",
    },
  ),
)
