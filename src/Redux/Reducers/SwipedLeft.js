export default (state = false, action) => {
  switch (action.type) {
    case "SWIPED_LEFT":
      return action.payload;
    default:
      return state;
  }
};
