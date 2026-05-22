import { motion } from "framer-motion";
import { Info, BookOpen, RefreshCw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useDailyAyah } from "@/hooks/useDailyAyah";
import { useState } from "react";

export default function AyatOfTheDay() {
  const { lang } = useLanguage();
  const { currentAyah, isLoading, getAnotherAyah } = useDailyAyah();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await getAnotherAyah();
    setTimeout(() => setIsRefreshing(false), 300);
  };

  if (isLoading) {
    return (
      <section className="relative mx-auto mt-28 mb-16 max-w-[720px] px-4">
        <div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1686806372726-388d03ff49c8?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        className="
          relative overflow-hidden
          rounded-2xl
          bg-cover bg-center
          shadow-[0_25px_70px_rgba(0,0,0,0.18)]
          px-6 py-10
          md:px-10 md:py-14
          animate-pulse
        ">
          {/* Loading skeleton */}
          <div className="space-y-6">
            <div className="h-4 w-32 bg-gray-300/50 rounded mx-auto"></div>
            <div className="h-32 bg-gray-300/30 rounded"></div>
            <div className="h-20 bg-gray-300/30 rounded"></div>
            <div className="h-24 bg-gray-300/30 rounded"></div>
            <div className="h-16 bg-gray-300/30 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!currentAyah) {
    return (
      <section className="relative mx-auto mt-28 mb-16 max-w-[720px] px-4">
        <div className="text-center py-12 text-text-secondary-light dark:text-text-secondary-dark">
          No ayah available.
        </div>
      </section>
    );
  }

  return (
    <section className="relative mx-auto mt-28 mb-16 max-w-[720px] px-4">
      
      {/* Mushaf Container */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          relative overflow-hidden
          rounded-2xl
          bg-[url('mushaf-paper.jpeg')]
          bg-cover bg-center
          shadow-[0_25px_70px_rgba(0,0,0,0.18)]
          px-6 py-10
          md:px-10 md:py-14
        "
      >

        {/* Soft vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0
            bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.18),rgba(0,0,0,0.12))]
          "
        />

        {/* Title */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs tracking-[0.25em] text-black/60">
            AYAH OF THE DAY
          </p>
          
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="
              flex items-center gap-2
              text-xs px-3 py-1.5 rounded-full
              bg-black/5 hover:bg-black/10
              transition-colors
              disabled:opacity-50
            "
          >
            <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
            Change Ayah
          </button>
        </div>

        {/* Arabic Ayah */}
        <motion.p
          key={`${currentAyah.id}-arabic`}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="
            ayah-arabic
            relative
            mb-6
            text-black
            drop-shadow-[0_0_14px_rgba(255,215,150,0.35)]
          "
        >
          {currentAyah.arabic}
        </motion.p>

        {/* Translation */}
        <motion.p
          key={`${currentAyah.id}-translation-${lang}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="
            ayah-translation
            relative
            mb-6
            text-center
          "
          dir={lang === "ur" ? "rtl" : "ltr"}
        >
          {currentAyah.translation[lang]}
        </motion.p>

        {/* Divider */}
        <div className="relative my-8 flex items-center gap-3 opacity-40">
          <span className="h-px flex-1 bg-black/40" />
          <span className="text-xs">✦</span>
          <span className="h-px flex-1 bg-black/40" />
        </div>

        {/* Context */}
        <motion.div
          key={`${currentAyah.id}-context-${lang}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="
            relative mb-6
            rounded-xl
            bg-black/5
            px-4 py-3
          "
        >
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-black/70">
            <Info className="h-4 w-4" />
            Context
          </div>
          <p 
            className="text-sm text-black/80 leading-relaxed"
            dir={lang === "ur" ? "rtl" : "ltr"}
          >
            {currentAyah.revelation.context[lang]}
          </p>
        </motion.div>

        {/* Practical Guidance */}
        <motion.div
          key={`${currentAyah.id}-guidance-${lang}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="
            relative
            rounded-xl
            border border-accent/40
            bg-accent/10
            px-4 py-4
          "
        >
          <div className="mb-2 text-xs font-semibold tracking-wide text-accent">
            TODAY'S PRACTICAL GUIDANCE
          </div>
          <p 
            className="text-sm leading-relaxed"
            dir={lang === "ur" ? "rtl" : "ltr"}
          >
            {currentAyah.practicalGuidance[lang]}
          </p>
        </motion.div>

        {/* Metadata */}
        <div className="relative mt-8 flex items-center justify-between text-xs text-black/60">
          <span>{currentAyah.revelation.surah} • Ayah {currentAyah.revelation.ayahNumber}</span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {currentAyah.revelation.source[0]}
          </span>
        </div>

      </motion.div>
    </section>
  );
}