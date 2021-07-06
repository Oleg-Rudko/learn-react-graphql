import { createSelector } from "reselect";

export const userId = (state) => state.user.id;
export const spinner = (state) => state.loading;
export const getFilterName = (state) => state.filterTodos;
export const getAssignmentsId = (state) => state.user?.assignments?.id;

export const getFilterTodos = createSelector(getFilterName, (filterName) => {
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
});
