/**
 * @module @axe/precision
 */

export function getDecimalLength(num: number): number {
  const es = ('' + num).split('e');
  const len = (es[0].split('.')[1] || '').length - (+es[1] || 0);
  return len > 0 ? len : 0;
}

export function float2Int(num: number): number {
  const numStr = '' + num;
  if (numStr.indexOf('e') === -1) {
    return +numStr.replace('.', '');
  }
  return num * Math.pow(10, getDecimalLength(num));
}

export function checkBoundary(num: number): boolean {
  if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
    console.warn(
      `${num} is beyond boundary when transfer to integer, the results may not be accurate!`,
    );
    return true;
  }
  return false;
}

function times(n1: number, n2: number, ...others: number[]): number {
  if (others.length > 0) {
    return times(times(n1, n2), others[0], ...others.slice(1));
  }
  const value = float2Int(n1) * float2Int(n2);
  checkBoundary(value);
  return value / Math.pow(10, getDecimalLength(n1) + getDecimalLength(n2));
}

function divide(n1: number, n2: number, ...others: number[]): number {
  if (others.length > 0) {
    return divide(divide(n1, n2), others[0], ...others.slice(1));
  }
  const n1Int = float2Int(n1);
  const n2Int = float2Int(n2);
  checkBoundary(n1Int);
  checkBoundary(n2Int);
  return times(
    n1Int / n2Int,
    Math.pow(10, getDecimalLength(n2) - getDecimalLength(n1)),
  );
}

function plus(n1: number, n2: number, ...others: number[]): number {
  if (others.length > 0) {
    return plus(plus(n1, n2), others[0], ...others.slice(1));
  }
  const baseNum = Math.pow(
    10,
    Math.max(getDecimalLength(n1), getDecimalLength(n2)),
  );
  return (times(n1, baseNum) + times(n2, baseNum)) / baseNum;
}

function minus(n1: number, n2: number, ...others: number[]): number {
  if (others.length > 0) {
    return minus(minus(n1, n2), others[0], ...others.slice(1));
  }
  const baseNum = Math.pow(
    10,
    Math.max(getDecimalLength(n1), getDecimalLength(n2)),
  );
  return (times(n1, baseNum) - times(n2, baseNum)) / baseNum;
}

function round(n: number, precision: number = 0): number {
  if (precision <= 0) {
    return Math.round(n);
  }
  const baseNum = Math.pow(10, precision);
  return divide(Math.round(times(n, baseNum)), baseNum);
}

export default {
  times,
  divide,
  plus,
  minus,
  round,
};
