export const initialState = {
  rawRegisterData: {
    name: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    errors: {},
  },
  rawLoginData: {
    email: "",
    password: "",
    errors: {},
  },
  rawForgotPassData: {
    email: " ",
    emailHasBeenSent: false,
    errors: {},
  },
  user: null,
};

const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.user };
    case "SET_LOGINDATA":
      return { ...state, rawLoginData: { ...action.payload } };
    case "SET_REGISTERDATA":
      return {
        ...state,
        rawRegisterData: { ...action.payload },
      };

    case "SET_FORGOTPASSWORD":
      return { ...state, rawForgotPassData: { ...action.payload } };
    default:
      return state;
  }
};

export default Reducer;
