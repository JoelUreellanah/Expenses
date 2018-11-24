export default (state = true, action) => {
  switch (action.type) {
    case "UPDATE_CATEGORY_LIST":
      return action.payload;
    default:
      return state;
  }
};
