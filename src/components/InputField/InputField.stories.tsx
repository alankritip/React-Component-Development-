import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Forms/InputField',
  component: InputField,
  args: { label: 'Email', placeholder: 'name@domain.com', variant: 'outlined', size: 'md' },
};
export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {};
export const Invalid: Story = { args: { invalid: true, errorMessage: 'Invalid email' } };
export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true } };
export const Filled: Story = { args: { variant: 'filled' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Password: Story = { args: { label: 'Password', type: 'password', passwordToggle: true } };
export const Clearable: Story = { args: { clearable: true, defaultValue: 'Hello' } };
