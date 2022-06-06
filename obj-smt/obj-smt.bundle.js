/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"0"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/obj-smt/index.js":
/*!******************************!*\
  !*** ./src/obj-smt/index.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/index.js */ "./src/obj-smt/js/index.js");
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scss/index.scss */ "./src/obj-smt/scss/index.scss");



/***/ }),

/***/ "./src/obj-smt/js/_web3d.js":
/*!**********************************!*\
  !*** ./src/obj-smt/js/_web3d.js ***!
  \**********************************/
/*! exports provided: web3d, debug */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "web3d", function() { return web3d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debug", function() { return debug; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.min.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three_examples_js_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/js/controls/OrbitControls */ "./node_modules/three/examples/js/controls/OrbitControls.js");
/* harmony import */ var three_examples_js_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(three_examples_js_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var three_examples_js_lights_LightProbeGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/js/lights/LightProbeGenerator */ "./node_modules/three/examples/js/lights/LightProbeGenerator.js");
/* harmony import */ var three_examples_js_lights_LightProbeGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(three_examples_js_lights_LightProbeGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var three_examples_js_loaders_RGBELoader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/js/loaders/RGBELoader.js */ "./node_modules/three/examples/js/loaders/RGBELoader.js");
/* harmony import */ var three_examples_js_loaders_RGBELoader_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(three_examples_js_loaders_RGBELoader_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader.js */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
/* harmony import */ var three_examples_jsm_loaders_FBXLoader_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/jsm/loaders/FBXLoader.js */ "./node_modules/three/examples/jsm/loaders/FBXLoader.js");
/* harmony import */ var _web3d_obj3d__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./web3d/_obj3d */ "./src/obj-smt/js/web3d/_obj3d.js");
/* harmony import */ var _web3d_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./web3d/_helper */ "./src/obj-smt/js/web3d/_helper.js");





 // var OrbitControls = require('three/examples/js/controls/OrbitControls'),
//     LightProbeGenerator = require('three/examples/js/lights/LightProbeGenerator');
// import simple_geometry_obj from "./web3d/_test";


 // ROOT

var web3d, debug;
var scene, camera, renderer, controls, mixer;
var light_hemi, light_dir, light_key, light_fill, light_back, light_top, light_bottom; // Object 3D

