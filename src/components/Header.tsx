import { LanguageSwitcher } from "./LanguageSwitcher";
import { Languages } from "lucide-react";
import { DarkModeToggle } from "./DarkModeToggle";

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-background-light/70 dark:bg-background-dark/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">

        {/* LOGO */}
        <div className="relative flex items-center">
          <span
            aria-hidden
            className="absolute -inset-2 rounded-full bg-accent/25 blur-xl animate-noorPulseOnce"
          />
          <h1 className="relative text-lg font-semibold tracking-wide text-accent animate-logoDescend">
            NooriAyat
          </h1>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-3">
          <DarkModeToggle />

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>

      </div>
    </header>
  );
}
