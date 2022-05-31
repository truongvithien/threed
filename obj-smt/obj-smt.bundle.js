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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.min.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three_examples_js_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/js/controls/OrbitControls */ "./node_modules/three/examples/js/controls/OrbitControls.js");
/* harmony import */ var three_examples_js_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(three_examples_js_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var three_examples_js_lights_LightProbeGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/js/lights/LightProbeGenerator */ "./node_modules/three/examples/js/lights/LightProbeGenerator.js");
/* harmony import */ var three_examples_js_lights_LightProbeGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(three_examples_js_lights_LightProbeGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var three_examples_js_loaders_RGBELoader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/js/loaders/RGBELoader.js */ "./node_modules/three/examples/js/loaders/RGBELoader.js");
/* harmony import */ var three_examples_js_loaders_RGBELoader_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(three_examples_js_loaders_RGBELoader_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader.js */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
/* harmony import */ var three_examples_jsm_loaders_EXRLoader_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/jsm/loaders/EXRLoader.js */ "./node_modules/three/examples/jsm/loaders/EXRLoader.js");
/* harmony import */ var _web3d_obj3d__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./web3d/_obj3d */ "./src/obj-smt/js/web3d/_obj3d.js");





 // var OrbitControls = require('three/examples/js/controls/OrbitControls'),
//     LightProbeGenerator = require('three/examples/js/lights/LightProbeGenerator');
// import simple_geometry_obj from "./web3d/_test";

 // ROOT

var web3d;
var scene, camera, renderer, controls;
var hemiLight, dirLight;
var light1, light2, light3, light4; // Object 3D

