// atomic-ui-lib/projects/atomic-ui-lib/src/lib/services/theme.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  ring: 'hsl(224.3 76.3% 48%)',
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
  ring: 'hsl(263.4 70% 50.4%)',
};

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly themeKey = 'atomic-ui-theme';
  private readonly themeColorsKey = 'atomic-ui-theme-colors';
  private isDarkMode = new BehaviorSubject<boolean>(this.getInitialThemeMode());
  private currentThemeColors = new BehaviorSubject<ThemeColors>(this.getInitialThemeColors());

  isDarkMode$ = this.isDarkMode.asObservable();
  currentThemeColors$ = this.currentThemeColors.asObservable();

  constructor() {
    this.applyTheme();
  }

  toggleTheme(): void {
    const newMode = !this.isDarkMode.value;
    this.isDarkMode.next(newMode);
    localStorage.setItem(this.themeKey, newMode ? 'dark' : 'light');

    // تغییر رنگ‌ها بر اساس تم
    const newColors = newMode ? defaultDarkTheme : defaultLightTheme;
    this.currentThemeColors.next(newColors);
    this.saveThemeColors(newColors);

    this.applyTheme();
  }

  setCustomTheme(colors: Partial<ThemeColors>): void {
    const currentColors = this.currentThemeColors.value;
    const newColors = { ...currentColors, ...colors };

    this.currentThemeColors.next(newColors);
    this.saveThemeColors(newColors);
    this.applyTheme();
  }

  resetToDefaultTheme(): void {
    const defaultTheme = this.isDarkMode.value ? defaultDarkTheme : defaultLightTheme;
    this.currentThemeColors.next(defaultTheme);
    this.saveThemeColors(defaultTheme);
    this.applyTheme();
  }

  private getInitialThemeMode(): boolean {
    const savedTheme = localStorage.getItem(this.themeKey);
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // ترجیح تم سیستم
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private getInitialThemeColors(): ThemeColors {
    const savedColors = localStorage.getItem(this.themeColorsKey);
    if (savedColors) {
      try {
        return JSON.parse(savedColors);
      } catch (e) {
        console.error('Could not parse saved theme colors', e);
      }
    }
    return this.isDarkMode.value ? defaultDarkTheme : defaultLightTheme;
  }

  private saveThemeColors(colors: ThemeColors): void {
    localStorage.setItem(this.themeColorsKey, JSON.stringify(colors));
  }

  private applyTheme(): void {
    const root = document.documentElement;
    const colors = this.currentThemeColors.value;

    // اعمال کلاس تم به root
    if (this.isDarkMode.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // اعمال متغیرهای CSS
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }
}
