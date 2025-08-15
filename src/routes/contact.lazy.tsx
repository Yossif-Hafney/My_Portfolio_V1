import { createLazyFileRoute } from "@tanstack/react-router";
import Contact from "../pages/Contact";

export const Route = createLazyFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return <Contact />;
}
