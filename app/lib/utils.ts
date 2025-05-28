// app/lib/utils.ts

/**
 * Utility function to concatenate class names conditionally.
 * @param {...(string | undefined | null | false)[]} classes
 * @returns {string}
 */
export function cn(...classes: Array<string | undefined | null | false>): string {
  return classes.filter(Boolean).join(' ');
}
