import { html, svg, css } from 'lit-element';
import { theme } from './styles.js';
import ScElement from './ScElement.js';

class ScMatrix extends ScElement {
  static get properties() {
    return {
      width: { type: Number },
      height: { type: Number },
      columns: { type: Number },
      rows: { type: Number },
      // @note: bad name...
      cellValues: { type: Array },
      value: { type: Array },
    };
  }

  static get styles() {
    return css`
      :host {
        vertical-align: top;
        display: inline-block;
        box-sizing: border-box;
        user-select: none;
        font-size: 0 !important;
      }

      svg {
        box-sizing: border-box;
        background-color: ${theme['--color-primary-1']};
        border: 1px solid ${theme['--color-primary-2']};
      }
    `;
  }

  set rows(value) {
    this._rows = value;
    this._resizeMatrix();
  }

  get rows() {
    return this._rows;
  }

  set columns(value) {
    this._columns = value;
    this._resizeMatrix();
  }

  get columns() {
    return this._columns;
  }

  set value(value) {
    this._value = value;
    this.requestUpdate();
  }

  get value() {
    return this._value;
  }

  _resizeMatrix() {
    const value = this.value;

    // remove additionnal rows
    for (let y = value.length - 1; y >= this.rows; y--) {
      value.splice(y, 1);
    }

    // remove additionnal columns
    value.forEach(row => {
      for (let x = row.length - 1; x >= this.columns; x--) {
        row.splice(x, 1);
      }
    });

    // add new rows and columns
    const currentNumRows = value.length;

    for (let y = 0; y < this.rows; y++) {
      if (y < currentNumRows) {

        // check _rows
        value.forEach(row => {
          for (let x = row.length; x < this.columns; x++) {
            row[x] = this.cellValues[0];
          }
        });
      } else {
        // new row
        const row = new Array(this.columns).fill(this.cellValues[0]);
        value[y] = row;
      }
    }

    this.requestUpdate();
  }

  constructor() {
    super();

    this.width = 300;
    this.height = 200;
    this._value = [];

    this.cellValues = [0, 0.5, 1];

    this.columns = 8;
    this.rows = 4;
  }

  render() {
    const cellWidth = this.width / this.columns;
    const cellHeight = this.height / this.rows;

    return html`
      <svg
        style="width: ${this.width}px; height: ${this.height}px;"
        @contextmenu="${this._preventContextMenu}"
      >
        ${this.value.map((row, rowIndex) => {
          const y = cellHeight * rowIndex;

          return row.map((value, columnIndex) => {
            const x = cellWidth * columnIndex;

            return svg`
              <rect
                stroke="#787878"
                fill="#ffffff"
                fill-opacity="${value}"
                width="${cellWidth}"
                height="${cellHeight}"
                x="${x}"
                y="${y}"
                data-rowIndex="${rowIndex}"
                data-columnIndex="${columnIndex}"
                @mousedown="${this._updateCell}"
              ></rect>
            `;
          });
        })}
      </svg>
    `;
  }

  _updateCell(e) {
    const { rowIndex, columnIndex } = e.target.dataset;

    const currentIndex = this.cellValues.indexOf(this.value[rowIndex][columnIndex]);
    const nextIndex = (currentIndex + 1) % this.cellValues.length;

    this.value[rowIndex][columnIndex] = this.cellValues[nextIndex];

    const event = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    });

    this.dispatchEvent(event);
    this.requestUpdate();
  }
}

customElements.define('sc-matrix', ScMatrix);

export default ScMatrix;
