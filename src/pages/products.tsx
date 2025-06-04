import { useTranslation } from "react-i18next";
import nenGradient from "/images/Nền gradient.png";
import hopToHe from "../assets/12congiap/Hộp.png"
import { useNavigate } from "react-router-dom";

const animalCards = [
  { id: "1", name: "chuot", img: "../assets/12congiap/chó.png" },
  { id: "2", name: "trau", img: "../assets/12congiap/trâu.png" },
  { id: "3", name: "ho", img: "../assets/12congiap/3.png" },
  { id: "4", name: "meo", img: "../assets/12congiap/4.png" },
  { id: "5", name: "rong", img: "../assets/12congiap/5.png" },
  { id: "6", name: "ran", img: "../assets/12congiap/6.png" },
  { id: "7", name: "ngua", img: "../assets/12congiap/7.png" },
  { id: "8", name: "de", img: "../assets/12congiap/8.png" },
  { id: "9", name: "khi", img: "../assets/12congiap/9.png" },
  { id: "10", name: "ga", img: "../assets/12congiap/10.png" },
  { id: "11", name: "cho", img: "../assets/12congiap/11.png" },
  { id: "12", name: "lon", img: "../assets/12congiap/12.png" },
];

export function ProductsPage() {
  const { t } = useTranslation("products");
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-black text-white">
      <img
        src={nenGradient}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      />

      {/* Header */}
      <div className="pt-24 text-center">
        <h1 className="text-4xl font-bold">Mùa 1: Tò He x 12 con giáp</h1>
      </div>

      {/* Box Display */}
      <div className="flex justify-center my-12">
        <img src={hopToHe} alt="Hộp Tò He" className="w-[320px] md:w-[420px]" />
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4 pb-20 max-w-6xl mx-auto">
        {animalCards.map((card) => (
          <div
            key={card.id}
            className="cursor-pointer transform transition duration-300 hover:scale-105 shadow-lg rounded-xl overflow-hidden bg-white"
            onClick={() => navigate(`/products/${card.name}`)}
          >
            <img src={card.img} alt={card.name} className="w-full h-auto object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
