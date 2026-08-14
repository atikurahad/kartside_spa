import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const titles: Record<string, string> = {
  "/": "KORTSIDE",
  "/inquire": "KORTSIDE — Inquire",
};

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.title = titles[pathname] ?? "KORTSIDE";
  }, [pathname]);

  return null;
}
