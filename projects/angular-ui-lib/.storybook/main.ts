import type { StorybookConfig } from "@storybook/angular";
import "./preview";
console.log("🚀 Storybook Main.ts is Loaded!"); // بررسی لاگ

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/angular",
};

export default config;
