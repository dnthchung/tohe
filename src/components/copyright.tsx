// src/components/layout/Copyright.tsx
import { useTranslation } from "react-i18next";

export function Copyright() {
  const { t } = useTranslation("footer");

  return (
    <div className="bg-black py-4 px-4 md:px-8">
      <div className="container mx-auto text-center oswald">
        <p className="text-white text-sm">{t("copyright")}</p>
      </div>
    </div>
  );
}
