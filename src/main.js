import {Menu} from './components/menu.js';
import {Search} from './components/search.js';
import {Sort} from './components/sort';
import {Filters} from './components/filter.js';
import {Board} from './components/board.js';
import {Task} from './components/task.js';
import {TaskEdit} from './components/edit-task.js';
import {ButtonLoad} from './components/show-more-btn.js';
import {getTask, mockArray} from './data.js';
import {Position, render, unrender} from './components/utils.js';

const mainContainer = document.querySelector(`.main`);
const menuContainer = document.querySelector(`.main__control`);
export const CARD_COUNT = 9;
let tasksForLoad = mockArray;

const taskMocks = new Array(CARD_COUNT)
  .fill(``)
  .map(getTask);

// Меню
const menu = new Menu();
render(menuContainer, menu.getElement(), Position.BEFOREEND);

// Поиск
const search = new Search();
render(mainContainer, search.getElement(), Position.BEFOREEND);

// Фильтры
const filters = new Filters();
render(mainContainer, filters.getElement(), Position.BEFOREEND);

// Доска
const boardContainer = new Board();
render(mainContainer, boardContainer.getElement(), Position.BEFOREEND);

const boardList = document.querySelector(`.board`);

// Сортировка
const sort = new Sort();
render(boardList, sort.getElement(), Position.AFTERBEGIN);

// Показать еще
const buttonLoad = new ButtonLoad();
const buttonLoadHandler = () => {
  renderTasks(tasksForLoad, CARD_COUNT);

  if (tasksForLoad.length === 0) {
    unrender(buttonLoad.getElement());
    buttonLoad.set();
  }
};
render(boardList, buttonLoad.getElement(), Position.BEFOREEND);
buttonLoad.getElement().addEventListener(`click`, buttonLoadHandler);

const renderTask = (taskMock) => {
  const task = new Task(taskMock);
  const taskEdit = new TaskEdit(taskMock);
  const tasksContainer = document.querySelector(`.board__tasks`);
  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  task.getElement()
    .querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {
      tasksContainer.replaceChild(taskEdit.getElement(), task.getElement());
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
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  render(tasksContainer, task.getElement(), Position.BEFOREEND);
};
const renderTasks = (tasks, count) => {
  count = count <= tasksForLoad.length ? count : tasksForLoad.length;
  for (let i = 0; i < count; i++) {
    renderTask(tasks[i]);
  }
  tasksForLoad = tasksForLoad.slice(count);
};

renderTasks(taskMocks, CARD_COUNT);
