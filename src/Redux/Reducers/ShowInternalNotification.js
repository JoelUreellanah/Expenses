export default (state = false, action) => {
  switch (action.type) {
    case "SHOW_INTERNAL_NOTIFICATION":
      return action.payload;
    default:
      return state;
  }
};