var data_bg, obj_bg;
var data_smt_01, obj_smt_01;
var data_bubble, obj_bubble;
var data_text, obj_text;
const clock = new three__WEBPACK_IMPORTED_MODULE_0__["Clock"]();
var metadata = {
  dna: "n/a",
  name: "n/a",
  description: "n/a",
  image: "n/a",
  date: "",
  attributes: []
};
web3d = {
  debug: false,
  helper: true,
  el: {
    renderer: $("#rendered_threed")
  },
  //---
  setupRGBE: function (options) {
    var defaults = {
      dir: 'assets/hdr/',
      hdri_file: 'provence_studio_1k.hdr',
      enable_background: true
    };
    var settings = $.extend(defaults, options);
    new three__WEBPACK_IMPORTED_MODULE_0__["RGBELoader"]().setPath(settings.dir).load(settings.hdri_file, function (texture) {
      texture.mapping = three__WEBPACK_IMPORTED_MODULE_0__["EquirectangularReflectionMapping"];

      if (settings.enable_background) {
        scene.background = texture;
      }

      scene.environment = texture;
    });
  },
  //---
  setupScene: function (options) {
    var defaults = {};
    var settings = $.extend(defaults, options);
    scene = new three__WEBPACK_IMPORTED_MODULE_0__["Scene"]();
    scene.background = new three__WEBPACK_IMPORTED_MODULE_0__["Color"]().setHSL(0, 0, 0);
    scene.fog = new three__WEBPACK_IMPORTED_MODULE_0__["Fog"](scene.background, 1, 5000);
  },
  setupRenderer: function (options) {
    var defaults = {};
    var settings = $.extend(defaults, options);
    renderer = new three__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderer"]({
      antialias: true
    }); // renderer.antialias = true;
    // console.log(web3d.el.renderer.innerWidth(), web3d.el.renderer.innerHeight());

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(web3d.el.renderer.innerWidth(), web3d.el.renderer.innerHeight());
    web3d.el.renderer.get(0).appendChild(renderer.domElement);
    console.log(renderer.antialias);
  },
  setupCamera: function (options) {
    var defaults = {};
    var settings = $.extend(defaults, options);
    camera = new three__WEBPACK_IMPORTED_MODULE_0__["PerspectiveCamera"](75, web3d.el.renderer.innerWidth() / web3d.el.renderer.innerHeight(), 0.1, 1000); // camera.position.set(2, 4.1, 5.3);

    camera.position.set(0.6, 4.4, 5.9); // camera.position.set(15.7, 58.4, 60.5);

    camera.lookAt(0, 10, 0);
  },
  setupControls: function (options) {
    var defaults = {
      minDistance: 4,
      maxDistance: 9,
      zoomSpeed: 1,
      rotateSpeed: 1,
      enableDamping: true,
      enablePan: false,
      dampingFactor: 0.1,
      autoRotate: true,
      autoRotateSpeed: 0.5,
      minPolarAngle: .8,
      maxPolarAngle: 1.8,
      target: {
        x: 0,
        y: 2.3,
        z: 0
      }
    };
    var settings = $.extend(defaults, options);
    controls = new three__WEBPACK_IMPORTED_MODULE_0__["OrbitControls"](camera, renderer.domElement);
    controls.minDistance = settings.minDistance;
    controls.maxDistance = settings.maxDistance;
    controls.zoomSpeed = settings.zoomSpeed;
    controls.rotateSpeed = settings.rotateSpeed;
    controls.enableDamping = settings.enableDamping;
    controls.enablePan = settings.enablePan;
    controls.dampingFactor = settings.dampingFactor;
    controls.autoRotate = settings.autoRotate;
    controls.autoRotateSpeed = settings.autoRotateSpeed;
    controls.minPolarAngle = settings.minPolarAngle;
    controls.maxPolarAngle = settings.maxPolarAngle;
    controls.target.set(settings.target.x, settings.target.y, settings.target.z);
  },
  setupLights: function (options) {
    var defaults = {
      environment_light: {
        enable: true,
        options: {
          dir: "assets/hdr/",
          hdri_file: "provence_studio_1k_edit.hdr",
          enable_background: false
        }
      },
      hemisphere_light: {
        enable: false,
        options: {
          skyColor: 0xffffff,
          groundColor: 0xffffff,
          intensity: 1,
          position: {
            x: 0,
            y: 50,
            z: 0
          }
        }
      },
      directional_light: {
        enable: false,
        options: {}
      },
      key_light: {
        enable: 1,
        helper: 0,
        options: {
          debug_color: 0xff0000,
          color: 0xffffff,
          decay: 1,
          distance: 35,
          intensity: .85,
          angle: Math.PI / 2,
          penumbra: .8,
          cast_shadow: true,
          shadow_map_size_width: 512,
          shadow_map_size_height: 512,
          shadow_camera_near: 10,
          shadow_camera_far: 200,
          shadow_focus: .2,
          position: {
            x: 4,
            y: 3,
            z: 4
          },
          target: {
            x: 0,
            y: 2,
            z: 0
          }
        }
      },
      fill_light: {
        enable: 1,
        helper: 0,
        options: {
          debug_color: 0xff0000,
          color: 0xffffff,
          decay: 1,
          distance: 50,
          intensity: .5,
          angle: Math.PI / 3,
          penumbra: .8,
          cast_shadow: true,
          shadow_map_size_width: 512,
          shadow_map_size_height: 512,
          shadow_camera_near: 10,
          shadow_camera_far: 200,
          shadow_focus: .2,
          position: {
            x: -7,
            y: 3,
            z: 6
          },
          target: {
            x: 0,
            y: 4,
            z: 0
          }
        }
      },
      back_light: {
        enable: 1,
        helper: 0,
        options: {
          debug_color: 0xff0000,
          color: 0xffffff,
          decay: 1,
          distance: 50,
          intensity: .8,
          angle: Math.PI / 3,
          penumbra: .8,
          cast_shadow: true,
          shadow_map_size_width: 512,
          shadow_map_size_height: 512,
          shadow_camera_near: 10,
          shadow_camera_far: 200,
          shadow_focus: .2,
          position: {
            x: 0,
            y: 2,
            z: -4
          },
          target: {
            x: 0,
            y: 2,
            z: 0
          }
        }
      },
      top_light: {
        enable: 1,
        helper: 0,
        options: {
          debug_color: 0xff0000,
          color: 0xffffff,
          decay: 1,
          distance: 50,
          intensity: .3,
          angle: Math.PI / 3,
          penumbra: .8,
          cast_shadow: true,
          shadow_map_size_width: 512,
          shadow_map_size_height: 512,
          shadow_camera_near: 10,
          shadow_camera_far: 200,
          shadow_focus: .2,
          position: {
            x: 0,
            y: 8,
            z: 3
          },
          target: {
            x: 0,
            y: 4,
            z: 1
          }
        }
      },
      bottom_light: {
        enable: 1,
        helper: 0,
        options: {
          debug_color: 0xff0000,
          color: 0xffffff,
          decay: 1,
          distance: 50,
          intensity: .1,
          angle: Math.PI / 3,
          penumbra: .8,
          cast_shadow: true,
          shadow_map_size_width: 512,
          shadow_map_size_height: 512,
          shadow_camera_near: 10,
          shadow_camera_far: 200,
          shadow_focus: .2,
          position: {
            x: 0,
            y: 1,
            z: 3
          },
          target: {
            x: 0,
            y: 3,
            z: 0
          }
        }
      }
    };
    var settings = $.extend(defaults, options);
    if (settings.environment_light.enable) web3d.setupRGBE(settings.environment_light.options);
    light_key = _web3d_helper__WEBPACK_IMPORTED_MODULE_7__["default"].create_light.spot_light(settings.key_light);

    if (settings.key_light.enable) {
      scene.add(light_key);
      scene.add(light_key.target);
    }

    light_fill = _web3d_helper__WEBPACK_IMPORTED_MODULE_7__["default"].create_light.spot_light(settings.fill_light);

    if (settings.fill_light.enable) {
      scene.add(light_fill);
      scene.add(light_fill.target);
    }

    light_back = _web3d_helper__WEBPACK_IMPORTED_MODULE_7__["default"].create_light.spot_light(settings.back_light);

    if (settings.back_light.enable) {
      scene.add(light_back);
      scene.add(light_back.target);
    }

    light_top = _web3d_helper__WEBPACK_IMPORTED_MODULE_7__["default"].create_light.spot_light(settings.top_light);

    if (settings.top_light.enable) {
      scene.add(light_top);
      scene.add(light_top.target);
    }

    light_bottom = _web3d_helper__WEBPACK_IMPORTED_MODULE_7__["default"].create_light.spot_light(settings.bottom_light);

    if (settings.bottom_light.enable) {
      scene.add(light_bottom);
      scene.add(light_bottom.target);
    } // light_fill = helper.create_light.point_light(settings.fill_light);
    // scene.add(light_fill);
    // light_back = helper.create_light.point_light(settings.back_light);
    // scene.add(light_back);
    // light_top = helper.create_light.point_light(settings.top_light);
    // scene.add(light_top);
    // light_bottom = helper.create_light.point_light(settings.bottom_light);
    // scene.add(light_bottom);


    if (settings.hemisphere_light.enable) {
      light_hemi = new three__WEBPACK_IMPORTED_MODULE_0__["HemisphereLight"](0xffffff, 0xffffff, 0.6);
      light_hemi.color.setHSL(0.6, 1, 0.6);
      light_hemi.groundColor.setHSL(0.095, 1, 0.75);
      light_hemi.position.set(0, 50, 0);
      scene.add(light_hemi);

      if (web3d.helper) {
        const light_hemi_helper = new three__WEBPACK_IMPORTED_MODULE_0__["HemisphereLightHelper"](light_hemi, 10);
        scene.add(light_hemi_helper);
      }
    }

    if (settings.directional_light.enable) {
      light_dir = new three__WEBPACK_IMPORTED_MODULE_0__["DirectionalLight"](0xffffff, .8);
      light_dir.color.setHSL(0.1, 1, 0.95);
      light_dir.position.set(-1, 1.75, 1);
      light_dir.position.multiplyScalar(100);

      if (settings.light_dir) {
        scene.add(light_dir);
      }

      light_dir.castShadow = true;
      light_dir.shadow.mapSize.width = 2048;
      light_dir.shadow.mapSize.height = 2048;
      const d = 50;
      light_dir.shadow.camera.left = -d;
      light_dir.shadow.camera.right = d;
      light_dir.shadow.camera.top = d;
      light_dir.shadow.camera.bottom = -d;
      light_dir.shadow.camera.far = 3500;
      light_dir.shadow.bias = -0.0001;

      if (settings.light_dir && web3d.helper) {
        const light_dir_helper = new three__WEBPACK_IMPORTED_MODULE_0__["DirectionalLightHelper"](light_dir, 10);
        scene.add(light_dir_helper);
      }
    }
  },
  setupHelpers: function (options) {
    var defaults = {
      gridHelper: {
        enable: false,
        size: 100,
        divisions: 100,
        colorCenterLine: 0x0000ff,
        colorGrid: 0x808080
      }
    };
    var settings = $.extend(defaults, options);

    if (settings.gridHelper.enable) {
      const gridHelper = new three__WEBPACK_IMPORTED_MODULE_0__["GridHelper"](settings.gridHelper.size, settings.gridHelper.divisions, settings.gridHelper.colorCenterLine, settings.gridHelper.colorGrid);
      scene.add(gridHelper);
    } // const polarGridHelper = new THREE.PolarGridHelper( 100, 100, 8, 64, 0x0000ff, 0x808080 );
    // scene.add( polarGridHelper );

  },
  //--- 
  setupEnvironment: function (options) {
    var defaults = {};
    var settings = $.extend(defaults, options);
    web3d.setupScene();
    web3d.setupCamera();
    web3d.setupRenderer();
    web3d.setupControls();
    web3d.setupLights();
  },
  setupPostRender: function (options) {
    var defaults = {};
    var settings = $.extend(defaults, options); // re-render

    web3d.animate(renderer, scene, camera);
    controls.addEventListener('change', function () {
      web3d.render();

      if (web3d.debug) {
        console.log(camera.position);
      }
    }); // camera.position.set( 0, 20, 100 );

    controls.update();
  },
  genMetadata: function (options) {
    var defaults = {
      head: "",
      body: "",
      asset: ""
    };
    var settings = $.extend(defaults, options);
    metadata.dna = Date.now();
    metadata.date = new Date().toLocaleString();
    metadata.attributes = [];
    metadata.attributes.push({
      trait_type: "Body",
      value: settings.body
    }, {
      trait_type: "Head",
      value: settings.head
    }, {
      trait_type: "Asset",
      value: settings.asset
    });

    if ($("#metadata").length > 0) {
      var parseMetadata = JSON.stringify(metadata, null, 2);
      $("#metadata").html(parseMetadata);
    }
  },
  setupModel: function (data, options) {
    const model = data.scene.children[0];
    return model;
  },
  //---
  loadObj3d: async function (options) {
    var defaults = {
      //loadObj3d(json) 
      smt_01: {
        model: "assets/smt_01/model3.glb",
        dir_texture: "assets/Tex/",
        skin_texture: {
          base_color: "SMT1_Skin_SHD_BaseColor.png",
          metallic: "SMT1_Skin_SHD_Metallic.png",
          normal: "SMT1_Skin_SHD_Normal.png",
          roughness: "SMT1_Skin_SHD_Roughness.png",
          ambient_occlusion: "SMT1_Skin_SHD_AmbientOcclusion.png"
        },
        outfit_texture: {
          base_color: "SMT1_SHD_BaseColor.png",
          metallic: "SMT1_SHD_Metallic.png",
          normal: "SMT1_SHD_Normal.png",
          roughness: "SMT1_SHD_Roughness.png",
          ambient_occlusion: "SMT1_SHD_AmbientOcclusion.png",
          emissive: "SMT1_SHD_Emissive.png"
        }
      }
    };
    var settings = $.extend(defaults, options);
    const glbLoader = new three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_4__["GLTFLoader"]();
    $(web3d.el.renderer.addClass("loading"));
    _web3d_obj3d__WEBPACK_IMPORTED_MODULE_6__["default"].cleanUp(scene, camera);
    [data_smt_01] = await Promise.all([glbLoader.loadAsync(settings.smt_01.model)]);
    obj_smt_01 = web3d.setupModel(data_smt_01);
    scene.add(obj_smt_01);
    obj_smt_01.receiveShadow = true;
    obj_smt_01.castShadow = true; // const material = new THREE.MeshLambertMaterial( { color: 0x50c5e6 , depthWrite: false } );				
    // var obj2 = new THREE.Mesh(obj_smt_01, material);
    // obj_smt_01.material = material;

    obj_smt_01.scale.set(.08, .08, .08);
    const skin_texture = {
      map: new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.dir_texture + settings.smt_01.skin_texture.base_color),
      metalnessMap: new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.dir_texture + settings.smt_01.skin_texture.metallic),
      normalMap: new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.dir_texture + settings.smt_01.skin_texture.normal),
      roughnessMap: new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.dir_texture + settings.smt_01.skin_texture.roughness),
      aoMap: new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.dir_texture + settings.smt_01.skin_texture.ambient_occlusion)
    };
    const outfit_texture = {
      map: new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.dir_texture + settings.smt_01.outfit_texture.base_color),
      metalnessMap: new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.dir_texture + settings.smt_01.outfit_texture.metallic),
      normalMap: new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.dir_texture + settings.smt_01.outfit_texture.normal),
      roughnessMap: new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.dir_texture + settings.smt_01.outfit_texture.roughness),
      aoMap: new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.dir_texture + settings.smt_01.outfit_texture.ambient_occlusion),
      emissiveMap: new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.dir_texture + settings.smt_01.outfit_texture.emissive)
    };
    var skinTexture = new three__WEBPACK_IMPORTED_MODULE_0__["MeshStandardMaterial"]({ ...skin_texture,
      // aoMap: null,
      aoMapIntensity: .1
    });
    var outfitTexture = new three__WEBPACK_IMPORTED_MODULE_0__["MeshStandardMaterial"]({ ...outfit_texture,
      // aoMap: null,
      aoMapIntensity: .1,
      emissiveIntensity: 2,
      normalScale: new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"](3, 3)
    });
    var hairTexture = new three__WEBPACK_IMPORTED_MODULE_0__["MeshStandardMaterial"]({ ...outfit_texture,
      aoMap: null,
      aoMapIntensity: .1,
      emissiveIntensity: 2,
      normalScale: new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"](1, 1)
    });
    console.log(obj_smt_01);
    obj_smt_01.traverse(o => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }

      if (o.isMesh && ["mesh_6", "mesh_7", "mesh_8"].indexOf(o.name) > -1) {
        // skin                
        o.material = skinTexture; // o.material = textures.map(texture => (new THREE.TextureLoader().load(texture)));
      } else if (o.isMesh) {
        // outfit
        o.material = outfitTexture; // o.material = textures.map(texture => (new THREE.TextureLoader().load(texture)));
      }

      if (o.isMesh && o.name == "mesh_3") {
        o.material = hairTexture;
      } // else if (o.children.length > 0) {
      //     // in the group (?)
      //     o.traverse((ochild) => {
      //         console.log(ochild);
      //         if (ochild.isMesh) {
      //             ochild.castShadow = true;
      //             ochild.receiveShadow = true;
      //         }
      //         if (ochild.isMesh && ["mesh_6", "mesh_7", "mesh_8"].indexOf(ochild.name) > -1) {
      //             ochild.material = outfitTexture;
      //         }
      //     })
      // }

    });
    $(web3d.el.renderer.removeClass("loading"));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_0__["VSMShadowMap"]; // console.log(obj_asset3);

    web3d.genMetadata(settings);
  },
  loadFbx: async function (options) {
    var defaults = {
      smt_01: {
        model: "assets/smt_01/model.fbx",
        dir_texture: "assets/Tex/",
        skin_texture: {
          base_color: "SMT1_Skin_SHD_BaseColor.png",
          metallic: "SMT1_Skin_SHD_Metallic.png",
          normal: "SMT1_Skin_SHD_Normal.png",
          roughness: "SMT1_Skin_SHD_Roughness.png",
          ambient_occlusion: "SMT1_Skin_SHD_AmbientOcclusion.png"
        },
        outfit_texture: {
          base_color: "SMT1_SHD_BaseColor.png",
          metallic: "SMT1_SHD_Metallic.png",
          normal: "SMT1_SHD_Normal.png",
          roughness: "SMT1_SHD_Roughness.png",
          ambient_occlusion: "SMT1_SHD_AmbientOcclusion.png",
          emissive: "SMT1_SHD_Emissive.png"
        }
      }
    };
    var settings = $.extend(defaults, options);
    const fbxLoader = new three_examples_jsm_loaders_FBXLoader_js__WEBPACK_IMPORTED_MODULE_5__["FBXLoader"]();
    var data_fbx, obj_fbx;
    $(web3d.el.renderer.addClass("loading"));
    _web3d_obj3d__WEBPACK_IMPORTED_MODULE_6__["default"].cleanUp(scene, camera);
    [obj_fbx] = await Promise.all([fbxLoader.loadAsync(settings.smt_01.model)]);
    const skin_texture = {
      map: new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.dir_texture + settings.smt_01.skin_texture.base_color),
      metalnessMap: new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.dir_texture + settings.smt_01.skin_texture.metallic),
      normalMap: new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.dir_texture + settings.smt_01.skin_texture.normal),
      roughnessMap: new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.dir_texture + settings.smt_01.skin_texture.roughness),
      aoMap: new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.dir_texture + settings.smt_01.skin_texture.ambient_occlusion)
    };
    const outfit_texture = {
      map: new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.dir_texture + settings.smt_01.outfit_texture.base_color),
      metalnessMap: new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.dir_texture + settings.smt_01.outfit_texture.metallic),
      normalMap: new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.dir_texture + settings.smt_01.outfit_texture.normal),
      roughnessMap: new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.dir_texture + settings.smt_01.outfit_texture.roughness),
      aoMap: new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.dir_texture + settings.smt_01.outfit_texture.ambient_occlusion),
      emissiveMap: new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.dir_texture + settings.smt_01.outfit_texture.emissive)
    };
    mixer = new three__WEBPACK_IMPORTED_MODULE_0__["AnimationMixer"](obj_fbx);
    const action = mixer.clipAction(obj_fbx.animations[0]);
    action.play();
    obj_fbx.scale.set(.1, .1, .1);
    scene.add(obj_fbx);
    obj_fbx.receiveShadow = true;
    obj_fbx.castShadow = true;
    var skinTexture = new three__WEBPACK_IMPORTED_MODULE_0__["MeshStandardMaterial"]({ ...skin_texture,
      // aoMap: null,
      aoMapIntensity: .1
    });
    var outfitTexture = new three__WEBPACK_IMPORTED_MODULE_0__["MeshStandardMaterial"]({ ...outfit_texture,
      // aoMap: null,
      aoMapIntensity: .1,
      emissiveIntensity: 2,
      normalScale: new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"](1.5, 1.5)
    });
    var teethTexture = new three__WEBPACK_IMPORTED_MODULE_0__["MeshStandardMaterial"]({ ...outfit_texture,
      // aoMap: null,
      aoMapIntensity: .1,
      emissiveIntensity: 2,
      normalScale: new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"](1.5, 1.5),
      roughness: 3
    });
    var hairTexture = new three__WEBPACK_IMPORTED_MODULE_0__["MeshStandardMaterial"]({ ...outfit_texture,
      aoMap: null,
      aoMapIntensity: .1,
      normalScale: new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"](-1, -1)
    });
    console.log(obj_smt_01);
    obj_fbx.traverse(o => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }

      if (o.isMesh && ["mesh_6", "mesh_7", "mesh_8", "neck_low", "hand_low", "Face_low"].indexOf(o.name) > -1) {
        // skin                
        o.material = skinTexture;
      } else if (o.isMesh) {
        // outfit
        o.material = outfitTexture;
      }

      if (o.isMesh && ["mesh_3", "Hair_low"].indexOf(o.name) > -1) {
        o.material = hairTexture;
      }

      if (o.isMesh && o.name == "Teeth_low") {
        o.material = teethTexture;
      }
    });
    $(web3d.el.renderer.removeClass("loading"));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_0__["VSMShadowMap"];
    console.log(obj_fbx);
  },
  loadBg: async function (options) {
    var defaults = {
      bg: "assets/bg-sphere.glb"
    };
    var settings = $.extend(defaults, options);
    const glbLoader = new three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_4__["GLTFLoader"]();
    [data_bg] = await Promise.all([glbLoader.loadAsync(settings.bg)]);
    obj_bg = web3d.setupModel(data_bg);
    scene.add(obj_bg);
    obj_bg.receiveShadow = false;
    obj_bg.castShadow = false;
    obj_bg.scale.set(10, 10, 10);
    obj_bg.position.set(0, 5, 0);
    obj_bg.material = new three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]({
      // color: 0x593b00,
      color: 0xffca4f // lightMapIntensity: 1

    }); // const box_helper = new THREE.BoxHelper( obj_bg, 0xffff00 );
    // scene.add(box_helper);

    console.log(obj_bg);
  },
  loadText: async function (options) {
    var defaults = {
      text: "assets/text.glb"
    };
    var settings = $.extend(defaults, options);
    const glbLoader = new three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_4__["GLTFLoader"]();
    [data_text] = await Promise.all([glbLoader.loadAsync(settings.text)]);
    obj_text = web3d.setupModel(data_text);
    obj_text.receiveShadow = false;
    obj_text.castShadow = true;
    obj_text.scale.set(.06, .06, .06); // obj_text.position.set(1, 0, 2);

    obj_text.position.set(0, 0, 0);
    obj_text.material = new three__WEBPACK_IMPORTED_MODULE_0__["MeshLambertMaterial"]({
      emissive: 0x593b00,
      emissiveIntensity: .3
    });
    obj_text.name = "Bubble Text"; // const box_helper = new THREE.BoxHelper( obj_bg, 0xffff00 );
    // scene.add(box_helper);

    console.log(obj_text);
    scene.add(obj_text);
  },
  loadBubble: function (options) {
    var defaults = {};
    var settings = $.extend(defaults, options);
    const geometry = new three__WEBPACK_IMPORTED_MODULE_0__["BoxGeometry"](1.4, .8, .1);
    const material = new three__WEBPACK_IMPORTED_MODULE_0__["MeshLambertMaterial"]({
      emissive: 0xffffff,
      emissiveIntensity: 1
    });
    obj_bubble = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](geometry, material);
    obj_bubble.receiveShadow = true;
    obj_bubble.castShadow = true;
    obj_bubble.name = "Bubble";
    obj_bubble.position.set(-3, 5, 0);
    console.log(obj_bubble);
    scene.add(obj_bubble);
  },
  lookAtObj: function (options) {
    var defaults = {
      obj_to_lookat: obj_text
    };
    var settings = $.extend(defaults, options); // const spherical = new THREE.Spherical();
    // const rotationMatrix = new THREE.Matrix4();
    // const targetQuaternion = new THREE.Quaternion();
    // if ( ! mesh.quaternion.equals( targetQuaternion ) ) {
    //     const step = speed * delta;
    //     mesh.quaternion.rotateTowards( targetQuaternion, step );
    // }

    settings.obj_to_lookat.lookAt(camera.position);
  },
  //---
  init: function () {
    web3d.setupEnvironment();
    web3d.loadBg(); // web3d.loadText(); 
    // web3d.loadBubble();
    // obj_ground = obj3d.addGround(scene, camera);
    // obj_room = obj3d.addRoom(scene, camera);
    // obj3d.addBoxes(scene, camera);

    web3d.setupHelpers();
    web3d.setupPostRender();
  },
  render: function () {
    renderer.render(scene, camera);
  },
  animate: function () {
    requestAnimationFrame(web3d.animate);
    const delta = clock.getDelta();

    if (obj_text) {
      web3d.lookAtObj();
    }

    if (mixer) mixer.update(delta);
    web3d.callback();
    web3d.render();
  },
  // Get
  callback: () => {}
};
debug = {
  freeCamera: () => {
    controls.minDistance = 0;
    controls.maxDistance = Infinity;
    controls.zoomSpeed = 1;
    controls.rotateSpeed = 1;
    controls.enableDamping = false;
    controls.enablePan = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controls.maxPolarAngle = Math.PI;
  },
  getCamera: () => camera,
  getControls: () => controls,
  getObject: obj_name => {
    switch (obj_name) {
      case 'smt_01':
        return obj_smt_01;

      case 'obj_bubble':
        return obj_bubble;

      case 'obj_text':
        return obj_text;

      case 'light_hemi':
        return light_hemi;

      case 'light_dir':
        return light_dir;

      case 'light_key':
        return light_key;

      case 'light_fill':
        return light_fill;

      case 'light_back':
        return light_back;

      case 'light_top':
        return light_top;

      case 'light_bottom':
        return light_bottom;
    }
  },
  watch: object_to_watch => {
    web3d.callback = function () {
      console.log(object_to_watch);
    };

    return "[ debug watch started ]";
  },
  endWatch: () => {
    web3d.callback = function () {};

    return "[ debug watch ended ]";
  }
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?a1c9")))

/***/ }),

