import { html, svg, css } from 'lit';
import ScElement from './ScElement.js';

class ScPrev extends ScElement {
  static properties = {
    _active: {
      type: Boolean,
      state: true,
    },
    disabled: {
      type: Boolean,
      reflect: true,
    },
  };

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
      vertical-align: top;
      cursor: pointer;
      width: 30px;
      height: 30px;
      background-color: var(--sc-color-primary-2);
      border: 1px solid var(--sc-color-primary-3);
    }

    :host([hidden]) {
      display: none
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      border: 1px solid var(--sc-color-primary-4);
    }

    svg {
      width: 100%;
      height: 100%;
      fill: #ffffff;
      stroke: #ffffff;
    }

    svg.active {
      background-color: var(--sc-color-primary-1);
      fill: var(--sc-color-secondary-4);
      stroke: var(--sc-color-secondary-4);
    }

    path {
      stroke-width: 10;
      fill-opacity: 0;
    }
  `;

  constructor() {
    super();

    this._active = false;
  }

  render() {
    return html`
      <svg
        class="${this._active ? 'active' : ''}"
        viewbox="-10 -8 120 120"
        @mousedown="${this._dispatchEvent}"
        @touchstart="${this._dispatchEvent}"
        @mouseup="${this._release}"
        @touchend="${this._release}"
        @contextmenu="${this._preventContextMenu}"
      >
        <path d="M 20,20L 20,80"></path>
        <polygon points="30,50 80,20 80,80"></polygon>
      </svg>
    `;
  }

  updated(changedProperties) {
    this.disabled ? this.removeAttribute('tabindex') : this.setAttribute('tabindex', 0);
  }

  _dispatchEvent(e) {
    e.stopPropagation();

    if (this.disabled) {
      return;
    }

    this._active = true;

    const changeEvent = new CustomEvent('input', {
      bubbles: true,
      composed: true,
      detail: { value: this._active },
    });

    this.dispatchEvent(changeEvent);
  }

  _release(e) {
    e.preventDefault();
    e.stopPropagation();

    this._active = false;
  }
}

customElements.define('sc-prev', ScPrev);

export default ScPrev;
