// // src/components/layout/Copyright.tsx
// import { useTranslation } from "react-i18next";

// export function Copyright() {
//   const { t } = useTranslation("footer");

//   return (
//     <div className="bg-black py-4 px-4 md:px-8">
//       <div className="container mx-auto text-center oswald">
//         <p className="text-white text-sm">{t("copyright")}</p>
//       </div>
//     </div>
//   );
// }

// // thêm phone, academy , team, email,address, từ json

// src/components/layout/Copyright.tsx
import { useTranslation } from "react-i18next";

export function Copyright() {
  const { t } = useTranslation("footer");

  return (
    <div className="bg-black py-6 px-4 md:px-8">
      <div className="container mx-auto oswald">
        {/* Contact Information */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 text-white">
          {/* Academy & Team Info */}
          <div className="text-left w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">{t("team")}</h3>
            <p className="text-sm text-gray-300">{t("copyright")}</p>
          </div>

          {/* Contact Details */}
          <div className="text-left w-full md:w-1/3 mb-4 md:mb-0 md:text-center">
            <h3 className="text-lg font-semibold mb-2">{t("contact")}</h3>
            <div className="space-y-1 text-sm text-gray-300 ">
              <p>{t("phone")}</p>
              <p>{t("email")}</p>
            </div>
          </div>

          {/* Address */}
          <div className="text-right w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-2">{t("location")}</h3>
            <p className="text-sm text-gray-300">{t("address")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
