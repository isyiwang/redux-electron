import { ipcMain } from 'electron';
import { createStore } from 'redux';
import objectUpdated from './utils/objectUpdated';

export default function createMainStore(...args) {
  if (process.type !== 'browser') {
    throw new Error('createMainStore only available in the main process.');
  }

  const store = createStore(...args);

  // List of renderer webContents.
  let clients = [];

  ipcMain.on('renderer-register', (event) => {
    let { sender } = event;

    if (0 > clients.indexOf(sender)) {
      clients.push(sender);
    }

    event.returnValue = store.getState();
  });

  // Handle renderer dispatching, get new state, and broadcast to clients.
  ipcMain.on('renderer-dispatch', (event, action) => {
    let prevState = store.getState();
    store.dispatch(action);
    let newState = store.getState();
    let updated = objectUpdated(prevState, newState);

    clients.forEach((webContents) => {
      webContents.send('update-state', action, updated);
    });
  });

  return store;
}
