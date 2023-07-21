/*! For license information please see bundle.js.LICENSE.txt */
    :host {
      display: inline-block;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }

    div {
      width: 100%;
      height: 100%;
    }
  `;constructor(){super(),this.xRange=[0,1],this.yRange=[0,1],this._activePointers=new Map,this._pointerIds=[],this._mouseMove=this._mouseMove.bind(this),this._mouseUp=this._mouseUp.bind(this),this._touchStart=this._touchStart.bind(this),this._touchMove=this._touchMove.bind(this),this._touchEnd=this._touchEnd.bind(this),this._propagateValues=this._propagateValues.bind(this),this._resizeObserver=null,this._rafId=null}render(){return G`
      <div
        @mousedown="${this._mouseDown}"
        @touchstart="${{handleEvent:this._touchStart,passive:!1}}"
        @contextmenu="${this._preventContextMenu}"
      ></div>
    `}connectedCallback(){super.connectedCallback(),this._resizeObserver=new ResizeObserver((e=>{const t=e[0],{width:n,height:i}=t.contentRect,r=this.xRange[1]-this.xRange[0],a=this.yRange[1]-this.yRange[0];this._px2x=e=>e/n*r+this.xRange[0],this._px2y=e=>e/i*a+this.yRange[0]})),this._resizeObserver.observe(this)}disconnectedCallback(){this._resizeObserver.disconnect(),super.disconnectedCallback()}_mouseDown(e){window.addEventListener("mousemove",this._mouseMove,{passive:!1}),window.addEventListener("mouseup",this._mouseUp),this._pointerIds.push("mouse"),this._activePointers.set("mouse",e),this._requestUserSelectNoneOnBody(),this._requestPropagateValues(e)}_mouseMove(e){this._activePointers.set("mouse",e),this._requestPropagateValues(e)}_mouseUp(e){window.removeEventListener("mousemove",this._mouseMove),window.removeEventListener("mouseup",this._mouseUp),this._pointerIds.splice(this._pointerIds.indexOf("mouse")),this._activePointers.delete("mouse"),this._cancelUserSelectNoneOnBody();const t=new CustomEvent("pointerend",{bubbles:!0,composed:!0,detail:{pointerId:"mouse"}});this.dispatchEvent(t),this._requestPropagateValues(e)}_touchStart(e){e.preventDefault(),0===this._pointerIds.length&&(window.addEventListener("touchmove",this._touchMove,{passive:!1}),window.addEventListener("touchend",this._touchEnd),window.addEventListener("touchcancel",this._touchEnd),this._requestUserSelectNoneOnBody());for(let t of e.changedTouches){const e=t.identifier;this._pointerIds.push(e),this._activePointers.set(e,t)}this._requestPropagateValues(e)}_touchMove(e){e.preventDefault();for(let t of e.changedTouches){const e=t.identifier;-1!==this._pointerIds.indexOf(e)&&this._activePointers.set(e,t)}this._requestPropagateValues(e)}_touchEnd(e){for(let t of e.changedTouches){const e=t.identifier,n=this._pointerIds.indexOf(e);if(-1!==n){this._pointerIds.splice(n,1),this._activePointers.delete(e);const t=new CustomEvent("pointerend",{bubbles:!0,composed:!0,detail:{pointerId:e}});this.dispatchEvent(t)}}0===this._pointerIds.length&&(window.removeEventListener("touchmove",this._touchMove),window.removeEventListener("touchend",this._touchEnd),window.removeEventListener("touchcancel",this._touchEnd),this._cancelUserSelectNoneOnBody(e)),this._requestPropagateValues(e)}_requestPropagateValues(e){window.cancelAnimationFrame(this._rafId),this._rafId=window.requestAnimationFrame((()=>this._propagateValues(e)))}_propagateValues(e){const t=this.getBoundingClientRect(),n=this._pointerIds.map((e=>{const n=this._activePointers.get(e),i=n.clientX-t.left,r=this._px2x(i),a=n.clientY-t.top;return{x:r,y:this._px2y(a),pointerId:e}})),i=new CustomEvent("input",{bubbles:!0,composed:!0,detail:{value:n}});this.dispatchEvent(i)}}void 0===customElements.get("sc-position-surface")&&customElements.define("sc-position-surface",me);const ge=globalThis.performance&&globalThis.performance.now,he=ge?performance.now():Date.now();function Ee(){return ge?.001*(performance.now()-he):.001*(Date.now()-he)}globalThis.crossOriginIsolated||console.warn("[@ircam/sc-gettime] Your page is not Cross Origin Isolated. The accuracy of the clock may be reduced by the User-Agent to prevent finger-printing\n(see: https://web.dev/coop-coep/ for more informations)");class fe extends pe{static styles=o`
    :host {
      display: inline-block;
      width: 100%;
      height: 100%;
    }

    div {
      width: 100%;
      height: 100%;
    }
  `;constructor(){super(),this._pointerId=null,this._lastPointer=null,this._lastTime=null,this._mouseMove=this._mouseMove.bind(this),this._mouseUp=this._mouseUp.bind(this),this._touchStart=this._touchStart.bind(this),this._touchMove=this._touchMove.bind(this),this._touchEnd=this._touchEnd.bind(this),this._propagateValues=this._propagateValues.bind(this),this._rafId=null}render(){return G`
      <div
        @mousedown="${this._mouseDown}"
        @touchstart="${{handleEvent:this._touchStart,passive:!1}}"
        @contextmenu="${this._preventContextMenu}"
      ></div>
    `}_mouseDown(e){window.addEventListener("mousemove",this._mouseMove),window.addEventListener("mouseup",this._mouseUp),this._requestUserSelectNoneOnBody(),this._pointerId="mouse",this._lastTime=Ee(),this._lastPointer=e}_mouseMove(e){this._requestPropagateValues(e)}_mouseUp(e){window.removeEventListener("mousemove",this._mouseMove),window.removeEventListener("mouseup",this._mouseUp),this._cancelUserSelectNoneOnBody(),this._requestPropagateValues(e),setTimeout((()=>{this._pointerId=null,this._requestPropagateValues(e)}),20)}_touchStart(e){if(e.preventDefault(),null===this._pointerId){const t=e.changedTouches[0];this._pointerId=t.identifier,window.addEventListener("touchmove",this._touchMove,{passive:!1}),window.addEventListener("touchend",this._touchEnd),window.addEventListener("touchcancel",this._touchEnd),this._requestUserSelectNoneOnBody(),this._lastTime=Ee(),this._lastPointer=t}}_touchMove(e){e.preventDefault();for(let t of e.changedTouches)t.identifier===this._pointerId&&this._requestPropagateValues(t)}_touchEnd(e){for(let t of e.changedTouches)t.identifier===this._pointerId&&(window.removeEventListener("touchmove",this._touchMove),window.removeEventListener("touchend",this._touchEnd),window.removeEventListener("touchcancel",this._touchEnd),this._cancelUserSelectNoneOnBody(),this._requestPropagateValues(t),setTimeout((()=>{this._pointerId=null,this._requestPropagateValues(t)}),20))}_requestPropagateValues(e){window.cancelAnimationFrame(this._rafId),this._rafId=window.requestAnimationFrame((()=>this._propagateValues(e)))}_propagateValues(e){const t=this._lastPointer.screenX,n=this._lastPointer.screenY,i=e.screenX,r=e.screenY,a=Ee(),o=1e3*(this._lastTime-a),s=(i-t)/o,l=(r-n)/o;this._lastTime=a,this._lastPointer=e;const c=new CustomEvent("input",{bubbles:!0,composed:!0,detail:{dx:s,dy:l,pointerId:this._pointerId}});this.dispatchEvent(c)}}void 0===customElements.get("sc-speed-surface")&&customElements.define("sc-speed-surface",fe);class Se extends pe{static properties={active:{type:Boolean,reflect:!0},disabled:{type:Boolean,reflect:!0}};static styles=o`
    :host {
      display: inline-block;
      width: 30px;
      height: 30px;
      vertical-align: top;
      box-sizing: border-box;
      background-color: var(--sc-color-primary-2);
      border: 1px solid var(--sc-color-primary-3);
      font-size: 0;
      line-height: 0;
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      box-shadow: 0 0 2px var(--sc-color-primary-5);
    }

    svg {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }

    circle {
      stroke-width: 8px;
      stroke: var(--sc-color-primary-4);
      fill: var(--sc-color-primary-2);
    }

    circle.active {
      fill: var(--sc-color-primary-5);
      stroke: none;
    }
  `;constructor(){super(),this.active=!1,this.disabled=!1,this._timeoutId=null,this._triggerEvent=this._triggerEvent.bind(this)}render(){return this.active&&(clearTimeout(this._timeoutId),this._timeoutId=setTimeout((()=>this.active=!1),50)),G`
      <svg
        viewbox="0 0 100 100"
        @mousedown="${this._triggerEvent}"
        @touchstart="${{handleEvent:this._triggerEvent,passive:!1}}"
        @contextmenu="${this._preventContextMenu}"
      >
        <circle cx="50" cy="50" r="34" ></circle>
        ${this.active?Y`<circle class="active" cx="50" cy="50" r="20"></circle>`:V}
      </svg>
    `}connectedCallback(){super.connectedCallback(),this.hasAttribute("tabindex")||this.setAttribute("tabindex",0)}_triggerEvent(e){if(this.disabled)return;e.preventDefault(),this.focus();const t=new CustomEvent("input",{bubbles:!0,composed:!0,detail:{value:!0}});this.active=!0,this.dispatchEvent(t)}}void 0===customElements.get("sc-bang")&&customElements.define("sc-bang",Se);class be extends pe{static properties={value:{type:String,reflect:!0},midiValue:{type:Number},selected:{type:Boolean,reflect:!0},disabled:{type:Boolean,reflect:!0}};static styles=o`
    :host {
      vertical-align: top;
      display: inline-block;
      box-sizing: border-box;
      overflow: hidden;
      width: 200px;
      height: 30px;
      font-size: var(--sc-font-size);
      color: #ffffff;
      border-radius:  1px;
      border: 1px solid var(--sc-color-primary-3);

      --sc-button-selected: var(--sc-color-secondary-3);
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      box-shadow: 0 0 2px var(--sc-color-primary-5);
    }

    :host([selected]) {
      border: 1px solid var(--sc-button-selected);
    }

    button {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      font-family: var(--sc-font-family);
      background-color: var(--sc-color-primary-2);
      border: none;
      font-size: inherit;
      cursor: pointer;
      color: inherit;
    }

    /* remove default button focus */
    button:focus, button:focus-visible {
      outline: none;
    }

    button:hover {
      background-color: var(--sc-color-primary-3);
    }

    :host([disabled]) button:hover {
      background-color: var(--sc-color-primary-2);
      cursor: default;
    }

    /* use class because :active does not work in Firefox because of e.preventDefault(); */
    button.active {
      background-color: var(--sc-color-primary-4);
    }

    button.selected {
      background-color: var(--sc-button-selected);
    }

    :host([disabled]) button.selected:hover {
      background-color: var(--sc-button-selected);
      cursor: default;
    }
  `;set midiValue(e){if(this.disabled)return;const t=0===e?"release":"press";this._dispatchEvent(t)}constructor(){super(),this.value=null,this.selected=!1,this.disabled=!1,this._pressed=!1,this._onEvent=this._onEvent.bind(this)}render(){return G`
      <button
        tabindex="-1"
        class="${this.selected?"selected":""}"
        @mousedown="${this._onEvent}"
        @mouseup="${this._onEvent}"

        @touchstart="${{handleEvent:this._onEvent,passive:!1}}"
        @touchend="${this._onEvent}"
        @contextmenu="${this._preventContextMenu}"
      >
        <slot>${this.value}</slot>
      </button>
    `}connectedCallback(){super.connectedCallback(),this.hasAttribute("tabindex")||this.setAttribute("tabindex",0)}_onEvent(e){if(e.preventDefault(),this.disabled)return;const t="touchend"===e.type||"mouseup"===e.type?"release":"press";"release"===t?this.shadowRoot.querySelector("button").classList.remove("active"):this.shadowRoot.querySelector("button").classList.add("active"),this._dispatchEvent(t)}_dispatchEvent(e){if("release"===e&&!1===this._pressed)return;this._pressed="press"===e;const t=new CustomEvent(e,{bubbles:!0,composed:!0,detail:{value:this.value}});if(this.dispatchEvent(t),"press"===e){const e=new CustomEvent("input",{bubbles:!0,composed:!0,detail:{value:this.value}});this.dispatchEvent(e)}}}function ve(e,t,n){for(e+="";e.length<n;)e=t+e;return e}void 0===customElements.get("sc-button")&&customElements.define("sc-button",be);class Te extends pe{static properties={getTimeFunction:{type:Function,attribute:!1},twinkle:{type:Boolean,reflect:!0},format:{type:String,reflect:!0}};static styles=o`
    :host {
      vertical-align: top;
      display: inline-block;
      box-sizing: border-box;
      width: 200px;
      height: 30px;
      vertical-align: top;
      border-radius: 2px;
      font-size: var(--sc-font-size);
      font-family: var(--sc-font-family);
      background-color: var(--sc-color-primary-4);
      color: white;
      text-align: center;
    }

    div {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
    }

    .idle {
      opacity: 0.3;
    }

    .hidden {
      visibility: hidden;
    }
  `;get format(){return this._format}set format(e){this._showHours=!!/hh/.test(e),this._showMinutes=!!/mm/.test(e),this._showSeconds=!!/ss/.test(e),this._showMilliseconds=!!/ms/.test(e),this._format=e}constructor(){super(),this._currentTime={hours:null,minutes:null,seconds:null,millesconds:null},this._format=null,this._showHours=!1,this._showMinutes=!1,this._showSeconds=!1,this._showMilliseconds=!1;const e=60*(new Date).getTimezoneOffset();this.getTimeFunction=()=>Date.now()/1e3-e,this.twinkle=!1,this.format="hh:mm:ss:ms"}render(){const{time:e,twinkle:t,sign:n,hours:i,minutes:r,seconds:a,milliseconds:o}=this._currentTime,s=0===e;let l=[];return this._showHours&&l.push(G`<span>${i}</span>`),this._showMinutes&&l.push(G`<span>${r}</span>`),this._showSeconds&&l.push(G`<span>${a}</span>`),this._showMilliseconds&&l.push(G`<span>${o}</span>`),l=l.flatMap((e=>[e,G`<span class="${t?"hidden":""}">:</span>`])).slice(0,-1),G`
      <div class="${s?"idle":""}">
        ${n?G`<span>${n}</span>`:V}
        ${l}
      </div>
    `}_getFormattedInfos(){const e=this.getTimeFunction();let t,n;e>=0?(t="",n=Math.abs(Math.floor(e))):(t="-",n=Math.abs(Math.ceil(e)));const i=Math.floor(n/3600),r=Math.floor((n-3600*i)/60),a=n-3600*i-60*r,o=Math.abs(e)-n,s=Math.floor(1e3*o);return{time:e,sign:t,hours:ve(i%24,"0",2),minutes:ve(r,"0",2),seconds:ve(a,"0",2),milliseconds:ve(s,"0",3)}}_render(){const e=this._getFormattedInfos();let t=!1;this._currentTime.sign!==e.sign&&(t=!0),this._showHours&&this._currentTime.hours!==e.hours&&(t=!0),this._showMinutes&&this._currentTime.minutes!==e.minutes&&(t=!0),this._showSeconds&&this._currentTime.seconds!==e.seconds&&(t=!0),this._showMilliseconds&&this._currentTime.milliseconds!==e.milliseconds&&(t=!0),e.twinkle=!1;const n=parseInt(e.milliseconds)/1e3;this.twinkle&&n>=.5&&n<1&&(e.twinkle=!0),this._currentTime.twinkle!==e.twinkle&&(t=!0),t&&(this._currentTime=e,this.requestUpdate()),this._rafId=requestAnimationFrame((()=>this._render()))}connectedCallback(){super.connectedCallback(),this._render()}disconnectedCallback(){cancelAnimationFrame(this._timeoutInterval),super.disconnectedCallback()}}void 0===customElements.get("sc-clock")&&customElements.define("sc-clock",Te);const Ce=e=>(...t)=>({_$litDirective$:e,values:t});class ye{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}class Re extends ye{constructor(e){if(super(e),this.et=V,2!==e.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===V||null==e)return this.ft=void 0,this.et=e;if(e===H)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.et)return this.ft;this.et=e;const t=[e];return t.raw=t,this.ft={_$litType$:this.constructor.resultType,strings:t,values:[]}}}Re.directiveName="unsafeHTML",Re.resultType=1;const Ne=Ce(Re),Oe=n(8128);class Ae extends pe{static properties={language:{type:String,reflect:!0}};static styles=o`
    :host {
      vertical-align: top;
      display: block;
      box-sizing: border-box;
      vertical-align: top;
      font-size: 0;
      font-size: var(--sc-font-size);
      font-family: var(--sc-font-family);
      border-radius: 2px;
      background-color: #23241f;
    }

    pre, code {
      border-radius: inherit;
    }

    /* highlight.js monokai theme */
    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#23241f;color:#f8f8f2}.hljs-subst,.hljs-tag{color:#f8f8f2}.hljs-emphasis,.hljs-strong{color:#a8a8a2}.hljs-bullet,.hljs-link,.hljs-literal,.hljs-number,.hljs-quote,.hljs-regexp{color:#ae81ff}.hljs-code,.hljs-section,.hljs-selector-class,.hljs-title{color:#a6e22e}.hljs-strong{font-weight:700}.hljs-emphasis{font-style:italic}.hljs-attr,.hljs-keyword,.hljs-name,.hljs-selector-tag{color:#f92672}.hljs-attribute,.hljs-symbol{color:#66d9ef}.hljs-class .hljs-title,.hljs-params,.hljs-title.class_{color:#f8f8f2}.hljs-addition,.hljs-built_in,.hljs-selector-attr,.hljs-selector-id,.hljs-selector-pseudo,.hljs-string,.hljs-template-variable,.hljs-type,.hljs-variable{color:#e6db74}.hljs-comment,.hljs-deletion,.hljs-meta{color:#75715e}
  `;constructor(){super(),this.language="javascript"}render(){let e="";try{e=Oe.highlight(this.textContent.trim(),{language:this.language}).value}catch(t){e=t.message}return G`
      <pre><code class="hljs ${this.language?`language-${this.language}`:""}">${Ne(e)}</pre></code>
    `}}function Ie(e,t){const n=(t[1]-t[0])/(e[1]-e[0]),i=t[0]-n*e[0];function r(e){return n*e+i}return r.invert=function(e){return(e-i)/n},r}function xe(e,t,n,i){const r=(i-90)*Math.PI/180;return{x:e+n*Math.cos(r),y:t+n*Math.sin(r)}}function De(e,t,n,i,r){const a=xe(e,t,n,r),o=xe(e,t,n,i),s=r-i<=180?"0":"1";return["M",a.x,a.y,"A",n,n,0,s,0,o.x,o.y].join(" ")}void 0===customElements.get("sc-code-example")&&customElements.define("sc-code-example",Ae);class we extends pe{static properties={min:{type:Number,reflect:!0},max:{type:Number,reflect:!0},value:{type:Number},unit:{type:String,reflect:!0},showValue:{type:Boolean,reflect:!0,attribute:"show-value"},disabled:{type:Boolean,reflect:!0}};static styles=o`
    :host {
      display: inline-block;
      width: 50px;
      height: 50px;
      vertical-align: top;
      box-sizing: border-box;
      background-color: var(--sc-color-primary-2);
      font-size: 0;
      line-height: 0;
      position: relative;

      --sc-dial-color: var(--sc-color-secondary-1);
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      box-shadow: 0 0 2px var(--sc-color-primary-5);
    }

    path.bg {
      stroke: #fff;
      stroke-width: 3px;
      fill: transparent;
    }

    path.fg {
      stroke: var(--sc-dial-color);
      stroke-width: 4px;
      fill: transparent;
    }

    line {
      stroke-width: 3px;
      stroke: var(--sc-dial-color);
      stroke-linecap: butt;
    }

    sc-speed-surface {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    p {
      position: absolute;
      bottom: 2px;
      left: 0;
      width: 100%;
      height: 12px;
      line-height: 12px;
      color: var(--sc-color-primary-5);
      font-size: 8px;
      margin: 0;
      text-align: center;
      user-select: none
    }
  `;get min(){return this._min}set min(e){e===this.max&&(e-=1e-10),this._min=e,this.value=this.value,this._updateScales(),this.requestUpdate()}get max(){return this._max}set max(e){e===this.min&&(e+=1e-10),this._max=e,this.value=this.value,this._updateScales(),this.requestUpdate()}get value(){return this._value}set value(e){this._value=Math.max(this.min,Math.min(this.max,e)),this.requestUpdate()}constructor(){super(),this._min=0,this._max=0,this._value=0,this._minAngle=-140,this._maxAngle=140,this.max=1,this.min=0,this.value=0,this.showValue=!0,this.disabled=!1}render(){const e=this.showValue?42:50,t=this._valueToAngleScale(this.value),n=xe(50,e,34,t);return G`
      <div
        @contextmenu=${this._preventContextMenu}
        @dblclick=${this._resetValue}
        @keydown=${this._onKeypress}
        @keyup=${this._onKeyup}
      >
        <svg viewbox="0 0 100 100">
          <path
            class="bg"
            d="${De(50,e,32,Math.min(this._maxAngle,t+8),this._maxAngle)}"
          />
          <path
            class="fg"
            d="${De(50,e,32,this._minAngle,t)}"
          />
          <line x1=${50} y1=${e} x2=${n.x} y2=${n.y} />
        </svg>
        ${this.showValue?G`<p>${this.value.toFixed(2)}${this.unit?` ${this.unit}`:V}</p>`:V}

        <sc-speed-surface @input=${this._updateValue}></sc-speed-surface>
      </div>
    `}connectedCallback(){super.connectedCallback(),this.hasAttribute("tabindex")||this.setAttribute("tabindex",0)}_updateScales(){this._valueToAngleScale=Ie([this.min,this.max],[this._minAngle,this._maxAngle]),this._pixelToDiffScale=Ie([0,15],[0,this.max-this.min])}_onKeypress(e){console.log(e.key.code)}_onKeyup(e){console.log(e.key.code)}_resetValue(e){e.preventDefault(),e.stopPropagation(),this.disabled||(this.value=this.min,["input","change"].forEach((e=>{const t=new CustomEvent(e,{bubbles:!0,composed:!0,detail:{value:this.value}});this.dispatchEvent(t)})))}_updateValue(e){if(e.preventDefault(),e.stopPropagation(),!this.disabled)if(null!==e.detail.pointerId){if(Math.abs(e.detail.dy)<.02)return;this._value,e.detail.dy;const t=this._pixelToDiffScale(e.detail.dy);this.value+=t;const n=new CustomEvent("input",{bubbles:!0,composed:!0,detail:{value:this.value}});this.dispatchEvent(n)}else{const e=new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:this.value}});this.dispatchEvent(e)}}}void 0===customElements.get("sc-dial")&&customElements.define("sc-dial",we);const{I:Me}=ie,Le=()=>document.createComment(""),ke=(e,t,n)=>{var i;const r=e._$AA.parentNode,a=void 0===t?e._$AB:t._$AA;if(void 0===n){const t=r.insertBefore(Le(),a),i=r.insertBefore(Le(),a);n=new Me(t,i,e,e.options)}else{const t=n._$AB.nextSibling,o=n._$AM,s=o!==e;if(s){let t;null===(i=n._$AQ)||void 0===i||i.call(n,e),n._$AM=e,void 0!==n._$AP&&(t=e._$AU)!==o._$AU&&n._$AP(t)}if(t!==a||s){let e=n._$AA;for(;e!==t;){const t=e.nextSibling;r.insertBefore(e,a),e=t}}}return n},Pe=(e,t,n=e)=>(e._$AI(t,n),e),Fe={},Ue=e=>{var t;null===(t=e._$AP)||void 0===t||t.call(e,!1,!0);let n=e._$AA;const i=e._$AB.nextSibling;for(;n!==i;){const e=n.nextSibling;n.remove(),n=e}},Be=(e,t,n)=>{const i=new Map;for(let r=t;r<=n;r++)i.set(e[r],r);return i},Ge=Ce(class extends ye{constructor(e){if(super(e),2!==e.type)throw Error("repeat() can only be used in text expressions")}dt(e,t,n){let i;void 0===n?n=t:void 0!==t&&(i=t);const r=[],a=[];let o=0;for(const t of e)r[o]=i?i(t,o):o,a[o]=n(t,o),o++;return{values:a,keys:r}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,i]){var r;const a=(e=>e._$AH)(e),{values:o,keys:s}=this.dt(t,n,i);if(!Array.isArray(a))return this.ht=s,o;const l=null!==(r=this.ht)&&void 0!==r?r:this.ht=[],c=[];let d,_,u=0,p=a.length-1,m=0,g=o.length-1;for(;u<=p&&m<=g;)if(null===a[u])u++;else if(null===a[p])p--;else if(l[u]===s[m])c[m]=Pe(a[u],o[m]),u++,m++;else if(l[p]===s[g])c[g]=Pe(a[p],o[g]),p--,g--;else if(l[u]===s[g])c[g]=Pe(a[u],o[g]),ke(e,c[g+1],a[u]),u++,g--;else if(l[p]===s[m])c[m]=Pe(a[p],o[m]),ke(e,a[u],a[p]),p--,m++;else if(void 0===d&&(d=Be(s,m,g),_=Be(l,u,p)),d.has(l[u]))if(d.has(l[p])){const t=_.get(s[m]),n=void 0!==t?a[t]:null;if(null===n){const t=ke(e,a[u]);Pe(t,o[m]),c[m]=t}else c[m]=Pe(n,o[m]),ke(e,a[u],n),a[t]=null;m++}else Ue(a[p]),p--;else Ue(a[u]),u++;for(;m<=g;){const t=ke(e,c[g+1]);Pe(t,o[m]),c[m++]=t}for(;u<=p;){const e=a[u++];null!==e&&Ue(e)}return this.ht=s,((e,t=Fe)=>{e._$AH=t})(e,c),H}});class Ye extends se{static properties={value:{type:Array,attribute:!1,hasChanged:(e,t)=>!0},xRange:{type:Array,attribute:"x-range"},yRange:{type:Array,attribute:"y-range"},radius:{type:Number,attribute:"radius",reflect:!0},radiusRelative:{type:Number,attribute:"radius-relative",reflect:!0},captureEvents:{type:Boolean,attribute:"capture-events"},persistEvents:{type:Boolean,attribute:"persist-events"}};static get styles(){return o`
      :host {
        display: inline-block;
        box-sizing: border-box;
        position: relative;
        line-height: 0;
        vertical-align: top;
        width: 300px;
        height: 300px;

        --sc-dots-opacity: 1;
        --sc-dots-color: var(--sc-color-secondary-2);
        --sc-dots-background-color: var(--sc-color-primary-1);
        --sc-dots-background-image: none;
      }

      :host(.debug) {
        outline: 1px solid yellow;
      }

      :host(.debug) sc-position-surface {
        outline: 1px dashed blue;
      }

      :host(.debug) svg {
        outline: 1px dotted red;
      }

      sc-position-surface {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }

      svg {
        position: relative;
        background-color: var(--sc-dots-background-color);
        background-image: var(--sc-dots-background-image);
        background-size: contain;
        background-position: 50% 50%;
        background-repeat: no-repeat;
      }

      circle {
        pointer-event: none;
        fill-opacity: var(--sc-dots-opacity);
        fill: var(--sc-dots-color);
      }
    `}constructor(){super(),this.value=[],this.xRange=[0,1],this.yRange=[0,1],this.radius=null,this.radiusRelative=null,this.captureEvents=!1,this.persistEvents=!1,this._defaultRadius=5,this._resizeObserver=null,this._x2px=null,this._y2px=null,this._radius2px=null,this._width=null,this._height=null,this._svgWidth=null,this._svgHeight=null}update(e){(e.has("xRange")||e.has("yRange"))&&this._updateScales(),super.update(e)}render(){let e=this._defaultRadius;return this.radius?e=this.radius:this.radiusRelative&&(e=this._radius2px(this.radiusRelative)),G`
      ${this.captureEvents?G`
          <sc-position-surface
            style="
              width: ${this._svgWidth}px;
              height: ${this._svgHeight}px;
              left: ${(this._width-this._svgWidth)/2}px;
              top: ${(this._height-this._svgHeight)/2}px;
            "
            x-range="${JSON.stringify(this.xRange)}"
            y-range="${JSON.stringify(this.yRange)}"
            @input="${this._updatePositions}"
          ></sc-position-surface>
        `:""}
      <svg
        style="
          width: ${this._svgWidth}px;
          height: ${this._svgHeight}px;
          left: ${(this._width-this._svgWidth)/2}px;
          top: ${(this._height-this._svgHeight)/2}px;
        "
        viewBox="0 0 ${this._svgWidth} ${this._svgHeight}"
      >
        ${Ge(this.value,(e=>`${e.x}-${e.y}`),(t=>Y`<circle
            r="${e}"
            cx="${this._x2px(t.x)}"
            cy="${this._y2px(t.y)}"
            style="${t.color?`fill: ${t.color}`:""}"
          ></circle>`))}
      </svg>
    `}connectedCallback(){super.connectedCallback(),this._resizeObserver=new ResizeObserver((e=>this._updateScales())),this._resizeObserver.observe(this)}disconnectedCallback(){this._resizeObserver.disconnect(),super.disconnectedCallback()}_updateScales(){const{width:e,height:t}=this.getBoundingClientRect(),n=Math.abs(this.xRange[1]-this.xRange[0]),i=Math.abs(this.yRange[1]-this.yRange[0]);let r,a;n/i>e/t?(r=e,a=n):(r=t,a=i),this._svgWidth=r/a*n,this._svgHeight=r/a*i,this._width=e,this._height=t;{const e=this._svgWidth/(this.xRange[1]-this.xRange[0]),t=-this.xRange[0]*e;this._x2px=n=>e*n+t}{const e=this._svgHeight/(this.yRange[1]-this.yRange[0]),t=-this.yRange[0]*e;this._y2px=n=>e*n+t}{const e=Math.abs(this._svgHeight/(this.yRange[1]-this.yRange[0]));this._radius2px=t=>e*t}this.requestUpdate()}_updatePositions(e){if(e.stopPropagation(),this.persistEvents&&0===e.detail.value.length)return;const t=e.detail.value.map((e=>{const t=Math.min(this.xRange[0],this.xRange[1]),n=Math.max(this.xRange[0],this.xRange[1]),i=Math.min(this.yRange[0],this.yRange[1]),r=Math.max(this.yRange[0],this.yRange[1]);return{x:Math.min(n,Math.max(t,e.x)),y:Math.min(r,Math.max(i,e.y))}}));this.value=t;const n=new CustomEvent("input",{bubbles:!0,composed:!0,detail:{value:this.value}});this.dispatchEvent(n),this.requestUpdate()}}void 0===customElements.get("sc-dots")&&customElements.define("sc-dots",Ye);const He={};He.question=G`
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
  <g>
    <path fill="white" d="M500,9.9c270.1,0,490.5,220.6,490,490.3c-0.5,270.7-220.6,490.6-490.3,489.9C229.2,989.4,10.4,770.5,10,500.1C9.6,230.3,229.9,9.9,500,9.9z M943.7,499.9c0-244.4-198-443-443.5-443.5C255.5,55.9,56.6,254.5,56.3,499.9c-0.3,244.4,198.3,442.9,443.4,443.6C743.8,944.2,943.8,744.5,943.7,499.9z M527.3,658.3c-20.9,0-41.3,0-62.2,0c0-12.4-0.7-24.6,0.1-36.7c1.6-24.4,7.3-47.9,20-69.2c9.9-16.6,22.6-30.9,36.7-44c17.5-16.3,35.1-32.4,52.3-49.1c10.1-9.8,19-20.8,23.7-34.4c11.2-32.7,4-61.8-17.7-87.8c-36.1-43.1-96.4-44.6-133.4-23c-23.3,13.6-37.3,34.4-45.4,59.5c-3.7,11.2-6.2,22.8-9.5,35.1c-21.5-2.5-43.5-5.2-66.3-7.9c0.9-5.7,1.5-11,2.5-16.3c5.7-29.6,15.9-57.2,35.3-80.8c23.5-28.8,54.2-45.6,90.3-52.5c37.7-7.2,75.3-6.5,112,5.5c46.9,15.2,81.6,45,97.4,92.4c15.1,45.5,7.7,88.5-22.1,127c-18.9,24.4-42.4,44.2-64.5,65.4c-9.7,9.3-19.6,18.7-28,29.2c-12.5,15.5-17.3,34.3-18.8,53.9C528.6,635.5,528.1,646.6,527.3,658.3z M461,790c0-24.6,0-48.9,0-73.7c24.6,0,49,0,73.7,0c0,24.5,0,48.9,0,73.7C510.3,790,485.8,790,461,790z" />
  </g>
</svg>`,He.info=G`
<svg viewbox="0 0 23.7 23.7" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"
>
  <path fill="#fff" d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm.5 17h-1v-9h1v9zm-.5-12c.466 0 .845.378.845.845 0 .466-.379.844-.845.844-.466 0-.845-.378-.845-.844 0-.467.379-.845.845-.845z"/>
</svg>
`,He.github=G`
<svg viewbox="0 0 98 98" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#fff"/>
</svg>
`,He.burger=G`
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g>
<path d="M3 6H21M3 12H21M3 18H21" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>
`,He.gear=G`
<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"  xml:space="preserve">
  <style type="text/css">
    .st0{fill:#ffffff;}
  </style>
  <g>
    <path class="st0" d="M499.139,318.571l-37.178-5.407c-2.329-0.178-4.336-1.642-5.228-3.8l-12.054-29.086
      c-0.901-2.15-0.526-4.613,1-6.379l22.243-29.88c3.533-4.141,3.301-10.314-0.554-14.168l-17.602-17.594
      c-3.846-3.854-10.029-4.104-14.159-0.553l-29.889,22.233c-1.758,1.518-4.238,1.91-6.38,1.018l-29.094-12.062
      c-2.151-0.883-3.622-2.926-3.81-5.228l-5.389-37.169c-0.428-5.442-4.96-9.635-10.402-9.635h-24.893
      c-5.45,0-9.983,4.193-10.402,9.635l-5.407,37.169c-0.17,2.32-1.642,4.345-3.792,5.228l-29.103,12.062
      c-2.151,0.892-4.613,0.5-6.388-1.018l-29.872-22.233c-4.13-3.542-10.304-3.302-14.167,0.553l-17.594,17.594
      c-3.854,3.854-4.086,10.028-0.554,14.168l22.234,29.888c1.508,1.758,1.91,4.229,1.009,6.371l-12.054,29.086
      c-0.874,2.159-2.908,3.622-5.219,3.81l-37.195,5.398c-5.425,0.429-9.618,4.961-9.618,10.412v24.883
      c0,5.442,4.194,9.993,9.618,10.403l37.195,5.398c2.311,0.188,4.345,1.659,5.219,3.81l12.054,29.086
      c0.901,2.159,0.5,4.63-1.009,6.388l-22.234,29.889c-3.533,4.14-3.301,10.295,0.554,14.168l17.594,17.594
      c3.863,3.854,10.037,4.086,14.167,0.544l29.872-22.243c1.775-1.498,4.237-1.9,6.388-0.998l29.103,12.044
      c2.151,0.902,3.622,2.918,3.802,5.246l5.398,37.169c0.428,5.433,4.952,9.636,10.402,9.636h24.893c5.451,0,9.974-4.203,10.402-9.636
      l5.389-37.169c0.188-2.328,1.659-4.344,3.81-5.246l29.103-12.044c2.142-0.902,4.622-0.5,6.379,0.998l29.881,22.243
      c4.13,3.542,10.314,3.31,14.159-0.544l17.602-17.594c3.864-3.873,4.087-10.028,0.554-14.168l-22.243-29.889
      c-1.499-1.758-1.9-4.229-1-6.388l12.054-29.086c0.892-2.151,2.899-3.622,5.228-3.81l37.178-5.398
      c5.434-0.41,9.627-4.961,9.627-10.403v-24.883C508.766,323.532,504.573,319,499.139,318.571z M379.093,382.328
      c-10.93,10.912-25.445,16.926-40.898,16.926c-15.444,0-29.978-6.014-40.898-16.926c-10.92-10.938-16.943-25.454-16.943-40.907
      c0-15.444,6.022-29.969,16.943-40.89c10.92-10.939,25.454-16.934,40.898-16.934c15.454,0,29.969,5.995,40.898,16.934
      c10.92,10.92,16.934,25.446,16.934,40.89C396.027,356.874,390.014,371.39,379.093,382.328z"/>
    <path class="st0" d="M187.351,252.156c4.032-1.445,6.254-5.746,5.122-9.868l-5.898-28.854c-0.472-1.767,0.072-3.649,1.419-4.88
      l18.263-16.621c1.338-1.222,3.284-1.588,4.97-0.946l27.961,8.466c3.989,1.508,8.485-0.294,10.306-4.166l8.297-17.656
      c1.837-3.881,0.366-8.485-3.346-10.591l-24.339-16.14c-1.58-0.91-2.535-2.632-2.436-4.452l1.16-24.66
      c0.098-1.829,1.186-3.444,2.838-4.194l26.008-13.874c3.898-1.74,5.781-6.218,4.336-10.215l-6.603-18.371
      c-1.454-4.024-5.755-6.254-9.876-5.121l-28.863,5.879c-1.767,0.5-3.632-0.053-4.871-1.41L195.185,56.23
      c-1.24-1.357-1.614-3.265-0.955-4.978l8.468-27.944c1.507-4.006-0.294-8.494-4.175-10.306l-17.648-8.306
      c-3.872-1.821-8.494-0.366-10.608,3.354l-16.131,24.34c-0.902,1.58-2.623,2.533-4.444,2.445l-24.66-1.169
      c-1.82-0.08-3.462-1.205-4.202-2.847L106.974,4.821c-1.758-3.898-6.219-5.782-10.234-4.336L78.379,7.096
      c-4.024,1.446-6.254,5.738-5.112,9.859l5.888,28.872c0.482,1.748-0.062,3.64-1.418,4.862l-18.264,16.63
      c-1.356,1.222-3.274,1.597-4.987,0.955l-27.944-8.476c-3.988-1.516-8.476,0.304-10.305,4.175L7.939,81.622
      c-1.82,3.872-0.366,8.494,3.346,10.599l24.339,16.14c1.588,0.902,2.534,2.615,2.436,4.435l-1.16,24.66
      c-0.071,1.838-1.187,3.444-2.837,4.193L8.055,155.522c-3.9,1.749-5.782,6.219-4.336,10.216l6.611,18.37
      c1.445,4.024,5.746,6.254,9.859,5.131l28.881-5.906c1.749-0.482,3.64,0.071,4.862,1.427l16.612,18.255
      c1.24,1.356,1.598,3.283,0.954,4.987l-8.466,27.944c-1.499,3.997,0.304,8.485,4.175,10.305l17.648,8.297
      c3.881,1.829,8.493,0.357,10.608-3.346l16.122-24.348c0.91-1.57,2.623-2.534,4.452-2.428l24.661,1.16
      c1.829,0.09,3.453,1.178,4.211,2.846l13.847,25.989c1.767,3.9,6.219,5.8,10.233,4.354L187.351,252.156z M148.229,172.296
      c-11.394,4.095-23.714,3.524-34.68-1.633c-10.965-5.157-19.245-14.275-23.358-25.678c-4.095-11.402-3.524-23.714,1.634-34.67
      c5.156-10.974,14.283-19.254,25.677-23.357c11.402-4.105,23.714-3.534,34.67,1.641c10.956,5.139,19.254,14.258,23.366,25.66
      c4.096,11.403,3.516,23.706-1.632,34.672C168.731,159.886,159.621,168.183,148.229,172.296z"/>
  </g>
</svg>
`,He.save=G`
<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path id="Combined Shape" fill-rule="evenodd" clip-rule="evenodd" d="M35.2822 4.88487C34.7186 4.31826 33.9535 4 33.1551 4H6.99915C5.34286 4 3.99915 5.34372 3.99915 7V41C3.99915 42.6563 5.34286 44 6.99915 44H40.9991C42.6569 44 43.9991 42.6568 43.9991 41V14.888C43.9991 14.095 43.6861 13.3357 43.1261 12.7728L35.2822 4.88487ZM6.99915 6H12.9999V15.9508C12.9999 17.0831 13.9197 18.0028 15.0519 18.0028H32.9479C34.0802 18.0028 34.9999 17.0831 34.9999 15.9508V11.2048C34.9999 10.6525 34.5522 10.2048 33.9999 10.2048C33.4477 10.2048 32.9999 10.6525 32.9999 11.2048V15.9508C32.9999 15.9785 32.9757 16.0028 32.9479 16.0028H15.0519C15.0242 16.0028 14.9999 15.9785 14.9999 15.9508V6H33.1551C33.4211 6 33.6759 6.10599 33.8642 6.29523L41.7081 14.1831C41.8952 14.3712 41.9991 14.6234 41.9991 14.888V41C41.9991 41.5526 41.552 42 40.9991 42H6.99915C6.44743 42 5.99915 41.5517 5.99915 41V7C5.99915 6.44828 6.44743 6 6.99915 6ZM27.9999 30.0206C27.9999 27.8121 26.2089 26.0206 23.9999 26.0206C23.4477 26.0206 22.9999 25.5729 22.9999 25.0206C22.9999 24.4683 23.4477 24.0206 23.9999 24.0206C27.3136 24.0206 29.9999 26.7077 29.9999 30.0206C29.9999 33.3349 27.3142 36.0206 23.9999 36.0206C20.6857 36.0206 17.9999 33.3349 17.9999 30.0206C17.9999 29.4683 18.4477 29.0206 18.9999 29.0206C19.5522 29.0206 19.9999 29.4683 19.9999 30.0206C19.9999 32.2303 21.7902 34.0206 23.9999 34.0206C26.2097 34.0206 27.9999 32.2303 27.9999 30.0206Z" fill="#ffffff"/>
</svg>
`;const Ve=He;class ze extends pe{static properties={icon:{type:String,reflect:!0},href:{type:String,reflect:!0},value:{type:String,reflect:!0},disabled:{type:Boolean,reflect:!0}};static styles=o`
    :host {
      vertical-align: top;
      display: inline-block;
      box-sizing: border-box;
      overflow: hidden;
      width: 30px;
      height: 30px;
      border: 1px solid var(--sc-color-primary-3);
      background-color: var(--sc-color-primary-2);
      cursor: pointer;
    }

    :host([disabled]) {
      opacity: 0.7;
      cursor: default;
    }

    :host([hidden]) {
      display: none;
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      box-shadow: 0 0 2px var(--sc-color-primary-5);
    }


    div {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    div:active {
      opacity: 0.7;
    }

    :host([disabled]) div:active {
      opacity: 1;
    }

    a {
      box-sizing: border-box;
      display: block;
      width: 100%;
      height: 100%;
    }

    svg {
      box-sizing: border-box;
      padding: 3px;
      width: 100%;
      height: 100%;
    }
  `;constructor(){super(),this.icon="question",this.value=null,this.href=null,this.disabled=!1,this._pressed=!1,this._onEvent=this._onEvent.bind(this)}render(){let e;return e=null===this.href||""===this.href||this.disabled?Ve[this.icon]:G`
        <a href="${this.href}" target="_blank">
          ${Ve[this.icon]}
        </a>
      `,G`
      <div
        @mousedown="${this._onEvent}"
        @mouseup="${this._onEvent}"
        @touchstart="${{handleEvent:this._onEvent,passive:!1}}"
        @touchend="${this._onEvent}"
        @contextmenu="${this._preventContextMenu}"
      >
        ${e}
      </div>
    `}connectedCallback(){super.connectedCallback(),this.hasAttribute("tabindex")||this.setAttribute("tabindex",0)}_onEvent(e){if(e.preventDefault(),this.disabled)return;const t="touchend"===e.type||"mouseup"===e.type?"release":"press";if("release"===t&&!1===this._pressed)return;this._pressed="press"===t;const n=new CustomEvent(t,{bubbles:!0,composed:!0,detail:{value:this.value}});if(this.dispatchEvent(n),"press"===t){const e=new CustomEvent("input",{bubbles:!0,composed:!0,detail:{value:this.value}});this.dispatchEvent(e)}}}void 0===customElements.get("sc-icon")&&customElements.define("sc-icon",ze);var $e=n(4631);n(6876),n(9350),n(1699),n(2095),n(4568),n(5292),n(4504);const qe=o`
/* BASICS */

.CodeMirror {
  /* Set height, width, borders, and global font properties here */
  font-family: monospace;
  height: 300px;
  color: black;
  direction: ltr;
}

/* PADDING */

.CodeMirror-lines {
  padding: 4px 0; /* Vertical padding around content */
}
.CodeMirror pre.CodeMirror-line,
.CodeMirror pre.CodeMirror-line-like {
  padding: 0 4px; /* Horizontal padding of content */
}

.CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {
  background-color: white; /* The little square between H and V scrollbars */
}

/* GUTTER */

.CodeMirror-gutters {
  border-right: 1px solid #ddd;
  background-color: #f7f7f7;
  white-space: nowrap;
}
.CodeMirror-linenumbers {}
.CodeMirror-linenumber {
  padding: 0 3px 0 5px;
  min-width: 20px;
  text-align: right;
  color: #999;
  white-space: nowrap;
}

.CodeMirror-guttermarker { color: black; }
.CodeMirror-guttermarker-subtle { color: #999; }

/* CURSOR */

.CodeMirror-cursor {
  border-left: 1px solid black;
  border-right: none;
  width: 0;
}
/* Shown when moving in bi-directional text */
.CodeMirror div.CodeMirror-secondarycursor {
  border-left: 1px solid silver;
}
.cm-fat-cursor .CodeMirror-cursor {
  width: auto;
  border: 0 !important;
  background: #7e7;
}
.cm-fat-cursor div.CodeMirror-cursors {
  z-index: 1;
}
.cm-fat-cursor .CodeMirror-line::selection,
.cm-fat-cursor .CodeMirror-line > span::selection, 
.cm-fat-cursor .CodeMirror-line > span > span::selection { background: transparent; }
.cm-fat-cursor .CodeMirror-line::-moz-selection,
.cm-fat-cursor .CodeMirror-line > span::-moz-selection,
.cm-fat-cursor .CodeMirror-line > span > span::-moz-selection { background: transparent; }
.cm-fat-cursor { caret-color: transparent; }
@-moz-keyframes blink {
  0% {}
  50% { background-color: transparent; }
  100% {}
}
@-webkit-keyframes blink {
  0% {}
  50% { background-color: transparent; }
  100% {}
}
@keyframes blink {
  0% {}
  50% { background-color: transparent; }
  100% {}
}

/* Can style cursor different in overwrite (non-insert) mode */
.CodeMirror-overwrite .CodeMirror-cursor {}

.cm-tab { display: inline-block; text-decoration: inherit; }

.CodeMirror-rulers {
  position: absolute;
  left: 0; right: 0; top: -50px; bottom: 0;
  overflow: hidden;
}
.CodeMirror-ruler {
  border-left: 1px solid #ccc;
  top: 0; bottom: 0;
  position: absolute;
}

/* DEFAULT THEME */

.cm-s-default .cm-header {color: blue;}
.cm-s-default .cm-quote {color: #090;}
.cm-negative {color: #d44;}
.cm-positive {color: #292;}
.cm-header, .cm-strong {font-weight: bold;}
.cm-em {font-style: italic;}
.cm-link {text-decoration: underline;}
.cm-strikethrough {text-decoration: line-through;}

.cm-s-default .cm-keyword {color: #708;}
.cm-s-default .cm-atom {color: #219;}
.cm-s-default .cm-number {color: #164;}
.cm-s-default .cm-def {color: #00f;}
.cm-s-default .cm-variable,
.cm-s-default .cm-punctuation,
.cm-s-default .cm-property,
.cm-s-default .cm-operator {}
.cm-s-default .cm-variable-2 {color: #05a;}
.cm-s-default .cm-variable-3, .cm-s-default .cm-type {color: #085;}
.cm-s-default .cm-comment {color: #a50;}
.cm-s-default .cm-string {color: #a11;}
.cm-s-default .cm-string-2 {color: #f50;}
.cm-s-default .cm-meta {color: #555;}
.cm-s-default .cm-qualifier {color: #555;}
.cm-s-default .cm-builtin {color: #30a;}
.cm-s-default .cm-bracket {color: #997;}
.cm-s-default .cm-tag {color: #170;}
.cm-s-default .cm-attribute {color: #00c;}
.cm-s-default .cm-hr {color: #999;}
.cm-s-default .cm-link {color: #00c;}

.cm-s-default .cm-error {color: #f00;}
.cm-invalidchar {color: #f00;}

.CodeMirror-composing { border-bottom: 2px solid; }

/* Default styles for common addons */

div.CodeMirror span.CodeMirror-matchingbracket {color: #0b0;}
div.CodeMirror span.CodeMirror-nonmatchingbracket {color: #a22;}
.CodeMirror-matchingtag { background: rgba(255, 150, 0, .3); }
.CodeMirror-activeline-background {background: #e8f2ff;}

/* STOP */

/* The rest of this file contains styles related to the mechanics of
   the editor. You probably shouldn't touch them. */

.CodeMirror {
  position: relative;
  overflow: hidden;
  background: white;
}

.CodeMirror-scroll {
  overflow: scroll !important; /* Things will break if this is overridden */
  /* 50px is the magic margin used to hide the element's real scrollbars */
  /* See overflow: hidden in .CodeMirror */
  margin-bottom: -50px; margin-right: -50px;
  padding-bottom: 50px;
  height: 100%;
  outline: none; /* Prevent dragging from highlighting the element */
  position: relative;
  z-index: 0;
}
.CodeMirror-sizer {
  position: relative;
  border-right: 50px solid transparent;
}

/* The fake, visible scrollbars. Used to force redraw during scrolling
   before actual scrolling happens, thus preventing shaking and
   flickering artifacts. */
.CodeMirror-vscrollbar, .CodeMirror-hscrollbar, .CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {
  position: absolute;
  z-index: 6;
  display: none;
  outline: none;
}
.CodeMirror-vscrollbar {
  right: 0; top: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
.CodeMirror-hscrollbar {
  bottom: 0; left: 0;
  overflow-y: hidden;
  overflow-x: scroll;
}
.CodeMirror-scrollbar-filler {
  right: 0; bottom: 0;
}
.CodeMirror-gutter-filler {
  left: 0; bottom: 0;
}

.CodeMirror-gutters {
  position: absolute; left: 0; top: 0;
  min-height: 100%;
  z-index: 3;
}
.CodeMirror-gutter {
  white-space: normal;
  height: 100%;
  display: inline-block;
  vertical-align: top;
  margin-bottom: -50px;
}
.CodeMirror-gutter-wrapper {
  position: absolute;
  z-index: 4;
  background: none !important;
  border: none !important;
}
.CodeMirror-gutter-background {
  position: absolute;
  top: 0; bottom: 0;
  z-index: 4;
}
.CodeMirror-gutter-elt {
  position: absolute;
  cursor: default;
  z-index: 4;
}
.CodeMirror-gutter-wrapper ::selection { background-color: transparent }
.CodeMirror-gutter-wrapper ::-moz-selection { background-color: transparent }

.CodeMirror-lines {
  cursor: text;
  min-height: 1px; /* prevents collapsing before first draw */
}
.CodeMirror pre.CodeMirror-line,
.CodeMirror pre.CodeMirror-line-like {
  /* Reset some styles that the rest of the page might have set */
  -moz-border-radius: 0; -webkit-border-radius: 0; border-radius: 0;
  border-width: 0;
  background: transparent;
  font-family: inherit;
  font-size: inherit;
  margin: 0;
  white-space: pre;
  word-wrap: normal;
  line-height: inherit;
  color: inherit;
  z-index: 2;
  position: relative;
  overflow: visible;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-variant-ligatures: contextual;
  font-variant-ligatures: contextual;
}
.CodeMirror-wrap pre.CodeMirror-line,
.CodeMirror-wrap pre.CodeMirror-line-like {
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: normal;
}

.CodeMirror-linebackground {
  position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
  z-index: 0;
}

.CodeMirror-linewidget {
  position: relative;
  z-index: 2;
  padding: 0.1px; /* Force widget margins to stay inside of the container */
}

.CodeMirror-widget {}

.CodeMirror-rtl pre { direction: rtl; }

.CodeMirror-code {
  outline: none;
}

/* Force content-box sizing for the elements where we expect it */
.CodeMirror-scroll,
.CodeMirror-sizer,
.CodeMirror-gutter,
.CodeMirror-gutters,
.CodeMirror-linenumber {
  -moz-box-sizing: content-box;
  box-sizing: content-box;
}

.CodeMirror-measure {
  position: absolute;
  width: 100%;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

.CodeMirror-cursor {
  position: absolute;
  pointer-events: none;
}
.CodeMirror-measure pre { position: static; }

div.CodeMirror-cursors {
  visibility: hidden;
  position: relative;
  z-index: 3;
}
div.CodeMirror-dragcursors {
  visibility: visible;
}

.CodeMirror-focused div.CodeMirror-cursors {
  visibility: visible;
}

.CodeMirror-selected { background: #d9d9d9; }
.CodeMirror-focused .CodeMirror-selected { background: #d7d4f0; }
.CodeMirror-crosshair { cursor: crosshair; }
.CodeMirror-line::selection, .CodeMirror-line > span::selection, .CodeMirror-line > span > span::selection { background: #d7d4f0; }
.CodeMirror-line::-moz-selection, .CodeMirror-line > span::-moz-selection, .CodeMirror-line > span > span::-moz-selection { background: #d7d4f0; }

.cm-searching {
  background-color: #ffa;
  background-color: rgba(255, 255, 0, .4);
}

/* Used to force a border model for a node */
.cm-force-border { padding-right: .1px; }

@media print {
  /* Hide the cursor when printing */
  .CodeMirror div.CodeMirror-cursors {
    visibility: hidden;
  }
}

/* See issue #2901 */
.cm-tab-wrap-hack:after { content: ''; }

/* Help users use markselection to safely style text background */
span.CodeMirror-selectedtext { background: none; }

`,We=o`
/* Based on Sublime Text's Monokai theme */

.cm-s-monokai.CodeMirror { background: #272822; color: #f8f8f2; }
.cm-s-monokai div.CodeMirror-selected { background: #49483E; }
.cm-s-monokai .CodeMirror-line::selection, .cm-s-monokai .CodeMirror-line > span::selection, .cm-s-monokai .CodeMirror-line > span > span::selection { background: rgba(73, 72, 62, .99); }
.cm-s-monokai .CodeMirror-line::-moz-selection, .cm-s-monokai .CodeMirror-line > span::-moz-selection, .cm-s-monokai .CodeMirror-line > span > span::-moz-selection { background: rgba(73, 72, 62, .99); }
.cm-s-monokai .CodeMirror-gutters { background: #272822; border-right: 0px; }
.cm-s-monokai .CodeMirror-guttermarker { color: white; }
.cm-s-monokai .CodeMirror-guttermarker-subtle { color: #d0d0d0; }
.cm-s-monokai .CodeMirror-linenumber { color: #d0d0d0; }
.cm-s-monokai .CodeMirror-cursor { border-left: 1px solid #f8f8f0; }

.cm-s-monokai span.cm-comment { color: #75715e; }
.cm-s-monokai span.cm-atom { color: #ae81ff; }
.cm-s-monokai span.cm-number { color: #ae81ff; }

.cm-s-monokai span.cm-comment.cm-attribute { color: #97b757; }
.cm-s-monokai span.cm-comment.cm-def { color: #bc9262; }
.cm-s-monokai span.cm-comment.cm-tag { color: #bc6283; }
.cm-s-monokai span.cm-comment.cm-type { color: #5998a6; }

.cm-s-monokai span.cm-property, .cm-s-monokai span.cm-attribute { color: #a6e22e; }
.cm-s-monokai span.cm-keyword { color: #f92672; }
.cm-s-monokai span.cm-builtin { color: #66d9ef; }
.cm-s-monokai span.cm-string { color: #e6db74; }

.cm-s-monokai span.cm-variable { color: #f8f8f2; }
.cm-s-monokai span.cm-variable-2 { color: #9effff; }
.cm-s-monokai span.cm-variable-3, .cm-s-monokai span.cm-type { color: #66d9ef; }
.cm-s-monokai span.cm-def { color: #fd971f; }
.cm-s-monokai span.cm-bracket { color: #f8f8f2; }
.cm-s-monokai span.cm-tag { color: #f92672; }
.cm-s-monokai span.cm-header { color: #ae81ff; }
.cm-s-monokai span.cm-link { color: #ae81ff; }
.cm-s-monokai span.cm-error { background: #f92672; color: #f8f8f0; }

.cm-s-monokai .CodeMirror-activeline-background { background: #373831; }
.cm-s-monokai .CodeMirror-matchingbracket {
  text-decoration: underline;
  color: white !important;
}

`,Qe=o`
.CodeMirror-dialog {
  position: absolute;
  left: 0; right: 0;
  background: inherit;
  z-index: 15;
  padding: .1em .8em;
  overflow: hidden;
  color: inherit;
}

.CodeMirror-dialog-top {
  border-bottom: 1px solid #eee;
  top: 0;
}

.CodeMirror-dialog-bottom {
  border-top: 1px solid #eee;
  bottom: 0;
}

.CodeMirror-dialog input {
  border: none;
  outline: none;
  background: transparent;
  width: 20em;
  color: inherit;
  font-family: monospace;
}

.CodeMirror-dialog button {
  font-size: 70%;
}

`;$e.commands.save=function(e){e._scComponent._save()};class Ke extends se{static properties={value:{type:String},saveButton:{type:Boolean,reflect:!0,attribute:"save-button"},dirty:{type:Boolean,reflect:!0}};static styles=o`
    :host {
      vertical-align: top;
      display: inline-block;
      box-sizing: boder-box;
      width: 300px;
      height: 200px;
      border: 1px solid var(--sc-color-primary-3);
      border-left: 2px solid var(--sc-color-primary-3);
      position: relative;
      font-size: var(--sc-font-size);
    }

    :host([dirty]) {
      border-left: 2px solid var(--sc-color-secondary-3);
    }

    .container {
      width: 100%;
      height: 100%;
    }

    /* highlight focused editor */
    .CodeMirror { opacity: 0.9; }
    .CodeMirror.CodeMirror-focused { opacity: 1; }
    /* code mirror styles */
    ${qe}
    ${We}
    ${Qe}

    sc-icon {
      position: absolute;
      bottom: 2px;
      right: 2px;
    }
  `;get value(){return this._value}set value(e){if(this._value=null!==e?e:"",this._codeMirror){const e=this._codeMirror.getCursor();this._codeMirror.setValue(this._value),this._codeMirror.setCursor(e),this._cleanDoc(),setTimeout((()=>this._codeMirror.refresh()),1)}}constructor(){super(),this.value="",this.saveButton=!1,this.dirty=!1}render(){return G`
      <div @keydown="${this._onKeydown}" class="container"></div>
      ${this.dirty&&this.saveButton?G`<sc-icon icon="save" @input=${this._save}></sc-icon>`:V}
    `}connectedCallback(){super.connectedCallback(),this._resizeObserver=new ResizeObserver((e=>{const t=this.shadowRoot.querySelector(".container"),{width:n,height:i}=t.getBoundingClientRect();this._codeMirror.setSize(n,i)})),this._resizeObserver.observe(this)}disconnectedCallback(){this._resizeObserver.disconnect(),super.disconnectedCallback()}firstUpdated(){const e=this.shadowRoot.querySelector(".container");this._codeMirror=$e(e,{value:this.value,mode:"javascript",theme:"monokai",lineNumbers:!0,tabSize:2,keyMap:"sublime"}),this._codeMirror._scComponent=this,this._codeMirror.setOption("extraKeys",{Tab:function(e){let t="";for(let n=0;n<e.getOption("indentUnit");n++)t+=" ";e.replaceSelection(t)}}),this._codeMirror.on("change",(()=>{this._codeMirror.getDoc().isClean()||(this.dirty=!0)}))}_onKeydown(e){e.stopPropagation(),e.metaKey&&e.shiftKey&&(e.preventDefault(),"/"===e.key&&this._codeMirror.toggleComment())}_save(e){this._value=this._codeMirror.getValue();const t=new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:this._value}});this._cleanDoc(),this.dispatchEvent(t)}_cleanDoc(){this._codeMirror.getDoc().markClean(),this.dirty=!1}}void 0===customElements.get("sc-editor")&&customElements.define("sc-editor",Ke);class je extends pe{static properties={duration:{type:Number,reflect:!0},active:{type:Number}};static styles=o`
    :host {
      vertical-align: top;
      display: inline-block;
      box-sizing: border-box;

      width: 100px;
      height: 30px;
      background-color: var(--sc-color-primary-1);
      border: 1px solid var(--sc-color-primary-3);

      --sc-flash-active: var(--sc-color-secondary-3);
    }

    div {
      width: 100%;
      height: 100%;
    }

    div.active {
      background-color: var(--sc-flash-active);
    }
  `;constructor(){super(),this.duration=.05,this.active=!1,this._timeoutId=null}render(){return this.active&&(clearTimeout(this._timeoutId),this._timeoutId=setTimeout((()=>this.active=!1),1e3*this.duration)),G`<div class="${this.active?"active":""}"></div>`}}void 0===customElements.get("sc-flash")&&customElements.define("sc-flash",je);class Xe extends pe{static properties={active:{type:Boolean,reflect:!0},value:{type:Boolean}};static styles=o`
    :host {
      display: inline-block;
      box-sizing: border-box;
      vertical-align: top;
      cursor: pointer;
      width: 30px;
      height: 30px;
      border: 1px solid var(--sc-color-primary-3);
      background-color: var(--sc-color-primary-3);
      border-radius: 2px;
    }

    svg {
      width: 100%;
      height: 100%;
      stroke: #ffffff;
      fill: #ffffff;
    }

    svg.active {
      background-color: var(--sc-color-primary-1);
      stroke: var(--sc-color-secondary-5);
      fill: var(--sc-color-secondary-5);
    }

    path {
      stroke-width: 10;
      fill: none;
    }
  `;get value(){return this.active}set value(e){this.active=e}constructor(){super(),this.active=!1}render(){const e=this._size-2;return G`
      <svg
        class="${this.active?"active":""}"
        style="
          width: ${e}px;
          height: ${e}px;
        "
        viewbox="-10 -8 120 120"
        @mousedown="${this._propagateChange}"
        @touchstart="${this._propagateChange}"
        @contextmenu="${this._preventContextMenu}"
      >
        <path
          d="M 30,20
            L 70,20
            C 75,20 80,25 80,30
            L 80,70
            C 80,75 75,80 70,80
            L 60,80
            M 40,80
            L 30,80
            C 25,80 20,75 20,70
            L 20,30
            C 20,25 25,20 30,20
          "
        ></path>
        <polygon points="45,80 60,65 60,95"></polygon>
      </svg>
    `}_propagateChange(e){e.preventDefault(),e.stopPropagation(),this.active=!this.active;const t=new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:this.active}});this.dispatchEvent(t),this.requestUpdate()}}function*Ze(e,t,n=1){const i=void 0===t?0:e;null!=t||(t=e);for(let e=i;n>0?e<t:t<e;e+=n)yield e}function*Je(e,t){if(void 0!==e){let n=0;for(const i of e)yield t(i,n++)}}void 0===customElements.get("sc-loop")&&customElements.define("sc-loop",Xe);class et extends pe{static properties={columns:{type:Number,reflect:!0},rows:{type:Number,reflect:!0},states:{type:Array},value:{type:Array},reset:{type:Boolean,reflect:!0}};static styles=o`
    :host {
      box-sizing: border-box;
      width: 300px;
      height: 200px;
      vertical-align: top;
      display: inline-block;
      user-select: none;
      background-color: var(--sc-color-primary-2);
      border: 1px solid var(--sc-color-primary-3);

      --sc-matrix-cell-color: #ffffff;
      --sc-matrix-cell-border: var(--sc-color-primary-5);
    }

    svg {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }

    rect {
      fill: var(--sc-matrix-cell-color);
      shape-rendering: crispedges;
    }

    line {
      stroke: var(--sc-matrix-cell-border);
      shape-rendering: crispedges;
    }
  `;set rows(e){e<1?console.warn("sc-matrix: Invalid value for rows, should be >= 1"):(this._rows=e,this._resizeMatrix())}get rows(){return this._rows}set columns(e){e<1?console.warn("sc-matrix: Invalid value for columns, should be >= 1"):(this._columns=e,this._resizeMatrix())}get columns(){return this._columns}set value(e){this._value=e,this._rows=this._value.length,this._columns=this._value[0].length,this.requestUpdate()}get value(){return this._value}set reset(e){this._value.forEach((e=>{for(let t=0;t<e.length;t++)e[t]=this._states[0]})),this.requestUpdate(),this._emitChange()}get reset(){}set states(e){console.log(e),this._states=e;for(let e=0;e<this._value.length;e++){const t=this._value[e];for(let n=0;n<t.length;n++){const i=t[n];if(-1===this._states.indexOf(i)){const t=this.states.reduce(((e,t)=>Math.abs(t-i)<Math.abs(e-i)?t:e));this._value[e][n]=t}}}this._emitChange(),this.requestUpdate()}get states(){return this._states}constructor(){super(),this._value=[],this._states=[0,1],this._width=300,this._height=200,this._resizeObserver=null,this.columns=8,this.rows=4}render(){const e=this._width/this.columns,t=this._height/this.rows,n=this._states[0],i=this._states[this._states.length-1];return G`
      <svg @contextmenu="${this._preventContextMenu}">
        <g>
          ${this.value.map(((r,a)=>{const o=a*t;return r.map(((r,s)=>Y`
                <rect
                  width=${e}
                  height=${t}
                  x=${s*e}
                  y=${o}
                  style="fill-opacity: ${(r-n)/(i-n)}"
                  data-row-index=${a}
                  data-column-index=${s}
                  @mousedown=${this._updateCell}
                ></rect>
              `))}))}
        </g>
        <g>
          <!-- horizontal lines -->
          ${Je(Ze(1,this.value.length),(e=>{const n=e*t;return Y`<line x1="0" y1=${n} x2=${this._width} y2=${n}></line>`}))}
          <!-- vertical lines -->
          ${Je(Ze(1,this.value[0].length),(t=>{const n=t*e;return Y`<line x1=${n} y1="0" x2=${n} y2=${this._height}></line>`}))}
        <g>
      </svg>
    `}connectedCallback(){super.connectedCallback(),this._resizeObserver=new ResizeObserver((e=>{const t=this.shadowRoot.querySelector("svg"),{width:n,height:i}=t.getBoundingClientRect();this._width=n,this._height=i,this.requestUpdate()})),this._resizeObserver.observe(this)}disconnectedCallback(){this._resizeObserver.disconnect(),super.disconnectedCallback()}_resizeMatrix(){const e=this.value;for(let t=e.length-1;t>=this.rows;t--)e.splice(t,1);e.forEach((e=>{for(let t=e.length-1;t>=this.columns;t--)e.splice(t,1)}));const t=e.length;for(let n=0;n<this.rows;n++)if(n<t)e.forEach((e=>{for(let t=e.length;t<this.columns;t++)e[t]=this._states[0]}));else{const t=new Array(this.columns).fill(this._states[0]);e[n]=t}this.requestUpdate()}_updateCell(e){const{rowIndex:t,columnIndex:n}=e.target.dataset,i=this._states.indexOf(this.value[t][n]),r=-1===i?0:(i+1)%this._states.length;this.value[t][n]=this._states[r],this._emitChange(),this.requestUpdate()}_emitChange(){const e=new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:this.value}});this.dispatchEvent(e)}}void 0===customElements.get("sc-matrix")&&customElements.define("sc-matrix",et);class tt extends pe{static properties={_active:{type:Boolean,state:!0}};static styles=o`
    :host {
      display: inline-block;
      box-sizing: border-box;
      vertical-align: top;
      cursor: pointer;
      width: 30px;
      height: 30px;
      border: 1px solid var(--sc-color-primary-3);
      background-color: var(--sc-color-primary-3);
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
  `;constructor(){super(),this._active=!1}render(){return G`
      <svg
        class="${this._active?"active":""}"
        viewbox="-10 -8 120 120"
        @mousedown="${this._dispatchEvent}"
        @touchstart="${this._dispatchEvent}"
        @mouseup="${this._release}"
        @touchend="${this._release}"
        @contextmenu="${this._preventContextMenu}"
      >
        <path d="M 80,20L 80,80"></path>
        <polygon points="20,20 70,50 20,80"></polygon>
      </svg>
    `}_dispatchEvent(e){e.preventDefault(),e.stopPropagation(),this._active=!0;const t=new CustomEvent("input",{bubbles:!0,composed:!0,detail:{value:this._active}});this.dispatchEvent(t)}_release(e){e.preventDefault(),e.stopPropagation(),this._active=!1}}customElements.define("sc-next",tt);const nt=Ce(class extends ye{constructor(e){var t;if(super(e),1!==e.type||"class"!==e.name||(null===(t=e.strings)||void 0===t?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter((t=>e[t])).join(" ")+" "}update(e,[t]){var n,i;if(void 0===this.it){this.it=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter((e=>""!==e))));for(const e in t)t[e]&&!(null===(n=this.nt)||void 0===n?void 0:n.has(e))&&this.it.add(e);return this.render(t)}const r=e.element.classList;this.it.forEach((e=>{e in t||(r.remove(e),this.it.delete(e))}));for(const e in t){const n=!!t[e];n===this.it.has(e)||(null===(i=this.nt)||void 0===i?void 0:i.has(e))||(n?(r.add(e),this.it.add(e)):(r.remove(e),this.it.delete(e)))}return H}});function it(e,t){return void 0===t&&(t=15),+parseFloat(Number(e).toPrecision(t))}function rt(e){var t=e.toString().split(/[eE]/),n=(t[0].split(".")[1]||"").length-+(t[1]||0);return n>0?n:0}function at(e){if(-1===e.toString().indexOf("e"))return Number(e.toString().replace(".",""));var t=rt(e);return t>0?it(Number(e)*Math.pow(10,t)):Number(e)}function ot(e){ut&&(e>Number.MAX_SAFE_INTEGER||e<Number.MIN_SAFE_INTEGER)&&console.warn(e+" is beyond boundary when transfer to integer, the results may not be accurate")}function st(e){return function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];var i=t[0];return t.slice(1).reduce((function(t,n){return e(t,n)}),i)}}var lt=st((function(e,t){var n=at(e),i=at(t),r=rt(e)+rt(t),a=n*i;return ot(a),a/Math.pow(10,r)})),ct=st((function(e,t){var n=Math.pow(10,Math.max(rt(e),rt(t)));return(lt(e,n)+lt(t,n))/n})),dt=st((function(e,t){var n=Math.pow(10,Math.max(rt(e),rt(t)));return(lt(e,n)-lt(t,n))/n})),_t=st((function(e,t){var n=at(e),i=at(t);return ot(n),ot(i),lt(n/i,it(Math.pow(10,rt(t)-rt(e))))})),ut=!0;const pt={strip:it,plus:ct,minus:dt,times:lt,divide:_t,round:function(e,t){var n=Math.pow(10,t),i=_t(Math.round(Math.abs(lt(e,n))),n);return e<0&&0!==i&&(i=lt(i,-1)),i},digitLength:rt,float2Fixed:at,enableBoundaryChecking:function(e){void 0===e&&(e=!0),ut=e}};class mt extends pe{static properties={min:{type:Number,reflect:!0},max:{type:Number,reflect:!0},value:{type:Number},integer:{type:Boolean,reflect:!0},readonly:{type:Boolean,reflect:!0},disabled:{type:Boolean,reflect:!0}};static styles=o`
    :host {
      vertical-align: top;
      display: inline-block;
      width: 100px;
      height: 30px;
      box-sizing: border-box;
      font-family: var(--sc-font-family);
      font-size: var(--sc-font-size);
      color: #ffffff;
      position: relative;
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      box-shadow: 0 0 2px var(--sc-color-primary-5);
    }

    :host([disabled]:focus), :host([disabled]:focus-visible),
    :host([readonly]:focus), :host([readonly]:focus-visible) {
      outline: none;
      box-shadow: none;
    }

    .container {
      overflow-y: hidden;
      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      background-color: var(--sc-color-primary-2);
      border: 1px solid var(--sc-color-primary-3);
      user-select: none;
    }

    .container:focus {
      outline: none;
    }

    .info {
      width: 15px;
      height: 100%;
      display: inline-block;
      background-color: var(--sc-color-primary-3);
      box-sizing: border-box;
    }

    .container:focus .info {
      outline: 2px solid var(--sc-color-secondary-2);
    }

    :host([disabled]) .container:focus .info,
    :host([readonly]) .container:focus .info {
      outline: none;
    }

    .info.edited {
      background-color: var(--sc-color-primary-4);
    }

    .content {
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 15px;
      padding-left: 12px;
      height: 100%;
      width: calc(100% - 15px);
    }

    :host([readonly]) .info {
      width: 5px;
      background-color: var(--sc-color-primary-2);
    }

    :host([readonly]) .content {
      left: 5px;
      width: calc(100% - 5px);
    }

    .z {
      display: inline-block;
      vertical-align: top;
      text-align: center;
      position: relative;
/*      width: 7px;*/
      height: 100%;
      display: inline-flex;
      align-items: center;
    }

    /* contains the integer part which can be larger than one character */
    .z:first-child {
      width: auto;
      min-width: 7px;
    }

    /* full width if integer */
    :host([integer]) .z {
      width: 100%;
      text-align: left;
    }

    .z sc-speed-surface {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
    }

    input[type="number"] {
      position: absolute;
      top: 1px;
      left: 1px;
      width: 1px;
      height: 1px;
      padding: 0;
      border: none;
      background-color: var(--sc-color-primary-3);
    }

    input[type="number"]:focus {
      outline: none;
    }
  `;set min(e){this._min=Math.min(e,this._max),this._value<this._min&&(this.value=this._min,this._emitChange())}get min(){return this._min}set max(e){this._max=Math.max(e,this._min),this._value>this._max&&(this.value=this._max,this._emitChange())}get max(){return this._max}set value(e){(e=Math.min(this._max,Math.max(this._min,e)))!==this._value&&(this._value=e,this._displayValue=e.toString(),this.requestUpdate())}get value(){return this._value}constructor(){super(),this._min=-1/0,this._max=1/0,this._value=0,this._displayValue="0",this.integer=!1,this.disabled=!1,this.readonly=!1,this._valueChanged=!1,this._updateValue1=this._updateValueFromPointer(1),this._updateValue01=this._updateValueFromPointer(.1),this._updateValue001=this._updateValueFromPointer(.01),this._updateValue0001=this._updateValueFromPointer(.001),this._updateValue00001=this._updateValueFromPointer(1e-4),this._updateValue000001=this._updateValueFromPointer(1e-5),this._updateValue0000001=this._updateValueFromPointer(1e-6),this._hasVirtualKeyboard=!1,this._numKeyPressed=0,this._onKeyDown=this._onKeyDown.bind(this)}render(){const e=this._displayValue.split(".");e[1]||(e[1]=[]);const t=" ",n={edited:0!==this._numKeyPressed};return G`
      <div
        tabindex="-1"
        class="container"
        @focus="${this._onFocus}"
        @blur="${this._onBlur}"
        @touchstart="${this._triggerFocus}"
        @touchend="${this._openVirtualKeyboard}"
        @contextmenu="${this._preventContextMenu}"
      >
        <div class="info ${nt(n)}"></div>

        <div class="content">
          <span class="z">
            ${e[0]}
            <sc-speed-surface @input="${this._updateValue1}"></sc-speed-surface>
          </span>
          ${this.integer?V:G`
              <span class="z">
                .
              </span>
              <span class="z">
                ${e[1][0]||t}
                <sc-speed-surface @input="${this._updateValue01}"></sc-speed-surface>
              </span>
              <span class="z">
                ${e[1][1]||t}
                <sc-speed-surface @input="${this._updateValue001}"></sc-speed-surface>
              </span>
              <span class="z">
                ${e[1][2]||t}
                <sc-speed-surface @input="${this._updateValue0001}"></sc-speed-surface>
              </span>
              <span class="z">
                ${e[1][3]||t}
                <sc-speed-surface @input="${this._updateValue00001}"></sc-speed-surface>
              </span>
              <span class="z">
                ${e[1][4]||t}
                <sc-speed-surface @input="${this._updateValue000001}"></sc-speed-surface>
              </span>
              <span class="z">
                ${e[1][5]||t}
                <sc-speed-surface @input="${this._updateValue0000001}"></sc-speed-surface>
              </span>`}
        </div>
      </div>
    `}connectedCallback(){super.connectedCallback(),this.hasAttribute("tabindex")||this.setAttribute("tabindex",0)}_triggerFocus(e){e.preventDefault(),e.stopPropagation()}_openVirtualKeyboard(e){if(e.preventDefault(),e.stopPropagation(),this._hasVirtualKeyboard)return;if(this.disabled||this.readonly)return;this._hasVirtualKeyboard=!0;const t=document.createElement("input");t.type="number",this.shadowRoot.appendChild(t),t.focus(),t.click(),t.addEventListener("input",(e=>{e.preventDefault(),e.stopPropagation(),e.target.value&&(this.value=parseFloat(e.target.value),this._emitInput())})),t.addEventListener("change",(e=>{e.preventDefault(),e.stopPropagation(),e.target.value&&(this.value=parseFloat(e.target.value)),this.focus(),t.remove(),this._hasVirtualKeyboard=!1,this._emitInput(),this._emitChange()}))}_onFocus(){this._numKeyPressed=0,window.addEventListener("keydown",this._onKeyDown)}_onBlur(){this._updateValueFromDisplayValue(),window.removeEventListener("keydown",this._onKeyDown)}_onKeyDown(e){if(!this.disabled&&!this.readonly){if(-1!==(this.integer?["0","1","2","3","4","5","6","7","8","9","-"]:["0","1","2","3","4","5","6","7","8","9","-",".",","]).indexOf(e.key)){e.preventDefault(),e.stopPropagation(),0===this._numKeyPressed&&(this._displayValue="");let t=e.key;","===t&&(t="."),this._displayValue+=t,this._numKeyPressed+=1,this.requestUpdate()}"Backspace"!==e.key&&8!==e.which||(e.preventDefault(),e.stopPropagation(),"."===this._displayValue[this._displayValue.length-1]&&(this._displayValue=this._displayValue.substring(0,this._displayValue.length-1)),this._displayValue=this._displayValue.substring(0,this._displayValue.length-1),this._numKeyPressed+=1,this.requestUpdate()),"Enter"!==e.key&&13!==e.which||(e.preventDefault(),e.stopPropagation(),this._updateValueFromDisplayValue())}}_updateValueFromPointer(e){return t=>{if(t.stopPropagation(),!this.disabled&&!this.readonly&&!this._hasVirtualKeyboard){if(null!==t.detail.pointerId){if(Math.abs(t.detail.dy)<.02)return;const n=this._value,i=t.detail.dy<0?-1:1,r=8,a=1.2;let o=Math.pow(Math.abs(t.detail.dy*r),a);o=Math.max(1,o),o*=i,this._value+=e*o,this._value=pt.times(Math.round(this._value/e),e),this._value=Math.max(this._min,Math.min(this._max,this._value));const s=this._value.toString().toString().split("."),l=e.toString().split(".")[1];if(l)for(s[1]||(s[1]=[]);s[1].length<l.length;)s[1]+="0";this._displayValue=s.join("."),this._value!==n&&(this._valueChanged=!0,this._emitInput())}else!0===this._valueChanged&&(this._valueChanged=!1,this._emitChange());this.requestUpdate()}}}_updateValueFromDisplayValue(){this._numKeyPressed>0&&(this._value=this.integer?parseInt(this._displayValue):parseFloat(this._displayValue),(this._value<this._min||this._value>this._max)&&(this._value=Math.max(this._min,Math.min(this._max,this._value)),this._displayValue=this._value.toString()),this._numKeyPressed=0,this._emitInput(),this._emitChange(),this.requestUpdate())}_emitInput(){const e=new CustomEvent("input",{bubbles:!0,composed:!0,detail:{value:this._value}});this.dispatchEvent(e)}_emitChange(){const e=new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:this._value}});this.dispatchEvent(e)}}void 0===customElements.get("sc-number")&&customElements.define("sc-number",mt);class gt extends pe{static properties={_active:{type:Boolean,state:!0}};static styles=o`
    :host {
      display: inline-block;
      box-sizing: border-box;
      vertical-align: top;
      cursor: pointer;
      width: 30px;
      height: 30px;
      border: 1px solid var(--sc-color-primary-3);
      background-color: var(--sc-color-primary-3);
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
  `;constructor(){super(),this._active=!1}render(){return G`
      <svg
        class="${this._active?"active":""}"
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
    `}_dispatchEvent(e){e.preventDefault(),e.stopPropagation(),this._active=!0;const t=new CustomEvent("input",{bubbles:!0,composed:!0,detail:{value:this._active}});this.dispatchEvent(t)}_release(e){e.preventDefault(),e.stopPropagation(),this._active=!1}}function ht(e){return function(e){if("object"!=typeof e||null===e)return!1;const t=Object.getPrototypeOf(e);return!(null!==t&&t!==Object.prototype&&null!==Object.getPrototypeOf(t)||Symbol.toStringTag in e||Symbol.iterator in e)}(e)}customElements.define("sc-prev",gt),new Function("try {return this===window;}catch(e){ return false;}");let Et=0;class ft extends pe{static properties={options:{type:Object},value:{type:String,reflect:!0},placeholder:{type:String,reflect:!0},disabled:{type:Boolean,reflect:!0}};static styles=o`
    :host {
      display: inline-block;
      box-sizing: border-box;
      vertical-align: top;
      height: 30px;
      width: 200px;
      font-family: var(--sc-font-family);
      font-size: var(--sc-font-size);
      color: #fff;
      border-radius: 2px;
      overflow: auto;
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      box-shadow: 0 0 2px var(--sc-color-primary-5);
    }

    select {
      display: block;
      font-family: inherit;
      font-size: inherit;
      width: 100%;
      height: 100%;
      text-indent: 4px;
    }

    select:focus {
      outline: none;
    }

    option {
      text-indent: 4px;
    }
  `;constructor(){super(),this.options=[],this.value=null,this.disabled=!1,this.placeholder=""}render(){const e=ht(this.options);return G`
      <select
        ?disabled=${this.disabled}
        @change=${this._dispatchEvent}
      >
        ${this.placeholder?G`<option value="">${this.placeholder}</option`:V}
        ${Ge(Object.entries(this.options),(()=>"sc-select-"+Et++),(([t,n])=>G`
            <option
              value=${t}
              ?selected=${n===this.value}
            >${e?t:n}</option>
          `))}
      </select>
    `}_dispatchEvent(e){if(this.disabled)return;if(ht(this.options)){const t=e.target.value;this.value=this.options[t]}else{const t=this.placeholder?e.target.selectedIndex-1:e.target.selectedIndex;this.value=this.options[t]}const t=new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:this.value}});this.dispatchEvent(t)}}void 0===customElements.get("sc-select")&&customElements.define("sc-select",ft);class St extends pe{static properties={min:{type:Number,reflect:!0},max:{type:Number,reflect:!0},step:{type:Number,reflect:!0},value:{type:Number},orientation:{type:String,reflect:!0},relative:{type:Boolean,reflect:!0},numberBox:{type:Boolean,reflect:!0,attribute:"number-box"},disabled:{type:Boolean,reflect:!0}};static styles=o`
    :host {
      display: inline-block;
      box-sizing: border-box;
      width: 200px;
      height: 30px;
      vertical-align: top;
      border: 1px solid var(--sc-color-primary-3);

      --sc-slider-background-color: var(--sc-color-primary-2);
      --sc-slider-foreground-color: var(--sc-color-primary-5);
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      box-shadow: 0 0 2px var(--sc-color-primary-5);
    }

    div {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      position: relative;
      display: inline-block;
    }

    :host([number-box][orientation="horizontal"]) div {
      width: calc(100% - 86px);
    }

    :host([number-box][orientation="vertical"]) div {
      height: calc(100% - 36px);
    }

    svg {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }

    rect.background {
      fill: var(--sc-slider-background-color);
    }

    rect.foreground {
      fill: var(--sc-slider-foreground-color);
    }

    sc-position-surface {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    sc-number {
      display: inline-block;
      width: 80px;
    }

    :host([number-box][orientation="vertical"]) sc-number {
      display: block;
    }
  `;get min(){return this._min}set min(e){this._min=e,this._updateScales()}get max(){return this._max}set max(e){this._max=e,this._updateScales()}get step(){return this._step}set step(e){this._step=e,this._updateScales()}set midiValue(e){const t=(this.max-this.min)*e/127+this.min;this.value=this._clipper(t);const n=new CustomEvent("input",{bubbles:!0,composed:!0,detail:{value:this.value}});this.dispatchEvent(n);const i=new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:this.value}});this.dispatchEvent(i)}get midiValue(){return Math.round((this.value-this.min)/(this.max-this.min)*127)}constructor(){super(),this._scale=null,this._clipper=null,this._min=0,this._max=1,this._step=.001,this.min=0,this.max=1,this.step=.001,this.value=.5,this.orientation="horizontal",this.relative=!1,this.numberBox=!1,this._pointerId=null,this._startPointerValue=null,this._startSliderValue=null}render(){const e=Math.max(0,this._scale(this.value));return G`
      <div @contextmenu=${this._preventContextMenu}>
        <svg viewbox="0 0 1000 1000" preserveAspectRatio="none">
          ${"horizontal"===this.orientation?Y`
                <rect class="background" width="1000" height="1000"></rect>
                <rect class="foreground" width="${e}" height="1000"></rect>
              `:Y`
                <rect class="foreground" width="1000" height="1000"></rect>
                <rect class="background" width="1000" height="${1e3-e}"></rect>
              `}
        </svg>
        <sc-position-surface
          x-range=${JSON.stringify([this.min,this.max])}
          y-range=${JSON.stringify([this.max,this.min])}
          clamp
          @input=${this._onInput}
          @pointerend=${this._onChange}
        ></sc-position-surface>
      </div>
      ${this.numberBox?G`
          <sc-number
            min=${this.min}
            max=${this.max}
            value=${this.value}
            @input=${this._onNumberBoxChange}
          ></sc-number>
        `:V}
    `}connectedCallback(){super.connectedCallback(),this.hasAttribute("tabindex")||this.setAttribute("tabindex",0)}_updateScales(){if(this._max<this._min){const e=this._max;this._max=this._min,this._min=e}var e,t,n;this._scale=Ie([this._min,this._max],[0,1e3]),this._clipper=(e=this._min,t=this._max,n=this._step,i=>{const r=Math.round(i/n)*n,a=Math.max(Math.log10(1/n),0),o=r.toFixed(a);return Math.min(t,Math.max(e,parseFloat(o)))}),this.value=this._clipper(this.value)}_onNumberBoxChange(e){if(e.stopPropagation(),this.disabled)return;this.value=this._clipper(e.detail.value);const t=new CustomEvent("input",{bubbles:!0,composed:!0,detail:{value:this.value}});this.dispatchEvent(t);const n=new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:this.value}});this.dispatchEvent(n)}_onChange(e){if(!this.disabled&&e.detail.pointerId===this._pointerId){this._pointerId=null;const e=new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:this.value}});this.dispatchEvent(e)}}_onInput(e){if(e.stopPropagation(),!this.disabled)if(this.relative){if(e.detail.value[0]&&(null===this._pointerId||e.detail.value[0].pointerId===this._pointerId)){const{x:t,y:n,pointerId:i}=e.detail.value[0],r="horizontal"===this.orientation?t:n;null===this._pointerId&&(this._startPointerValue=r,this._startSliderValue=this.value),this._pointerId=i;const a=r-this._startPointerValue;this.value=this._clipper(this._startSliderValue+a);const o=new CustomEvent("input",{bubbles:!0,composed:!0,detail:{value:this.value}});this.dispatchEvent(o)}}else if(e.detail.value[0]&&(null===this._pointerId||e.detail.value[0].pointerId===this._pointerId)){const{x:t,y:n,pointerId:i}=e.detail.value[0],r="horizontal"===this.orientation?t:n;this._pointerId=i,this.value=this._clipper(r);const a=new CustomEvent("input",{bubbles:!0,composed:!0,detail:{value:this.value}});this.dispatchEvent(a)}}}void 0===customElements.get("sc-slider")&&customElements.define("sc-slider",St);let bt=0;class vt extends pe{static properties={options:{type:Array},value:{type:String,reflect:!0},orientation:{type:String,reflect:!0}};static styles=o`
    :host {
      display: inline-flex;
      vertical-align: top;
      box-sizing: border-box;
      background-color: var(--sc-color-primary-1);
      font-family: var(--sc-font-family);
      font-size: var(--sc-font-size);
      color: #ffffff;
      overflow: auto;

      --sc-tab-selected: var(--sc-color-secondary-1);
    }

    :host([orientation="horizontal"]) {
      height: 30px;
      width: 400px;
    }

    :host([orientation="vertical"]) {
      width: 120px;
      height: auto;
      flex-direction: column;
      justify-content: space-between;
    }

    :host([orientation="vertical"]) sc-button {
      width: 100%;
    }

    sc-button {
      border-radius: 0;
      --sc-button-selected: var(--sc-tab-selected);
      height: 100%;
      font-size: inherit;
    }
  `;constructor(){super(),this.options=[],this.value=null,this.orientation="horizontal"}render(){return Ge(this.options,(()=>"sc-tab-"+bt++),(e=>G`
        <sc-button
          .value=${e}
          ?selected=${e===this.value}
          @input="${this._triggerChange}"
          tabindex="-1"
        >${e}</sc-button>
      `))}_triggerChange(e){e.stopPropagation(),this.value=e.detail.value;const t=new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:this.value}});this.dispatchEvent(t)}}void 0===customElements.get("sc-tab")&&customElements.define("sc-tab",vt);void 0===customElements.get("sc-text")&&customElements.define("sc-text",class extends pe{static get properties(){return{readonly:{type:Boolean,reflect:!0},value:{type:String},disabled:{type:Boolean,reflect:!0},_dirty:{type:Boolean,state:!0}}}static get styles(){return o`
      :host {
        vertical-align: top;
        display: inline-block;
        box-sizing: border-box;
        vertical-align: top;
        font-size: 0;
        width: 200px;
        height: 30px;
        border-radius: 2px;
        font-size: var(--sc-font-size);
        line-height: var(--sc-font-size);
        font-family: var(--sc-font-family);

        color: white;
        line-height: 18px;
      }

      :host([disabled]) {
        opacity: 0.7;
      }

      :host([hidden]) {
        display: none
      }

      :host(:focus), :host(:focus-visible) {
        outline: none;
      }

      textarea {
        width: 100%;
        height: 100%;
        vertical-align: top;
        box-sizing: border-box;
        color: inherit;
        border-radius: inherit;
        font-size: inherit;
        font-family: inherit;
        line-height: inherit;
        resize: none;
        margin: 0;
        padding: 6px 2px 6px 6px;
        background-color: var(--sc-color-primary-3);
        border: 1px dotted var(--sc-color-primary-5);
      }

      :host(:focus) textarea, :host(:focus-visible) textarea {
        outline: none;
        border: 1px solid var(--sc-color-primary-5);
      }

      :host(:focus) textarea.dirty, :host(:focus-visible) textarea.dirty {
        border: 1px solid var(--sc-color-secondary-3);
      }

      textarea[readonly], textarea[readonly]:focus {
        background-color: var(--sc-color-primary-4);
        border: 1px solid var(--sc-color-primary-4);
      }
    `}constructor(){super(),this.readonly=!1,this.value="",this.disabled=!1,this._dirty=!1,this._propagateFocus=this._propagateFocus.bind(this)}render(){return!0===this.readonly?this.removeAttribute("tabindex"):this.setAttribute("tabindex",0),this.textContent=this.value,G`
      <textarea
        tabindex="-1"
        class="${this._dirty?"dirty":""}"
        ?readonly="${this.readonly}"
        ?disabled="${this.disabled}"
        .value="${this.value}"
        @blur=${this._updateValue}
        @keydown=${this._onKeyDown}
        @keyup=${this._onKeyUp}
        @contextmenu=${this._preventContextMenu}
      ></textarea>
    `}connectedCallback(){super.connectedCallback(),this.hasAttribute("tabindex")||this.setAttribute("tabindex",0),this.addEventListener("focus",this._propagateFocus),this.value=this.textContent}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("focus",this._propagateFocus)}_propagateFocus(){this.shadowRoot.querySelector("textarea").focus()}_onKeyDown(e){e.metaKey&&"s"===e.key&&(e.preventDefault(),this._updateValue(e,!0))}_onKeyUp(e){e.target.value!==this.value&&!1===this._dirty?this._dirty=!0:e.target.value===this.value&&!0===this._dirty&&(this._dirty=!1)}_updateValue(e,t=!1){if(e.preventDefault(),e.stopPropagation(),this._dirty||t){this.value=this.shadowRoot.querySelector("textarea").value,this._dirty=!1;const e=new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:this.value}});this.dispatchEvent(e)}}});class Tt extends pe{static properties={active:{type:Boolean,reflect:!0},value:{type:Boolean},disabled:{type:Boolean,reflect:!0}};static styles=o`
    :host {
      display: inline-block;
      width: 30px;
      height: 30px;
      vertical-align: top;
      box-sizing: border-box;
      background-color: var(--sc-color-primary-2);
      border: 1px solid var(--sc-color-primary-3);
      font-size: 0;
      line-height: 0;
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      box-shadow: 0 0 2px var(--sc-color-primary-5);
    }

    svg {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    svg line {
      stroke-width: 10px;
      stroke: var(--sc-color-primary-4);
    }

    svg.active line {
      stroke: #ffffff;
    }
  `;get value(){return this.active}set value(e){this.active=e}set midiValue(e){this.disabled||(this.active=0!==e,this._dispatchEvent())}get midiValue(){return this.value?127:0}constructor(){super(),this.active=!1,this.disabled=!1,this._updateValue=this._updateValue.bind(this)}render(){return G`
      <svg
        class="${this.active?"active":""}"
        viewbox="0 0 100 100"
        @mousedown="${this._updateValue}"
        @touchend="${{handleEvent:this._updateValue,passive:!1}}"
        @contextmenu="${this._preventContextMenu}"
      >
        <line x1="${25}" y1="${25}" x2="${75}" y2="${75}" />
        <line x1="${25}" y1="${75}" x2="${75}" y2="${25}" />
      </svg>
    `}connectedCallback(){super.connectedCallback(),this.hasAttribute("tabindex")||this.setAttribute("tabindex",0)}_updateValue(e){e.preventDefault(),e.stopPropagation(),this.disabled||(this.active=!this.active,this._dispatchEvent())}_dispatchEvent(){const e=new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:this.active}});this.dispatchEvent(e)}}void 0===customElements.get("sc-toggle")&&customElements.define("sc-toggle",Tt);let Ct=0,yt=0;class Rt extends pe{static properties={options:{type:Object},value:{type:String,reflect:!0},disabled:{type:Boolean,reflect:!0},orientation:{type:String,reflect:!0}};static styles=o`
    :host {
      display: inline-block;
      vertical-align: top;
      box-sizing: border-box;
      background-color: var(--sc-color-primary-2);
      font-family: var(--sc-font-family);
      font-size: var(--sc-font-size);
      color: #fff;
      border-radius: 2px;
      overflow: auto;
    }

    :host([orientation="horizontal"]) {
      height: 30px;
      width: auto;
      padding: 4px 7px 4px 7px;
    }

    :host([orientation="vertical"]) {
      width: 200px;
      height: auto;
      padding: 6px 7px 8px 7px;
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    :host([hidden]) {
      display: none
    }

    :host(:focus), :host(:focus-visible) {
      outline: none;
      box-shadow: 0 0 2px var(--sc-color-primary-5);
    }

    label {
      vertical-align: middle;
      user-select: none;
      webkit-user-select: none;
    }

    :host([orientation="horizontal"]) label {
      display: inline-block;
      margin-right: 12px;
      height: 20px;
      line-height: 20px;
    }

    :host([orientation="vertical"]) label {
      display: block;
      height: 20px;
      line-height: 20px;
    }

    input[type="radio"] {
      vertical-align: middle;
      position: relative;
      top: -1px;
    }
  `;get value(){return this._value}set value(e){this._value=e,this.requestUpdate()}constructor(){super(),this.options=[],this.value=null,this.disabled=!1,this.orientation="vertical",this._name="sc-radio-"+Ct++}render(){return Ge(this.options,(e=>"sc-radio-"+yt++),((e,t)=>G`
        <label>
          <input
            type="radio"
            value=${e}
            data-index=${t}
            name=${this._name}
            @change=${this._dispatchEvent}
            ?checked=${e==this.value}
            ?disabled=${this.disabled&&!(e==this.value)}
          />
          ${e}
        </label>
      `))}_dispatchEvent(e){if(this.disabled)return;const t=parseInt(e.target.dataset.index);this._value=this.options[t];const n=new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:this.value}});this.dispatchEvent(n)}}void 0===customElements.get("sc-radio")&&customElements.define("sc-radio",Rt);class Nt extends pe{static properties={active:{type:Boolean,reflect:!0},value:{type:Boolean}};static styles=o`
    :host {
      display: inline-block;
      box-sizing: border-box;
      vertical-align: top;
      cursor: pointer;
      width: 30px;
      height: 30px;
      border: 1px solid var(--sc-color-primary-3);
      background-color: var(--sc-color-primary-3);
      border-radius: 2px;
    }

    svg {
      width: 100%;
      height: 100%;
      fill: #ffffff;
    }

    svg.active {
      background-color: var(--sc-color-primary-1);
      fill: var(--sc-color-secondary-3);
    }
  `;get value(){return this.active}set value(e){this.active=e}constructor(){super(),this.active=!1}render(){return G`
      <svg
        class="${this.active?"active":""}"
        viewbox="0 0 20 20"
        @mousedown="${this._propagateChange}"
        @touchstart="${this._propagateChange}"
        @contextmenu="${this._preventContextMenu}"
      >
        <circle cx="10" cy="10" r="5"></circle>
      </svg>
    `}_propagateChange(e){e.preventDefault(),e.stopPropagation(),this.active=!this.active;const t=new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:this.active}});this.dispatchEvent(t),this.requestUpdate()}}void 0===customElements.get("sc-record")&&customElements.define("sc-record",Nt);class Ot extends pe{static properties={duration:{type:Number,reflect:!0},min:{type:Number,reflect:!0},max:{type:Number,reflect:!0},colors:{type:Array},lineWidth:{type:Number,reflect:!0,attribute:"line-width"},minMax:{type:Boolean,attribute:"min-max",reflect:!0},_maxValue:{type:Number,state:!0},_minValue:{type:Number,state:!0}};static get styles(){return o`
      :host {
        vertical-align: top;
        display: inline-block;
        width: 300px;
        height: 150px;
        box-sizing: border-box;
        background-color: white;
        color: var(--sc-color-primary-1);
        position: relative;
        border: 1px solid var(--sc-color-primary-3);
      }

      :host > div {
        width: 100%;
        height: 100%;
      }

      canvas {
        box-sizing: border-box;
        margin: 0;
        width: 100%;
        height: 100%;
      }

      .min, .max {
        display: block;
        width: 100%;
        height: 14px;
        line-height: 14px;
        font-size: 10px;
        font-family: var(--sc-font-family);
        position: absolute;
        right: 0px;
        text-align: right;
        padding-right: 2px;
        color: inherit;
      }

      .min {
        bottom: 0px;
      }

      .max {
        top: 0px;
      }
    `}set value(e){if(e.data=Array.isArray(e.data)?e.data:[e.data],this._frameStack.push(e),this.minMax)for(let t=0;t<e.data.length;t++)e.data[t]>this._maxValue&&(this._maxValue=e.data[t]),e.data[t]<this._minValue&&(this._minValue=e.data[t])}update(e){(e.has("duration")||e.has("min")||e.has("max"))&&this._resetCanvas(),super.update(e)}constructor(){super(),this.duration=1,this.colors=["#4682B4","#ffa500","#00e600","#ff0000","#800080","#224153"],this.lineWidth=1,this.minMax=!1,this.min=-1,this.max=1,this._maxValue=-1/0,this._minValue=1/0,this._frameStack=[],this._pixelIndex=null,this._lastFrame=null,this._canvas=null,this._ctx=null,this._cachedCanvas=null,this._cachedCtx=null,this._getYPosition=null,this._logicalWidth=null,this._logicalHeight=null,this._renderSignal=this._renderSignal.bind(this)}render(){return G`
      <div @contextmenu="${this._preventContextMenu}">
        <canvas></canvas>
        ${this.minMax?G`
            <span class="max">${this._maxValue.toFixed(3)}</span>
            <span class="min">${this._minValue.toFixed(3)}</span>
            `:V}
      </div>
    `}firstUpdated(){super.firstUpdated(),this._canvas=this.shadowRoot.querySelector("canvas"),this._ctx=this._canvas.getContext("2d"),this._cachedCanvas=document.createElement("canvas"),this._cachedCtx=this._cachedCanvas.getContext("2d")}connectedCallback(){super.connectedCallback(),this._frameStack.length=0,this._pixelIndex=null,this._resizeObserver=new ResizeObserver((e=>{const t=e[0],{width:n,height:i}=t.contentRect;this._logicalWidth=n*window.devicePixelRatio,this._logicalHeight=i*window.devicePixelRatio,this._canvas.width=this._logicalWidth,this._canvas.height=this._logicalHeight,this._cachedCanvas.width=this._logicalWidth,this._cachedCanvas.height=this._logicalHeight,this._resetCanvas()})),this._resizeObserver.observe(this),this.rAFId=window.requestAnimationFrame(this._renderSignal)}disconnectedCallback(){this._resizeObserver.disconnect(),window.cancelAnimationFrame(this.rAFId),this._resetCanvas(),super.disconnectedCallback()}_resetCanvas(){if(this._ctx&&this._cachedCtx){const e=(0-this._logicalHeight)/(this.max-this.min),t=this._logicalHeight-e*this.min;this._getYPosition=n=>e*n+t,this._lastFrame=null,this._frameStack.length=0,this._pixelIndex=null,this._ctx.clearRect(0,0,this._logicalWidth,this._logicalHeight),this._cachedCtx.clearRect(0,0,this._logicalWidth,this._logicalHeight)}}_renderSignal(){if(this._frameStack.length>0){let e=0,t=!1;const n=this.duration/this._logicalWidth;for(null===this._pixelIndex&&(this._pixelIndex=Math.floor(this._frameStack[0].time/n));this._frameStack.length>0;){e+=1;const i=this._pixelIndex*n,r=(this._pixelIndex+1)*n;let a=null;for(let e=0;e<this._frameStack.length;e++){const n=this._frameStack[e].time;n<i?e+1===this._frameStack.length&&(this._frameStack.length=0,t=!0):n>=i&&n<r&&(a=e)}if(t)break;if(null!==a){const t=this._frameStack[a];if(this._lastFrame){const n=this._logicalWidth,i=this._logicalHeight,r=n-e;this._ctx.clearRect(0,0,n,i),this._ctx.drawImage(this._cachedCanvas,e,0,r,i,0,0,r,i),this._ctx.lineWidth=this.lineWidth,this._ctx.lineCap="round";for(let e=0;e<t.data.length;e++){this._ctx.strokeStyle=this.colors[e];const i=this._getYPosition(this._lastFrame.data[e]),a=this._getYPosition(t.data[e]);this._ctx.beginPath(),this._ctx.moveTo(r,i),this._ctx.lineTo(n,a),this._ctx.stroke()}this._cachedCtx.clearRect(0,0,n,i),this._cachedCtx.drawImage(this._canvas,0,0,n,i)}this._lastFrame=t,e=0,this._frameStack.splice(0,a+1)}this._pixelIndex+=1}}this.rAFId=window.requestAnimationFrame(this._renderSignal)}}void 0===customElements.get("sc-signal")&&customElements.define("sc-signal",Ot);class At extends pe{static properties={active:{type:Boolean,reflect:!0},value:{type:Boolean},disabled:{type:Boolean,reflect:!0}};static styles=o`
    :host {
      display: inline-block;
      width: 60px;
      height: 30px;
      vertical-align: top;
      box-sizing: border-box;
      background-color: var(--sc-color-primary-2);
      border: 1px solid var(--sc-color-primary-4);
      font-size: 0;
      line-height: 0;
      /* @todo - must be dynamic */
      border-radius: 1px;
/*      cursor: pointer;*/

      --sc-switch-transition-time: 75ms;
      --sc-switch-toggle-color: white;
      --sc-switch-active-color: var(--sc-color-secondary-1);
    }

    :host > svg {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 3px;
      border-radius: inherit;
      transition: var(--sc-switch-transition-time);
      position: relative;
    }

    :host > svg.active {
      background-color: var(--sc-switch-active-color);
    }

    svg rect {
      transition: var(--sc-switch-transition-time);
      fill: var(--sc-switch-toggle-color);
    }
  `;get value(){return this.active}set value(e){this.active=e}constructor(){super(),this.active=!1,this.disabled=!1}render(){return G`
      <svg
        class="${this.active?"active":""}"
        viewBox="0 0 10 10"
        preserveAspectRatio="none"
        @mousedown=${this._updateValue}
        @touchend=${this._updateValue}
      >
         <rect x="${this.active?5:0}" width="5" height="10" />
      </svg>
    `}_updateValue(e){e.preventDefault(),e.stopPropagation(),this.disabled||(this.active=!this.active,this._dispatchEvent())}_dispatchEvent(){const e=new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:this.active}});this.dispatchEvent(e)}}void 0===customElements.get("sc-switch")&&customElements.define("sc-switch",At);class It extends pe{static properties={buttons:{type:Array},state:{type:String,reflect:!0}};static styles=o`
    :host {
      box-sizing: border-box;
      vertical-align: top;
      display: inline-flex;
      justify-content: space-between;
      width: auto;
      height: 30px;

      --sc-transport-background-color: var(--sc-color-primary-3);
      --sc-transport-active-background-color: var(--sc-color-primary-1);
      --sc-transport-active-play-fill: var(--sc-color-secondary-4);
      --sc-transport-active-pause-fill: var(--sc-color-secondary-1);
      --sc-transport-active-stop-fill: var(--sc-color-secondary-3);
    }

    svg {
      box-sizing: border-box;
      border-radius: 2px;
      border: 1px solid var(--sc-transport-background-color);
      background-color: var(--sc-transport-background-color);
      fill:  #ffffff;
      height: 100%;
      width: auto;
      margin-right: 4px;
      cursor: pointer;
    }

    svg:last-child {
      margin-right: 0px;
    }

    svg.active {
      background-color: var(--sc-transport-active-background-color);
    }

    svg.play.active {
      fill: var(--sc-transport-active-play-fill);
    }

    svg.pause.active {
      fill: var(--sc-transport-active-pause-fill);
    }

    svg.stop.active {
      fill: var(--sc-transport-active-stop-fill);
    }
  `;get value(){return this.state}set value(e){this.state=e}constructor(){super(),this.buttons=["play","pause","stop"],this.state=null}render(){return G`
      ${this.buttons.map((e=>{switch(e){case"play":return G`
              <svg
                class="play ${"play"===this.state?"active":""}"
                viewbox="0 0 20 20"
                @mousedown=${e=>this._onChange(e,"play")}
                @touchstart=${e=>this._onChange(e,"play")}
                @contextmenu=${this._preventContextMenu}
              >
                <polygon class="play-shape" points="6, 5, 15, 10, 6, 15"></polygon>
              </svg>
            `;case"pause":return G`
              <svg
                class="pause ${"pause"===this.state?"active":""}"
                viewbox="0 0 20 20"
                @mousedown=${e=>this._onChange(e,"pause")}
                @touchstart=${e=>this._onChange(e,"pause")}
                @contextmenu=${this._preventContextMenu}
              >
                <rect class="left" x="5" y="5" width="3" height="10"></rect>
                <rect class="right" x="12" y="5" width="3" height="10"></rect>
              </svg>
            `;case"stop":return G`
              <svg
                class="stop ${"stop"===this.state?"active":""}"
                viewbox="0 0 20 20"
                @mousedown=${e=>this._onChange(e,"stop")}
                @touchstart=${e=>this._onChange(e,"stop")}
                @contextmenu=${this._preventContextMenu}
              >
                <rect class="stop-shape" x="6" y="6" width="8" height="8"></rect>
              </svg>
            `}}))}
    `}_onChange(e,t){if(e.preventDefault(),e.stopPropagation(),this.state!==t){this.state=t;const e=new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:this.state}});this.dispatchEvent(e)}}}void 0===customElements.get("sc-transport")&&customElements.define("sc-transport",It);class xt extends pe{static properties={value:{type:Number,reflect:!0}};static styles=o`
    :host {
      display: inline-block;
      box-sizing: border-box;
      vertical-align: top;
      font-size: 0px;
      width: 50px;
      height: 30px;
      border: 1px solid var(--sc-color-primary-4);
      background-color: var(--sc-color-primary-3);
      border-radius: 2px;
      font-size: 11px;
      color: #ffffff;
      font-family: var(--sc-font-family);

      --sc-tap-tempo-background-color: var(--sc-color-secondary-5);
    }

    div {
      box-sizing: border-box;
      text-align: center;
      border-radius: inherit;
      cursor: pointer;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      color: inherit;
    }

    div.active {
      background-color: var(--sc-tap-tempo-background-color);
    }
  `;constructor(){super(),this.value=60,this._active=!1,this._timeoutId=null,this._lastTime=null,this._lastDifference=null,this._timeQueue=[],this._timer=null,this._maxQueueSize=6,this._timeout=2e3}render(){return G`
      <div
        class="${this._active?"active":""}"
        @mousedown="${this._tap}"
        @touchstart="${this._tap}"
        @contextmenu="${this._preventContextMenu}"
      >
        <slot>tap</slot>
      </div>
    `}_tap(e){e.preventDefault(),clearTimeout(this._timeoutId),this._active=!0,this.requestUpdate(),this._timeoutId=setTimeout((()=>{this._active=!1,this.requestUpdate()}),100);const t=Ee();if(this._lastTime){if(this._lastDifference=t-this._lastTime,Math.abs(this._lastDifference-this._timeQueue[this._timeQueue.length-1])>.2&&(this._timeQueue=[],this._lastTime=null),this._timeQueue.push(this._lastDifference),this._timeQueue.length){let e=0;for(let t=0;t<this._timeQueue.length;t++)e+=this._timeQueue[t];const t=1/(e/this._timeQueue.length)*60;this.value=t,this._dispatchEvent()}this._timeQueue.length>this._maxQueueSize&&this._timeQueue.shift()}this._lastTime=t,clearTimeout(this._timer),this._timer=setTimeout((()=>{this._timeQueue=[],this._lastTime=null}),this._timeout)}_dispatchEvent(){const e=new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:this.value}});this.dispatchEvent(e)}}void 0===customElements.get("sc-tap-tempo")&&customElements.define("sc-tap-tempo",xt)})()})();