/***/ "./src/obj-smt/js/index.js":
/*!*********************************!*\
  !*** ./src/obj-smt/js/index.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _setup_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../setup/config */ "./src/setup/config.js");
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var _web3d__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_web3d */ "./src/obj-smt/js/_web3d.js");



window.debug = _web3d__WEBPACK_IMPORTED_MODULE_2__["debug"];
$(function () {
  _web3d__WEBPACK_IMPORTED_MODULE_2__["web3d"].init(); // debug.freeCamera();
});
window.addEventListener("load", function () {
  var url = new URL(window.location.href);
  var param_type = url.searchParams.get("type");

  switch (param_type) {
    case "fbx":
      _web3d__WEBPACK_IMPORTED_MODULE_2__["web3d"].loadFbx();
      break;

    case "glb":
    default:
      _web3d__WEBPACK_IMPORTED_MODULE_2__["web3d"].loadObj3d();
      break;
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?a1c9")))

/***/ }),

/***/ "./src/obj-smt/js/web3d/_helper.js":
/*!*****************************************!*\
  !*** ./src/obj-smt/js/web3d/_helper.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.min.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);

var helper = {
  create_light: {
    environment_light: function (options) {
      var defaults = {
        enable: true,
        options: {
          dir: "assets/hdr/",
          hdri_file: "provence_studio_1k_edit.hdr",
          enable_background: false
        }
      };
      var settings = $.extend(defaults, options);
    },
    point_light: function (options) {
      var defaults = {
        enable: true,
        helper: false,
        options: {
          debug_color: 0xff0000,
          color: 0xffffff,
          decay: 1,
          distance: 100,
          intensity: .6,
          physically_correct: 0.0,
          power: 0.0,
          shadow_bias: -0.01,
          map_size_width: 1000,
          map_size_height: 2000,
          camera_near: 0.5,
          camera_far: 500,
          position: {
            x: 4,
            y: 4,
            z: 4
          }
        }
      };
      var settings = $.extend(defaults, options);
      var sphere_light = new three__WEBPACK_IMPORTED_MODULE_0__["SphereGeometry"](0.2, 32, 32);

      if (settings.options) {
        var obj_light = new three__WEBPACK_IMPORTED_MODULE_0__["PointLight"](settings.options.color, settings.options.intensity, settings.options.distance, settings.options.decay, settings.options.physically_correct);

        if (settings.helper) {
          obj_light.add(new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](sphere_light, new three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]({
            color: settings.options.debug_color
          })));
        }

        obj_light.castShadow = true;
        obj_light.shadow.bias = settings.options.shadow_bias;
        obj_light.position.set(settings.options.position.x, settings.options.position.y, settings.options.position.z);
        return obj_light;
      }
    },
    dir_light: function (options) {
      var defaults = {
        enable: true,
        helper: false,
        options: {
          debug_color: 0xff0000,
          color: 0xffffff,
          decay: 1,
          distance: 100,
          intensity: .6,
          physically_correct: 0.0,
          power: 0.0,
          shadow_bias: -0.01,
          map_size_width: 1000,
          map_size_height: 2000,
          camera_near: 0.5,
          camera_far: 500,
          position: {
            x: 4,
            y: 4,
            z: 4
          }
        }
      };
      var settings = $.extend(defaults, options);

      if (settings.enable) {
        light_dir = new three__WEBPACK_IMPORTED_MODULE_0__["DirectionalLight"](0xffffff, .8);
        light_dir.color.setHSL(0.1, 1, 0.95);
        light_dir.position.set(-1, 1.75, 1);
        light_dir.position.multiplyScalar(100);

        if (settings.light_dir) {
          scene.add(light_dir);
        }

        light_dir.castShadow = true;
        light_dir.shadow.mapSize.width = 2048;
        light_dir.shadow.mapSize.height = 2048;
        const d = 50;
        light_dir.shadow.camera.left = -d;
        light_dir.shadow.camera.right = d;
        light_dir.shadow.camera.top = d;
        light_dir.shadow.camera.bottom = -d;
        light_dir.shadow.camera.far = 3500;
        light_dir.shadow.bias = -0.0001;

        if (settings.light_dir && web3d.helper) {
          const light_dir_helper = new three__WEBPACK_IMPORTED_MODULE_0__["DirectionalLightHelper"](light_dir, 10);
          scene.add(light_dir_helper);
        }
      }
    },
    spot_light: function (options) {
      var defaults = {
        enable: true,
        helper: false,
        options: {
          debug_color: 0xff0000,
          color: 0xffffff,
          decay: 1,
          distance: 0,
          intensity: .6,
          angle: Math.PI / 3,
          penumbra: 0,
          cast_shadow: true,
          shadow_map_size_width: 512,
          shadow_map_size_height: 512,
          shadow_camera_near: 10,
          shadow_camera_far: 200,
          shadow_focus: 1,
          position: {
            x: 4,
            y: 4,
            z: 4
          },
          target: {
            x: 4,
            y: 4,
            z: 4
          }
        }
      };
      var settings = $.extend(defaults, options);

      if (settings.enable) {
        var obj_light = new three__WEBPACK_IMPORTED_MODULE_0__["SpotLight"](settings.options.color, settings.options.intensity, settings.options.distance, settings.options.angle, settings.options.penumbra, settings.options.decay);
        obj_light.position.set(settings.options.position.x, settings.options.position.y, settings.options.position.z);
        obj_light.angle = settings.options.angle;
        obj_light.penumbra = settings.options.penumbra;
        obj_light.decay = settings.options.decay;
        obj_light.distance = settings.options.distance;
        obj_light.castShadow = settings.options.cast_shadow;
        obj_light.shadow.mapSize.width = settings.options.shadow_map_size_width;
        obj_light.shadow.mapSize.height = settings.options.shadow_map_size_height;
        obj_light.shadow.camera.near = settings.options.shadow_camera_near;
        obj_light.shadow.camera.far = settings.options.shadow_camera_far;
        obj_light.shadow.focus = settings.options.shadow_focus;
        obj_light.receiveShadow = true;
        obj_light.castShadow = true;
        obj_light.target.position.set(settings.options.target.x, settings.options.target.y, settings.options.target.z); // obj_light.target.x =  settings.options.target.x; 
        // obj_light.target.y =  settings.options.target.y; 
        // obj_light.target.z =  settings.options.target.z; 
        //     settings.options.target.y, 
        //     settings.options.target.z, 
        // ;

        console.log(obj_light);

        if (settings.helper) {
          var lightHelper = new three__WEBPACK_IMPORTED_MODULE_0__["SpotLightHelper"](obj_light);
          var shadowCameraHelper = new three__WEBPACK_IMPORTED_MODULE_0__["CameraHelper"](obj_light.shadow.camera);
          obj_light.add(lightHelper);
          obj_light.add(shadowCameraHelper);
        }

        return obj_light;
      }
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (helper);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?a1c9")))

/***/ }),

