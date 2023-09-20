import {
  ALL_USERS_LIST,
  SELECTED_USERS,
  SET_GROUP_INFO,
  SET_GROUP_STATE,
  SET_GROUP_ALL_MEMBERS,
} from '../Types';

const initialState = {
  allUsersList: [],
  selectedUsers: [],
  groupInfo: '',
  groupState: {
    name: '',
    Intro: '',
    image: '',
    groupImage: '',
  },
  groupAllMembers: [],
};

const AppReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ALL_USERS_LIST:
      return {...state, allUsersList: payload};
    case SELECTED_USERS:
      return {...state, selectedUsers: payload};
    case SET_GROUP_INFO:
      return {...state, groupInfo: payload};
    case SET_GROUP_STATE:
      return {...state, groupState: {...payload}};
    case SET_GROUP_ALL_MEMBERS:
      return {...state, groupAllMembers: payload};
    default:
      return state;
  }
};

export default AppReducer;
