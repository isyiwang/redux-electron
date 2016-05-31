import createBrowerStore from './utils/createBrowerStore';
import createRendererStore from './utils/createRendererStore';
import createCommandLineLogger from './utils/createCommandLineLogger';
import createRendererLogger from './utils/createRendererLogger';

var storeEnhancer = null;
var createLogger = (process.type === 'browser')
  ? createCommandLineLogger
  : createRendererLogger;

module.exports = {
  createBrowerStore,
  createRendererStore,
  createLogger
};
