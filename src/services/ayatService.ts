import  AYATDATA  from "@/Ayat-Data";
import type Ayah from "@/types/AyatType";



// Get all ayat
export function getAllAyat(): Ayah[] {
  return AYATDATA;
}

// Get random ayat
export function getRandomAyah(excludeId?: string): Ayah {
  const filtered = excludeId 
    ? AYATDATA.filter(ayah => ayah.id !== excludeId)
    : AYATDATA;
  
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}

// Get today's date string (YYYY-MM-DD)
export function getTodayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
}