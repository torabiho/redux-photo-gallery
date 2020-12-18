import React from 'react';
import { render } from 'react-dom';
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import App from './components/App';
import rootReducer from './reducers';
import websocket from './middleware/websocket';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, websocket)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)