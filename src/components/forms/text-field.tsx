"use client";

import { Controller } from "react-hook-form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import type { ComponentProps } from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type TextFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  description?: string;
} & Omit<ComponentProps<typeof Input>, "name" | "defaultValue" | "value">;

/**
 * Adaptive text-input field: works with any react-hook-form shape (generic
 * over TFieldValues) and any native input type (email, tel, url, ...) via
 * the passed-through `type` prop — one building block reused across every
 * form the company adds, not a one-off Contact-form component.
 */
export function TextField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  ...inputProps
}: TextFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Input
            {...field}
            {...inputProps}
            id={field.name}
            aria-invalid={fieldState.invalid}
          />
          {description && !fieldState.invalid && (
            <FieldDescription>{description}</FieldDescription>
          )}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
