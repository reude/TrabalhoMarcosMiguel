"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    // Check if user exists and password matches
    const user = users.find((u: any) => u.email === username && u.password === password)

    if (!user) {
      setError("Email ou senha incorretos")
      return
    }

    // Save login state
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("currentUser", username)

    // Redirect to home
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 bg-primary rounded-md flex items-center justify-center text-white text-2xl font-bold">
              E
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Entrar</CardTitle>
          <CardDescription className="text-center">Insira suas credenciais para acessar sua conta</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">{error}</div>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">Email</Label>
              <Input
                id="username"
                type="email"
                placeholder="seu@email.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button id="login-submit" type="submit" className="w-full">
              Entrar
            </Button>
            <p className="text-sm text-center text-gray-600">
              Não tem uma conta?{" "}
              <Link href="/cadastro" className="text-primary font-medium hover:underline">
                Cadastrar
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
