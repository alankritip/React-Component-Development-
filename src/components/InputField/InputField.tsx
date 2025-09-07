import React, { useId, useMemo, useState } from 'react';

export type InputVariant = 'filled' | 'outlined' | 'ghost';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange'> {
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  invalid?: boolean;
  loading?: boolean;
  variant?: InputVariant;
  size?: InputSize;
  clearable?: boolean;
  passwordToggle?: boolean;
}

const base =
  'block w-full rounded-md transition focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed';
const sizeMap: Record<InputSize, string> = {
  sm: 'text-sm px-2.5 py-1.5',
  md: 'text-sm px-3 py-2',
  lg: 'text-base px-3.5 py-2.5',
};
const variantMap: Record<InputVariant, string> = {
  filled:
    'bg-gray-50 dark:bg-gray-800 border border-transparent focus:ring-blue-500 focus:border-blue-500',
  outlined:
    'bg-transparent border border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500',
  ghost:
    'bg-transparent border border-transparent focus:ring-blue-500 focus:border-blue-500',
};

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      id,
      label,
      placeholder,
      helperText,
      errorMessage,
      invalid,
      loading,
      disabled,
      variant = 'outlined',
      size = 'md',
      type = 'text',
      value,
      defaultValue,
      onChange,
      required,
      clearable,
      passwordToggle,
      className,
      ...rest
    },
    ref
  ) => {
    const reactId = useId();
    const inputId = id ?? `input-${reactId}`;
    const helperId = helperText ? `${inputId}-help` : undefined;
    const errorId = invalid && errorMessage ? `${inputId}-error` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

    const [internal, setInternal] = useState(defaultValue ?? '');
    const controlled = value !== undefined;
    const val = controlled ? value! : internal;

    const [show, setShow] = useState(false);
    const effType = passwordToggle && type === 'password' ? (show ? 'text' : 'password') : type;

    const classes = useMemo(() => {
      const bad = invalid ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '';
      const busy = loading ? 'cursor-progress' : '';
      return [base, sizeMap[size], variantMap[variant], bad, busy, className].filter(Boolean).join(' ');
    }, [size, variant, invalid, loading, className]);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
            {label}
            {required && <span className="text-red-600"> *</span>}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={effType}
            className={classes}
            placeholder={placeholder}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            aria-required={required || undefined}
            disabled={disabled || loading}
            value={val}
            onChange={(e) => {
              onChange?.(e);
              if (!controlled) setInternal(e.target.value);
            }}
            required={required}
            {...rest}
          />
          {passwordToggle && type === 'password' && (
            <button
              type="button"
              aria-label={show ? 'Hide password' : 'Show password'}
              className="absolute inset-y-0 right-2 my-auto rounded p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400"
              onClick={() => setShow((s) => !s)}
              tabIndex={-1}
            >
              {show ? 'Hide' : 'show'}
            </button>
          )}
          {clearable && !!val && (
            <button
              type="button"
              aria-label="Clear input"
              className="absolute inset-y-0 right-2 my-auto rounded p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400"
              onClick={() => {
                const evt = { target: { value: '' } } as unknown as React.ChangeEvent<HTMLInputElement>;
                onChange?.(evt);
                if (!controlled) setInternal('');
              }}
              tabIndex={-1}
            >
              ✕
            </button>
          )}
        </div>
        {invalid && errorMessage ? (
          <p id={errorId} className="mt-1 text-sm text-red-600">
            {errorMessage}
          </p>
        ) : helperText ? (
          <p id={helperId} className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);
InputField.displayName = 'InputField';
