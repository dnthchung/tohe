import { useTranslation } from "react-i18next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Copyright } from "@/components/copyright";
import nenGradient from "/images/Nền gradient.png";

export function FAQPage() {
  const { t } = useTranslation("faq");
  const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"];

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col faustina">
      {/* Nền gradient cố định */}
      <img src={nenGradient} alt="Background" className="fixed top-0 left-0 w-full h-full object-cover z-0" />
      {/* Nền phụ lặp toàn trang */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/Nền sáng.png')] bg-repeat-y bg-center bg-cover z-0 opacity-80" />

      {/* Nội dung chính */}
      <main className="relative z-10 flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10">
        <Accordion type="single" collapsible className="space-y-2">
          {faqKeys.map((key) => (
            <AccordionItem key={key} value={key} className="bg-white/90 backdrop-blur-md rounded-xl border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left text-lg font-semibold">{t(`${key}.question`)}</AccordionTrigger>
                              <AccordionContent className="px-6 pb-4 text-gray-700 leading-relaxed faustina">{t(`${key}.answer`)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>

      {/* Footer luôn dính đáy */}
      <footer className="relative z-10">
        <Copyright />
      </footer>
    </div>
  );
}
