import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice'; // Import your rootReducer or slices

const store = configureStore({
    reducer: {
        cart: cartReducer,
      },
});

export default store;
