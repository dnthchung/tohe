import { useTranslation } from "react-i18next";
import nenGradient from "/images/Nền gradient.png";
import { Copyright } from "@/components/copyright";

export function ConnectPage() {
  const { t } = useTranslation("connect");

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-white">
      {/* Nền gradient cố định */}
      <img src={nenGradient} alt="Background" className="fixed top-0 left-0 w-full h-full object-cover z-0" />

      {/* Overlay đen xuyên thấu */}
      {/* <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-0" /> */}

      {/* Nội dung trung tâm */}
      <div className="relative z-10 flex items-center justify-center w-full h-screen px-4">
        <div className="bg-black/50 backdrop-blur-sm rounded-xl p-10 text-center max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">{t("connect")}</h1>
          <p className="text-lg mb-3">{t("content")}</p>
          <p className="italic mb-4">{t("updating")}</p>
          <p className="text-sm text-gray-300">{t("thanks")}</p>
        </div>
      </div>

      {/* Footer luôn dính đáy */}
      <footer className="relative z-10">
        <Copyright />
      </footer>
    </div>
  );
}
