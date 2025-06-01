import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t, i18n } = useTranslation("footer");

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      {/* Main Footer */}
      <footer className="bg-[#fffef2] py-12 px-4 md:px-8">
        <div className="container mx-auto">
          {/* Logo */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold">Logo</h2>
            {/*
            <h2 className="text-2xl font-bold">
              eco
              <span className="relative">
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl">⊕</span>
                o
              </span>
              friendly<span className="text-green-500">.</span>
            </h2>
            <h3 className="text-2xl font-bold">vietnam</h3>
            */}
          </div>

          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Subscribe */}
            <div>
              <h3 className="text-xl font-semibold mb-4">{t("subscribeTitle")}</h3>
              <p className="text-green-700 mb-4">{t("subscribeDesc")}</p>
              <div className="mb-4">
                <input type="email" placeholder={t("emailPlaceholder")} className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2" />
                <button className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition-colors">{t("subscribeButton")}</button>
              </div>
              <p className="text-xs text-gray-600">
                {t("subscribeNote")}{" "}
                <Link to="/privacy-policy" className="text-green-700 underline">
                  {t("privacyPolicy")}
                </Link>
              </p>
            </div>

            {/* Info */}
            <div>
              <h3 className="text-xl font-semibold mb-4">{t("infoTitle")}</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-green-700 mr-2 mt-0.5" />
                  <p>{t("address")}</p>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-green-700 mr-2 mt-0.5" />
                  <p>{t("hotline")}</p>
                </div>
                <div className="ml-7">
                  <p>{t("tel")}</p>
                </div>
                <div className="ml-7">
                  <p>{t("fax")}</p>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-green-700 mr-2 mt-0.5" />
                  <p>{t("email")}</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-xl font-semibold mb-4">{t("socialTitle")}</h3>
              <div className="flex space-x-4 mb-6">
                {/* Chèn icon như cũ */}
                <a href="/" className="text-gray-500 transition-colors duration-300 hover:text-red-400">
                  Instagram
                </a>
                <a href="/" className="text-gray-500 transition-colors duration-300 hover:text-red-400">
                  Twitter
                </a>
                <a href="/" className="text-gray-500 transition-colors duration-300 hover:text-red-400">
                  Facebook
                </a>
              </div>

              {/* Language select */}
              <div className="flex items-center">
                <span className="mr-2">{t("language")}:</span>
                <select value={i18n.language} onChange={handleLangChange} className="bg-gray-800 text-white px-2 py-1 rounded text-sm">
                  <option value="en">English</option>
                  <option value="vi">Tiếng Việt</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
