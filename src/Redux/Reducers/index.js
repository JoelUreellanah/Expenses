import { combineReducers } from "redux";
import UpdateDashboard from "./UpdateDashboard";
import UpdateAddBill from "./UpdateAddBill";
import UpdateHistory from "./UpdateHistory";
import UpdateCategoryList from "./UpdateCategoryList";
import UpdateCardList from "./UpdateCardList";
import ShowInternalNotification from "./ShowInternalNotification";
import InternalNotificationMessage from "./InternalNotificationMessage";
import InternalNotificationIcon from "./InternalNotificationIcon";
import SwipedLeft from "./SwipedLeft";
import Swiped from "./Swiped";
import ScrollEnabled from "./ScrollEnabled";
import Loading from "./Loading";

export default combineReducers({
  updateDashboard: UpdateDashboard,
  updateAddBill: UpdateAddBill,
  updateHistory: UpdateHistory,
  updateCategoryList: UpdateCategoryList,
  updateCardList: UpdateCardList,
  showInternalNotification: ShowInternalNotification,
  internalNotificationMessage: InternalNotificationMessage,
  internalNotificationIcon: InternalNotificationIcon,
  swipedLeft: SwipedLeft,
  swiped: Swiped,
  scrollEnabled: ScrollEnabled,
  loading: Loading
});
