# redux-electron

## Installation
```bash
npm install redux-electron
```
## Usage
#### Main Process / Browser
```javascript
import { applyMiddleware, compose } from 'redux';
import { createBrowerStore, createLogger } from 'redux-electron';

const loggerMiddleware = createLogger();

let middlewares = [
  loggerMiddleware,
  ...
];

let enhancer = compose(
  applyMiddleware(...middlewares)
);

let store = createBrowerStore(rootReducer, enhancer);
```
#### View Process / Renderer
```javascript
import { applyMiddleware, compose } from 'redux';
import { configureRendererStore, createLogger } from 'redux-electron';

let enhancer = compose(
  applyMiddleware(createLogger())
);

const store = configureRendererStore(enhancer);

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'));
```
