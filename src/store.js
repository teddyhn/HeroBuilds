import { createStore } from "redux";
import rootReducer from './reducers';

export default function initializeStore(initialState = {}) {
    return createStore(
        rootReducer,
        initialState
    );
}