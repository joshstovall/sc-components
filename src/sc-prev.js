import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-prev</h2>

<sc-code-example language="javascript">${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-prev.js';

const template = html\`<sc-prev></sc-prev>\`;
`}</sc-code-example>

<sc-prev
  id="test-prev"
  @input=${e => document.querySelector('#prev-input').active = e.detail.value}
></sc-prev>

<h3>Events</h3>
<p>
  <sc-text readonly>@input</sc-text>
  <sc-bang id="prev-input"></sc-bang>
</p>

<h3>Styling</h3>
<sc-editor
  save-button
  value="\
#test-prev {
  width: 30px;
  height: 30px;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>

<h3>Example</h3>
<div>
  <sc-prev></sc-prev>
  <sc-next></sc-next>
</div>
`;
