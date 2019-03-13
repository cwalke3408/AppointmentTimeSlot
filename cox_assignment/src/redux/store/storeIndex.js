import { createStore } from "redux";
import rootReducer from "../reducers/reducerIndex";

const store = createStore(rootReducer);

export default store;