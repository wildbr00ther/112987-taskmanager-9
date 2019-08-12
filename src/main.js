import {getMenuMarkup} from './components/menu.js';
import {getSearchMarkup} from './components/search.js';
import {getFilterMarkup} from './components/filter.js';
import {getBoardMarkup} from './components/board.js';
import {getFilterListMarkup} from './components/filter-list.js';
import {getNewTaskMarkup} from './components/new-task.js';
import {getTaskMarkup} from './components/task.js';
import {getShowMoreMarkup} from './components/show-more-btn.js';

const renderComponent = (containerName, position, template) => {
  containerName.insertAdjacentHTML(template, position);
};

const siteMainContainer = document.querySelector(`.main`);
const siteHeaderContainer = siteMainContainer.querySelector(`.main__control`);

renderComponent(siteHeaderContainer, getMenuMarkup(), `beforeend`);
renderComponent(siteMainContainer, getSearchMarkup(), `beforeend`);
renderComponent(siteMainContainer, getFilterMarkup(), `beforeend`);
renderComponent(siteMainContainer, getBoardMarkup(), `beforeend`);

const boardContainer = siteMainContainer.querySelector(`.board`);
const tasksContainer = siteMainContainer.querySelector(`.board__tasks`);

renderComponent(boardContainer, getFilterListMarkup(), `afterbegin`);

renderComponent(tasksContainer, getNewTaskMarkup(), `beforeend`);
renderComponent(tasksContainer, getTaskMarkup(), `beforeend`);
renderComponent(tasksContainer, getTaskMarkup(), `beforeend`);
renderComponent(tasksContainer, getTaskMarkup(), `beforeend`);

renderComponent(boardContainer, getShowMoreMarkup(), `beforeend`);
