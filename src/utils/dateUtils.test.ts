import { describe, expect, it } from 'vitest';

import { formatAbsoluteDate, formatRelativeTime } from './dateUtils';

describe('DateUtils', () => {
  describe('formatAbsoluteDate', () => {
    it('should format date as absolute date string', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const result = formatAbsoluteDate(date);

      expect(result).toBe('Jan 15, 2024');
    });
  });

  describe('formatRelativeTime', () => {
    it('should return relative format for date 30 seconds ago', () => {
      const date = new Date(Date.now() - 30000);
      const result = formatRelativeTime(date);

      expect(result).toMatch(/seconds? ago|just now/);
    });

    it('should return minutes format for date 5 minutes ago', () => {
      const date = new Date(Date.now() - 5 * 60 * 1000);
      const result = formatRelativeTime(date);

      expect(result).toMatch(/\d+ minutes? ago/);
    });

    it('should return hours format for date 3 hours ago', () => {
      const date = new Date(Date.now() - 3 * 60 * 60 * 1000);
      const result = formatRelativeTime(date);

      expect(result).toMatch(/\d+ hours? ago/);
    });

    it('should return days format for date 2 days ago', () => {
      const date = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
      const result = formatRelativeTime(date);

      expect(result).toMatch(/\d+ days? ago|yesterday/);
    });
  });
});
