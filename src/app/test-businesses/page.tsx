import RegistryView from "@/components/registry/RegistryView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FindMe Registry | Explore the Ecosystem",
  description: "A real-time directory of all participants and businesses within the FindMe ecosystem. Explore limitless possibilities.",
  alternates: {
    canonical: "/test-businesses/",
  },
};

export default function BusinessesPage() {
  return <RegistryView />;
}
