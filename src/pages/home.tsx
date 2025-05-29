"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"

export function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{t("welcome")}</h1>
        <p className="text-xl text-gray-600 mb-8">
          {t("content")} {t("home").toLowerCase()} {t("page")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">{t("term1")}</h3>
            <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <Button className="mt-4" variant="outline">
              {t("connect")}
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">{t("term2")}</h3>
            <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <Button className="mt-4" variant="outline">
              {t("connect")}
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">{t("term3")}</h3>
            <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <Button className="mt-4" variant="outline">
              {t("connect")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
