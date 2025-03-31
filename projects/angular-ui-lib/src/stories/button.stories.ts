import type { Meta, StoryObj } from '@storybook/angular';
import { PrimaryButtonComponent } from '../lib/atoms/buttons/primary-button/primary-button.component';

const meta: Meta<PrimaryButtonComponent> = {
  title: 'Atoms/Buttons/Primary Button',
  component: PrimaryButtonComponent,
  args: {
    disabled: false,  // Default value for 'disabled'
    preventMultipleClicks: false,  // Default value for 'preventMultipleClicks'
    clickCooldownMs: 500,  // Default value for 'clickCooldownMs' (500ms)
    size: 'md',  // Default value for 'size'
    state: 'idle',  // Default value for 'state'
  },
  tags: ['autodocks'],
  argTypes: {
    size: {
      control: 'select',  // Control input type is 'select' (dropdown)
      options: ['xs', 'sm', 'md', 'lg', 'xl'],  // Available size options for the button
      description: 'Size of the button',  // Description for 'size'
      table: {
        defaultValue: { summary: 'md' },  // Display the default value as 'md' in documentation
      },
    },
    state: {
      control: 'radio',  // Control input type is 'radio' (radio buttons)
      options: ['idle', 'disabled', 'loading'],  // Available state options for the button
      description: 'State of the button',  // Description for 'state'
      table: {
        defaultValue: { summary: 'idle' },  // Display the default value as 'idle' in documentation
      },
    },
    disabled: {
      control: 'boolean',  // Control input type is boolean
      description: 'Disables the button',  // Description of the 'disabled' prop
      table: {
        defaultValue: { summary: 'false' },  // Display the default value as 'false' in documentation
      },
    },
    preventMultipleClicks: {
      control: 'boolean',  // Control input type is boolean
      description: 'Prevents multiple rapid clicks by adding a cooldown period.',  // Description for 'preventMultipleClicks'
      table: {
        defaultValue: { summary: 'false' },  // Display the default value as 'false' in documentation
      },
    },
    clickCooldownMs: {
      control: 'number',  // Control input type is number
      description: 'Time to prevent multiple rapid clicks (in milliseconds)',  // Description for 'clickCooldownMs'
      table: {
        defaultValue: { summary: '500' },  // Display the default value as '500' in documentation
      },
    },
  },
};

export default meta; // Export the metadata object (meta) for the storybook configuration.

type Story = StoryObj<PrimaryButtonComponent>; // Define a type 'Story' using the 'StoryObj' type and associate it with 'PrimaryButtonComponent'.


export const Default: Story = {  // Define the 'Default' story for the PrimaryButtonComponent.
  args: {  // Set the default arguments (inputs) for the component.
    size: 'md',  // Default size is 'md' (medium).
    state: 'idle',  // Default state is 'idle'.
    disabled: false,  // Default disabled state is false (enabled).
  },
  render: (args) => ({  // Render function to generate the component with the provided args.
    props: args,  // Pass the arguments to the component.
    template: `<lib-primary-button [size]="size" [state]="state" [disabled]="disabled" [preventMultipleClicks]="preventMultipleClicks" [clickCooldownMs]="clickCooldownMs">Base button</lib-primary-button>`,  // Define the template for the button with dynamic bindings based on args.
  }),
};

export const Small: Story = {  // Define the 'Small' story for the PrimaryButtonComponent with a small button.
  args: {  // Set the default arguments for this story.
    size: 'sm',  // Set the size to 'sm' (small).
  },
  render: (args) => ({  // Render function for the small button.
    props: args,  // Pass the arguments to the component.
    template: `<lib-primary-button [size]="size">Small button</lib-primary-button>`,  // Define the template for the button with the small size.
  }),
};

export const Large: Story = {  // Define the 'Large' story for the PrimaryButtonComponent with a large button.
  args: {  // Set the default arguments for this story.
    size: 'lg',  // Set the size to 'lg' (large).
  },
  render: (args) => ({  // Render function for the large button.
    props: args,  // Pass the arguments to the component.
    template: `<lib-primary-button [size]="size">Large button</lib-primary-button>`,  // Define the template for the button with the large size.
  }),
};

export const Loading: Story = {  // Define the 'Loading' story for the PrimaryButtonComponent with a loading state.
  args: {  // Set the default arguments for this story.
    state: 'loading',  // Set the state to 'loading'.
  },
  render: (args) => ({  // Render function for the loading button.
    props: args,  // Pass the arguments to the component.
    template: `<lib-primary-button [state]="state">Loading button</lib-primary-button>`,  // Define the template for the button with the loading state.
  }),
};

export const Disabled: Story = {  // Define the 'Disabled' story for the PrimaryButtonComponent with a disabled button.
  args: {  // Set the default arguments for this story.
    disabled: true,  // Set the disabled state to true (disabled).
  },
  render: (args) => ({  // Render function for the disabled button.
    props: args,  // Pass the arguments to the component.
    template: `<lib-primary-button [disabled]="disabled">Disabled button</lib-primary-button>`,  // Define the template for the button with the disabled state.
  }),
};

export const WithPreventMultipleClicks: Story = {  // Define the 'WithPreventMultipleClicks' story for the PrimaryButtonComponent.
  args: {  // Set the default arguments for this story.
    preventMultipleClicks: true,  // Enable the prevent multiple clicks feature.
    clickCooldownMs: 1000,  // Set the cooldown time for preventing multiple clicks (1000ms).
  },
  render: (args) => ({  // Render function for the button with prevent multiple clicks.
    props: args,  // Pass the arguments to the component.
    template: `<lib-primary-button [preventMultipleClicks]="preventMultipleClicks" [clickCooldownMs]="clickCooldownMs">WithPreventMultipleClicks button</lib-primary-button>`,  // Define the template for the button with the prevent multiple clicks feature.
  }),
};


