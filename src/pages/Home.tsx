import { About } from "../components/About";
import { Hero } from "../components/Hero";
import { InquireSection } from "../components/InquireSection";
import { useContent } from "../hooks/useContent";

export function Home() {
  const { content } = useContent();

  return (
    <>
      <Hero data={content.hero} />
      <About data={content.about} />
      <InquireSection data={content.inquire} />
    </>
  );
}
