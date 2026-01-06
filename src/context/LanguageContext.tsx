import { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "ur";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  // Load saved language on mount
  useEffect(() => {
    const storedLang = localStorage.getItem("nooriayat-lang") as Language | null;
    if (storedLang === "en" || storedLang === "ur") {
      setLangState(storedLang);
    }
  }, []);

  // Persist language changes
  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("nooriayat-lang", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
