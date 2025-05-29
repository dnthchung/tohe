import { useTranslation } from "react-i18next"

export function Footer() {
  const { t } = useTranslation("footer")

  return (
    <footer className="bg-slate-800 text-white py-4 mt-8">
      <div className="container mx-auto px-4 text-center space-y-1 text-sm">
        <p>{t("contactUs")}</p>
        <p>{t("team")}</p>
        <p>{t("academy")}</p>
        <p>{t("phone")}</p>
        <p>{t("email")}</p>
      </div>
    </footer>
  )
}
