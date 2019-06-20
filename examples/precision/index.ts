import {
  divide,
  float2Int,
  getDecimalLength,
  minus,
  plus,
  times,
} from '@axe/precision';

(document.getElementById('root') as Element).innerHTML = [
  '<h1>精确计算示例</h1>',

  '<h2>原始计算</h2>',
  `<p>加法：0.1 + 0.2 = ${0.1 + 0.2}</p>`,
  `<p>减法：0.3 - 0.2 = ${0.3 - 0.2}</p>`,
  `<p>乘法：0.1 * 0.2 = ${0.1 * 0.2}</p>`,
  `<p>除法：0.02 / 0.1 = ${0.02 / 0.1}</p>`,

  '<h2>精确计算</h2>',
  `<p>加法：0.1 + 0.2 = ${plus(0.1, 0.2)}</p>`,
  `<p>减法：0.3 - 0.2 = ${minus(0.3, 0.2)}</p>`,
  `<p>乘法：0.1 * 0.2 = ${times(0.1, 0.2)}</p>`,
  `<p>除法：0.02 / 0.1 = ${divide(0.02, 0.1)}</p>`,

  '<h2>计算工具</h2>',
  `<p>获取小数长度：getDecimalLength(2.000005) = ${getDecimalLength(
    2.000005,
  )}</p>`,
  `<p>小数转化为整数：float2Int(2.100005) = ${float2Int(2.100005)}</p>`,
].join('');
