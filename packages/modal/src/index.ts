/**
 * A pretty modal ui without any dependencies.
 * @module @axe/modal
 */ /** */

import styles from './style.css';

/**
 * type of close
 */
export enum CloseType {
  Layer,
  Cancel,
  Confirm,
}

/**
 * options of `modal.show`
 */
export interface Options {
  zIndex?: number;
  title?: string;
  content?: string;
  contentHtml?: string;
  confirmColor?: string;
  confirmText?: string;
  cancelColor?: string;
  cancelText?: string;
  closeByLayer?: boolean;
  callback?: Callback;
}

type Callback = (type: CloseType) => void;

export class Modal {
  private modalEl: HTMLDivElement;
  private layerEl: HTMLDivElement;
  private bodyEl: HTMLDivElement;
  private titleEl: HTMLHeadingElement;
  private contentEl: HTMLDivElement;
  private btnWrapEl: HTMLDivElement;
  private confirmEl: HTMLButtonElement;
  private cancelEl: HTMLButtonElement;

  private queue: Options[];
  private closeByLayer: boolean;
  private callback?: Callback;

  constructor(el: HTMLElement = document.body) {
    this.queue = [];
    this.closeByLayer = true;
    // dom
    this.modalEl = document.createElement('div');
    this.layerEl = document.createElement('div');
    this.bodyEl = document.createElement('div');
    this.titleEl = document.createElement('h3');
    this.contentEl = document.createElement('div');
    this.btnWrapEl = document.createElement('div');
    this.confirmEl = document.createElement('button');
    this.cancelEl = document.createElement('button');

    this.scaleResize();
    this.initRender();
    this.initEvents();

    // attach to view
    el.appendChild(this.modalEl);
  }

  public show(options: Options | string, callback?: Callback) {
    if (typeof options === 'string') {
      options = { content: options };
    }
    if (typeof callback === 'function') {
      options.callback = callback;
    }

    if (this.modalEl.style.display === 'none') {
      this.startShow(options);
    } else {
      this.queue.push(options);
    }
  }

  public hide() {
    this.modalEl.style.display = 'none';

    const options = this.queue.shift();
    if (options) {
      setTimeout(() => {
        this.startShow(options);
      });
    }
  }

  public hideAll() {
    this.queue = [];
    this.modalEl.style.display = 'none';
  }

  private initRender() {
    this.modalEl.style.display = 'none';

    this.modalEl.className = styles.modal;
    this.layerEl.className = styles.layer;
    this.bodyEl.className = styles.body;
    this.titleEl.className = styles.title;
    this.contentEl.className = styles.content;
    this.btnWrapEl.className = styles.btnWrap;
    this.confirmEl.className = [styles.btn, styles.btnConfirm].join(' ');
    this.cancelEl.className = [styles.btn, styles.btnCancel].join(' ');

    this.btnWrapEl.appendChild(this.cancelEl);
    this.btnWrapEl.appendChild(this.confirmEl);
    this.bodyEl.appendChild(this.titleEl);
    this.bodyEl.appendChild(this.contentEl);
    this.bodyEl.appendChild(this.btnWrapEl);
    this.modalEl.appendChild(this.layerEl);
    this.modalEl.appendChild(this.bodyEl);
  }

  private initEvents() {
    window.addEventListener('resize', this.scaleResize);

    // prevent scroll
    this.modalEl.addEventListener(
      'touchmove',
      (e: TouchEvent) => {
        let target: HTMLElement = e.target as HTMLElement;
        while (target !== this.modalEl && typeof target.dataset.scroll === 'undefined') {
          target = target.parentElement as HTMLElement;
        }
        if (target === this.modalEl) {
          e.preventDefault();
        }
      },
      {
        passive: false,
        capture: false,
      },
    );

    const handler = (closeType: CloseType) => {
      if (typeof this.callback === 'function') {
        this.callback(closeType);
      }
      this.hide();
    };
    // click layer
    this.layerEl.addEventListener(
      'click',
      () => {
        if (this.closeByLayer) {
          handler(CloseType.Layer);
        }
      },
      false,
    );

    // click cancel
    this.cancelEl.addEventListener(
      'click',
      () => {
        handler(CloseType.Cancel);
      },
      false,
    );

    // 点击确定
    this.confirmEl.addEventListener(
      'click',
      () => {
        handler(CloseType.Confirm);
      },
      false,
    );
  }

  private scaleResize = () => {
    this.modalEl.style.fontSize = 28 * Math.min(document.documentElement.clientWidth / 750, 1) + 'px';
  };

  private startShow(options: Options) {
    this.modalEl.style.zIndex = typeof options.zIndex === 'number' ? '' + options.zIndex : null;
    if (options.title) {
      this.titleEl.textContent = options.title;
      this.titleEl.style.display = null;
    } else {
      this.titleEl.style.display = 'none';
    }
    if (!options.contentHtml) {
      this.contentEl.textContent = options.content || null;
    } else {
      this.contentEl.innerHTML = options.contentHtml;
    }
    this.confirmEl.style.color = options.confirmColor || null;
    this.confirmEl.textContent = options.confirmText || '确定';
    if (options.cancelText) {
      this.cancelEl.style.color = options.cancelColor || null;
      this.cancelEl.textContent = options.cancelText;
      this.cancelEl.style.display = null;
    } else {
      this.cancelEl.style.display = 'none';
    }
    this.closeByLayer = options.closeByLayer !== false;
    this.callback = options.callback;
    // attach to view
    this.modalEl.style.display = null;
  }
}

/**
 * modal instance
 */
export const modal = new Modal();
export default modal;
