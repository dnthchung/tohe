import { useTranslation } from "react-i18next";

export function Chapter1Page() {
  const { t } = useTranslation("chapter1");

  // Sử dụng returnObjects: true để lấy object chứa các phần của "content"
  const content = t("content", { returnObjects: true });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Tiêu đề chương */}
      <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
      {/* Mô tả ngắn chương */}
      <p className="text-lg text-gray-700 mb-6">{t("description")}</p>

      {/* Duyệt qua từng phần của content nếu nó là object */}
      {typeof content === "object" && content !== null ? (
        Object.entries(content).map(([section, text]) => (
          <div key={section} className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">{section}</h2>
            <p className="text-base text-gray-600 whitespace-pre-wrap">{text}</p>
          </div>
        ))
      ) : (
        // Nếu content là dạng văn bản đơn, hiển thị trực tiếp
        <p>{content}</p>
      )}
    </div>
  );
}
