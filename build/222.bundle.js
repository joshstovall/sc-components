"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[222],{9631:(e,t,s)=>{s.r(t),s.d(t,{template:()=>d});var o=s(182),c=s(4670);const d=o.dy`

<h2>sc-editor</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-editor.js';\n\nconst template = html`\n  <sc-editor></sc-editor>\n`;\n"}</sc-code-example>

<sc-editor
  id="test-editor"
  as-module
  value="\
function test() {
  return 42;
}"
  @change=${e=>{document.querySelector("#editor-change").value=e.detail.value,e.detail.module&&console.log(e.detail.module)}}
></sc-editor>

<p>
The red line on the left shows if the editor is in dirty state.
</p>

<p>
The "change" event is triggered when:<br />
  - "Cmd+S" is pressed<br />
  - the "floppy disc" inon is clicked (see the "save-button" attribute)
<p>

<h3>Events</h3>
<div>
  <sc-text>@change</sc-text>
  <sc-editor id="editor-change"></sc-bang>
</div>

<h3>Attributes</h3>

<div>
  <sc-text>value [=""]</sc-text>
  <sc-editor
    save-button
    value="const myValue = true;"
    @change=${e=>document.querySelector("#test-editor").value=e.detail.value}
  ></sc-editor>
</div>
<div>
  <sc-text>?save-button [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-editor").saveButton=e.detail.value}
  ></sc-toggle>
  <p><i>Note that the button only appears whens the editor is in "dirty" state</i></p>
</div>
<div>
  <sc-text>?dirty [=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-editor").dirty=e.detail.value}
  ></sc-toggle>
</div>
<!-- do not document, not sure this is a good idea
<div>
  <p>If true, use <code>import()</code> to create a javascript module from the source code. The module will be available in <code>e.detail.module</code>. Open the console to see the logs.</p>
  <sc-text>[as-module=false]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-editor").asModule=e.detail.value}
  ></sc-toggle>
</div>
-->

<h3>Keyboard shortcuts</h3>
<sc-text class="key">Cmd+S</sc-text>
<sc-text class="key">Cmd+F</sc-text>

<h3>Styling</h3>
<sc-editor
  style="width: 500px;"
  save-button
  value="\
#test-editor {
  width: 300px;
  height: 200px;
  font-size: 11px;
}
  "
  @change=${e=>(0,c.default)(e.detail.value)}
></sc-editor>
`}}]);