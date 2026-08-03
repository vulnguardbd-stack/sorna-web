/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { cn, FIELD_INPUT, FIELD_WRAPPER } from '../../lib/styles';

interface FormFieldProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email';
  rows?: number;
  className?: string;
}

/** Underlined contact-form field; renders a textarea when `rows` is given. */
export default function FormField({
  label,
  value,
  placeholder,
  onChange,
  type = 'text',
  rows,
  className,
}: FormFieldProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => onChange(e.target.value);

  return (
    <div className={cn(FIELD_WRAPPER, className)}>
      <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 block mb-2 font-bold">
        {label}
      </span>
      {rows ? (
        <textarea
          required
          rows={rows}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(FIELD_INPUT, 'resize-none')}
        />
      ) : (
        <input
          required
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={FIELD_INPUT}
        />
      )}
    </div>
  );
}
