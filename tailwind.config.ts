import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "white",
        primary: "blue",
        muted: "#6b7280",
        border: "#e5e7eb",
      },
    },
  },
  plugins: [],
};
export default config;
