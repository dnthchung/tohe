// // src/pages/home.tsx
// import { useEffect } from "react";
// import nightSky from "/images/night-sky-998641.jpg";
// import bg2 from "/images/bg2.png";
// import sub1 from "/images/sub1.png";
// import sub2 from "/images/sub2.png";
// import { useTranslation } from "react-i18next";

// export function HomePage() {
//   const { t } = useTranslation("home");

//   useEffect(() => {
//     const handleScroll = () => {
//       document.documentElement.style.setProperty("--scroll", `${window.scrollY}px`);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="relative w-full min-h-[400vh] overflow-hidden bg-black">
//       {/* Background stars - chỉ cho section đầu tiên */}
//       <div
//         className="absolute top-0 left-0 w-full h-screen bg-cover bg-center z-0"
//         style={{
//           backgroundImage: `url(${nightSky})`,
//         }}
//       />

//       {/* Left decorative element - moves horizontally */}
//       <img
//         src={sub2}
//         className="fixed left-0 bottom-0 w-[50vw] z-10 pointer-events-none will-change-transform transition-transform duration-300 ease-out"
//         style={{
//           transform: "translateX(calc(var(--scroll) * -1))",
//         }}
//         alt="sub2"
//       />

//       {/* Right decorative element - moves horizontally */}
//       <img
//         src={sub1}
//         className="fixed right-0 bottom-0 w-[50vw] z-10 pointer-events-none will-change-transform transition-transform duration-300 ease-out"
//         style={{
//           transform: "translateX(calc(var(--scroll) * 1))",
//         }}
//         alt="sub1"
//       />

//       {/* Welcome section - với nightSky background */}
//       <div className="relative z-20 flex items-center justify-center h-screen text-white">
//         <h1
//           className="text-4xl md:text-6xl font-bold drop-shadow-md will-change-transform transition-transform duration-300 ease-out"
//           style={{
//             transform: "translateY(calc(var(--scroll) * 0.4))",
//           }}
//         >
//           Welcome to TOHE
//         </h1>
//       </div>

//       {/* Section 1 - poem với bg2 background */}
//       <div
//         className="relative z-20 h-screen flex items-center justify-center text-center text-white bg-cover bg-center"
//         style={{
//           backgroundImage: `url(${bg2})`,
//         }}
//       >
//         <p className="text-lg font-bold leading-relaxed whitespace-pre-line max-w-3xl px-6">
//           {/* Replace this with: {t("poem")} or similar i18n text */}
//           This is the poem section. Centered and full-screen.
//         </p>
//       </div>

//       {/* Section 2 với bg2 background */}
//       <div
//         className="relative z-20 h-screen flex items-center justify-center text-white bg-cover bg-center px-6 text-center"
//         style={{
//           backgroundImage: `url(${bg2})`,
//         }}
//       >
//         <p className="max-w-3xl text-lg font-medium leading-relaxed whitespace-pre-line">
//           Replace with: {t("section1")}
//           {/* Section 1 content goes here. Centered and full-screen. */}
//         </p>
//       </div>

//       {/* Section 3 với bg2 background */}
//       <div
//         className="relative z-20 h-screen flex flex-col justify-center text-white bg-cover bg-center px-6 text-center"
//         style={{
//           backgroundImage: `url(${bg2})`,
//         }}
//       >
//         <h2 className="text-2xl font-bold mb-6">CHUYỆN TÒ HE</h2>
//         <p className="max-w-3xl mx-auto text-lg font-medium leading-relaxed whitespace-pre-line">
//           {/* Replace with: {t("section2")} */}
//           Section 2 content goes here. Centered.
//         </p>
//       </div>

//       {/* Section 4 với bg2 background */}
//       <div
//         className="relative z-20 h-screen flex flex-col justify-center text-white bg-cover bg-center px-6 text-center"
//         style={{
//           backgroundImage: `url(${bg2})`,
//         }}
//       >
//         <h2 className="text-2xl font-bold mb-6">CHUYỆN TÒ HE</h2>
//         <p className="max-w-3xl mx-auto text-lg font-medium leading-relaxed whitespace-pre-line">
//           {/* Replace with: {t("section3")} */}
//           Section 3 content goes here. Centered.
//         </p>
//       </div>
//     </div>
//   );
// }

// src/pages/home.tsx
import { useEffect } from "react";
import nightSky from "/images/night-sky-998641.jpg";
import bg2 from "/images/bg2.png";
import sub1 from "/images/sub1.png";
import sub2 from "/images/sub2.png";
import { useTranslation } from "react-i18next";

export function HomePage() {
  const { t } = useTranslation("home");

  // set --scroll custom property on root for parallax math
  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty("--scroll", `${window.scrollY}px`);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden bg-black">
      {/* Parallax decorative layers (always visible) */}
      <img
        src={sub2}
        className="fixed left-0 bottom-0 w-[50vw] z-10 pointer-events-none will-change-transform transition-transform duration-300 ease-out"
        style={{ transform: "translateX(calc(var(--scroll) * -0.4))" }}
        alt="sub2"
      />

      <img
        src={sub1}
        className="fixed right-0 bottom-0 w-[50vw] z-10 pointer-events-none will-change-transform transition-transform duration-300 ease-out"
        style={{ transform: "translateX(calc(var(--scroll) * 0.4))" }}
        alt="sub1"
      />

      {/* -------------- FIRST SCREEN -------------- */}
      <section className="relative h-screen flex items-center justify-center text-white bg-cover bg-center" style={{ backgroundImage: `url(${nightSky})` }}>
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-md will-change-transform transition-transform duration-300 ease-out" style={{ transform: "translateY(calc(var(--scroll) * 0.2))" }}>
          Welcome to TOHE
        </h1>
      </section>

      {/* -------------- SECTION 1 -------------- */}
      <section className="h-screen flex items-center justify-center text-center text-white bg-cover bg-center px-6" style={{ backgroundImage: `url(${bg2})` }}>
        <p className="text-lg font-bold leading-relaxed whitespace-pre-line max-w-3xl">{t("poem") || "This is the poem section. Centered and full‑screen."}</p>
      </section>

      {/* -------------- SECTION 2 -------------- */}
      <section className="h-screen flex items-center justify-center text-center text-white bg-cover bg-center px-6" style={{ backgroundImage: `url(${bg2})` }}>
        <p className="max-w-3xl text-lg font-medium leading-relaxed whitespace-pre-line">{t("section1") || "Section 1 content goes here."}</p>
      </section>

      {/* -------------- SECTION 3 -------------- */}
      <section className="h-screen flex flex-col justify-center items-center text-center text-white bg-cover bg-center px-6" style={{ backgroundImage: `url(${bg2})` }}>
        <h2 className="text-2xl font-bold mb-6">CHUYỆN TÒ HE</h2>
        <p className="max-w-3xl text-lg font-medium leading-relaxed whitespace-pre-line">{t("section2") || "Section 2 content goes here."}</p>
      </section>

      {/* -------------- SECTION 4 -------------- */}
      <section className="h-screen flex flex-col justify-center items-center text-center text-white bg-cover bg-center px-6" style={{ backgroundImage: `url(${bg2})` }}>
        <h2 className="text-2xl font-bold mb-6">CHUYỆN TÒ HE</h2>
        <p className="max-w-3xl text-lg font-medium leading-relaxed whitespace-pre-line">{t("section3") || "Section 3 content goes here."}</p>
      </section>
    </div>
  );
}
