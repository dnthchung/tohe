import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LanguageProvider } from "./contexts/language-context"
import { Layout } from "./components/layout"
import { HomePage } from "./pages/home"
import { Term1Page } from "./pages/term1"
import { Term2Page } from "./pages/term2"
import { Term3Page } from "./pages/term3"
import { ProductsPage } from "./pages/products"
import { ConnectPage } from "./pages/connect"
import { FAQPage } from "./pages/faq"

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="term1" element={<Term1Page />} />
            <Route path="term2" element={<Term2Page />} />
            <Route path="term3" element={<Term3Page />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="connect" element={<ConnectPage />} />
            <Route path="faq" element={<FAQPage />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  )
}

export default App
