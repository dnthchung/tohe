"use client"

import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"

export function ProductsPage() {
  const { t } = useTranslation()

  const products = [
    { id: 1, name: "Product 1", description: "Description for product 1" },
    { id: 2, name: "Product 2", description: "Description for product 2" },
    { id: 3, name: "Product 3", description: "Description for product 3" },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t("products")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-3">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
