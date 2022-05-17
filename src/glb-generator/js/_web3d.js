import * as THREE from 'three';
import {OrbitControls} from 'three/examples/js/controls/OrbitControls';
import {LightProbeGenerator} from 'three/examples/js/lights/LightProbeGenerator'

// var OrbitControls = require('three/examples/js/controls/OrbitControls'),
//     LightProbeGenerator = require('three/examples/js/lights/LightProbeGenerator');


// import simple_geometry_obj from "./web3d/_test";
import obj3d from "./web3d/_obj3d";

// ROOT
var web3d;
var scene,
    camera,
    renderer,
    controls; 

var hemiLight,
    dirLight;

// Object 3D
var obj_ground,
    cube_test,
    obj_asset1,
    obj_asset2,
    obj_asset3;

var metadata = {
    dna: "n/a",
    name: "n/a",
    description: "n/a",
    image: "n/a",
    date: "",
    attributes: []
}

web3d = {
    debug: false,
    helper: true,
    el: {
        renderer: $("#rendered_threed")
    },
    setupEnvironment: function(options){
        var defaults = {
            hemiLight: true,
            dirLight: true
        }
        var settings = $.extend(defaults, options);


        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 
            75, 
            web3d.el.renderer.innerWidth() / web3d.el.renderer.innerWidth(), 
            0.1, 
            1000 );
        renderer = new THREE.WebGLRenderer();
        controls = new THREE.OrbitControls( camera, renderer.domElement );
        camera.position.set(2, 4, 3.7);
        scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );
        scene.fog = new THREE.Fog( scene.background, 1, 5000 );


        hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
        hemiLight.color.setHSL( 0.6, 1, 0.6 );
        hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
        hemiLight.position.set( 0, 50, 0 );
        if (settings.hemiLight) {
            scene.add( hemiLight );
        }

        if (settings.hemiLight && web3d.helper) {
            const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
            scene.add( hemiLightHelper );
        }

        //

        dirLight = new THREE.DirectionalLight( 0xffffff, .8 );
        dirLight.color.setHSL( 0.1, 1, 0.95 );
        dirLight.position.set( - 1, 1.75, 1 );
        dirLight.position.multiplyScalar( 30 );
        if (settings.dirLight) {
            scene.add( dirLight );
        }

        dirLight.castShadow = true;

        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;

        const d = 50;

        dirLight.shadow.camera.left = - d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = - d;

        dirLight.shadow.camera.far = 3500;
        dirLight.shadow.bias = - 0.0001;

        if (settings.dirLight && web3d.helper) {
            const dirLightHelper = new THREE.DirectionalLightHelper( dirLight, 10 );
            scene.add( dirLightHelper );
        }

    },
    setupDom: function(options) {
        var defaults = {
        }
        var settings = $.extend(defaults, options);

        renderer.setSize( web3d.el.renderer.innerWidth(), web3d.el.renderer.innerWidth() );
        web3d.el.renderer.get(0).appendChild( renderer.domElement );

    },
    setupPostRender: function(options){
        var defaults = {
        }
        var settings = $.extend(defaults, options);

        // re-render
        web3d.animate(renderer, scene, camera);
        controls.addEventListener( 'change', function () {
            web3d.render();
            if (web3d.debug) {
                console.log(camera.position);
            }
        } );
        // camera.position.set( 0, 20, 100 );
        controls.update();
    },
    genMetadata: function(options) {
        var defaults = {
            head: "",
            body: "",
            asset: ""
        }
        var settings = $.extend(defaults, options);

        metadata.dna = Date.now();
        metadata.date = new Date().toLocaleString();
        metadata.attributes = [];
        metadata.attributes.push(
            {
                trait_type: "Body",
                value: settings.body
            },
            {
                trait_type: "Head",
                value: settings.head
            },
            {
                trait_type: "Asset",
                value: settings.asset
            }
        );

        if ($("#metadata").length > 0) {

            var parseMetadata = JSON.stringify(metadata, null, 2);
            $("#metadata").html(parseMetadata);
        }
    },
    loadObj3d: function(options) {
        var defaults = {
            head: "",
            body: "",
            asset: ""
        }
        var settings = $.extend(defaults, options);

        obj3d.cleanUp(scene, camera);

        obj_asset1 = obj3d.loadModel(scene, camera, settings.body, "obj3d_body");
        obj_asset2 = obj3d.loadModel(scene, camera, settings.head, "obj3d_head");
        obj_asset3 = obj3d.loadModel(scene, camera, settings.asset, "obj3d_asset");

        web3d.genMetadata(settings);
    },
    init: function(){
        web3d.setupEnvironment({
            hemiLight: true,
            dirLight: true
        });
        web3d.setupDom();

        obj_ground = obj3d.addGround(scene, camera);

        web3d.setupPostRender();
    },
    render: function() {
        renderer.render( scene, camera );
    },
    animate: function() {
        if (web3d.debug) {
            console.log("DEBUG: re-rendered");
        }
        // obj_asset.rotation.x += 0.05;
        // obj_asset.rotation.y += 0.05;
        requestAnimationFrame( web3d.animate );
        web3d.render();
    }
}

export default web3d;