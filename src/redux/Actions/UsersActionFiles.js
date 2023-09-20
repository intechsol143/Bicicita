import {
  USERS,
  ALL_USERS_LIST,
  SELECTED_USERS,
  UPDATED_USER,
  IEMAIL,
  CITIES_LIST,
  REG_CITIES,
  UPDATE_APOINTMNT,
  EDIT_PROFILECITIES,
  APOINTMENT_LOOKING,
  SEARCH_FRIENDS,
  TOKEN,
  LOGOUT,
  UPDATE_BADGE,
  NULLBADGE,
  SELECT_FRIENDS,
  SELECT_MEMBERS,
  SET_GROUP_INFO,
  SET_GROUP_STATE,
  SET_GROUP_ALL_MEMBERS,
} from '../Types';
// import {Store} from '../src/redux/ConfigFile';
import {Store} from '../ConfigFile';
import {unread} from '../../lib/api';
export const ToggleLoginSignup = (payload) => (dispatch) => {
  payload === null
    ? dispatch({type: LOGOUT})
    : dispatch({type: USERS, payload});
};
export const iphoneEmail = (payload) => (dispatch) => {
  dispatch({type: IEMAIL, payload});
};
export const Toggle_Update_User = (payload) => (dispatch) => {
  dispatch({type: UPDATED_USER, payload});
};

export const allUsersList = (payload) => (dispatch) => {
  dispatch({type: ALL_USERS_LIST, payload});
};

export const setSelectedUsers = (payload) => (dispatch) => {
  dispatch({type: SELECTED_USERS, payload});
};

export const ToggleCities = (payload) => (dispatch) => {
  dispatch({type: CITIES_LIST, payload});
};
export const ToggleRegCities = (payload) => (dispatch) => {
  dispatch({type: REG_CITIES, payload});
};
export const ToggleApointments = (payload) => (dispatch) => {
  dispatch({type: UPDATE_APOINTMNT, payload});
};
export const ToggleLookApointment = (payload) => (dispatch) => {
  dispatch({type: APOINTMENT_LOOKING, payload});
};
export const ToggleEditprofileCities = (payload) => (dispatch) => {
  dispatch({type: EDIT_PROFILECITIES, payload});
};
export const ToggleToken = (payload) => (dispatch) => {
  dispatch({type: TOKEN, payload});
};
export const ToggleSearchFriends = (payload) => (dispatch) => {
  dispatch({type: SEARCH_FRIENDS, payload});
};

export const updateBadge = (payload) => async (dispatch) => {
  const {user} = Store.getState().stakreducer;
  // console.log('state in action', user.userdata.api_token);
  const res = await unread({Auth: user.userdata.api_token});
  // console.log('res', res);
  dispatch({type: UPDATE_BADGE, payload: res.unread_badge});
};
export const nullBadge = (payload) => (dispatch) => {
  console.log('badge null', payload);
  dispatch({type: NULLBADGE, payload});
};
export const selectFriends = (payload) => (dispatch) => {
  dispatch({type: SELECT_FRIENDS, payload});
};

export const selectMembers = (payload) => (dispatch) => {
  dispatch({type: SELECT_MEMBERS, payload});
};

export const setGroupInfo = (payload) => (dispatch) => {
  dispatch({type: SET_GROUP_INFO, payload});
};

export const setGroupState = (payload) => (dispatch) => {
  dispatch({type: SET_GROUP_STATE, payload});
};

export const setGroupAllMembers = (payload) => (dispatch) => {
  dispatch({type: SET_GROUP_ALL_MEMBERS, payload});
};
