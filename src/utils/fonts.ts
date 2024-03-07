import { Barlow_Condensed } from "next/font/google";
import { Quicksand } from "next/font/google";

export const barlowCondensed = Barlow_Condensed({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--barlowCondensed",
});

export const quickSand = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--quickSand",
});
