import {Menu} from './menu.js';
import {Search} from './search.js';
import {Sort} from './sort';
import {Filters} from './filter.js';
import {Board} from './board.js';
import {TaskList} from './task-list';
import {Task} from './task.js';
import {TaskEdit} from './edit-task.js';
import {ButtonLoad} from './show-more-btn.js';
import {NoTask} from './no-task';
import {mockArray} from '../data.js';
import {Position, render, unrender} from './utils.js';
import {CARD_COUNT} from '../main';

export class BoardController {
  constructor(mainContainer, menuContainer, tasks) {
    this._mainContainer = mainContainer;
    this._menuContainer = menuContainer;
    this._tasks = tasks;
    this._tasksForLoad = mockArray;
    this._CARD_COUNT = CARD_COUNT;
    this._menu = new Menu();
    this._search = new Search();
    this._filter = new Filters(this._tasks);
    this._board = new Board();
    this._taskList = new TaskList();
    this._sort = new Sort();
    this._buttonLoad = new ButtonLoad();
  }

  init() {
    render(this._menuContainer, this._menu.getElement(), Position.BEFOREEND);
    render(this._mainContainer, this._search.getElement(), Position.BEFOREEND);
    render(this._mainContainer, this._filter.getElement(), Position.BEFOREEND);
    render(this._mainContainer, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._sort.getElement(), Position.AFTERBEGIN);
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);


    if (this._tasksForLoad.length === 0 || this._tasksForLoad.length === this._filter._count) {
      const noTask = new NoTask();
      this._board.replaceChild(noTask.getElement(), this._taskList);
    } else {
      // Показать еще
      this._renderTasks(this._tasksForLoad, this._CARD_COUNT);
      const buttonLoadHandler = () => {
        this._renderTasks(this._tasksForLoad, this._CARD_COUNT);

        if (this._tasksForLoad.length === 0) {
          unrender(this._buttonLoad.getElement());
          this._buttonLoad.removeElement();
        }
      };

      render(this._board.getElement(), this._buttonLoad.getElement(), Position.BEFOREEND);
      this._buttonLoad.getElement().addEventListener(`click`, buttonLoadHandler);
    }

    this._sort.getElement()
      .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _renderTask(taskMock) {
    const task = new Task(taskMock);
    const taskEdit = new TaskEdit(taskMock);
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._taskList.getElement().replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    task.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        this._taskList.getElement().replaceChild(taskEdit.getElement(), task.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEdit.getElement()
      .querySelector(`.card__save`)
      .addEventListener(`click`, () => {
        this._taskList.getElement().replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(this._taskList.getElement(), task.getElement(), Position.BEFOREEND);
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._taskList.getElement().innerHTML = ``;
    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        sortedByDateUpTasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        sortedByDateDownTasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
      case `default`:
        this._tasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
    }
  }

  _renderTasks(tasks, count) {
    count = count <= this._tasksForLoad.length ? count : this._tasksForLoad.length;
    for (let i = 0; i < count; i++) {
      this._renderTask(tasks[i]);
    }
    this._tasksForLoad = this._tasksForLoad.slice(count);
  }
}
