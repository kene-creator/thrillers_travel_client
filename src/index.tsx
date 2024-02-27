import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  PERSIST,
  REHYDRATE,
  PAUSE,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import authReducer from "./app/auth_state";

import {
  createClient,
  fetchExchange,
  cacheExchange,
  Provider as UrqlProvider,
} from "urql";

const client = createClient({
  url: "http://localhost:3002/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PERSIST, REHYDRATE, PAUSE, PURGE, REGISTER],
      },
    }),
});

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <UrqlProvider value={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <App />
        </PersistGate>
      </Provider>
    </UrqlProvider>
  </React.StrictMode>
);

reportWebVitals();
