"use strict";(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[865,66],{6865:(e,t,n)=>{n.r(t),n.d(t,{enter:()=>d,exit:()=>m,template:()=>g});var a=n(9392),s=n(2981),c=n(4066),l=n(1142),i=n.n(l);let r=null,o=null,u=null;function d(){const e=document.querySelector("#test-signal");r=(0,c.default)(1,60,1,((e,t)=>{u={time:e,data:Array.from(t)}})),o=(0,c.default)(2,60,1,((t,n)=>{u.data[1]=.5*n[0],e.value=u})),r.start(),o.start()}function m(){r.stop(),o.stop()}const g=a.dy`

<h2>sc-signal</h2>

<sc-code-example language="javascript">${"\nimport { html } from 'lit';\nimport '@ircam/sc-components/sc-signal.js';\n\nconst template = html`<sc-signal></sc-signal>`;\n"}</sc-code-example>

<sc-signal id="test-signal"></sc-signal>

<h3>Properties</h3>

<div>
  <sc-text readonly>.value={ time, data[] }</sc-text>
  <sc-code-example language="javascript">${"\nrender(html`<sc-signal></sc-signal>`, $container);\n\nconst $signal = $container.querySelector('sc-signal');\n\nsetInterval(() => {\n  const frame = {\n    time: Date.now() / 1000, // time is is seconds\n    data: [Math.random()],\n  }\n\n  $signal.value = frame;\n}, 100);\n  "}</sc-code-example>
</div>

<h3>Attributes</h3>
<div>
  <sc-text readonly>[duration=1]</sc-text>
  <sc-number
    min="0.5"
    max="10"
    value="1"
    @change=${e=>document.querySelector("#test-signal").duration=e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text readonly>[min=-1]</sc-text>
  <sc-number
    min="-10"
    max="0"
    value="-1"
    @change=${e=>document.querySelector("#test-signal").min=e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text readonly>[max=1]</sc-text>
  <sc-number
    min="0"
    max="10"
    value="1"
    @change=${e=>document.querySelector("#test-signal").max=e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text readonly>[line-width=1]</sc-text>
  <sc-number
    min="1"
    max="10"
    value="1"
    @change=${e=>document.querySelector("#test-signal").lineWidth=e.detail.value}
  ></sc-number>
</div>
<div>
  <sc-text readonly>[colors=[]]</sc-text>
  <sc-text
    style="width: 500px;"
    @change=${e=>document.querySelector("#test-signal").colors=i().parse(e.detail.value)}
  >['#4682B4', '#ffa500', '#00e600', '#ff0000', '#800080', '#224153']</sc-text>
</div>
<div>
  <sc-text readonly>[?min-max=true]</sc-text>
  <sc-toggle
    @change=${e=>document.querySelector("#test-signal").minMax=e.detail.value}
  ></sc-toggle>
</div>

<h3>Styling</h3>
<sc-editor
  save-button
  value="\
#test-signal {
  width: 300px;
  height: 150px;
}
  "
  @change=${e=>(0,s.default)(e.detail.value)}
></sc-editor>
`},4066:(e,t,n)=>{function a(e,t,n,a,s=1/0){const c={},l=new Float32Array(n),i=n/t;Math.PI;let r=e/t,o=0,u=null,d=0,m=0;return c.frequency=e=>{r=e/t},c.start=()=>{!function e(){for(let e=0;e<n;e++){const t=Math.sin(2*o*Math.PI);l[e]=t,o=(o+r)%1}a(d,l),d+=i,m+=1,m<s&&(u=setTimeout(e,1e3*i))}()},c.stop=()=>{clearTimeout(u)},c}n.r(t),n.d(t,{default:()=>a})}}]);