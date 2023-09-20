import {SELECT_FRIENDS, SELECT_MEMBERS} from '../Types';

const initialState = {
  Newelectedata: [],
  selectedMembers: [],
};

const friendsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SELECT_FRIENDS:
      return {
        ...state,
        Newelectedata: payload,
      };
    case SELECT_MEMBERS:
      return {
        ...state,
        selectedMembers: payload,
      };

    default:
      return state;
  }
};
export default friendsReducer;
