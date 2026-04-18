import { UI_TEXT } from "@/config/uiText";

export function validateRequiredNumber(raw: string): string | null {
  if (raw.trim().length === 0) {
    return UI_TEXT.validation.required;
  }

  const value = Number(raw);

  if (!Number.isFinite(value)) {
    return UI_TEXT.validation.validNumber;
  }

  if (value < 0) {
    return UI_TEXT.validation.nonNegative;
  }

  return null;
}
