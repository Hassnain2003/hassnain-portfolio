export const site = {
  name: "hassnain-portfolio",
  title: "Hassnain Abbas — AI & Backend Engineer",
  description:
    "Auditable portfolio of Hassnain Abbas. AI & Backend Engineer building LLM agents and the infrastructure they run on. Islamabad, Pakistan.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://hassnain-portfolio.vercel.app",
  author: "Hassnain Abbas",
  email: "abbashussnain818@gmail.com",
} as const;

export const themeStorageKey = "hassnain-portfolio/theme";
export const defaultTheme = "dark" as const;
export type Theme = typeof defaultTheme extends string ? "dark" | "light" : never;
