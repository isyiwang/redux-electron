import { ipcRenderer } from 'electron';
import { createStore } from 'redux';

export default function createRendererStore(enhancer) {
  if (process.type === 'browser') {
    throw 'createRendererStore only available in the renderer process.';
  }

  // register this renderer process and get initial state.
  let initialState = ipcRenderer.sendSync('renderer-register');

  // pseudo-reducer
  let pointer = {};
  const reducer = (state = initialState, action) => {
    return pointer.nextState || state;
  };

  const store = createStore(reducer, enhancer);

  store._dispatch = store.dispatch;
  store.dispatch = (action) => {
    (action) && ipcRenderer.send('renderer-dispatch', action);
  };

  ipcRenderer.on('update-state', (event, dispatchedAction, nextState) => {
    pointer.nextState = nextState;
    store._dispatch(dispatchedAction);
  });

  return store;
}
