export function setCookie(name: string, value: string, days: number): void {
  if (typeof window === "undefined") return;

  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  if (typeof window === "undefined") return null;

  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function deleteCookie(name: string): void {
  if (typeof window === "undefined") return;

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

export const COOKIE_CONSENT_NAME = "cookie_consent";
export const COOKIE_CONSENT_EXPIRY_DAYS = 365;

export interface CookiePreferences {
  necessary: boolean; // Always true, cannot be disabled
  performance: boolean;
  advertising: boolean;
  functional: boolean;
  allAccepted: boolean; // Flag to know if user accepted all
  timestamp: number; // When preferences were saved
}

export function getCookiePreferences(): CookiePreferences | null {
  const cookie = getCookie(COOKIE_CONSENT_NAME);
  if (!cookie) return null;

  try {
    const parsed = JSON.parse(cookie) as CookiePreferences;
    return parsed;
  } catch {
    return null;
  }
}

export function saveCookiePreferences(preferences: CookiePreferences): void {
  const jsonString = JSON.stringify(preferences);
  setCookie(COOKIE_CONSENT_NAME, jsonString, COOKIE_CONSENT_EXPIRY_DAYS);
}

export function hasAcceptedAllCookies(): boolean {
  const prefs = getCookiePreferences();
  return prefs?.allAccepted === true;
}

export function shouldShowBanner(): boolean {
  const prefs = getCookiePreferences();
  // Show banner if no preferences exist OR if user hasn't accepted all
  return !prefs || !prefs.allAccepted;
}
