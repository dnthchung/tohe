import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation("footer");

  return (
    <footer className="bg-[#f9f9f2] text-gray-800 py-12 px-4 md:px-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Logo */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-extrabold text-green-800 tracking-wide">
            Tò He <span className="text-yellow-500">Stories</span>
          </h2>
        </div>

        {/* Main Grid (2 cột) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm">
          {/* Subscribe */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-green-800">{t("subscribeTitle")}</h3>
            <p className="text-gray-700 mb-4">{t("subscribeDesc")}</p>
            <input type="email" placeholder={t("emailPlaceholder")} className="w-full border border-gray-300 rounded-md px-4 py-2 mb-3 text-sm" />
            <button className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition">{t("subscribeButton")}</button>
            <p className="text-xs text-gray-500 mt-3">
              {t("subscribeNote")}{" "}
              <Link to="/privacy-policy" className="text-green-700 underline">
                {t("privacyPolicy")}
              </Link>
            </p>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-green-800">{t("infoTitle")}</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span>{t("address")}</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span>{t("hotline")}</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span>{t("email")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line (Optional) */}
        <div className="mt-12 text-center text-xs text-gray-400">&copy; {new Date().getFullYear()} To He Stories. All rights reserved.</div>
      </div>
    </footer>
  );
}
