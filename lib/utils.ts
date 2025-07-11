import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type GtagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
};

export const event = ({ action, category, label, value }: GtagEvent): void => {
  if (typeof window !== "undefined" && (window as any)?.gtag) {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
