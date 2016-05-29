import { ipcMain } from 'electron';
import { createStore } from 'redux';

export default function createBrowerStore(reducer, initialState, enhancer) {

  let store = createStore(reducer, initialState, enhancer);

  let clients = [];

  ipcMain.on('renderer-register', (event) => {
    let { sender } = event;

    if (0 > clients.indexOf(sender)) {
      clients.push(sender);
    }

    sender.send('update-state', store.getState());
  });

  ipcMain.on('renderer-dispatch', (event, action) => {
    let prevState = store.getState();

    store.dispatch(action);

    let newState = store.getState();

    if ( ! newState) {
      throw 'Reducer does not return any state, please check out your reducer.'
    }

    clients.forEach((webContents) => {
      webContents.send('update-state', newState, prevState, action);
    });
  });

  return store;
}
