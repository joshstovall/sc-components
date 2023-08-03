
class KeyboardController {
  constructor(host, options) {
    this._host = host;
    this._filterKeys = options.filterKeys;
    this._callback = options.callback;
    // trigger a new keypress only if keyup has been triggered
    this._deduplicateEvents = options.deduplicateEvents || false;
    this._debug = options.debug || false;
    this._lastEventType = null;

    host.addController(this);

    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);

    this._triggerEvent = this._triggerEvent.bind(this);
  }

  hostConnected() {
    this._host.addEventListener('focus', this._onFocus);
    this._host.addEventListener('blur', this._onBlur);
  }

  hostDisconnect() {
    this._host.removeEventListener('focus', this._onFocus);
    this._host.removeEventListener('blur', this._onBlur);
  }

  _onFocus() {
    document.addEventListener('keydown', this._triggerEvent);
    document.addEventListener('keyup', this._triggerEvent);
  }

  _onBlur() {
    document.removeEventListener('keydown', this._triggerEvent);
    document.removeEventListener('keyup', this._triggerEvent);
  }

  _triggerEvent(e) {
    // e.code is not altered by keyboard layout
    // cf. https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
    const key = e.code;

    if (this.debug) {
      console.log(key);
    }

    if (this._filterKeys.includes(key)) {
      // prevent default only if key is one of the requested ones
      e.preventDefault();

      if (this._deduplicateEvents && e.type === this._lastEventType) {
        return;
      }

      this._lastEventType = e.type;

      const event = {
        type: e.type,
        key: key,
        metaKey: e.metaKey,
        ctrlKey: e.ctrlKey,
        altKey: e.altKey,
      };

      this._callback(event);
    }
  }
}

export default KeyboardController;