/***/ "./src/obj-smt/js/web3d/_obj3d.js":
/*!****************************************!*\
  !*** ./src/obj-smt/js/web3d/_obj3d.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.min.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader.js */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");


var obj3d;
var meshs = [];
obj3d = {
  cleanUp: function (scene, camera) {
    if (typeof obj != "undefined") for (var i = scene.children.length - 1; i >= 0; i--) {
      var obj = scene.children[i];

      if (["obj3d_body", "obj3d_head", "obj3d_asset"].indexOf(obj.name) > -1) {
        scene.remove(obj);
      }
    }
  },
  addGround: function (scene, camera) {
    const geometry = new three__WEBPACK_IMPORTED_MODULE_0__["PlaneGeometry"](100, 100);
    const material = new three__WEBPACK_IMPORTED_MODULE_0__["MeshPhongMaterial"]({
      color: 0x00ff00,
      depthWrite: false
    });
    material.color.setHSL(0.095, 1, 0.75);
    const mesh = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);
    meshs.push(mesh);
    return mesh;
  },
  addRoom: function (scene, camera) {
    const geometry = new three__WEBPACK_IMPORTED_MODULE_0__["SphereGeometry"](30, 32, 32);
    const material = new three__WEBPACK_IMPORTED_MODULE_0__["MeshLambertMaterial"]({
      color: 0x50c5e6,
      depthWrite: false
    });
    const roomMesh = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](geometry, material);
    roomMesh.material.side = three__WEBPACK_IMPORTED_MODULE_0__["BackSide"];
    roomMesh.castShadow = true;
    roomMesh.receiveShadow = true;
    scene.add(roomMesh);
    meshs.push(roomMesh);
    return roomMesh;
  },
  loadModel: async function (scene, camera, path_to_model, name) {
    var model;
    const loader = new three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_1__["GLTFLoader"]();
    return new Promise((resolve, reject) => {
      loader.load(path_to_model, function (gltf) {
        // console.log(gltf.scene);
        model = gltf.scene;
        model.name = name;

        if (model.isMesh) {
          model.castShadow = true;
          model.receiveShadow = true;
        }

        var shadowJob = function (arrModel, isGoUp) {
          arrModel.forEach(childModel => {
            // console.log(childLvl, childModel.name);
            if (childModel.children.length > 0 && !isGoUp) {
              shadowJob(childModel.children, false);
            }

            if (childModel.parent != null) {
              shadowJob([childModel.parent], true);
            }

            childModel.castShadow = true;
            childModel.receiveShadow = true;
            childModel.traverse(function (object) {
              if (object.isMesh) {
                // console.log("---->" + object.name);
                // console.log(object.isMesh, object);
                object.castShadow = true;
                object.receiveShadow = true;
              } else {// console.log("st wrong again!");
              }
            });
            console.log(childModel);
          });
        };

        shadowJob([model], false); // if (model.isMesh) {
        //     model.castShadow = true;
        //     model.receiveShadow = true;
        // } else {
        //     model.traverse( function ( object ) {
        //         if ( object.isMesh ) {
        //             console.log("----")
        //             console.log(object.isMesh, object);
        //             object.castShadow = true;
        //             object.receiveShadow = true;
        //         } else {
        //             if (object.children.length > 0) {
        //                 object.children.forEach(childMesh => {
        //                     console.log("----")
        //                     console.log(childMesh.isMesh, childMesh);
        //                     childMesh.castShadow = true;
        //                     childMesh.receiveShadow = true;
        //                 })
        //             }
        //         };
        //     } );
        // }

        model.position.set(0, 0, 0);
        meshs.push(model);
        scene.add(model); // console.log("load obj");

        resolve("loaded obj");
      }, undefined, function (error) {
        console.error(error);
        reject(error);
      });
    });
  },
  addBoxes: function (scene, camera) {
    const geometry_1 = new three__WEBPACK_IMPORTED_MODULE_0__["SphereGeometry"](.2, 32, 32);
    const geometry_2 = new three__WEBPACK_IMPORTED_MODULE_0__["SphereGeometry"](.6, 32, 32);
    const material = new three__WEBPACK_IMPORTED_MODULE_0__["MeshLambertMaterial"]({
      color: 0xffffff
    });
    const boxMesh_1 = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](geometry_1, material);
    boxMesh_1.castShadow = true;
    boxMesh_1.receiveShadow = true;
    boxMesh_1.position.set(0, 2, 2);
    const boxMesh_2 = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](geometry_1, material);
    boxMesh_2.castShadow = true;
    boxMesh_2.receiveShadow = true;
    boxMesh_2.position.set(0, 2, -2); // const lightSphere = new THREE.SphereGeometry(0.06, 32, 32);
    // const testLight = new THREE.PointLight(0xffffff, .5, 20);
    // testLight.add(new THREE.Mesh(lightSphere, new THREE.MeshBasicMaterial({ color: 0xffffff })));
    // testLight.castShadow = true;
    // testLight.shadow.bias = - 0.005;
    // testLight.position.set(0, 2, 3)

    scene.add(boxMesh_1);
    scene.add(boxMesh_2); // scene.add(testLight);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (obj3d);

/***/ }),

/***/ "./src/obj-smt/scss/index.scss":
/*!*************************************!*\
  !*** ./src/obj-smt/scss/index.scss ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/setup/config.js":
/*!*****************************!*\
  !*** ./src/setup/config.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {var config = {
  widthTriggerScale: 9999,
  widthDesktopSafe: 1620,
  widthDesktop: 2000,
  widthMobile: 768,
  heightDesktop: 1000,
  heightMobile: 1000,
  func: {
    isMobile: function () {
      var device = {
        width: $(window).innerWidth(),
        height: $(window).innerHeight()
      };
      return device.width <= config.widthMobile || device.width < device.height;
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (config);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?a1c9")))

/***/ }),

/***/ 0:
/*!************************************!*\
  !*** multi ./src/obj-smt/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/obj-smt/index.js */"./src/obj-smt/index.js");


/***/ })

/******/ });
//# sourceMappingURL=obj-smt.bundle.js.map