// src/js/reducers/index.js
import { ADD_ARTICLE } from "../constants/actions-types";

const initialState = {
    showForm: false
  };
  
  function rootReducer(state = initialState, action) {
    if (action.type === ADD_ARTICLE) {
        return action.payload;
    }
    return state;
  };
  
  export default rootReducer;