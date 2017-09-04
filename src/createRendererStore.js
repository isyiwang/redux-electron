const { ipcRenderer } = window.require('electron');
import { createStore } from 'redux';

export default function createRendererStore(enhancer) {
  if (process.type === 'browser') {
    throw new Error('createRendererStore only available in the renderer process.');
  }

  // register this renderer process and get initial state.
  let initialState = ipcRenderer.sendSync('renderer-register');

  // pseudo-reducer
  let currectUpdated;
  const reducer = (state = initialState, action) => {
    if (currectUpdated) {
      return Object.assign({}, state, currectUpdated);
    }

    return state;
  };

  const store = createStore(reducer, enhancer);

  store._dispatch = store.dispatch;
  store.dispatch = (action) => {
    (action) && ipcRenderer.send('renderer-dispatch', action);
  };

  ipcRenderer.on('update-state', (event, dispatchedAction, updatedState) => {
    currectUpdated = updatedState;
    store._dispatch(dispatchedAction);
  });

  return store;
}
