export default (state = true, action) => {
  switch (action.type) {
    case "UPDATE_CARD_LIST":
      return action.payload;
    default:
      return state;
  }
};
