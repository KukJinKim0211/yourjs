const initialState = {
  nickname: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'login': {
      console.log(action.nickname);
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
    default:
      return state;
  }
};

export default userReducer;
