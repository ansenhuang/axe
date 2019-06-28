/**
 * A pretty tips ui without any dependencies.
 * @module @axe/tips
 */ /** */

import styles from './style.css';

/**
 * options of `tips.show`
 */
export interface Options {
  zIndex?: number;
  content?: string;
  contentHtml?: string;
  duration?: number;
}

type Callback = () => void;

/**
 * class Tips
 */
export class Tips {
  private tipsEl: HTMLDivElement;
  private layerEl: HTMLDivElement;
  private bodyEl: HTMLDivElement;
  private callback?: Callback;
  private timerId?: number;

  constructor(el: HTMLElement = document.body) {
    // create element
    this.tipsEl = document.createElement('div');
    this.layerEl = document.createElement('div');
    this.bodyEl = document.createElement('div');

    this.scaleResize();
    this.initRender();
    this.initEvents();

    // append in view
    el.appendChild(this.tipsEl);
  }

  /**
   * show tips with options
   */
  public show(options: Options | string, callback?: () => void): void {
    if (typeof this.callback === 'function') {
      window.clearTimeout(this.timerId);
      this.callback();
      this.callback = undefined;
    }

    if (typeof options === 'string') {
      options = { content: options };
    }

    this.tipsEl.style.zIndex = typeof options.zIndex === 'number' ? '' + options.zIndex : null;
    if (!options.contentHtml) {
      this.bodyEl.textContent = options.content || '';
    } else {
      this.bodyEl.innerHTML = options.contentHtml;
    }
    this.tipsEl.style.display = null; // show

    this.callback = callback;
    this.timerId = window.setTimeout(() => {
      if (typeof this.callback === 'function') {
        this.callback();
        this.callback = undefined;
      }
      this.hide();
    }, options.duration || 2000);
  }

  /**
   * hide tips
   */
  public hide(): void {
    this.tipsEl.style.display = 'none';
  }

  private scaleResize = () => {
    this.tipsEl.style.fontSize = 28 * Math.min(document.documentElement.clientWidth / 750, 1) + 'px';
  };

  private initRender() {
    this.tipsEl.style.display = 'none';

    // add className
    this.tipsEl.className = styles.tips;
    this.layerEl.className = styles.layer;
    this.bodyEl.className = styles.body;
    // apppend element
    this.tipsEl.appendChild(this.layerEl);
    this.tipsEl.appendChild(this.bodyEl);
  }

  private initEvents() {
    window.addEventListener('resize', this.scaleResize);
    // prevent default scroll
    this.tipsEl.addEventListener(
      'touchmove',
      (e: TouchEvent) => {
        let target: HTMLElement = e.target as HTMLElement;
        while (target !== this.tipsEl && typeof target.dataset.scroll === 'undefined') {
          target = target.parentElement as HTMLElement;
        }
        if (target === this.tipsEl) {
          e.preventDefault();
        }
      },
      {
        passive: false,
        capture: false,
      },
    );
  }
}

/**
 * tips instance
 */
export const tips = new Tips();
export default tips;
