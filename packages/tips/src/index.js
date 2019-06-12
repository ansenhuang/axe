import styles from './index.css';
export class Tips {
    constructor(el = document.body) {
        this.preventScroll = true;
        this.tipsNode = document.createElement('div');
        this.layerNode = document.createElement('div');
        this.bodyNode = document.createElement('div');
        this.tipsNode.style.display = 'none';
        this.tipsNode.className = styles.tips;
        this.layerNode.className = styles.layer;
        this.bodyNode.className = styles.body;
        this.tipsNode.appendChild(this.layerNode);
        this.tipsNode.appendChild(this.bodyNode);
        el.appendChild(this.tipsNode);
        this.tipsNode.addEventListener('touchmove', (e) => {
            if (!this.preventScroll) {
                return;
            }
            const data = e.target.dataset || {};
            if (typeof data.scroll === 'undefined') {
                e.preventDefault();
            }
        }, {
            passive: false,
            capture: false,
        });
    }
    show(options, callback) {
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
        }
        else {
            this.bodyNode.innerHTML = options.contentHtml;
        }
        this.tipsNode.style.display = null;
        this.callback = callback;
        this.timerId = window.setTimeout(() => {
            if (typeof this.callback === 'function') {
                this.callback();
                this.callback = undefined;
            }
            this.hide();
        }, options.duration || 2000);
    }
    hide() {
        this.tipsNode.style.display = 'none';
    }
}
export default new Tips();
