const {configGenerator} = require("./webpack.generator.js");

module.exports = (env, options) => [
	configGenerator(options, 'glb-generator', ['index'], []),
	configGenerator(options, 'load-asset-3d', ['index'], [])
];