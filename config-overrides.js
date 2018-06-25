/**
 * This overrides the default create-react-app webpack config
 * WARNING: While changing this config stay  concise and create subfunctions to change deep properties
 * @param {object} config
 * @param {"production"|"development"|"test"} env
 * @returns {object}
 */
module.exports = (config, env) => ({
  ...config,
  devtool: "source-map"
});