"use client"

import type { Product } from "@/app/page"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface ProductGridProps {
  products: Product[]
  onAddToCart: (product: Product) => void
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
          <div className="aspect-square relative bg-gray-100">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <span className="font-bold text-lg text-green-600">${product.price}</span>
            </div>
            <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-500 text-sm">
              Experimente a tecnologia mais recente com o {product.name}. Alta performance e design elegante.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full add-to-cart-btn"
              onClick={() => onAddToCart(product)}
              data-testid={`add-to-cart-${product.id}`}
            >
              Adicionar ao Carrinho
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
