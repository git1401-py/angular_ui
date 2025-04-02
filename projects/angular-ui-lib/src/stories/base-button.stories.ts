import { Meta, StoryObj } from '@storybook/angular';
import { BaseButtonComponent } from '../lib/atoms/buttons/base-button/base-button.component';
import {fn} from '@storybook/test';

export default {
  title: 'Components/Base Button',
  component: BaseButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',  // کنترل برای رنگ پس‌زمینه
      description: 'Choose background color for the button'
    },
    textColor: {
      control: 'color',  // کنترل برای رنگ متن
      // description: 'Choose text color for the button'
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    variant: { control: { type: 'radio', options: ['primary' , 'secondary' , 'outline' , 'ghost' , 'danger' , 'success' , 'link'] } },
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
    size: "lg",
    disabled: false,
  },
};
export const Disabled: StoryObj<BaseButtonComponent> = {
  args: {
    label: 'Disabled Button',
    variant: 'primary',
    size: 'lg',
    disabled: true,

  },
};
