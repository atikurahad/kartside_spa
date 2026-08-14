import { useState, useEffect } from "react";
import contentData from "../data/content.json";

export interface SectionContent {
  title: string;
  subtitle?: string;
  tagline?: string;
  description?: string;
}

export interface WebsiteContent {
  hero: SectionContent;
  about: SectionContent;
  inquire: SectionContent;
}

export function useContent() {
  const [content, setContent] = useState<WebsiteContent>(contentData as WebsiteContent);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = () => {
    try {
      setLoading(true);
      const localDataStr = localStorage.getItem("kortside_content");
      if (localDataStr) {
        const parsed = JSON.parse(localDataStr);
        setContent(parsed);
      } else {
        // Initialize localStorage with current content.json data
        localStorage.setItem("kortside_content", JSON.stringify(contentData));
        setContent(contentData as WebsiteContent);
      }
      setError(null);
    } catch (err: any) {
      setError(err.message || "An error occurred while loading content.");
      setContent(contentData as WebsiteContent);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return { content, loading, error, refresh: fetchContent };
}
