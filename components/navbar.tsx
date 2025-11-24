"use client"

import type React from "react"

import { Search, ShoppingCart, LogIn, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface NavbarProps {
  isLoggedIn: boolean
  cartCount: number
  username?: string
  onLogoutClick: () => void
  onCartClick: () => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onSearchSubmit: () => void
}

export function Navbar({
  isLoggedIn,
  cartCount,
  username,
  onLogoutClick,
  onCartClick,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}: NavbarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchSubmit()
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-80 transition-opacity"
        >
          <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center text-white">E</div>
          <span className="hidden sm:inline-block">ElectroShop</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md flex items-center gap-2">
          <div className="relative flex-1">
            <Input
              id="search-input"
              type="text"
              placeholder="Buscar produtos..."
              className="w-full pr-10"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button id="search-btn" size="icon" variant="secondary" onClick={onSearchSubmit}>
            <Search className="h-4 w-4" />
            <span className="sr-only">Buscar</span>
          </Button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <div id="welcome-msg" className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600">
                <User className="h-4 w-4" />
                Bem-vindo, {username || "Usuário"}
              </div>
              <Button
                id="nav-logout-btn"
                variant="outline"
                onClick={onLogoutClick}
                className="flex items-center gap-2 bg-transparent"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button id="nav-login-btn" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Entrar</span>
              </Button>
            </Link>
          )}

          <Button variant="ghost" size="icon" className="relative" onClick={onCartClick}>
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            {cartCount > 0 && (
              <span
                id="cart-count"
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
              >
                {cartCount}
              </span>
            )}
            <span className="sr-only">Carrinho</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
