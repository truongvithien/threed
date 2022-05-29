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

/***/ "./src/glb-generator/index.js":
/*!************************************!*\
  !*** ./src/glb-generator/index.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/index.js */ "./src/glb-generator/js/index.js");
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scss/index.scss */ "./src/glb-generator/scss/index.scss");



/***/ }),

/***/ "./src/glb-generator/js/_web3d.js":
/*!****************************************!*\
  !*** ./src/glb-generator/js/_web3d.js ***!
  \****************************************/
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
/* harmony import */ var _web3d_obj3d__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web3d/_obj3d */ "./src/glb-generator/js/web3d/_obj3d.js");



 // var OrbitControls = require('three/examples/js/controls/OrbitControls'),
//     LightProbeGenerator = require('three/examples/js/lights/LightProbeGenerator');
// import simple_geometry_obj from "./web3d/_test";

 // ROOT

var web3d;
var scene, camera, renderer, controls;
var hemiLight, dirLight; // Object 3D

var obj_ground, cube_test, obj_asset1, obj_asset2, obj_asset3;
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
  setuprgbe: function (options) {
    new three_examples_js_loaders_RGBELoader_js__WEBPACK_IMPORTED_MODULE_3__["RGBELoader"]().setPath('textures/equirectangular/').load('royal_esplanade_1k.hdr', function (texture) {
      texture.mapping = three__WEBPACK_IMPORTED_MODULE_0__["EquirectangularReflectionMapping"];
      scene.background = texture;
      scene.environment = texture;
      render(); // model

      const loader = new GLTFLoader().setPath('models/gltf/DamagedHelmet/glTF/');
      loader.load('DamagedHelmet.gltf', function (gltf) {
        scene.add(gltf.scene);
        render();
      });
    });
  },
  setupEnvironment: function (options) {
    var defaults = {
      hemiLight: true,
      dirLight: true
    };
    var settings = $.extend(defaults, options);
    scene = new three__WEBPACK_IMPORTED_MODULE_0__["Scene"]();
    camera = new three__WEBPACK_IMPORTED_MODULE_0__["PerspectiveCamera"](75, web3d.el.renderer.innerWidth() / web3d.el.renderer.innerWidth(), 0.1, 1000);
    renderer = new three__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderer"]();
    controls = new three__WEBPACK_IMPORTED_MODULE_0__["OrbitControls"](camera, renderer.domElement);
    camera.position.set(2, 4, 3.7);
    scene.background = new three__WEBPACK_IMPORTED_MODULE_0__["Color"]().setHSL(0.6, 0, 1);
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
    dirLight.position.multiplyScalar(30);

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
  setupDom: function (options) {
    var defaults = {};
    var settings = $.extend(defaults, options);
    renderer.setSize(web3d.el.renderer.innerWidth(), web3d.el.renderer.innerWidth());
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
  loadObj3d: async function (options) {
    var defaults = {
      head: "",
      body: "",
      asset: ""
    };
    var settings = $.extend(defaults, options);

    if ($(web3d.el.renderer).hasClass("active")) {
      $(web3d.el.renderer.addClass("loading"));
      _web3d_obj3d__WEBPACK_IMPORTED_MODULE_4__["default"].cleanUp(scene, camera);
      obj_asset1 = await _web3d_obj3d__WEBPACK_IMPORTED_MODULE_4__["default"].loadModel(scene, camera, settings.body, "obj3d_body");
      obj_asset2 = await _web3d_obj3d__WEBPACK_IMPORTED_MODULE_4__["default"].loadModel(scene, camera, settings.head, "obj3d_head");
      obj_asset3 = await _web3d_obj3d__WEBPACK_IMPORTED_MODULE_4__["default"].loadModel(scene, camera, settings.asset, "obj3d_asset");
      $(web3d.el.renderer.removeClass("loading"));
    } // console.log(obj_asset3);


    web3d.genMetadata(settings);
  },
  init: function () {
    web3d.setupEnvironment({
      hemiLight: true,
      dirLight: true
    });
    web3d.setupDom();
    obj_ground = _web3d_obj3d__WEBPACK_IMPORTED_MODULE_4__["default"].addGround(scene, camera);
    web3d.setupPostRender();
  },
  render: function () {
    renderer.render(scene, camera);
  },
  animate: function () {
    if (web3d.debug) {
      console.log("DEBUG: re-rendered");
    } // obj_asset.rotation.x += 0.05;
    // obj_asset.rotation.y += 0.05;


    requestAnimationFrame(web3d.animate);
    web3d.render();
  }
};
/* harmony default export */ __webpack_exports__["default"] = (web3d);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?a1c9")))

/***/ }),

/***/ "./src/glb-generator/js/index.js":
/*!***************************************!*\
  !*** ./src/glb-generator/js/index.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _setup_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../setup/config */ "./src/setup/config.js");
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var _web3d__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_web3d */ "./src/glb-generator/js/_web3d.js");



$(function () {
  _web3d__WEBPACK_IMPORTED_MODULE_2__["default"].init();
  controlButtons();
});
window.addEventListener("load", function () {
  generateObj3d();
  generatePossibility();
  pickMeARandomSet();
  exportMetadataAsJSON();
  switchDisplay();
});

var generateObj3d = function () {
  var attrBody = $('input[name="selectBody"]:checked').attr("value"),
      attrHead = $('input[name="selectHead"]:checked').attr("value"),
      attrAsset = $('input[name="selectAsset"]:checked').attr("value");
  _web3d__WEBPACK_IMPORTED_MODULE_2__["default"].loadObj3d({
    head: attrHead,
    body: attrBody,
    asset: attrAsset
  });
};

