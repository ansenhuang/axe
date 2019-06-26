import { divide, float2Int, getDecimalLength, minus, plus, times } from '@axe/precision';

(document.getElementById('root') as Element).innerHTML = [
  '<h1>precision example</h1>',

  '<h2>before use precision</h2>',
  `<p>plus(+)   : 0.1 + 0.2 = ${0.1 + 0.2}</p>`,
  `<p>minus(-)  : 0.3 - 0.2 = ${0.3 - 0.2}</p>`,
  `<p>times(*)  : 0.1 * 0.2 = ${0.1 * 0.2}</p>`,
  `<p>divide(/) : 0.02 / 0.1 = ${0.02 / 0.1}</p>`,

  '<h2>after use precision</h2>',
  `<p>plus(+)   : 0.1 + 0.2 = ${plus(0.1, 0.2)}</p>`,
  `<p>minus(-)  : 0.3 - 0.2 = ${minus(0.3, 0.2)}</p>`,
  `<p>times(*)  : 0.1 * 0.2 = ${times(0.1, 0.2)}</p>`,
  `<p>divide(/) : 0.02 / 0.1 = ${divide(0.02, 0.1)}</p>`,

  '<h2>precision tools</h2>',
  `<p>getDecimalLength(2.000005) = ${getDecimalLength(2.000005)}</p>`,
  `<p>float2Int(2.100005) = ${float2Int(2.100005)}</p>`,
].join('');
