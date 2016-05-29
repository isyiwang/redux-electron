import createBrowerStore from './utils/createBrowerStore';
import configureRendererStore from './utils/configureRendererStore';
import createCommandLineLogger from './utils/createCommandLineLogger';
import createRendererLogger from './utils/createRendererLogger';

var storeEnhancer = null;
var createLogger = (process.type === 'browser')
  ? createCommandLineLogger
  : createRendererLogger;

module.exports = {
  createBrowerStore,
  configureRendererStore,
  createLogger
};