var controlButtons = function () {
  if ($('input[name="selectBody"]').length > 0 && $('input[name="selectHead"]').length > 0 && $('input[name="selectAsset"]').length > 0) {
    $('input[name="selectBody"], input[name="selectHead"], input[name="selectAsset"]').on("change", function () {
      generateObj3d();
    });
  }
};

var generatePossibility = function () {
  if ($("#possibilityList").length > 0) {
    $("#possibilityList").empty();
    var possibility = {
      "Body": [],
      "Head": [],
      "Asset": []
    };

    if ($('.btn-group[aria-label="Body"]').length > 0) {
      $('.btn-group[aria-label="Body"] input[type="radio"]').each(function () {
        let radioId = $(this).attr("id");
        possibility["Body"].push(radioId);
      });
    }

    if ($('.btn-group[aria-label="Head"]').length > 0) {
      $('.btn-group[aria-label="Head"] input[type="radio"]').each(function () {
        let radioId = $(this).attr("id");
        possibility["Head"].push(radioId);
      });
    }

    if ($('.btn-group[aria-label="Asset"]').length > 0) {
      $('.btn-group[aria-label="Asset"] input[type="radio"]').each(function () {
        let radioId = $(this).attr("id");
        possibility["Asset"].push(radioId);
      });
    } // console.log(possibility);


    var possibilityTotal = possibility["Body"].length * possibility["Head"].length * possibility["Asset"].length;

    if ($("#possibilityTotal").length > 0) {
      $("#possibilityTotal").html(possibilityTotal);
    }

    for (let i_body = 0, n_body = possibility["Body"].length; i_body < n_body; i_body++) {
      for (let i_head = 0, n_head = possibility["Head"].length; i_head < n_head; i_head++) {
        for (let i_asset = 0, n_asset = possibility["Asset"].length; i_asset < n_asset; i_asset++) {
          $("#possibilityList").append(`    
						<div class="col-3">
                            <button 
                                type="button" 
                                class="btn btn-secondary w-100 possibilityItem"
                                data-objthreed-body="#${possibility["Body"][i_body]}"
                                data-objthreed-head="#${possibility["Head"][i_head]}"
                                data-objthreed-asset="#${possibility["Asset"][i_asset]}"
                            >${i_body + 1}_${i_head + 1}_${i_asset + 1}</button>
                        </div>
                    `);
        }
      }
    }

    $("#possibilityList").on("click", ".possibilityItem", function () {
      let selectBody = $(this).attr("data-objthreed-body"),
          selectHead = $(this).attr("data-objthreed-head"),
          selectAsset = $(this).attr("data-objthreed-asset");
      console.log(selectBody, selectHead, selectAsset);
      $(selectBody).prop("checked", true);
      $(selectHead).prop("checked", true);
      $(selectAsset).prop("checked", true);
      generateObj3d();
    });
  }
};

var pickMeARandomSet = function () {
  if ($("#pickMeARandomSet").length > 0) {
    $("#pickMeARandomSet").on("click", function () {
      let total = parseInt($("#possibilityTotal").html());
      let randomItemId = Math.floor(Math.random() * total);
      console.log(randomItemId);
      console.log($(".possibilityItem").eq(randomItemId).html());
      $(".possibilityItem").eq(randomItemId).trigger("click");
    });
  }
};

var exportMetadataAsJSON = function () {
  if ($("#exportMetadataAsJSON").length > 0) {
    $("#exportMetadataAsJSON").on("click", function () {
      var jsonData = JSON.parse($("#metadata").html());
      var jsonHtml = $("#metadata").html();
      var fileName = "metadata_";
      fileName += Date.parse(jsonData.date);

      function download(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], {
          type: contentType
        });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
      }

      download(jsonHtml, `${fileName}.txt`, 'text/plain');
    });
  }
};

var switchDisplay = function () {
  if ($("#switchDisplay").length > 0) {
    $("#switchDisplay").on("change", function () {
      if ($('#switchDisplay').prop('checked')) {
        $("#rendered_twod").removeClass("active");
        $("#rendered_threed").addClass("active");
        generateObj3d();
      } else {
        $("#rendered_twod").addClass("active");
        $("#rendered_threed").removeClass("active");
      }
    });
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js?a1c9")))

/***/ }),

/***/ "./src/glb-generator/js/web3d/_obj3d.js":
/*!**********************************************!*\
  !*** ./src/glb-generator/js/web3d/_obj3d.js ***!
  \**********************************************/
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
      color: 0xffffff,
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
  loadModel: async function (scene, camera, path_to_model, name) {
    var model;
    const loader = new three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_1__["GLTFLoader"]();
    return new Promise((resolve, reject) => {
      loader.load(path_to_model, function (gltf) {
        // console.log(gltf.scene);
        model = gltf.scene;
        model.castShadow = true;
        model.receiveShadow = true;
        model.name = name;
        scene.add(model);
        model.traverse(function (object) {
          if (object.isMesh) {
            object.castShadow = true;
            object.receiveShadow = true;
          }

          ;
        });
        meshs.push(model); // console.log("load obj");

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

/***/ "./src/glb-generator/scss/index.scss":
/*!*******************************************!*\
  !*** ./src/glb-generator/scss/index.scss ***!
  \*******************************************/
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
/*!******************************************!*\
  !*** multi ./src/glb-generator/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/glb-generator/index.js */"./src/glb-generator/index.js");


/***/ })

/******/ });
//# sourceMappingURL=glb-generator.bundle.js.map