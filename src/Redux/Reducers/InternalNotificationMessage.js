export default (state = "Notification", action) => {
  switch (action.type) {
    case "INTERNAL_NOTIFICATION_MESSAGE":
      return action.payload;
    default:
      return state;
  }
};
