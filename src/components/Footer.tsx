import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faGithub,
  faXTwitter,
  faTelegram,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

type SocialLink = {
  id: number;
  name: string;
  icon: "facebook" | "github" | "x" | "telegram" | "instagram" | "linkedin";
  url: string;
};

const iconMap: Record<SocialLink["icon"], IconDefinition> = {
  facebook: faFacebook,
  github: faGithub,
  x: faXTwitter,
  telegram: faTelegram,
  instagram: faInstagram,
  linkedin: faLinkedin,
};

export default function Footer() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/social-links.json", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: SocialLink[] = await res.json();
        if (active) setLinks(data);
      } catch (e: unknown) {
        if (active) setError(e instanceof Error ? e.message : "Failed to load");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);
  return (
    <footer className="bg-transparent text-slate-200 py-12 mt-20 border-t border-slate-700/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          <h2
            className="text-center text-xl sm:text-2xl md:text-3xl font-bold tracking-wide
             bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent"
          >
            Follow Us :
          </h2>
          <nav
            aria-label="Social links"
            className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 min-h-10 w-full max-w-sm sm:max-w-md overflow-hidden"
          >
            {loading && (
              <span className="text-slate-400 text-sm">Loading…</span>
            )}
            {error && <span className="text-red-400 text-sm">{error}</span>}
            {!loading &&
              !error &&
              links.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  aria-label={item.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-full p-1.5 sm:p-2 text-slate-400 transition-all duration-300 hover:text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60 flex-shrink-0"
                >
                  <FontAwesomeIcon
                    icon={iconMap[item.icon]}
                    className="text-lg sm:text-xl md:text-2xl transition-transform group-hover:scale-110"
                  />
                </a>
              ))}
          </nav>
          <div className="w-full  pt-6">
            <p className="text-slate-400 text-center text-sm">
              © {new Date().getFullYear()} Hafney. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
