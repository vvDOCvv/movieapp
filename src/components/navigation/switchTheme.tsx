"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export const SwitchTheme = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="flex items-center gap-x-3 py-3 px-4"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      {resolvedTheme === "light" ? (
        <Sun className="svg" />
      ) : (
        <Moon className="svg" />
      )}
      <div className="max-md:hidden">
        {resolvedTheme === "light" ? "Light" : "Dark"} mode
      </div>
    </button>
  );
};
