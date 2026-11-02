import { describe, expect, it } from 'vitest';
import { toCsv } from './csv.js';

describe('toCsv', () => {
  it('writes a header row and CRLF-terminated rows', () => {
    expect(toCsv(['a', 'b'], [[1, 'x']])).toBe('a,b\r\n1,x\r\n');
  });

  it('quotes commas, quotes and line breaks', () => {
    expect(toCsv(['v'], [['a,b'], ['say "hi"'], ['two\nlines']])).toBe(
      'v\r\n"a,b"\r\n"say ""hi"""\r\n"two\nlines"\r\n',
    );
  });

  it('leaves empty cells for null and undefined', () => {
    expect(toCsv(['a', 'b', 'c'], [[null, undefined, false]])).toBe('a,b,c\r\n,,false\r\n');
  });

  it('neutralises formulas in text but keeps negative numbers', () => {
    expect(toCsv(['v'], [['=HYPERLINK("x")'], ['+1'], ['@SUM(A1)'], [-42]])).toBe(
      'v\r\n"\'=HYPERLINK(""x"")"\r\n\'+1\r\n\'@SUM(A1)\r\n-42\r\n',
    );
  });
});
