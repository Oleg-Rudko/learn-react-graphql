import { initialState } from "./initialState";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_CREDENTIAL": {
      return {
        ...state,
        user: action.user,
      };
    }

    case "SET_LOADING": {
      return {
        ...state,
        loading: action.loading,
      }
    }

    default: {
      return state;
    }
  }
};

export default reducer;
