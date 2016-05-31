import makeLogs, { Decorated } from './makeLogs';

export default function createRendererLogger(logger = console) {
  return store => next => action => {
    const prevState = store.getState();
    const handled = next(action);
    const nextState = store.getState();

    let logBuffer = makeLogs(action, prevState, nextState);

    logBuffer.forEach((row) => {
      // handle row before print.
      row = row.reduce((container, part, index) => {
        if (part instanceof Decorated) {
          return container.concat(decorate(part.text, part.style));
        }

        container.push(part);
        return container;
      }, []);

      logger.log(...row);
    });

    return handled;
  };
}

function decorate(text, styleType) {
  let style = styles[styleType];
  if ( ! style) {
    return text;
  }

  return [`%c${text}`, `color: ${style}; font-weight: bold`];
}

const styles = {
  title: 'black',
  action: 'blue',
  prev: 'red',
  next: 'green'
}
