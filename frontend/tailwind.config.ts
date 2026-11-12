import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  plugins: [daisyui],
  daisyui: {
    themes: ["night"],
    darkTheme: "night",
    logs: false,
  },
} satisfies Config;
