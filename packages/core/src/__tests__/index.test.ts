import { describe, expect, it } from 'vitest';
import { ASPEKT_PACKAGE } from '../index.js';

describe('@aspekt/core', () => {
  it('exports the package identifier', () => {
    expect(ASPEKT_PACKAGE).toBe('@aspekt/core');
  });

  it('test infrastructure is working', () => {
    expect(true).toBe(true);
  });
});
