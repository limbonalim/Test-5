import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import { usersReducers } from '../feathers/users/usersSlice.ts';
import { productsReducer } from '../feathers/products/productsSlice.ts';
import { categoriesReducer } from '../feathers/categories/categoriesSlice.ts';



const usersPersistConfig = {
  key: 'reddit:users',
  storage: storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  users: persistReducer(usersPersistConfig, usersReducers)
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER]
    }
  })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;