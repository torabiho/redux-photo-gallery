import * as actionTypes from '../constants/actions';
let ws;

const websocket = store => next => action => {
  const dispatch = store.dispatch;
  switch (action.type) {
    case actionTypes.WEBSOCKET_CONNECT:
      ws = new WebSocket(action.payload.url);
      ws.onopen = () => dispatch({ type: actionTypes.WEBSOCKET_OPEN });
      ws.onclose = (event) => dispatch({ type: actionTypes.WEBSOCKET_CLOSE, payload: event });
      ws.onmessage = (event) => dispatch({ type: actionTypes.WEBSOCKET_MESSAGE, payload: event });

      break;

    case actionTypes.WEBSOCKET_SEND:
      ws.send(JSON.stringify(action.payload));
      break;

    case actionTypes.WEBSOCKET_DISCONNECT:
      ws.close();
      break;

    default:
      break;
  };

  return next(action);
};

export default websocket;