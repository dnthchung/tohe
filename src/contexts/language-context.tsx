"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "vi"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    home: "Home",
    term1: "Term 1",
    term2: "Term 2",
    term3: "Term 3",
    products: "Products",
    connect: "Connect",
    faq: "FAQ",
    welcome: "Welcome to our application",
    selectLanguage: "Select Language",
    content: "This is the content for",
    page: "page",
  },
  vi: {
    home: "Trang chủ",
    term1: "Kỳ 1",
    term2: "Kỳ 2",
    term3: "Kỳ 3",
    products: "Sản phẩm",
    connect: "Kết nối",
    faq: "FAQ",
    welcome: "Chào mừng đến với ứng dụng của chúng tôi",
    selectLanguage: "Chọn ngôn ngữ",
    content: "Đây là nội dung cho trang",
    page: "trang",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("vi")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["en"]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
