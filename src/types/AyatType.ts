export default interface Ayah {
  id: string;
  arabic: string;
  translation: {
    en: string;
    ur: string;
  };
  revelation: {
    surah: string;
    ayahNumber: number;
    type: string;
    context: {
      en: string;
      ur: string;
    };
    source: string[];
  };
  practicalGuidance: {
    en: string;
    ur: string;
  };
  theme: string[];
  keywords: string[];
  tags: string[];
}