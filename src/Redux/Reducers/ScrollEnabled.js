export default (state = true, action) => {
  switch (action.type) {
    case "SCROLL_ENABLED":
      return action.payload;
    default:
      return state;
  }
};
