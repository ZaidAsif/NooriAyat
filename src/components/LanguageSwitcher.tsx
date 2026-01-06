import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="
          text-sm px-2 py-1 rounded-md
          text-text-secondary-light dark:text-text-secondary-dark
          hover:bg-black/5 dark:hover:bg-white/10
        "
        aria-label="Change language"
      >
        {lang.toUpperCase()}
      </button>

      {open && (
        <div
          className="
            absolute right-0 mt-2 w-20
            bg-card-light dark:bg-card-dark
            border border-border-light dark:border-border-dark
            rounded-md overflow-hidden
            text-sm
          "
        >
          <button
            onClick={() => {
              setLang("en");
              setOpen(false);
            }}
            className="block w-full px-3 py-2 text-left hover:bg-black/5 dark:hover:bg-white/10"
          >
            EN
          </button>

          <button
            onClick={() => {
              setLang("ur");
              setOpen(false);
            }}
            className="block w-full px-3 py-2 text-right hover:bg-black/5 dark:hover:bg-white/10"
            dir="rtl"
          >
            اردو
          </button>
        </div>
      )}
    </div>
  );
}
