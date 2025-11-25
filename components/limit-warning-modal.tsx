"use client"

import { X } from "lucide-react"

interface LimitWarningModalProps {
  onClose: () => void
}

export function LimitWarningModal({ onClose }: LimitWarningModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">⚠️</span>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-3">Opa, vai com calma!</h3>

          <p className="text-gray-600 text-lg mb-6">
            Finalize sua compra antes de adicionar mais desse item no carrinho!
          </p>

          <button
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  )
}
