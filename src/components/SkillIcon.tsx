import type { ReactNode } from "react";
import { Binary, Boxes, Code2, Database, Network } from "lucide-react";

type SkillVisual = {
  icon: ReactNode;
  color: string;
  bg: string;
};

function BrandMark({
  children,
  viewBox = "0 0 24 24",
}: {
  children: ReactNode;
  viewBox?: string;
}) {
  return (
    <svg viewBox={viewBox} className="h-full w-full" aria-hidden="true">
      {children}
    </svg>
  );
}

const skills: Record<string, SkillVisual> = {
  typescript: {
    color: "#3178C6",
    bg: "bg-[#3178C6]/15",
    icon: (
      <BrandMark>
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <text
          x="12"
          y="16.5"
          textAnchor="middle"
          fill="white"
          fontSize="9"
          fontWeight="700"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          TS
        </text>
      </BrandMark>
    ),
  },
  javascript: {
    color: "#F7DF1E",
    bg: "bg-[#F7DF1E]/15",
    icon: (
      <BrandMark>
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <text
          x="12"
          y="16.5"
          textAnchor="middle"
          fill="#111827"
          fontSize="9"
          fontWeight="800"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          JS
        </text>
      </BrandMark>
    ),
  },
  html: {
    color: "#E34F26",
    bg: "bg-[#E34F26]/15",
    icon: (
      <BrandMark>
        <path fill="#E34F26" d="M3 2h18l-1.6 18.2L12 22l-7.4-1.8L3 2z" />
        <path fill="#EF652A" d="M12 4v16.1l6 1.5 1.4-15.6H12z" />
        <path
          fill="#EBEBEB"
          d="M12 9.2H8.3l.2 2.2H12v-2.2zm0 5.1H8.7l.3 2.1L12 17.1v-2.8z"
        />
        <path
          fill="white"
          d="M12 9.2h3.6l-.3 2.2H12V9.2zm0 5.1h3.3l-.4 2.1L12 17.1v-2.8z"
        />
      </BrandMark>
    ),
  },
  css: {
    color: "#1572B6",
    bg: "bg-[#1572B6]/15",
    icon: (
      <BrandMark>
        <path fill="#1572B6" d="M3 2h18l-1.6 18.2L12 22l-7.4-1.8L3 2z" />
        <path fill="#33A9DC" d="M12 4v16.1l6 1.5 1.4-15.6H12z" />
        <path
          fill="#EBEBEB"
          d="M12 9.2H8.3l.2 2.2H12v-2.2zm-.1 5.1H8.7l.3 2.1 3 1v-3.1z"
        />
        <path
          fill="white"
          d="M12 9.2h3.6l-.2 2.2H12V9.2zm0 5.1h3.2l-.4 2.1-2.8 1v-3.1z"
        />
      </BrandMark>
    ),
  },
  java: {
    color: "#E76F00",
    bg: "bg-[#E76F00]/15",
    icon: (
      <BrandMark>
        <rect width="24" height="24" rx="4" fill="#EA2D2E" />
        <text
          x="12"
          y="16.5"
          textAnchor="middle"
          fill="white"
          fontSize="8"
          fontWeight="800"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          JA
        </text>
      </BrandMark>
    ),
  },
  react: {
    color: "#61DAFB",
    bg: "bg-[#61DAFB]/15",
    icon: (
      <BrandMark>
        <circle cx="12" cy="12" r="2.1" fill="#61DAFB" />
        <g fill="none" stroke="#61DAFB" strokeWidth="1.4">
          <ellipse cx="12" cy="12" rx="10" ry="4" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4"
            transform="rotate(120 12 12)"
          />
        </g>
      </BrandMark>
    ),
  },
  "next.js": {
    color: "#FFFFFF",
    bg: "bg-white/10",
    icon: (
      <BrandMark>
        <circle cx="12" cy="12" r="10" fill="#000" />
        <path
          fill="white"
          d="M9 7.5h1.8v9H9zM13.2 7.5 18 16.5h-2.1l-3.8-7.2V16.5H10.4V7.5h2.8z"
        />
      </BrandMark>
    ),
  },
  vue: {
    color: "#42B883",
    bg: "bg-[#42B883]/15",
    icon: (
      <BrandMark>
        <path fill="#42B883" d="M2 3h6.4L12 9.2 15.6 3H22L12 21 2 3z" />
        <path fill="#35495E" d="M6.2 3h5.8L12 5.4 12 5.4 12 3h5.8L12 14.2 6.2 3z" />
      </BrandMark>
    ),
  },
  "nuxt.js": {
    color: "#00DC82",
    bg: "bg-[#00DC82]/15",
    icon: (
      <BrandMark>
        <rect width="24" height="24" rx="4" fill="#00DC82" />
        <text
          x="12"
          y="16.5"
          textAnchor="middle"
          fill="#052e16"
          fontSize="8"
          fontWeight="800"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          NX
        </text>
      </BrandMark>
    ),
  },
  oop: {
    color: "#818CF8",
    bg: "bg-indigo-500/15",
    icon: <Boxes className="h-full w-full text-indigo-300" />,
  },
  "data structures": {
    color: "#C084FC",
    bg: "bg-purple-500/15",
    icon: <Binary className="h-full w-full text-purple-300" />,
  },
  databases: {
    color: "#34D399",
    bg: "bg-emerald-500/15",
    icon: <Database className="h-full w-full text-emerald-300" />,
  },
  networks: {
    color: "#38BDF8",
    bg: "bg-sky-500/15",
    icon: <Network className="h-full w-full text-sky-300" />,
  },
  "tailwind css": {
    color: "#38BDF8",
    bg: "bg-sky-500/15",
    icon: (
      <BrandMark>
        <path
          fill="#38BDF8"
          d="M12 6.5c-2.5 0-4.1 1.2-4.8 3.7 1-1.2 2.1-1.7 3.4-1.4.7.2 1.2.7 1.8 1.3.9 1 2 1.7 3.6 1.7 2.5 0 4.1-1.2 4.8-3.7-1 1.2-2.1 1.7-3.4 1.4-.7-.2-1.2-.7-1.8-1.3C14.7 7.2 13.6 6.5 12 6.5zM7.2 13.2C4.7 13.2 3.1 14.4 2.4 16.9c1-1.2 2.1-1.7 3.4-1.4.7.2 1.2.7 1.8 1.3.9 1 2 1.7 3.6 1.7 2.5 0 4.1-1.2 4.8-3.7-1 1.2-2.1 1.7-3.4 1.4-.7-.2-1.2-.7-1.8-1.3-.9-1-2-1.7-3.6-1.7z"
        />
      </BrandMark>
    ),
  },
};

function normalize(name: string) {
  const value = name.trim().toLowerCase();
  if (value === "ts" || value === "type script") return "typescript";
  if (value === "js") return "javascript";
  if (value === "next" || value === "nextjs") return "next.js";
  if (value === "nuxt" || value === "nuxtjs") return "nuxt.js";
  if (value === "ds") return "data structures";
  if (value === "db" || value === "database") return "databases";
  return value;
}

function getSkillVisual(name: string): SkillVisual {
  return (
    skills[normalize(name)] ?? {
      color: "#7DD3FC",
      bg: "bg-sky-500/15",
      icon: <Code2 className="h-full w-full text-sky-300" />,
    }
  );
}

type SkillBadgeProps = {
  name: string;
  size?: "sm" | "md";
};

export default function SkillBadge({ name, size = "md" }: SkillBadgeProps) {
  const visual = getSkillVisual(name);
  const iconBox = size === "sm" ? "h-4 w-4" : "h-6 w-6";
  const pad = size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 ${visual.bg} ${pad} font-medium text-slate-100`}
    >
      <span className={`inline-flex shrink-0 ${iconBox}`}>{visual.icon}</span>
      {name}
    </span>
  );
}
