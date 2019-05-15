import mcss from './style.module.css'

export class Modal {
  constructor (parentNode) {
    this.parentNode = parentNode || document.body
    this.els = {
      modal: document.createElement('div'),
      layer: document.createElement('div'),
      body: document.createElement('div'),
      title: document.createElement('h3'),
      content: document.createElement('div'),
      btnWrap: document.createElement('div'),
      confirm: document.createElement('button'),
      cancel: document.createElement('button')
    }

    this._initClassName()
    this._initEventListener()
    this._initRender()

    // 弹窗队列
    this.queue = []
  }

  _initClassName () {
    const els = this.els

    els.modal.className = mcss.modal
    els.layer.className = mcss.layer
    els.body.className = mcss.body
    els.title.className = mcss.title
    els.content.className = mcss.content
    els.btnWrap.className = mcss.btnWrap
    els.confirm.className = [mcss.btn, mcss.btnConfirm].join(' ')
    els.cancel.className = [mcss.btn, mcss.btnCancel].join(' ')
  }

  _initEventListener () {
    const els = this.els

    // 阻止弹窗底部内容滚动
    els.modal.addEventListener('touchmove', e => {
      let data = e.target.dataset || {}

      if (typeof data.scroll === 'undefined') {
        e.preventDefault()
      }
    }, {
      passive: false,
      capture: false
    })

    // 点击蒙层
    els.layer.addEventListener('click', () => {
      if (!this.closeByLayer) return

      if (typeof this.resolve === 'function') {
        this.resolve(false)
      }

      this.hide()
    }, false)

    // 点击取消
    els.cancel.addEventListener('click', () => {
      if (typeof this.resolve === 'function') {
        this.resolve(false)
      }

      this.hide()
    }, false)

    // 点击确定
    els.confirm.addEventListener('click', () => {
      if (typeof this.resolve === 'function') {
        this.resolve(true)
      }

      this.hide()
    }, false)
  }

  _initRender () {
    const els = this.els

    els.btnWrap.appendChild(els.cancel)
    els.btnWrap.appendChild(els.confirm)
    els.body.appendChild(els.title)
    els.body.appendChild(els.content)
    els.body.appendChild(els.btnWrap)
    els.modal.appendChild(els.layer)
    els.modal.appendChild(els.body)

    els.modal.style.display = 'none'

    this.parentNode.appendChild(els.modal)
  }

  _open ({ options, resolve }) {
    const els = this.els

    if (options.zIndex) {
      els.modal.style.zIndex = options.zIndex
    }

    if (options.title) {
      els.title.style.display = ''
      els.title.textContent = options.title
    } else {
      els.title.style.display = 'none'
    }

    if (!options.contentHtml) {
      els.content.textContent = options.content || ''
    } else {
      els.content.innerHTML = options.contentHtml
    }

    els.confirm.style.color = options.confirmColor || ''
    els.confirm.textContent = options.confirmText || '确定'

    if (options.cancelText) {
      els.cancel.style.display = ''
      els.cancel.style.color = options.cancelColor || ''
      els.cancel.textContent = options.cancelText
    } else {
      els.cancel.style.display = 'none'
    }

    // show
    els.modal.style.display = ''

    this.closeByLayer = options.closeByLayer !== false ? true : false
    this.resolve = resolve
  }

  show (options, resolve) {
    if (typeof options === 'string') {
      options = { content: options }
    }

    let item = { options, resolve }

    if (this.els.modal.style.display === 'none') {
      this._open(item)
    } else {
      this.queue.push(item) // 暂存到队列中
    }
  }

  hide () {
    if (this.queue.length === 0) {
      this.els.modal.style.display = 'none'
    } else {
      this._open(this.queue.shift())
    }
  }

  hideAll () {
    this.queue = []
    this.els.modal.style.display = 'none'
  }
}

export default new Modal()
