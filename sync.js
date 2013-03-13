models = require('./models');

for (model in models) {
  models[model].sync();
}

