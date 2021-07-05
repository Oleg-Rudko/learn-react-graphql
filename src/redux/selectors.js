import { createSelector } from "reselect";

export const userId = (state) => state.user.id;
export const spinner = (state) => state.loading;
export const getFiilterName = (state) => state.filterTodos;

export const getFilterTodos = createSelector(
  getFiilterName,
  (filterName) => {
    switch (filterName) {
      case "active": {
        return [false];
      }

      case "completed": {
        return [true];
      }

      default: {
        return [false, true];
      }
    }
  }
);
