const initialState = { 
  show: false,
  code: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "SET_MODAL_SHOW":
      return {
        ...state,
        show: action.payload
      }
    case "SET_MODAL_CODE":
      return {
        ...state,
        code: action.payload
      }
    default:
      return state;
  }
}