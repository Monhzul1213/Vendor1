import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { loginReducer, constantsReducer } from '../services';

const reducers = combineReducers({
  login: loginReducer,
  constants: constantsReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['constants'],
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
});

let persistor = persistStore(store);

export { store, persistor };