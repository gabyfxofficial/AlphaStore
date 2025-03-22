import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const cartInitialState = { items: [] };
const wishlistInitialState = { items: [] };
const orderHistoryInitialState = { orders: [] };

function cartReducer(state = cartInitialState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
}

function wishlistReducer(state = wishlistInitialState, action) {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      if (state.items.find((item) => item.id === action.payload.id))
        return state;
      return { ...state, items: [...state.items, action.payload] };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
}

function orderHistoryReducer(state = orderHistoryInitialState, action) {
  switch (action.type) {
    case "ADD_ORDER":
      return { orders: [...state.orders, action.payload] };
    case "CLEAR_ORDER_HISTORY":
      return { orders: [] };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  orderHistory: orderHistoryReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
