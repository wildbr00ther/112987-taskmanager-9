import {createElement} from './utils';

export class ButtonLoad {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate().trim());
    }
    return this._element;
  }

  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }

  set() {
    this._element = null;
  }
}
