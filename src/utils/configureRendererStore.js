import { ipcRenderer } from 'electron';
import { createStore } from 'redux';

export default function configureRendererStore(enhancer) {

  let reducer = (state = {}, action) => {
    return action.nextState || state;
  };

  let store = createStore(reducer, undefined, enhancer);

  store._dispatch = store.dispatch;
  store.dispatch = (action) => {
    if (action) {
			ipcRenderer.send('renderer-dispatch', action);
    }
  };

  ipcRenderer.on('update-state', (event, nextState, prevState, dispatched) => {
    store._dispatch({ type: '', nextState, prevState, dispatched });
  });

	ipcRenderer.send('renderer-register');

  return store;
}
