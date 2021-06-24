import { initialState } from "./initialState";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_CREDENTIAL": {
      return {
        ...state,
        user: action.user,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
