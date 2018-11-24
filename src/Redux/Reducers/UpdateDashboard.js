export default (state = true, action) => {
  switch (action.type) {
    case "UPDATE_DASHBOARD":
      return action.payload;
    default:
      return state;
  }
};
