import { useTranslation } from "react-i18next";

interface Paragraph {
  text: string;
  images: string[];
}

interface ChapterContent {
  [section: string]: Paragraph[];
}

export function Chapter1Page() {
  const { t } = useTranslation("chapter1");
  const content = t("content", { returnObjects: true }) as ChapterContent;

  if (!content || typeof content !== "object") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <p>Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pt-[80px] font-sans">
      <h1 className="text-3xl font-bold mb-4 text-center">{t("title")}</h1>
      <p className="text-lg text-gray-700 mb-6 text-center">{t("description")}</p>

      {Object.entries(content).map(([sectionTitle, paragraphs]) => {
        if (!Array.isArray(paragraphs)) {
          return null;
        }
        return (
          <section key={sectionTitle} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">{sectionTitle}</h2>
            {paragraphs.map((para, index) => {
              if (!para || typeof para !== "object" || !para.text) {
                return null;
              }
              return (
                <div key={index} className="mb-6">
                  <p className="text-base text-gray-700 whitespace-pre-wrap mb-3 leading-relaxed">{para.text}</p>
                  {para.images && Array.isArray(para.images) && para.images.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      {para.images.map((img, imgIndex) => (
                        <img key={imgIndex} src={`/${img}`} alt={`Illustration ${imgIndex + 1}`} className="rounded shadow-md w-full h-auto object-cover" />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        );
      })}
    </div>
  );
}
