import { html } from 'lit';
import applyStyle from './utils/applyStyle.js';

export const template = html`

<h2>sc-filter</h2>

<sc-code-example language="javascript">${`
import { html } from 'lit';
import '@ircam/sc-components/sc-filter.js';

const template = html\`
  <sc-filter></sc-filter>
\`;
`}</sc-code-example>

<sc-filter></sc-filter>

`;
