export default (state = "thumb_up", action) => {
  switch (action.type) {
    case "INTERNAL_NOTIFICATION_ICON":
      return action.payload;
    default:
      return state;
  }
};
