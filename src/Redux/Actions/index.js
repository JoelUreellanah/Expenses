export const updateDashboard = bool => {
  return {
    type: "UPDATE_DASHBOARD",
    payload: bool
  };
};

export const updateAddBill = bool => {
  return {
    type: "UPDATE_ADD_BILL",
    payload: bool
  };
};

export const updateHistory = bool => {
  return {
    type: "UPDATE_HISTORY",
    payload: bool
  };
};

export const updateCategoryList = bool => {
  return {
    type: "UPDATE_CATEGORY_LIST",
    payload: bool
  };
};

export const updateCardList = bool => {
  return {
    type: "UPDATE_CARD_LIST",
    payload: bool
  };
};

export const showInternalNotification = bool => {
  return {
    type: "SHOW_INTERNAL_NOTIFICATION",
    payload: bool
  };
};

export const internalNotificationMessage = message => {
  return {
    type: "INTERNAL_NOTIFICATION_MESSAGE",
    payload: message
  };
};

export const internalNotificationIcon = icon => {
  return {
    type: "INTERNAL_NOTIFICATION_ICON",
    payload: icon
  };
};

export const swipedLeft = bool => {
  return {
    type: "SWIPED_LEFT",
    payload: bool
  };
};

export const swiped = bool => {
  return {
    type: "SWIPED",
    payload: bool
  };
};

export const scrollEnabled = bool => {
  return {
    type: "SCROLL_ENABLED",
    payload: bool
  };
};

export const loading = bool => {
  return {
    type: "LOADING",
    payload: bool
  };
};
