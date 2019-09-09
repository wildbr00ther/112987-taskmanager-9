import {mockArray} from './../data.js';
import {createElement} from './utils';

// const titleFilter = [`all`, `overdue`, `today`, `favotites`, `repeating`, `tags`, `archive`];
const tasks = mockArray;

export class Filters {
  constructor() {
    this._element = null;
    this._title = [`all`, `overdue`, `today`, `favotites`, `repeating`, `tags`, `archive`];
    this._count = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate().trim());
    }
    return this._element;
  }

  setCount(value) {
    let count = 0;
    switch (value) {
      case `isFavorite`:
        tasks.forEach((task) => task[value] ? count++ : null);
        this._count = count;
        return count;

      case `dueDate`:
        tasks.forEach((task) => task[value] < Date.now() ? count++ : null);
        this._count = count;
        return count;

      case `repeatingDays`:
        tasks.forEach(function (task) {
          let taskArray = Object.keys(task.repeatingDays).map((i) => task.repeatingDays[i]);
          taskArray = Object.keys(taskArray).some((day) => taskArray[day]) ? count++ : null;
        });
        this._count = count;
        return count;

      case `tags`:
        let tagsSet = new Set();
        tasks.forEach(function (task) {
          for (let elem of task.tags) {
            tagsSet.add(elem);
          }
        });
        this._count = tagsSet.size;
        count = this._count;
        return count;

      case `today`:
        tasks.forEach(function (task) {
          let time = new Date(task.dueDate).toDateString();
          let today = new Date().toDateString();
          if (time === today) {
            count++;
          }
        });
        this._count = count;
        return count;

      case `all`:
        tasks.forEach((task) => task ? count++ : null);
        this._count = count;
        return count;

      case `isArchive`:
        tasks.forEach((task) => task.isArchive ? count++ : null);
        this._count = count;

        return count;
    }
    return count;
  }

  getTemplate() {
    return `
    <section class="main__filter filter container">
    <input
      type="radio"
      id="filter__all"
      class="filter__input visually-hidden"
      name="filter"
      checked
    />
    <label for="filter__all" class="filter__label">
      ${this._title[0]}
      <span class="filter__all-count">${this.setCount(`all`)}</span>
    </label>
    <input
      type="radio"
      id="filter__overdue"
      class="filter__input visually-hidden"
      name="filter"
      disabled
    />
    <label for="filter__overdue" class="filter__label">
      ${this._title[1]}
      <span class="filter__overdue-count">${this.setCount(`dueDate`)}</span>
    </label>
    <input
      type="radio"
      id="filter__today"
      class="filter__input visually-hidden"
      name="filter"
      disabled
    />
    <label for="filter__today" class="filter__label">
      ${this._title[2]}
      <span class="filter__today-count">${this.setCount(`today`)}</span>
    </label>
    <input
      type="radio"
      id="filter__favorites"
      class="filter__input visually-hidden"
      name="filter"
      disabled
    />
    <label for="filter__favorites" class="filter__label">
      ${this._title[3]}
      <span class="filter__favorites-count">${this.setCount(`isFavorite`)}</span>
    </label>
    <input
      type="radio"
      id="filter__repeating"
      class="filter__input visually-hidden"
      name="filter"
      disabled
    />
    <label for="filter__repeating" class="filter__label">
      ${this._title[4]} 
      <span class="filter__repeating-count">${this.setCount(`repeatingDays`)}</span>
    </label>
    <input
      type="radio"
      id="filter__tags"
      class="filter__input visually-hidden"
      name="filter"
      disabled
    />
    <label for="filter__tags" class="filter__label">
      ${this._title[5]}
      <span class="filter__tags-count">${this.setCount(`tags`)}</span>
    </label>
    <input
      type="radio"
      id="filter__archive"
      class="filter__input visually-hidden"
      name="filter"
    />
    <label for="filter__archive" class="filter__label">
      ${this._title[6]}
      <span class="filter__archive-count">${this.setCount(`isArchive`)}</span>
    </label>
  </section>`;
  }
}
