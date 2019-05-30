import precision, {
  getDecimalLength,
  float2Int,
  checkBoundary,
} from './index';

describe('precision plus', () => {
  test('0.1 + 0.2', () => {
    expect(precision.plus(0.1, 0.2)).toBe(0.3);
  });

  test('0.1 + (-0.3)', () => {
    expect(precision.plus(0.1, -0.3)).toBe(-0.2);
  });

  test('0.1 + 0.2 + 0.3', () => {
    expect(precision.plus(0.1, 0.2, 0.3)).toBe(0.6);
  });
});

describe('precision minus', () => {
  test('0.3 - 0.2', () => {
    expect(precision.minus(0.3, 0.2)).toBe(0.1);
  });

  test('0.1 - (-0.2)', () => {
    expect(precision.minus(0.1, -0.2)).toBe(0.3);
  });

  test('0.3 - 0.2 - 0.1', () => {
    expect(precision.minus(0.3, 0.2, 0.1)).toBe(0);
  });
});

describe('precision times', () => {
  test('0.1 * 0.2', () => {
    expect(precision.times(0.1, 0.2)).toBe(0.02);
  });

  test('0.1 * (-0.2)', () => {
    expect(precision.times(0.1, -0.2)).toBe(-0.02);
  });

  test('0.1 * 0.2 * 0.3', () => {
    expect(precision.times(0.1, 0.2, 0.3)).toBe(0.006);
  });
});

describe('precision divide', () => {
  test('0.02 / 0.1', () => {
    expect(precision.divide(0.02, 0.1)).toBe(0.2);
  });

  test('0.02 / (-0.1)', () => {
    expect(precision.divide(0.02, -0.1)).toBe(-0.2);
  });

  test('0.06 */ 0.2 / 0.1', () => {
    expect(precision.divide(0.06, 0.2, 0.1)).toBe(3);
  });
});

describe('precision round', () => {
  test('5.15 + 0.003', () => {
    expect(precision.round(5.15 + 0.003)).toBe(5);
  });

  test('5.15 + 0.503', () => {
    expect(precision.round(5.15 + 0.503)).toBe(6);
  });

  test('5.15 + 0.503 with precision 3', () => {
    expect(precision.round(precision.plus(5.15, 0.503), 3)).toBe(5.653);
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

describe('checkBoundary', () => {
  test('MAX_SAFE_INTEGER', () => {
    expect(checkBoundary(Number.MAX_SAFE_INTEGER)).toBeFalsy();
  });

  test('MIN_SAFE_INTEGER', () => {
    expect(checkBoundary(Number.MIN_SAFE_INTEGER)).toBeFalsy();
  });
});
