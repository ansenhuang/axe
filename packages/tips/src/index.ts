/**
 * A pretty tips ui without any dependencies.
 * @module @axe/tips
 */ /** */

import styles from './index.css';

/**
 * options of `tips.show`
 */
export interface Options {
  zIndex?: number;
  content?: string;
  contentHtml?: string;
  duration?: number;
  preventScroll?: boolean;
}

/**
 * class Tips
 */
export class Tips {
  private tipsNode: HTMLDivElement;
  private layerNode: HTMLDivElement;
  private bodyNode: HTMLDivElement;
  private preventScroll: boolean;
  private callback: (() => void) | undefined;
  private timerId: number | undefined;

  constructor(el: HTMLElement = document.body) {
    this.preventScroll = true;
    // create element
    this.tipsNode = document.createElement('div');
    this.layerNode = document.createElement('div');
    this.bodyNode = document.createElement('div');
    // hide tips by default
    this.tipsNode.style.display = 'none';

    // add className
    this.tipsNode.className = styles.tips;
    this.layerNode.className = styles.layer;
    this.bodyNode.className = styles.body;
    // apppend element
    this.tipsNode.appendChild(this.layerNode);
    this.tipsNode.appendChild(this.bodyNode);

    this.setScale(document.documentElement.clientWidth / 750);

    // prevent default scroll
    this.tipsNode.addEventListener(
      'touchmove',
      (e: TouchEvent) => {
        if (!this.preventScroll) {
          return;
        }

        let target: HTMLElement = e.target as HTMLElement;
        while (
          target !== this.tipsNode &&
          typeof target.dataset.scroll === 'undefined'
        ) {
          target = target.parentElement as HTMLElement;
        }
        if (target === this.tipsNode) {
          e.preventDefault();
        }
      },
      {
        passive: false,
        capture: false,
      },
    );

    // append in view
    el.appendChild(this.tipsNode);
  }

  /**
   * adjust the size of tips,
   * it will adjust automatically based on client width by default
   */
  public setScale(scale?: number): void {
    if (scale) {
      this.tipsNode.style.fontSize = 28 * scale + 'px';
    }
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

    this.tipsNode.style.zIndex =
      typeof options.zIndex === 'number' ? '' + options.zIndex : null;
    this.preventScroll = options.preventScroll !== false;
    if (!options.contentHtml) {
      this.bodyNode.textContent = options.content || '';
    } else {
      this.bodyNode.innerHTML = options.contentHtml;
    }
    this.tipsNode.style.display = null; // show

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
    this.tipsNode.style.display = 'none';
  }
}

/**
 * tips instance
 */
export const tips = new Tips();
export default tips;
