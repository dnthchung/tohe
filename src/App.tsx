import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout";
import { HomePage } from "./pages/home";
import { Chapter1Page } from "./pages/chapter1";
import { Chapter2Page } from "./pages/chapter2";
import { Chapter3Page } from "./pages/chapter3";
import { ProductsPage } from "./pages/products";
import { ConnectPage } from "./pages/connect";
import { FAQPage } from "./pages/faq";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="chapter1" element={<Chapter1Page />} />
          <Route path="chapter2" element={<Chapter2Page />} />
          <Route path="chapter3" element={<Chapter3Page />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="connect" element={<ConnectPage />} />
          <Route path="faq" element={<FAQPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
