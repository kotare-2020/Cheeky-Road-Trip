const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ANIMALS":
      return action.animals;
    default:
      return state;
  }
};

export default reducer