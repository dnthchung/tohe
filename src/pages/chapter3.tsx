import { useTranslation } from "react-i18next";

export function Chapter3Page() {
  const { t } = useTranslation("chapter3");

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t("chapter3.title")}</h1>
      <p className="text-lg mb-4">{t("chapter3.intro")}</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>{t("chapter3.point1")}</li>
        <li>{t("chapter3.point2")}</li>
        <li>{t("chapter3.point3")}</li>
      </ul>
      <p className="mt-4">{t("chapter3.conclusion")}</p>
    </div>
  );
}
