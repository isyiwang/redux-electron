# redux-electron

## Installation
```bash
npm install redux-electron
```
## Usage
#### Main Process / Browser
```javascript
import { applyMiddleware, compose } from 'redux';
import { createBrowerStore } from 'redux-electron';

let enhancer = compose(
  applyMiddleware(...middlewares)
);

const store = createBrowerStore(rootReducer, enhancer);
```
#### View / Renderer
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
