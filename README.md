# redux-electron

## Installation
```bash
npm install redux-electron
```
## Usage
#### Main Process
```javascript
import { applyMiddleware, compose } from 'redux';
import { createMainStore } from 'redux-electron';

let enhancer = compose(
  applyMiddleware(...middlewares)
);

const store = createMainStore(rootReducer, enhancer);
```
#### Window / Renderer
```javascript
import { applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import { createRendererStore } from 'redux-electron';

let middlewares = [
  createLogger(),
  ...
];

let enhancer = compose(
  applyMiddleware(...middlewares)
);

const store = createRendererStore(enhancer);

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'));
```
