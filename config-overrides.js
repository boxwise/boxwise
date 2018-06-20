module.exports = function override(config, env) {
  if (env === 'development') {
    config.devtool = "source-map";
  }
  return config;
};