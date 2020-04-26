const initialState = { show: true };

export default function(state = initialState, action) {
  switch (action.type) {
    case "SET_MODAL_SHOW":
        return {
            show: action.payload
        }
    default:
      return state;
  }
}