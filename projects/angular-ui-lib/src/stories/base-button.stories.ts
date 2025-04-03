import { Meta, StoryObj } from '@storybook/angular';
import { BaseButtonComponent } from '../lib/atoms/buttons/base-button/base-button.component';
import { fn } from '@storybook/test';
import { ThemeService } from '../lib/atoms/services/theme.service';
import { moduleMetadata } from '@storybook/angular';
// import { BehaviorSubject } from 'rxjs';

// تزریق سرویس‌های مورد نیاز برای Storybook
export default {
  title: 'Components/Base Button',
  component: BaseButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      providers: [ThemeService], // سرویس ThemeService را تزریق می‌کنیم
    }),
    (story) => {
      // تزریق سرویس ThemeService
      const themeService = new ThemeService({});

      // بررسی وضعیت تم از localStorage یا تم پیش‌فرض سیستم
      const savedTheme = localStorage.getItem('atomic-ui-theme'); // بررسی تم ذخیره شده در localStorage
      const initialTheme = savedTheme
        ? savedTheme
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'; // اگر تم ذخیره نشده باشد، وضعیت سیستم را بررسی می‌کنیم

      // تنظیم وضعیت تم به‌درستی
      themeService.isDarkMode.next(initialTheme === 'dark'); // وضعیت تم را به‌درستی تنظیم می‌کنیم
      themeService.applyTheme(); // اعمال تم پیش‌فرض

      // اتصال به رنگ‌ها
      themeService.currentThemeColors$.subscribe((colors) => {
        // اعمال رنگ‌های تم به استایل‌های CSS
        document.documentElement.style.setProperty('--background-color', colors.background);
        document.documentElement.style.setProperty('--foreground-color', colors.foreground);

        // اضافه کردن استایل‌های دلخواه برای پس‌زمینه و رنگ متن
        const body = document.querySelector('body');
        if (body) {
          body.style.backgroundColor = colors.background;
          body.style.color = colors.foreground;
        }

        const html = document.querySelector('html');
        if (html) {
          html.style.backgroundColor = colors.background;
          html.style.color = colors.foreground;
        }
      });

      return story(); // اجرای داستان
    },
  ],
  argTypes: {
    backgroundColor: {
      control: 'color',  // کنترل برای رنگ پس‌زمینه
      description: 'Choose background color for the button',
    },
    textColor: {
      control: 'color',  // کنترل برای رنگ متن
      // description: 'Choose text color for the button',
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    variant: {
      control: {
        type: 'radio',
        options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'link'],
      },
    },
    size: {
      control: { type: 'radio' },  // استفاده از دکمه‌های رادیویی
      options: ['xs', 'sm', 'md', 'lg', 'xl'],  // گزینه‌های معتبر
    },
  },
  args: { onClick: fn() },
} as Meta<BaseButtonComponent>;

export const Primary: StoryObj<BaseButtonComponent> = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
    size: 'lg',
    disabled: false,
  },
};

export const Secondary: StoryObj<BaseButtonComponent> = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
    size: 'lg',
    disabled: true,
  },
};
