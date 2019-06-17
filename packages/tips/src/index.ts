/**
 * @module @axe/tips
 */

import styles from './index.css';

interface Options {
  zIndex?: number;
  content?: string;
  contentHtml?: string;
  duration?: number;
  preventScroll?: boolean;
}

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
      (e: Event) => {
        if (!this.preventScroll) {
          return;
        }

        const data = (e.target as HTMLElement).dataset || {};
        if (typeof data.scroll === 'undefined') {
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

  public setScale(scale?: number): void {
    if (scale) {
      this.tipsNode.style.fontSize = 28 * scale + 'px';
    }
  }

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

  public hide(): void {
    this.tipsNode.style.display = 'none';
  }
}

export default new Tips();
