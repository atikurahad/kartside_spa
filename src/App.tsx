import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
          
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#0f0f0f",
            color: "#f5f5f0",
            border: "1px solid rgb(245 245 240 / 0.12)",
            borderRadius: "0",
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            fontWeight: 300,
            letterSpacing: "0.08em",
            padding: "14px 24px",
          },
          success: {
            iconTheme: {
              primary: "#a39e93",
              secondary: "#0a0a0a",
            },
          },
          error: {
            iconTheme: {
              primary: "#a39e93",
              secondary: "#0a0a0a",
            },
          },
        }}
      />
    </HashRouter>
  );
}
