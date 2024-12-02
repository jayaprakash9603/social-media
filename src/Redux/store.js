import { legacy_createStore, applyMiddleware, combineReducers } from "redux"; // Correct import for legacy_createStore
import { thunk } from "redux-thunk"; // Correct import for thunk
import { authReducer } from "./Auth/auth.reducer"; // Ensure this path is correct
import { postReducer } from "./Post/post.reducer";

// Combine reducers
const rootreducers = combineReducers({
  auth: authReducer,
  post: postReducer,
});

// Create store with middleware
export const store = legacy_createStore(rootreducers, applyMiddleware(thunk));
