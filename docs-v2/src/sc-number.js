import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-number</h2>

<pre><code class="language-javascript">\
${`\
import { html } from 'lit';
import '@ircam/sc-components/sc-number.js';

const template = html\`<sc-number></sc-number>\`;`}
</code></pre>

<sc-number
  id="test-number"
  @input=${e => document.querySelector('#number-input').value = e.detail.value}
  @change=${e => document.querySelector('#number-change').value = e.detail.value}
></sc-number>

<h3>Events</h3>
<p>
  <sc-text readonly>@input</sc-text>
  <sc-number id="number-input"></sc-number>
</p>
<p>
  <sc-text readonly>@change</sc-text>
  <sc-number id="number-change"></sc-number>
</p>

<h3>Attributes</h3>
<p>
  <sc-text readonly>[min=-Infinity]</sc-text>
  <sc-number max="0" value="-9999" integer
    @input=${e => document.querySelector('#test-number').min = e.detail.value}
  ></sc-number>
</p>
<p>
  <sc-text readonly>[max=+Infinity]</sc-text>
  <sc-number min="1" value="9999" integer
    @input=${e => document.querySelector('#test-number').max = e.detail.value}
  ></sc-number>
</p>
<p>
  <sc-text readonly>[value=0]</sc-text>
  <sc-number
    @input=${e => document.querySelector('#test-number').value = e.detail.value}
  ></sc-number>
</p>
<p>
  <sc-text readonly>[?integer=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-number').integer = e.detail.value}
  ></sc-toggle>
</p>
<p>
  <sc-text readonly>[?disabled=false]</sc-text>
  <sc-toggle
    @change=${e => document.querySelector('#test-number').disabled = e.detail.value}
  ></sc-toggle>
</p>

<h3>Styling</h3>
<sc-editor
  value="\
#test-number {
  width: 100px;
  height: 30px;
  font-size: 11px;
}
  "
  @change=${e => applyStyle(e.detail.value)}
></sc-editor>
`;
