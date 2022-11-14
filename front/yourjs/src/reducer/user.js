const initialState = {
  nickname: '',
  select: -1,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'login': {
      return {
        ...state,
        nickname: action.nickname,
      };
    }
    case 'logout': {
      return {
        ...state,
        nickname: '',
      };
    }
    case 'selected': {
      return {
        ...state,
        select: action.select,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
