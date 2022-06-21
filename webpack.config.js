const {configGenerator} = require("./webpack.generator.js");

module.exports = (env, options) => [
	configGenerator(options, 'doc', ['index'], []),
	// configGenerator(options, 'glb-generator', ['index'], []),
	// configGenerator(options, 'load-asset-3d', ['index'], []),
	// configGenerator(options, 'obj-smt', ['index'], []),
	configGenerator(options, 'avatar', ['index'], [])
]; 