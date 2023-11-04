import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        background: "var(--background)",
        text: "var(--text)",
        secondaryText: "var(--secondaryText)",
        border: "var(--border)",
        hover: "var(--hover)",
        icon: "var(--icon)",
        buttonText: "var(--buttonText)",
      },
    },
  },
  plugins: [],
};
export default config;
