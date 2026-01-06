import { useState, useEffect } from "react";
import { getRandomAyah, getTodayString } from "@/services/ayatService";
import type Ayah from "@/types/AyatType";

interface StoredAyah {
  ayah: Ayah;
  date: string;
}

export function useDailyAyah() {
  const [currentAyah, setCurrentAyah] = useState<Ayah | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if stored date is today
  const isStoredToday = (storedDate: string): boolean => {
    return storedDate === getTodayString();
  };

  // Load or select daily ayah
  useEffect(() => {
    setIsLoading(true);

    try {
      // Check if we have stored ayah
      const storedJson = localStorage.getItem("nooriayat-daily");
      
      if (storedJson) {
        const stored: StoredAyah = JSON.parse(storedJson);
        
        // If stored ayah is from today, use it
        if (isStoredToday(stored.date)) {
          setCurrentAyah(stored.ayah);
          setIsLoading(false);
          return;
        }
      }

      // New day or no stored ayah → select random
      const newAyah = getRandomAyah();
      const newStored: StoredAyah = {
        ayah: newAyah,
        date: getTodayString()
      };
      
      localStorage.setItem("nooriayat-daily", JSON.stringify(newStored));
      setCurrentAyah(newAyah);
    } catch (error) {
      console.error("Error loading ayah:", error);
      // Fallback to random ayah
      setCurrentAyah(getRandomAyah());
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get another ayah (manual override)
  const getAnotherAyah = () => {
    const currentId = currentAyah?.id;
    const newAyah = getRandomAyah(currentId);
    
    const newStored: StoredAyah = {
      ayah: newAyah,
      date: getTodayString()
    };
    
    localStorage.setItem("nooriayat-daily", JSON.stringify(newStored));
    setCurrentAyah(newAyah);
  };

  // Reset to original daily ayah (if we implement "Return to Today's Ayah")
  const resetToDaily = () => {
    const storedJson = localStorage.getItem("nooriayat-daily");
    if (storedJson) {
      const stored: StoredAyah = JSON.parse(storedJson);
      if (isStoredToday(stored.date)) {
        setCurrentAyah(stored.ayah);
      }
    }
  };

  return {
    currentAyah,
    isLoading,
    getAnotherAyah,
    resetToDaily
  };
}