var obj_ground, obj_room, cube_test;
var data_smt_01, obj_smt_01;
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
  helper: false,
  el: {
    renderer: $("#rendered_threed")
  },
  setupRGBE: function (options) {
    var defaults = {
      path: 'assets/hdr/',
      hdriFile: 'comfy_cafe_4k.hdr'
    };
    var settings = $.extend(defaults, options);
    new three__WEBPACK_IMPORTED_MODULE_0__["RGBELoader"]().setPath(settings.path) // .load( 'royal_esplanade_1k.hdr', function ( texture ) {
    .load(settings.hdriFile, function (texture) {
      texture.mapping = three__WEBPACK_IMPORTED_MODULE_0__["EquirectangularReflectionMapping"];
      scene.background = texture;
      scene.environment = texture;
    });
  },
  setupEnvironment: function (options) {
    var defaults = {
      hemiLight: true,
      dirLight: true
    };
    var settings = $.extend(defaults, options);
    scene = new three__WEBPACK_IMPORTED_MODULE_0__["Scene"]();
    camera = new three__WEBPACK_IMPORTED_MODULE_0__["PerspectiveCamera"](75, web3d.el.renderer.innerWidth() / web3d.el.renderer.innerHeight(), 0.1, 1000);
    camera.position.set(2, 4.1, 5.3); // camera.position.set(15.7, 58.4, 60.5);
    // camera.lookAt(0, 0, 0);

    renderer = new three__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderer"]();
    controls = new three__WEBPACK_IMPORTED_MODULE_0__["OrbitControls"](camera, renderer.domElement);
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.zoomSpeed = 0.5;
    controls.rotateSpeed = 0.2;
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.dampingFactor = 0.1;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.maxPolarAngle = 1.4;
    controls.target.set(0, 3.3, 0);
    scene.background = new three__WEBPACK_IMPORTED_MODULE_0__["Color"]().setHSL(0, 0, 0);
    scene.fog = new three__WEBPACK_IMPORTED_MODULE_0__["Fog"](scene.background, 1, 5000);
    hemiLight = new three__WEBPACK_IMPORTED_MODULE_0__["HemisphereLight"](0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);

    if (settings.hemiLight) {
      scene.add(hemiLight);
    }

    if (settings.hemiLight && web3d.helper) {
      const hemiLightHelper = new three__WEBPACK_IMPORTED_MODULE_0__["HemisphereLightHelper"](hemiLight, 10);
      scene.add(hemiLightHelper);
    } //


    dirLight = new three__WEBPACK_IMPORTED_MODULE_0__["DirectionalLight"](0xffffff, .8);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(-1, 1.75, 1);
    dirLight.position.multiplyScalar(100);

    if (settings.dirLight) {
      scene.add(dirLight);
    }

    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    const d = 50;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = -0.0001;

    if (settings.dirLight && web3d.helper) {
      const dirLightHelper = new three__WEBPACK_IMPORTED_MODULE_0__["DirectionalLightHelper"](dirLight, 10);
      scene.add(dirLightHelper);
    }
  },
  setupPointLight: function (options) {
    const sphere = new three__WEBPACK_IMPORTED_MODULE_0__["SphereGeometry"](0.5, 16, 8); //lights

    light1 = new three__WEBPACK_IMPORTED_MODULE_0__["PointLight"](ffffff, 2, 50);
    light1.add(new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](sphere, new three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]({
      color: 0xff0040
    })));
    scene.add(light1);
    light2 = new three__WEBPACK_IMPORTED_MODULE_0__["PointLight"](0x0040ff, 2, 50);
    light2.add(new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](sphere, new three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]({
      color: 0x0040ff
    })));
    scene.add(light2);
    light3 = new three__WEBPACK_IMPORTED_MODULE_0__["PointLight"](0x80ff80, 2, 50);
    light3.add(new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](sphere, new three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]({
      color: 0x80ff80
    })));
    scene.add(light3);
    light4 = new three__WEBPACK_IMPORTED_MODULE_0__["PointLight"](0xffaa00, 2, 50);
    light4.add(new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](sphere, new three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]({
      color: 0xffaa00
    })));
    scene.add(light4);
  },
  setupDom: function (options) {
    var defaults = {};
    var settings = $.extend(defaults, options); // console.log(web3d.el.renderer.innerWidth(), web3d.el.renderer.innerHeight());

    renderer.setSize(web3d.el.renderer.innerWidth(), web3d.el.renderer.innerHeight());
    web3d.el.renderer.get(0).appendChild(renderer.domElement);
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
  loadObj3d: async function (options) {
    var defaults = {
      smt_01: {
        model: "assets/smt_01/model3.glb",
        // texture: "assets/smt_01/texture/SMT1_SHD_BaseColor.png"
        texture_skin: "assets/Tex/SMT1_Skin_SHD_BaseColor.png",
        texture_outfit: "assets/Tex/SMT1_SHD_BaseColor.png",
        texture_emissive: "assets/Tex/SMT1_SHD_Emissive.png",
        texture_ao: "assets/Tex/SMT1_SHD_AmbientOcclusion.png"
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
    const texture_skin = new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.texture_skin);
    const texture_outfit = new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.texture_outfit);
    const texture_emissive = new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.texture_emissive);
    const texture_ao = new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(settings.smt_01.texture_ao);
    var skinTexture = new three__WEBPACK_IMPORTED_MODULE_0__["MeshStandardMaterial"]({
      map: texture_skin,
      emissiveMap: texture_emissive,
      aoMap: texture_ao
    });
    var outfitTexture = new three__WEBPACK_IMPORTED_MODULE_0__["MeshStandardMaterial"]({
      map: texture_outfit,
      emissiveMap: texture_emissive,
      aoMap: texture_ao
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
    $(web3d.el.renderer.removeClass("loading")); // console.log(obj_asset3);

    web3d.genMetadata(settings);
  },
  init: function () {
    web3d.setupEnvironment({
      hemiLight: true,
      dirLight: true
    }); // web3d.setupRGBE();
    // web3d.setupPointLight();

    web3d.setupDom(); // obj_ground = obj3d.addGround(scene, camera);

    obj_room = _web3d_obj3d__WEBPACK_IMPORTED_MODULE_6__["default"].addRoom(scene, camera);
    web3d.setupPostRender();
  },
  render: function () {
    // console.log(camera);
    const time = Date.now() * 0.0005; // light1.position.x = Math.sin( time * 0.7 ) * 30;
    // light1.position.y = Math.cos( time * 0.5 ) * 40;
    // light1.position.z = Math.cos( time * 0.3 ) * 30;
    // light2.position.x = Math.cos( time * 0.3 ) * 30;
    // light2.position.y = Math.sin( time * 0.5 ) * 40;
    // light2.position.z = Math.sin( time * 0.7 ) * 30;
    // light3.position.x = Math.sin( time * 0.7 ) * 30;
    // light3.position.y = Math.cos( time * 0.3 ) * 40;
    // light3.position.z = Math.sin( time * 0.5 ) * 30;
    // light4.position.x = Math.sin( time * 0.3 ) * 30;
    // light4.position.y = Math.cos( time * 0.7 ) * 40;
    // light4.position.z = Math.sin( time * 0.5 ) * 30;

    renderer.render(scene, camera);
  },
  animate: function () {
    if (web3d.debug) {
      console.log("DEBUG: re-rendered");
      console.log(controls.getDistance());
    } // obj_asset.rotation.x += 0.05;
    // obj_asset.rotation.y += 0.05;


    requestAnimationFrame(web3d.animate);
    web3d.render();
  },
  // Get get get
  getCamera: function () {
    console.log(camera);
  },
  getControl: function () {
    console.log(control);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (web3d);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery-exposed-exposed.js")))

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



$(function () {
  _web3d__WEBPACK_IMPORTED_MODULE_2__["default"].init();
  _web3d__WEBPACK_IMPORTED_MODULE_2__["default"].loadObj3d();
});
window.addEventListener("load", function () {});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery-exposed-exposed.js")))

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
    for (var i = scene.children.length - 1; i >= 0; i--) {
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
    const geometry = new three__WEBPACK_IMPORTED_MODULE_0__["SphereGeometry"](20, 32, 32);
    ;
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery-exposed-exposed.js")))

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