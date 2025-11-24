"use client"

import { useState } from "react"
import { X, ShoppingBag, CheckCircle, Trash2 } from "lucide-react"
import type { CartItem } from "@/app/page"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

interface CartModalProps {
  cart: CartItem[]
  onClose: () => void
  onClearCart: () => void
  onRemoveItem: (productId: number) => void
}

export function CartModal({ cart, onClose, onClearCart, onRemoveItem }: CartModalProps) {
  const [isSuccess, setIsSuccess] = useState(false)

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleCheckout = () => {
    setIsSuccess(true)
    setTimeout(() => {
      onClearCart()
      // We keep the success message visible until the user closes the modal
    }, 2000)
  }

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <Card className="w-full max-w-md shadow-2xl text-center p-6">
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 id="order-success-msg" className="text-2xl font-bold text-green-700">
              Pedido Realizado com Sucesso!
            </h3>
            <p className="text-gray-500">Obrigado por sua compra.</p>
            <Button onClick={onClose} className="mt-4">
              Fechar
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Seu Carrinho ({totalItems})
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <Separator />

        <CardContent className="flex-1 overflow-auto p-0">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <ShoppingBag className="h-12 w-12 mb-4 opacity-20" />
              <p>Seu carrinho está vazio</p>
            </div>
          ) : (
            <ScrollArea className="h-full max-h-[400px]">
              <div className="p-6 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start">
                    <div className="h-16 w-16 bg-gray-100 rounded-md flex-shrink-0 relative overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="font-bold text-sm">${(item.price * item.quantity).toLocaleString()}</div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => onRemoveItem(item.id)}
                        data-testid={`remove-item-${item.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>

        <Separator />
        <CardFooter className="flex flex-col gap-4 pt-6">
          <div className="w-full flex justify-between items-center text-lg font-bold">
            <span>Total</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>
          <Button
            id="checkout-btn"
            className="w-full py-6 text-lg"
            disabled={cart.length === 0}
            onClick={handleCheckout}
          >
            Finalizar Compra
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
