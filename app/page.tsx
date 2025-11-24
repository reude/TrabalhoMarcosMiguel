"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { ProductGrid } from "@/components/product-grid"
import { CartModal } from "@/components/cart-modal"

export type Product = {
  id: number
  name: string
  price: number
  image: string
  category: string
}

export type CartItem = Product & {
  quantity: number
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Smartphone Pro X", price: 999, category: "Eletrônicos", image: "/modern-smartphone.png" },
  { id: 2, name: "Laptop Ultra 15", price: 1499, category: "Computadores", image: "/modern-laptop-workspace.png" },
  {
    id: 3,
    name: "Fones com Cancelamento de Ruído",
    price: 299,
    category: "Áudio",
    image: "/diverse-people-listening-headphones.png",
  },
  { id: 4, name: "Smartwatch Série 5", price: 399, category: "Vestíveis", image: "/modern-smartwatch.png" },
  { id: 5, name: 'Monitor 4K 27"', price: 450, category: "Computadores", image: "/computer-monitor.png" },
  {
    id: 6,
    name: "Fones de Ouvido Sem Fio",
    price: 129,
    category: "Áudio",
    image: "/wireless-earbuds-charging-case.png",
  },
]

export default function Home() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [showCartModal, setShowCartModal] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    const currentUser = localStorage.getItem("currentUser") || ""
    setIsLoggedIn(loggedIn)
    setUsername(currentUser)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("currentUser")
    setIsLoggedIn(false)
    setUsername("")
    setCart([])
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    // Reset search mode if query is empty
    if (query.trim() === "") {
      setIsSearching(false)
    }
  }

  const handleSearchSubmit = () => {
    setIsSearching(true)
  }

  const filteredProducts =
    isSearching && searchQuery.trim()
      ? PRODUCTS.filter((product) => {
          const query = searchQuery.toLowerCase()
          return product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query)
        })
      : PRODUCTS

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Navbar
        isLoggedIn={isLoggedIn}
        cartCount={cartItemCount}
        username={username}
        onLogoutClick={handleLogout}
        onCartClick={() => setShowCartModal(true)}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />

      <main className="container mx-auto px-4 py-8">
        {isSearching && searchQuery.trim() ? (
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Resultados para "{searchQuery}"</h2>
            <p className="text-gray-600 mt-2">
              {filteredProducts.length} {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
            </p>
          </div>
        ) : (
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Produtos em Destaque</h2>
        )}

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum produto encontrado para sua busca.</p>
            <button
              onClick={() => {
                setSearchQuery("")
                setIsSearching(false)
              }}
              className="mt-4 text-primary underline hover:text-primary/80"
            >
              Limpar busca
            </button>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
        )}
      </main>

      {showCartModal && (
        <CartModal
          cart={cart}
          onClose={() => setShowCartModal(false)}
          onClearCart={() => setCart([])}
          onRemoveItem={removeFromCart}
        />
      )}
    </div>
  )
}
