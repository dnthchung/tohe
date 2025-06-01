// src/components/languageToggle.tsx
import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const isVi = i18n.language === "vi"; // đổi tên biến và điều kiện

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    i18n.changeLanguage(checked ? "vi" : "en"); // đảo lại logic checked
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer select-none">
      <input type="checkbox" checked={isVi} onChange={handleChange} className="sr-only peer" />
      <div
        className="
          peer ring-0 bg-rose-400 rounded-full outline-none duration-300
          after:duration-500 w-12 h-12 shadow-md peer-checked:bg-emerald-500
          after:content-['NƎ'] peer-checked:after:content-['VI']
          after:rounded-full after:absolute after:outline-none after:h-10 after:w-10
          after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center
          peer-hover:after:scale-75 after:text-xs after:font-bold
          after:-rotate-180 peer-checked:after:rotate-0
        "
      ></div>
    </label>
  );
}
