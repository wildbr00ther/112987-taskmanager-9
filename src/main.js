import {getMenuMarkup} from './components/menu.js';
import {getSearchMarkup} from './components/search.js';
import {getFiltersMarkup, getFilter} from './components/filter.js';
import {getBoardMarkup} from './components/board.js';
import {getTaskMarkup} from './components/task.js';
import {getTaskEditMarkup} from './components/edit-task.js';
import {getLoadButtonMarkup} from './components/show-more-btn.js';
import mockArray from './data.js';

const mainContainer = document.querySelector(`.main`);
const menuContainer = document.querySelector(`.main__control`);
export const TASK_COUNT = 9;
export const tasks = mockArray;
let tasksForLoad = mockArray;

const renderComponent = (markup, container, repeat = 1, callback = () => null) => {
  for (let i = 0; i < repeat; i++) {
    container.insertAdjacentHTML(`beforeend`, markup);
  }
  callback();
};

const renderTaskEdit = (container) => {
  let {description, dueDate, repeatingDays, tags, color} = tasksForLoad[0];
  container.insertAdjacentHTML(`beforeend`, getTaskEditMarkup({description, dueDate, repeatingDays, tags, color}));
  tasksForLoad = tasksForLoad.slice(1);
};

const renderTasks = (container, count) => {
  count = count <= tasksForLoad.length ? count : tasksForLoad.length;
  for (let i = 0; i < count; i++) {
    let {description, dueDate, repeatingDays, tags, color} = tasksForLoad[i];
    container.insertAdjacentHTML(`beforeend`, getTaskMarkup({description, dueDate, repeatingDays, tags, color}));
  }
  tasksForLoad = tasksForLoad.slice(count);
};

const renderFilters = (container) => {
  container.insertAdjacentHTML(`beforeend`, new Array(1)
    .fill(``)
    .map(getFilter)
    .map(getFiltersMarkup)
    .join(``));
};


renderComponent(getMenuMarkup(), menuContainer);
renderComponent(getSearchMarkup(), mainContainer);
renderFilters(mainContainer);
renderComponent(getBoardMarkup(), mainContainer, 1, () => {
  const boardContainer = document.querySelector(`.board`);
  const taskListContainer = document.querySelector(`.board__tasks`);

  renderTaskEdit(taskListContainer);
  renderTasks(taskListContainer, TASK_COUNT);

  renderComponent(getLoadButtonMarkup(), boardContainer);
  const loadMoreButton = document.querySelector(`.load-more`);

  const loadMoreButtonHandler = () => {
    renderTasks(taskListContainer, TASK_COUNT);
    if (tasksForLoad.length === 0) {
      loadMoreButton.removeEventListener(`click`, loadMoreButtonHandler);
      loadMoreButton.remove();
    }
  };
  loadMoreButton.addEventListener(`click`, loadMoreButtonHandler);
});
