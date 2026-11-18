import type { Metadata } from "next";
import HomeView from "@/components/HomeView";
import { homeFaqs } from "@/lib/faq";
import { homeGraph, ldJson } from "@/lib/schema";

// hreflang lives here (not in the root layout) so the service pages don't inherit it.
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { en: "/", ur: "/ur", "x-default": "/" },
  },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(homeGraph(homeFaqs)) }} />
      <HomeView lang="en" />
    </>
  );
}
