import { ipcMain } from 'electron';
import { createStore } from 'redux';

export default function createBrowerStore(...args) {
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

  // Handle renderer dispatch, get new state, and broadcast to clients.
  ipcMain.on('renderer-dispatch', (event, action) => {
    let prevState = store.getState();
    store.dispatch(action);
    let newState = store.getState();

    if (typeof newState === 'object') {
      clients.forEach((webContents) => {
        webContents.send('update-state', action, newState);
      });
    }
  });

  return store;
}
