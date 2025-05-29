"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"

export function ConnectPage() {
  const { t } = useLanguage()

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t("connect")}</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-6">
          {t("content")} {t("connect")} {t("page")}.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
            <p className="text-gray-600 mb-2">Email: contact@tohe.com</p>
            <p className="text-gray-600 mb-2">Phone: +84 123 456 789</p>
            <p className="text-gray-600">Address: Ho Chi Minh City, Vietnam</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
            <Button className="w-full mb-3">Send Message</Button>
            <Button variant="outline" className="w-full">
              Schedule Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
