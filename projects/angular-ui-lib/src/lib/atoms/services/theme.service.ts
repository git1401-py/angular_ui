import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface ThemeColors {
  primary: string;
  'primary-foreground': string;
  secondary: string;
  'secondary-foreground': string;
  accent: string;
  'accent-foreground': string;
  destructive: string;
  'destructive-foreground': string;
  success: string;
  'success-foreground': string;
  background: string;
  foreground: string;
  card: string;
  'card-foreground': string;
  muted: string;
  'muted-foreground': string;
  popover: string;
  'popover-foreground': string;
  border: string;
  input: string;
  ring: string;
}

export const defaultLightTheme: ThemeColors = {
  primary: 'hsl(220.9 39.3% 11%)',
  'primary-foreground': 'hsl(210 20% 98%)',
  secondary: 'hsl(220 14.3% 95.9%)',
  'secondary-foreground': 'hsl(220.9 39.3% 11%)',
  accent: 'hsl(220 14.3% 95.9%)',
  'accent-foreground': 'hsl(220.9 39.3% 11%)',
  destructive: 'hsl(0 84.2% 60.2%)',
  'destructive-foreground': 'hsl(210 20% 98%)',
  success: 'hsl(142.1 76.2% 36.3%)',
  'success-foreground': 'hsl(210 20% 98%)',
  background: 'hsl(0 0% 100%)',
  foreground: 'hsl(220.9 39.3% 11%)',
  card: 'hsl(0 0% 100%)',
  'card-foreground': 'hsl(220.9 39.3% 11%)',
  muted: 'hsl(220 14.3% 95.9%)',
  'muted-foreground': 'hsl(220 8.9% 46.1%)',
  popover: 'hsl(0 0% 100%)',
  'popover-foreground': 'hsl(220.9 39.3% 11%)',
  border: 'hsl(220 13% 91%)',
  input: 'hsl(220 13% 91%)',
  ring: 'hsl(23.4 2% 23.4%)',
};

export const defaultDarkTheme: ThemeColors = {
  primary: 'hsl(210 20% 98%)',
  'primary-foreground': 'hsl(220.9 39.3% 11%)',
  secondary: 'hsl(215 27.9% 16.9%)',
  'secondary-foreground': 'hsl(210 20% 98%)',
  accent: 'hsl(215 27.9% 16.9%)',
  'accent-foreground': 'hsl(210 20% 98%)',
  destructive: 'hsl(0 62.8% 30.6%)',
  'destructive-foreground': 'hsl(210 20% 98%)',
  success: 'hsl(142.1 70.6% 45.3%)',
  'success-foreground': 'hsl(144.9 80.4% 10%)',
  background: 'hsl(224 71.4% 4.1%)',
  foreground: 'hsl(210 20% 98%)',
  card: 'hsl(224 71.4% 4.1%)',
  'card-foreground': 'hsl(210 20% 98%)',
  muted: 'hsl(215 27.9% 16.9%)',
  'muted-foreground': 'hsl(217.9 10.6% 64.9%)',
  popover: 'hsl(224 71.4% 4.1%)',
  'popover-foreground': 'hsl(210 20% 98%)',
  border: 'hsl(215 27.9% 16.9%)',
  input: 'hsl(215 27.9% 16.9%)',
  ring: 'hsl(23.4 2% 23.4%)',
};

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeKey = 'atomic-ui-theme';
  private readonly themeColorsKey = 'atomic-ui-theme-colors';
  isDarkMode = new BehaviorSubject<boolean>(false);
  private currentThemeColors = new BehaviorSubject<ThemeColors>(defaultDarkTheme);

  isDarkMode$ = this.isDarkMode.asObservable();
  currentThemeColors$ = this.currentThemeColors.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    console.log('ThemeService constructor');
    this.initializeTheme();
  }

  private initializeTheme(): void {
    console.log('🚀 Initial mode from localStorage or system preference:');
    const initialMode = this.getInitialThemeMode();
    this.isDarkMode.next(initialMode);

    const initialColors = this.getInitialThemeColors();
    console.log('🚀 Initial colors from localStorage:', initialColors);
    this.currentThemeColors.next(initialColors);

    if (this.isBrowser()) {
      this.saveThemeColors(initialColors);
    }
    this.applyTheme();
  }

  toggleTheme(): void {
    console.log('in toggleTheme');
    const newMode = !this.isDarkMode.value;
    this.isDarkMode.next(newMode);
    if (this.isBrowser()) {
      localStorage.setItem(this.themeKey, newMode ? 'dark' : 'light');
    }

    const newColors = newMode ? defaultDarkTheme : defaultLightTheme;
    this.currentThemeColors.next(newColors);
    if (this.isBrowser()) {
      this.saveThemeColors(newColors);
    }
    this.applyTheme();
  }

  setCustomTheme(colors: Partial<ThemeColors>): void {
    console.log('in setCustomTheme');
    const currentColors = this.currentThemeColors.value;
    const newColors = { ...currentColors, ...colors };
    this.currentThemeColors.next(newColors);
    if (this.isBrowser()) {
      this.saveThemeColors(newColors);
    }
    this.applyTheme();
  }

  resetToDefaultTheme(): void {
    console.log('in resetToDefaultTheme');
    const defaultTheme = this.isDarkMode.value ? defaultDarkTheme : defaultLightTheme;
    this.currentThemeColors.next(defaultTheme);
    if (this.isBrowser()) {
      this.saveThemeColors(defaultTheme);
    }
    this.applyTheme();
  }

  private getInitialThemeMode(): boolean {
    // Ensure code runs only in the browser
    if (this.isBrowser()) {
      const savedTheme = localStorage.getItem(this.themeKey);
      console.log(`🔹 Saved Theme in LocalStorage: ${savedTheme}`);
      if (savedTheme) {
        return savedTheme === 'dark';
      }
    }
    // Default to system preference if no saved theme
    if (this.isBrowser()) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false; // Default mode if running on the server
  }

  private getInitialThemeColors(): ThemeColors {
    // Ensure code runs only in the browser
    if (this.isBrowser()) {
      const savedColors = localStorage.getItem(this.themeColorsKey);
      if (savedColors) {
        try {
          return JSON.parse(savedColors);
        } catch (e) {
          console.error('Could not parse saved theme colors', e);
          localStorage.removeItem(this.themeColorsKey); // پیشنهاد: پاک‌کردن داده خراب

        }
      }
    }
    return this.isDarkMode.value ? defaultDarkTheme : defaultLightTheme;
  }

  private saveThemeColors(colors: ThemeColors): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.themeColorsKey, JSON.stringify(colors));
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  applyTheme(): void {
    // اطمینان از اینکه کد فقط در محیط مرورگر اجرا می‌شود
    if (!this.isBrowser()) {
      return;
    }

    console.log('in applyTheme');
    const root = document.documentElement;
    const colors = this.currentThemeColors.value;

    if (this.isDarkMode.value) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // اعمال رنگ‌های background و foreground به کل پنجره
    root.style.setProperty('--background-color', colors.background);
    root.style.setProperty('--foreground-color', colors.foreground);
  }
}
