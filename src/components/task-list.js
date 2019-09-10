import {AbstractComponent} from './absctract-component';

export class TaskList extends AbstractComponent {
  getTemplate() {
    return `<div class="board__tasks"></div>`;
  }
}
