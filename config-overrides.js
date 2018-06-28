const {resolve} = require("path");

/**
 * This overrides the default create-react-app webpack config. It will be called by react-app-rewired.
 * WARNING: While changing this config stay  concise and create subfunctions to change deep properties
 * @param {object} config
 * @param {"production"|"development"|"test"} env
 * @returns {object}
 */
module.exports = (config, env) => ({
  ...config,
  devtool: "source-map",
  resolve: {
    ...config.resolve,
    modules: [resolve(__dirname, 'src'), 'node_modules']
  }
});