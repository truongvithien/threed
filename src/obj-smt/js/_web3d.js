import * as THREE from 'three';
import { OrbitControls } from 'three/examples/js/controls/OrbitControls';
import { LightProbeGenerator } from 'three/examples/js/lights/LightProbeGenerator';
import { RGBELoader } from 'three/examples/js/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';

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

var light1, light2, light3, light4;

// Object 3D
var obj_ground,
    obj_room,
    cube_test;

var data_smt_01,
    obj_smt_01;

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
    helper: false,
    el: {
        renderer: $("#rendered_threed")
    },
    setupRGBE: function (options) {
        var defaults = {
            path: 'assets/hdr/',
            hdriFile: 'comfy_cafe_4k.hdr'
        }
        var settings = $.extend(defaults, options);

        new THREE.RGBELoader()
            .setPath(settings.path)
            // .load( 'royal_esplanade_1k.hdr', function ( texture ) {
            .load(settings.hdriFile, function (texture) {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                scene.background = texture;
                scene.environment = texture;
            });

    },
    setupEnvironment: function (options) {
        var defaults = {
            hemiLight: true,
            dirLight: true
        }
        var settings = $.extend(defaults, options);


        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
            75,
            web3d.el.renderer.innerWidth() / web3d.el.renderer.innerHeight(),
            0.1,
            1000);

        camera.position.set(2, 4.1, 5.3);
        // camera.position.set(15.7, 58.4, 60.5);
        // camera.lookAt(0, 0, 0);



        renderer = new THREE.WebGLRenderer();
        controls = new THREE.OrbitControls(camera, renderer.domElement);

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

        scene.background = new THREE.Color().setHSL(0, 0, 0);
        scene.fog = new THREE.Fog(scene.background, 1, 5000);

        hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(0, 50, 0);
        if (settings.hemiLight) {
            scene.add(hemiLight);
        }

        if (settings.hemiLight && web3d.helper) {
            const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
            scene.add(hemiLightHelper);
        }

        //

        dirLight = new THREE.DirectionalLight(0xffffff, .8);
        dirLight.color.setHSL(0.1, 1, 0.95);
        dirLight.position.set(- 1, 1.75, 1);
        dirLight.position.multiplyScalar(100);
        if (settings.dirLight) {
            scene.add(dirLight);
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
            const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
            scene.add(dirLightHelper);
        }

    },
    setupPointLight: function (options) {

        const sphere = new THREE.SphereGeometry(0.5, 16, 8);

        //lights

        light1 = new THREE.PointLight(0xffffff, 2, 50);
        light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xff0040 })));
        scene.add(light1);

        light2 = new THREE.PointLight(0x0040ff, 2, 50);
        light2.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x0040ff })));
        scene.add(light2);

        light3 = new THREE.PointLight(0x80ff80, 2, 50);
        light3.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x80ff80 })));
        scene.add(light3);

        light4 = new THREE.PointLight(0xffaa00, 2, 50);
        light4.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffaa00 })));
        scene.add(light4);
    },
    setupDom: function (options) {
        var defaults = {
        }
        var settings = $.extend(defaults, options);


        // console.log(web3d.el.renderer.innerWidth(), web3d.el.renderer.innerHeight());

        renderer.setSize(web3d.el.renderer.innerWidth(), web3d.el.renderer.innerHeight());
        web3d.el.renderer.get(0).appendChild(renderer.domElement);

    },
    setupPostRender: function (options) {
        var defaults = {
        }
        var settings = $.extend(defaults, options);

        // re-render
        web3d.animate(renderer, scene, camera);
        controls.addEventListener('change', function () {
            web3d.render();
            if (web3d.debug) {
                console.log(camera.position);

            }
        });
        // camera.position.set( 0, 20, 100 );
        controls.update();
    },
    genMetadata: function (options) {
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
    setupModel: function (data, options) {
        const model = data.scene.children[0];
        return model;
    },
    loadObj3d: async function (options) {
        var defaults = {
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
            },
        }
        var settings = $.extend(defaults, options);

        const glbLoader = new GLTFLoader();

        $(web3d.el.renderer.addClass("loading"));
        obj3d.cleanUp(scene, camera);
        [data_smt_01] = await Promise.all([
            glbLoader.loadAsync(settings.smt_01.model)
        ]);

        obj_smt_01 = web3d.setupModel(data_smt_01);
        scene.add(obj_smt_01);

        obj_smt_01.receiveShadow = true;
        obj_smt_01.castShadow = true;

        // const material = new THREE.MeshLambertMaterial( { color: 0x50c5e6 , depthWrite: false } );				

        // var obj2 = new THREE.Mesh(obj_smt_01, material);
        // obj_smt_01.material = material;
        obj_smt_01.scale.set(.08, .08, .08);

        const skin_texture = {
            map: new THREE.TextureLoader().load(settings.smt_01.dir_texture + settings.smt_01.skin_texture.base_color),
            metalnessMap: new THREE.TextureLoader().load(settings.smt_01.dir_texture + settings.smt_01.skin_texture.metallic),
            normalMap: new THREE.TextureLoader().load(settings.smt_01.dir_texture + settings.smt_01.skin_texture.normal),
            roughnessMap: new THREE.TextureLoader().load(settings.smt_01.dir_texture + settings.smt_01.skin_texture.roughness),
            aoMap: new THREE.TextureLoader().load(settings.smt_01.dir_texture + settings.smt_01.skin_texture.ambient_occlusion),
        }
        const outfit_texture = {
            map: new THREE.TextureLoader().load(settings.smt_01.dir_texture + settings.smt_01.outfit_texture.base_color),
            metalnessMap: new THREE.TextureLoader().load(settings.smt_01.dir_texture + settings.smt_01.outfit_texture.metallic),
            normalMap: new THREE.TextureLoader().load(settings.smt_01.dir_texture + settings.smt_01.outfit_texture.normal),
            roughnessMap: new THREE.TextureLoader().load(settings.smt_01.dir_texture + settings.smt_01.outfit_texture.roughness),
            aoMap: new THREE.TextureLoader().load(settings.smt_01.dir_texture + settings.smt_01.outfit_texture.ambient_occlusion),
            emissiveMap: new THREE.TextureLoader().load(settings.smt_01.dir_texture + settings.smt_01.outfit_texture.emissive) 
        }

        var skinTexture = new THREE.MeshStandardMaterial({
            ...skin_texture,
            aoMap: null,
            aoMapIntensity: .1
        });
        var outfitTexture = new THREE.MeshStandardMaterial({
            ...outfit_texture,
            aoMap: null,
            aoMapIntensity: .1,
            emissiveIntensity: 2
        });

        console.log(obj_smt_01);

        obj_smt_01.traverse((o) => {

            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
            }

            if (o.isMesh && ["mesh_6", "mesh_7", "mesh_8"].indexOf(o.name) > -1) {
                // skin                
                o.material = skinTexture;
                // o.material = textures.map(texture => (new THREE.TextureLoader().load(texture)));
            }
            else if (o.isMesh) {
                // outfit
                o.material = outfitTexture;
                // o.material = textures.map(texture => (new THREE.TextureLoader().load(texture)));
            } 
            // else if (o.children.length > 0) {
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


        // console.log(obj_asset3);
        web3d.genMetadata(settings);

    },
    init: function () {
        web3d.setupEnvironment({
            hemiLight: true,
            dirLight: true
        });
        // web3d.setupRGBE();
        web3d.setupPointLight();
        web3d.setupDom();

        // obj_ground = obj3d.addGround(scene, camera);

        obj_room = obj3d.addRoom(scene, camera);

        web3d.setupPostRender();
    },
    render: function () {

        // console.log(camera);

        const time = Date.now() * 0.0005;

        light1.position.x = Math.sin( time * 0.7 ) * 30;
        light1.position.y = Math.cos( time * 0.5 ) * 40;
        light1.position.z = Math.cos( time * 0.3 ) * 30;

        light2.position.x = Math.cos( time * 0.3 ) * 30;
        light2.position.y = Math.sin( time * 0.5 ) * 40;
        light2.position.z = Math.sin( time * 0.7 ) * 30;

        light3.position.x = Math.sin( time * 0.7 ) * 30;
        light3.position.y = Math.cos( time * 0.3 ) * 40;
        light3.position.z = Math.sin( time * 0.5 ) * 30;

        light4.position.x = Math.sin( time * 0.3 ) * 30;
        light4.position.y = Math.cos( time * 0.7 ) * 40;
        light4.position.z = Math.sin( time * 0.5 ) * 30;

        renderer.render(scene, camera);
    },
    animate: function () {
        if (web3d.debug) {
            console.log("DEBUG: re-rendered");
            console.log(controls.getDistance());
        }
        // obj_asset.rotation.x += 0.05;
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
}

export default web3d;