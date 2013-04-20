/* Sync the model database */

// Check if we're syncing actual or test library
var lib_path = process.env['LIB_COV'] ? './lib-cov' : './lib';

models = require(lib_path + '/models');

for (model in models) {
  models[model].sync();
}

