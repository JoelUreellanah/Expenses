export default (state = false, action) => {
  switch (action.type) {
    case "SWIPED":
      return action.payload;
    default:
      return state;
  }
};
