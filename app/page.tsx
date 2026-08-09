import type { Metadata } from "next";
import { MovedPage, movedMetadata } from "@/components/shared/MovedPage";

/**
 * The root used to be the reports index. Both halves of the site now sit one
 * level down, /tech and /feed, so the root is a doorway rather than a section.
 * It forwards to /tech, which is what it always showed.
 */
export const metadata: Metadata = movedMetadata("/tech/");

export default function RootRoute() {
  return <MovedPage to="/tech/" title="WIG-log" />;
}
