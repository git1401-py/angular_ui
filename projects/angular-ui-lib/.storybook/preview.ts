// preview.ts

export const parameters = {
  // تنظیمات مربوط به actions
  actions: { argTypesRegex: '^on.*' }, // تمامی ورودی‌های با نام `on` به عنوان اکشن‌ها در نظر گرفته می‌شوند.

  // تنظیمات مربوط به controls
  controls: {
    expanded: true, // کنترل‌ها به صورت پیش‌فرض باز خواهند بود.
  },

  // تنظیمات مربوط به مستندات
  docs: {
    inlineStories: true, // داستان‌ها درون مستندات نمایش داده می‌شوند.
    iframeHeight: 60,    // ارتفاع iframe داستان‌ها
  },
};
