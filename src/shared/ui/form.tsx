import { Check, CircleAlert } from "lucide-react";
import type { ComponentProps } from "react";

import styles from "./form.module.css";

type FieldBase = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
};

function describedBy(id: string, hint?: string, error?: string) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
}

function Meta({ id, hint, error }: Pick<FieldBase, "id" | "hint" | "error">) {
  return (
    <>
      {hint ? (
        <p className={styles.hint} id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className={styles.error} id={`${id}-error`}>
          <CircleAlert aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </>
  );
}

function Label({ id, label, optional }: Pick<FieldBase, "id" | "label" | "optional">) {
  return (
    <label className={styles.label} htmlFor={id}>
      {label}
      {optional ? <span className={styles.optional}>(optional)</span> : null}
    </label>
  );
}

export function TextField({ id, label, hint, error, optional, ...input }: FieldBase & Omit<ComponentProps<"input">, "id">) {
  return (
    <div className={styles.field}>
      <Label id={id} label={label} optional={optional} />
      <input
        aria-describedby={describedBy(id, hint, error)}
        aria-invalid={error ? true : undefined}
        className={styles.control}
        id={id}
        name={id}
        required={!optional}
        {...input}
      />
      <Meta error={error} hint={hint} id={id} />
    </div>
  );
}

export function TextArea({ id, label, hint, error, optional, ...input }: FieldBase & Omit<ComponentProps<"textarea">, "id">) {
  return (
    <div className={styles.field}>
      <Label id={id} label={label} optional={optional} />
      <textarea
        aria-describedby={describedBy(id, hint, error)}
        aria-invalid={error ? true : undefined}
        className={styles.control}
        id={id}
        name={id}
        required={!optional}
        {...input}
      />
      <Meta error={error} hint={hint} id={id} />
    </div>
  );
}

/** Multi-select chips, built on native checkboxes inside a fieldset. */
export function ChoiceChips({
  name,
  legend,
  options,
  value,
  onChange,
}: {
  name: string;
  legend: string;
  options: readonly string[];
  value: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <fieldset className={styles.chips}>
      <legend>
        {legend} <span className={styles.optional}>(optional)</span>
      </legend>
      {options.map((option) => {
        const checked = value.includes(option);
        return (
          <label className={styles.chip} key={option}>
            <input
              checked={checked}
              name={name}
              onChange={() => onChange(checked ? value.filter((v) => v !== option) : [...value, option])}
              type="checkbox"
              value={option}
            />
            <span className={styles.chipFace}>
              <Check aria-hidden="true" />
              {option}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}

export const formStyles = styles;
