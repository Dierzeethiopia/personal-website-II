import { createFileRoute } from "@tanstack/react-router";
import { MotionProvider, useRevealAll } from "@/components/site/motion";
import { Nav } from "@/components/site/Nav";
import { SceneCanvas } from "@/components/site/SceneCanvas";
import { Contact, Experience, Gallery, Hero, Index as MoreIndex, Story, Strip, Ventures, Work } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dires Abatieneh — Backend · Infrastructure · AI" },
      { name: "description", content: "Software engineer and CS + Math student at Williams College ’28. Previously SWE Intern at Slack / Salesforce. Building reliable systems, verifiable AI and access to education." },
      { property: "og:title", content: "Dires Abatieneh — Backend · Infrastructure · AI" },
      { property: "og:description", content: "Systems that feel simple on the surface, with a lot happening underneath." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Page() {
  useRevealAll();
  return (
    <div className="grain relative overflow-x-clip">
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Skip to work</a>
      <SceneCanvas />
      <Nav />
      <main>
        <Hero />
        <Strip />
        <Experience />
        <Work />
        <Ventures />
        <Story />
        <MoreIndex />
        <Gallery />
        <Contact />
      </main>
    </div>
  );
}

function Home() {
  return (
    <MotionProvider>
      <Page />
    </MotionProvider>
  );
}
