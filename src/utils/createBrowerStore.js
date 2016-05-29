import { ipcMain } from 'electron';
import { createStore } from 'redux';

export default function createBrowerStore(...args) {
  const store = createStore(...args);

  /**
   * List of renderer webContents.
   * @var array
   */
  let clients = [];

  // Register renderer which created by 'configureRendererStore'.
  ipcMain.on('renderer-register', (event) => {
    let { sender } = event;

    if (0 > clients.indexOf(sender)) {
      clients.push(sender);
    }

    sender.send('update-state', store.getState());
  });

  // Handle renderer dispatch, get new state, and broadcast to clients.
  ipcMain.on('renderer-dispatch', (event, action) => {
    let prevState = store.getState();
    store.dispatch(action);
    let newState = store.getState();

    if ( ! newState) {
      throw 'Reducer does not return anything, please check out your reducer.'
    }

    clients.forEach((webContents) => {
      webContents.send('update-state', newState, prevState, action);
    });
  });

  return store;
}
