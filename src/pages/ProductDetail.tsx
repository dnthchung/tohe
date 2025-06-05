import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import nenGradient from "/images/Nền gradient.png";
import { ArrowLeft } from "lucide-react";

// Card images (main zodiac cards)
import chuotCard from "../assets/12congiap/1.png";
import trauCard from "../assets/12congiap/2.png";
import hoCard from "../assets/12congiap/3.png";
import meoCard from "../assets/12congiap/4.png";
import rongCard from "../assets/12congiap/5.png";
import ranCard from "../assets/12congiap/6.png";
import nguaCard from "../assets/12congiap/7.png";
import deCard from "../assets/12congiap/8.png";
import khiCard from "../assets/12congiap/9.png";
import gaCard from "../assets/12congiap/10.png";
import choCard from "../assets/12congiap/11.png";
import lonCard from "../assets/12congiap/12.png";

// Animal images (detailed animals)
import chuotAnimal from "../assets/12congiap/animals/1.png";
import trauAnimal from "../assets/12congiap/animals/2.png";
import hoAnimal from "../assets/12congiap/animals/3.png";
import meoAnimal from "../assets/12congiap/animals/4.png";
import rongAnimal from "../assets/12congiap/animals/5.png";
import ranAnimal from "../assets/12congiap/animals/6.png";
import nguaAnimal from "../assets/12congiap/animals/7.png";
import deAnimal from "../assets/12congiap/animals/8.png";
import khiAnimal from "../assets/12congiap/animals/9.png";
import gaAnimal from "../assets/12congiap/animals/10.png";
import choAnimal from "../assets/12congiap/animals/11.png";
import lonAnimal from "../assets/12congiap/animals/12.png";

