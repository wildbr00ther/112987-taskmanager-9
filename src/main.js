import {BoardController} from './components/board-controller';
import {getTask} from './data';

const mainContainer = document.querySelector(`.main`);
const menuContainer = document.querySelector(`.main__control`);
// let tasksForLoad = mockArray;
export const CARD_COUNT = 9;

const taskMocks = new Array(CARD_COUNT)
  .fill(``)
  .map(getTask);

const boardController = new BoardController(mainContainer, menuContainer, taskMocks);
boardController.init();

// const renderTasks = (tasks, count) => {
//   count = count <= tasksForLoad.length ? count : tasksForLoad.length;
//   for (let i = 0; i < count; i++) {
//     renderTask(tasks[i]);
//   }
//   tasksForLoad = tasksForLoad.slice(count);
// };
//
// // Меню
// const menu = new Menu();
// render(menuContainer, menu.getElement(), Position.BEFOREEND);
//
// // Поиск
// const search = new Search();
// render(mainContainer, search.getElement(), Position.BEFOREEND);
//
// // Фильтры
// const filters = new Filters();
// render(mainContainer, filters.getElement(), Position.BEFOREEND);
// // Доска
// const boardContainer = new BoardContainer();
// render(mainContainer, boardContainer.getElement(), Position.BEFOREEND);
//
// const boardList = document.querySelector(`.board`);
// const tasksContainer = document.querySelector(`.board__tasks`);
//
// if (mockArray.length === 0 || mockArray.length === filters._count) {
//   const noTask = new NoTask();
//   boardList.replaceChild(noTask.getElement(), tasksContainer);
// } else {
//   // Сортировка
//   const sort = new Sort();
//   render(boardList, sort.getElement(), Position.AFTERBEGIN);
//
//   // Показать еще
//   const buttonLoad = new ButtonLoad();
//   const buttonLoadHandler = () => {
//     renderTasks(tasksForLoad, CARD_COUNT);
//
//     if (tasksForLoad.length === 0) {
//       unrender(buttonLoad.getElement());
//       buttonLoad.set();
//     }
//   };
//   render(boardList, buttonLoad.getElement(), Position.BEFOREEND);
//   buttonLoad.getElement().addEventListener(`click`, buttonLoadHandler);
// }
//
// renderTasks(taskMocks, CARD_COUNT);
