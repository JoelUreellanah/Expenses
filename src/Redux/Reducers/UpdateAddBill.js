export default (state = false, action) => {
  switch (action.type) {
    case "UPDATE_ADD_BILL":
      return action.payload;
    default:
      return state;
  }
};