const animalData = {
  chuot: {
    id: "1",
    name: "Chuột",
    description:
      "Con Chuột là con vật đầu tiên trong 12 con giáp. Người tuổi Tý thường thông minh, nhanh nhẹn và có khả năng thích nghi cao. Họ rất tinh tế trong việc phát hiện cơ hội và có tài năng kinh doanh.",
    characteristics: ["Thông minh", "Nhanh nhẹn", "Linh hoạt", "Có tài kinh doanh"],
    years: ["1996", "2008", "2020", "2032"],
    img: chuotCard,
    cardImg: chuotAnimal,
  },
  trau: {
    id: "2",
    name: "Trâu",
    description: "Con Trâu tượng trưng cho sự chăm chỉ, kiên nhẫn và đáng tin cậy. Người tuổi Sửu thường có ý chí mạnh mẽ, làm việc cần mẫn và có tinh thần trách nhiệm cao.",
    characteristics: ["Chăm chỉ", "Kiên nhẫn", "Đáng tin cậy", "Có trách nhiệm"],
    years: ["1997", "2009", "2021", "2033"],
    img: trauCard,
    cardImg: trauAnimal,
  },
  ho: {
    id: "3",
    name: "Hổ",
    description: "Con Hổ là biểu tượng của sức mạnh, dũng cảm và uy quyền. Người tuổi Dần thường có tinh thần lãnh đạo, quyết đoán và không ngại đối mặt với thử thách.",
    characteristics: ["Dũng cảm", "Mạnh mẽ", "Lãnh đạo", "Quyết đoán"],
    years: ["1998", "2010", "2022", "2034"],
    img: hoCard,
    cardImg: hoAnimal,
  },
  meo: {
    id: "4",
    name: "Mèo",
    description: "Con Mèo (Thỏ) tượng trưng cho sự dịu dàng, khéo léo và may mắn. Người tuổi Mão thường có tính cách ôn hòa, thận trọng và có khả năng ngoại giao tốt.",
    characteristics: ["Dịu dàng", "Khéo léo", "May mắn", "Ngoại giao"],
    years: ["1999", "2011", "2023", "2035"],
    img: meoCard,
    cardImg: meoAnimal,
  },
  rong: {
    id: "5",
    name: "Rồng",
    description: "Con Rồng là biểu tượng thiêng liêng nhất trong 12 con giáp. Người tuổi Thìn thường có khí chất phi thường, tự tin và có khả năng sáng tạo vượt trội.",
    characteristics: ["Thiêng liêng", "Tự tin", "Sáng tạo", "Phi thường"],
    years: ["2000", "2012", "2024", "2036"],
    img: rongCard,
    cardImg: rongAnimal,
  },
  ran: {
    id: "6",
    name: "Rắn",
    description: "Con Rắn tượng trưng cho sự thông thái, bí ẩn và trực giác mạnh mẽ. Người tuổi Tỵ thường có tư duy sâu sắc, khả năng phán đoán tốt và tính cách huyền bí.",
    characteristics: ["Thông thái", "Bí ẩn", "Trực giác", "Sâu sắc"],
    years: ["2001", "2013", "2025", "2037"],
    img: ranCard,
    cardImg: ranAnimal,
  },
  ngua: {
    id: "7",
    name: "Ngựa",
    description: "Con Ngựa biểu hiện sự tự do, năng động và nhiệt huyết. Người tuổi Ngọ thường có tinh thần phiêu lưu, yêu thích sự tự do và có năng lượng mạnh mẽ.",
    characteristics: ["Tự do", "Năng động", "Nhiệt huyết", "Phiêu lưu"],
    years: ["2002", "2014", "2026", "2038"],
    img: nguaCard,
    cardImg: nguaAnimal,
  },
  de: {
    id: "8",
    name: "Dê",
    description: "Con Dê tượng trưng cho sự hiền lành, nghệ thuật và cảm tính. Người tuổi Mùi thường có tâm hồn nghệ sĩ, tính cách nhẹ nhàng và khả năng thẩm mỹ cao.",
    characteristics: ["Hiền lành", "Nghệ thuật", "Cảm tính", "Thẩm mỹ"],
    years: ["2003", "2015", "2027", "2039"],
    img: deCard,
    cardImg: deAnimal,
  },
  khi: {
    id: "9",
    name: "Khỉ",
    description: "Con Khỉ là biểu tượng của sự thông minh, linh hoạt và hài hước. Người tuổi Thân thường có trí thông minh vượt trội, khả năng thích nghi nhanh và tinh thần lạc quan.",
    characteristics: ["Thông minh", "Linh hoạt", "Hài hước", "Lạc quan"],
    years: ["2004", "2016", "2028", "2040"],
    img: khiCard,
    cardImg: khiAnimal,
  },
  ga: {
    id: "10",
    name: "Gà",
    description: "Con Gà tượng trưng cho sự cần mẫn, trung thực và tỉ mỉ. Người tuổi Dậu thường có tính cách thẳng thắn, làm việc có tổ chức và rất chăm chỉ.",
    characteristics: ["Cần mẫn", "Trung thực", "Tỉ mỉ", "Có tổ chức"],
    years: ["2005", "2017", "2029", "2041"],
    img: gaCard,
    cardImg: gaAnimal,
  },
  cho: {
    id: "11",
    name: "Chó",
    description: "Con Chó là biểu tượng của lòng trung thành, tình bạn và sự bảo vệ. Người tuổi Tuất thường có tính cách trung thực, đáng tin cậy và luôn sẵn sàng giúp đỡ người khác.",
    characteristics: ["Trung thành", "Đáng tin", "Bảo vệ", "Giúp đỡ"],
    years: ["2006", "2018", "2030", "2042"],
    img: choCard,
    cardImg: choAnimal,
  },
  lon: {
    id: "12",
    name: "Lợn",
    description: "Con Lợn tượng trưng cho sự may mắn, thịnh vượng và lòng từ bi. Người tuổi Hợi thường có tính cách hào phóng, chân thành và có khả năng tạo dựng tài sản.",
    characteristics: ["May mắn", "Thịnh vượng", "Từ bi", "Hào phóng"],
    years: ["2007", "2019", "2031", "2043"],
    img: lonCard,
    cardImg: lonAnimal,
  },
};

export function ProductDetail() {
  const { animalName } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation("products");
  const animal = animalData[animalName as keyof typeof animalData];

  if (!animal) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy thông tin</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-black text-white">
      <img src={nenGradient} className="absolute top-0 left-0 w-full h-full object-cover z-0" alt="Light Background" />
      <div className="absolute inset-0 bg-black/20 z-5" />
      <div className="relative z-10 px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-center">Thẻ Tò He</h3>
                <img src={animal.img} alt={`Thẻ ${animal.name}`} className="w-full max-w-md mx-auto rounded-xl shadow-2xl" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-center">Hình ảnh con vật</h3>
                <img src={animal.cardImg} alt={animal.name} className="w-full max-w-md mx-auto rounded-xl shadow-2xl" />
              </div>
            </div>
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="bg-yellow-500 text-black font-bold px-3 py-1 rounded-full text-sm">#{animal.id}</span>
                  <h1 className="text-4xl md:text-5xl font-bold text-yellow-400">{animal.name}</h1>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Giới thiệu</h2>
                <p className="text-gray-200 leading-relaxed text-lg">{animal.description}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Đặc điểm</h2>
                <div className="grid grid-cols-2 gap-3">
                  {animal.characteristics.map((char, index) => (
                    <div key={index} className="bg-yellow-500/20 px-4 py-2 rounded-lg text-center font-medium">
                      {char}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Các năm tương ứng</h2>
                <div className="flex flex-wrap gap-3">
                  {animal.years.map((year, index) => (
                    <span key={index} className="bg-blue-500/30 px-4 py-2 rounded-lg font-semibold text-lg">
                      {year}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
