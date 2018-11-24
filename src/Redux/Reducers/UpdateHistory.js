export default (state = true, action) => {
  switch (action.type) {
    case "UPDATE_HISTORY":
      return action.payload;
    default:
      return state;
  }
};
