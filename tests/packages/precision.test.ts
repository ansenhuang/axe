import {
  divide,
  float2Int,
  getDecimalLength,
  minus,
  plus,
  times,
} from '@axe/precision';

describe('precision plus', () => {
  test('0.1 + 0.2', () => {
    expect(plus(0.1, 0.2)).toBe(0.3);
  });

  test('0.1 + (-0.3)', () => {
    expect(plus(0.1, -0.3)).toBe(-0.2);
  });

  test('0.1 + 0.2 + 0.3', () => {
    expect(plus(0.1, 0.2, 0.3)).toBe(0.6);
  });
});

describe('precision minus', () => {
  test('0.3 - 0.2', () => {
    expect(minus(0.3, 0.2)).toBe(0.1);
  });

  test('0.1 - (-0.2)', () => {
    expect(minus(0.1, -0.2)).toBe(0.3);
  });

  test('0.3 - 0.2 - 0.1', () => {
    expect(minus(0.3, 0.2, 0.1)).toBe(0);
  });
});

describe('precision times', () => {
  test('0.1 * 0.2', () => {
    expect(times(0.1, 0.2)).toBe(0.02);
  });

  test('0.1 * (-0.2)', () => {
    expect(times(0.1, -0.2)).toBe(-0.02);
  });

  test('0.1 * 0.2 * 0.3', () => {
    expect(times(0.1, 0.2, 0.3)).toBe(0.006);
  });
});

describe('precision divide', () => {
  test('0.02 / 0.1', () => {
    expect(divide(0.02, 0.1)).toBe(0.2);
  });

  test('0.02 / (-0.1)', () => {
    expect(divide(0.02, -0.1)).toBe(-0.2);
  });

  test('0.06 */ 0.2 / 0.1', () => {
    expect(divide(0.06, 0.2, 0.1)).toBe(3);
  });
});

describe('getDecimalLength', () => {
  test('no decimal', () => {
    expect(getDecimalLength(1)).toBe(0);
  });

  test('no decimal with negative', () => {
    expect(getDecimalLength(-1)).toBe(0);
  });

  test('3 decimal', () => {
    expect(getDecimalLength(0.001)).toBe(3);
  });

  test('3 decimal with negative', () => {
    expect(getDecimalLength(-0.001)).toBe(3);
  });

  test('9 decimal with e', () => {
    expect(getDecimalLength(0.000000001)).toBe(9);
  });

  test('9 decimal with negative and e', () => {
    expect(getDecimalLength(-0.000000001)).toBe(9);
  });
});

describe('float2Int', () => {
  test('5.563', () => {
    expect(float2Int(5.563)).toBe(5563);
  });

  test('-5.563', () => {
    expect(float2Int(-5.563)).toBe(-5563);
  });

  test('5 * Math.pow(10, -10)', () => {
    expect(float2Int(5 * Math.pow(10, -10))).toBe(5);
  });
});
