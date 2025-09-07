import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from './InputField';

test('associates label and sets aria-invalid', () => {
  render(<InputField label="Email" invalid errorMessage="Err" />);
  const input = screen.getByLabelText(/email/i);
  expect(input).toHaveAttribute('aria-invalid', 'true');
});

test('clear button clears value', () => {
  const handle = vi.fn();
  render(<InputField label="Name" clearable value="John" onChange={handle} />);
  fireEvent.click(screen.getByRole('button', { name: /clear input/i }));
  expect(handle).toHaveBeenCalled();
});

test('password toggle switches type', () => {
  render(<InputField label="Password" type="password" passwordToggle />);
  const input = screen.getByLabelText(/password/i);
  expect(input).toHaveAttribute('type', 'password');
  fireEvent.click(screen.getByRole('button', { name: /show password/i }));
  expect(input).toHaveAttribute('type', 'text');
});
