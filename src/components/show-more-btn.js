import {AbstractComponent} from './absctract-component';

export class ButtonLoad extends AbstractComponent {
  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}
