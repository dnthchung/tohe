import { useTranslation } from "react-i18next";

export function Chapter1Page() {
  const { t } = useTranslation("chapter1");

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t("chapter1.title")}</h1>
      <p className="text-lg mb-4">{t("chapter1.intro")}</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>{t("chapter1.point1")}</li>
        <li>{t("chapter1.point2")}</li>
        <li>{t("chapter1.point3")}</li>
      </ul>
      <p className="mt-4">{t("chapter1.conclusion")}</p>
    </div>
  );
}
