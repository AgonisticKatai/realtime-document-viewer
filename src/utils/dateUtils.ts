/**
 * Date utility functions for formatting and displaying dates
 */

/**
 * Formats a date as a relative time string (e.g., "2 days ago", "yesterday")
 * @param date - The date to format
 * @returns A human-readable relative time string
 */
export function formatRelativeTime(date: Date): string {
  const diff = Date.now() - date.getTime();
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  const units = [
    [31536000000, 'year'], [2592000000, 'month'], [604800000, 'week'],
    [86400000, 'day'], [3600000, 'hour'], [60000, 'minute']
  ] as const;

  for (const [ms, unit] of units) {
    if (diff >= ms) return rtf.format(-Math.floor(diff / ms), unit);
  }

  return rtf.format(-Math.floor(diff / 1000), 'second');
}

/**
 * Formats a date as an absolute date string
 * @param date - The date to format
 * @returns A formatted date string (e.g., "Jan 15, 2024")
 */
export function formatAbsoluteDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
