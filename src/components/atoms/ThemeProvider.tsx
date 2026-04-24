"use client";

import * as React from "react";
import { CustomThemeProvider } from "@/context/ThemeContext";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <CustomThemeProvider>{children}</CustomThemeProvider>;
}
