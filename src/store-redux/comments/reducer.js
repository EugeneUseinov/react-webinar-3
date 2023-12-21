const initialState = {
  data: {},
  waiting: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/getComments-start":
      return { ...state, data: {}, waiting: true };
    case "comments/getComments-success":
      return {
        ...state,
        data: action.payload.data,
        waiting: false,
      };
    case "comments/getComments-error":
      return { ...state, data: {}, waiting: false };
    case "comments/postComments-start":
      return { ...state, waiting: true };
    case "comments/postComments-success":
      return {
        ...state,
        data: {
          items: [...state.data.items, action.payload.data],
        },

        waiting: false,
      };
    case "comments/postComments-error":
      return { ...state, waiting: false };
    default:
      return state;
  }
}

export default reducer;
