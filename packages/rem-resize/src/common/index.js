import './reset.css'

const maxWidth = window.__MAX_WIDTH__ || 750
const divPart = window.__DIV_PART__ || 15
const bodySize = window.__BODY_SIZE__ || 12

const docEl = document.documentElement
const metaEl = document.querySelector('meta[name="viewport"]')
const testEl = document.createElement('div')

testEl.style.width = '0'
testEl.style.height = '0'

let scale = 1
let dpr = 1

if (metaEl) {
  console.warn('根据已有的meta标签来设置缩放比例')

  const match = metaEl.getAttribute('content').match(/initial-scale=([\d.]+)/)

  if (match) {
    scale = match[1]
    dpr = 1 / scale
  }
} else {
  const isMobile = /applewebkit.*mobile.*/.test(window.navigator.userAgent.toLowerCase()) // 是否为移动终端

  dpr = isMobile ? (window.devicePixelRatio || 1) : 1
  scale = 1 / dpr

  const newMetaEl = document.createElement('meta')
  newMetaEl.setAttribute('name', 'viewport')
  newMetaEl.setAttribute('content', `width=device-width, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no, viewport-fit=cover`)
  docEl.firstElementChild.appendChild(newMetaEl)
}

// 设置根节点dpr
docEl.setAttribute('data-dpr', dpr)

function bodyLoaded (cb) {
  if (document.body) {
    cb && cb()
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      cb && cb()
    }, false)
  }
}

// 窗口宽度改变时，刷新rem
function refreshRem () {
  let width = docEl.clientWidth

  if (width / dpr > maxWidth) {
    width = maxWidth * dpr
  }

  // 设置根节点font-size
  window.remUnit = width / divPart
  docEl.style.fontSize = window.remUnit + 'px'

  bodyLoaded(() => {
    // 测试rem的准确性，如果和预期不一样，则进行缩放
    testEl.style.width = '1rem'
    document.body.appendChild(testEl)

    if (Math.abs(testEl.clientWidth - window.remUnit) >= 1) {
      docEl.style.fontSize = (window.remUnit * window.remUnit / testEl.clientWidth) + 'px'
    }

    document.body.removeChild(testEl)
  })
}

// 初始化
refreshRem()

bodyLoaded(() => {
  document.body.style.fontSize = bodySize * dpr + 'px'
  document.body.style.maxWidth = maxWidth * dpr + 'px'
})

window.addEventListener('resize', refreshRem, false)

// 浏览器返回时，iPhone7以上手机的页面可见宽度为实际尺寸（不会乘以设备像素比）
// 目前在安卓机的表现未可知，因此注释掉该段代码
// 猜测原因可能是因为viewport是js动态填充的，返回时没有拿到计算后的viewport值
// window.addEventListener('pageshow', function (e) {
//   if (e.persisted) {
//     refreshRem()
//   }
// }, false)

// 全局单位转换方法
window.px2rem = function (d) {
  let val = parseFloat(d) / window.remUnit

  if (typeof d === 'string' && d.match(/px$/)) {
    val += 'rem'
  }

  return val
}

window.rem2px = function (d) {
  let val = parseFloat(d) * window.remUnit

  if (typeof d === 'string' && d.match(/rem$/)) {
    val += 'px'
  }

  return val
}
