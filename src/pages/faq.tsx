import { useTranslation } from "react-i18next"


export function FAQPage() {
  const { t, i18n } = useTranslation("header")

  const faqs = [
    {
      question: "What is TOHE?",
      answer: "TOHE is a comprehensive platform designed to help you manage your projects effectively.",
    },
    {
      question: "How do I get started?",
      answer: "You can get started by creating an account and following our onboarding process.",
    },
    {
      question: "Is there customer support?",
      answer: "Yes, we provide 24/7 customer support through various channels.",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t("faq")}</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
