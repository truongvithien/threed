import * as THREE from 'three';
import { OrbitControls } from 'three/examples/js/controls/OrbitControls';
import { LightProbeGenerator } from 'three/examples/js/lights/LightProbeGenerator';

// LOADER

import { RGBELoader } from 'three/examples/js/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

// 

import helper from "./_helper";
import { TextureLoader } from 'three';

var avatar, debug;

var scene, camera, renderer, controls, mixer;

var light = {
    hemi: {}, dir: {}, key: {}, fill: {},
    back: {}, top: {}, bottom: {}
}

const clock = new THREE.Clock();

// OBJECT 3D

var test_background_data, test_background_obj;

var smt_background_data, smt_background_obj, smt_background_2d,
    smt_avatar_data, smt_avatar_obj, smt_avatar_2d;

var starter_background_data, starter_background_obj, starter_background_2d,
    starter_face_data, starter_face_obj, starter_face_2d,
    starter_hair_data, starter_hair_obj, starter_hair_2d,
    starter_outfit_data, starter_outfit_obj, starter_outfit_2d,
    starter_asset_data, starter_asset_obj, starter_asset_2d,
    starter_eyewear_data, starter_eyewear_obj, starter_eyewear_2d;

// DEFAULT SETUP 

const 
    _DEFAULT = {
        rendered_element: "#rendered_avatar",
        layered_element: "#layered_avatar",
        switch_element: "#switch_avatar",
        asset_dir: "assets/avatar/",
        background: "assets/bg-default.glb",
        scale: {
            smt: {x: .1, y: .1, z: .1},
            st: {x: .08, y: .08, z: .08},
        },
        texture_options: {
            smt_skin: {
                aoMapIntensity: .1,
            },
            smt_outfit: {
                aoMapIntensity: .1,
                emissiveIntensity: 2,
                normalScale: new THREE.Vector2(1.5, 1.5)
            },
            smt_teeth: {
                aoMapIntensity: .1,
                emissiveIntensity: 2,
                normalScale: new THREE.Vector2(1.5, 1.5),
                roughness: 3
            },
            smt_hair: {
                aoMap: null,
                aoMapIntensity: .1,
                normalScale: new THREE.Vector2(-1, -1)
            },
            st_background: {},
            st_face: {},
            st_hair: {},
            st_outfit: {},
            st_asset: {},
            st_eyewear: {}
        },
        model_suffix: {
            smt: ".fbx",
            st: ".glb",
            twod: ".png"
        },
        texture_suffix: {
            base_color: "_SHD_BaseColor.png",
            metallic: "_SHD_Metallic.png",
            normal: "_SHD_Normal.png",
            roughness: "_SHD_Roughness.png",
            ambient_occlusion: "_SHD_AmbientOcclusion.png",
            emissive: "_SHD_Emissive.png",
            alpha: "_SHD_Opacity.png",

            scattering: "_SHD_Scattering.png",
            thickness: "_SHD_Thickness.png",
            sss: "_SHD_SSS.png"
        },
        texture_skin_suffix: {
            base_color: "_Skin_SHD_BaseColor.png",
            metallic: "_Skin_SHD_Metallic.png",
            normal: "_Skin_SHD_Normal.png",
            roughness: "_Skin_SHD_Roughness.png",
            ambient_occlusion: "_Skin_SHD_AmbientOcclusion.png",

            scattering: "_Skin_SHD_Scattering.png",
            thickness: "_Skin_SHD_Thickness.png",
            sss: "_Skin_SHD_SSS.png"
        },
    };

// MAIN

avatar = {
    rendered_element: _DEFAULT.rendered_element,
    layered_element: _DEFAULT.layered_element,
    switch_element: _DEFAULT.switch_element,
    rendered_element: _DEFAULT.rendered_element,
    layered_element: _DEFAULT.layered_element,
    switch_element: _DEFAULT.switch_element,
    default_bg: _DEFAULT.background,
    
    dom_width: 100,
    dom_height: 100,
    asset_dir: _DEFAULT.asset_dir,

    init: function(options) {
        var defaults = {
            rendered_element: _DEFAULT.rendered_element,
            layered_element: _DEFAULT.layered_element,
            switch_element: _DEFAULT.switch_element,
            asset_dir: _DEFAULT.asset_dir
        }
        var settings = $.extend(defaults, options);

        avatar.rendered_element = settings.rendered_element;
        avatar.asset_dir = settings.asset_dir;
        avatar.dom_width = $(avatar.rendered_element).innerWidth();
        avatar.dom_height = $(avatar.rendered_element).innerHeight();


        
 

        avatar.setup.all();
        avatar.setup.post_renderer();
        avatar.setup.helpers();



        // helper.setupEnvironment();
    },

    // =======

    loadSMT: async function(smt_code, options = {}) {
        var defaults = {
            asset_dir: avatar.asset_dir,
            texture_options: _DEFAULT.texture_options,
            model_suffix: _DEFAULT.model_suffix,
            texture_suffix: _DEFAULT.texture_suffix,
            texture_skin_suffix: _DEFAULT.texture_skin_suffix,
            scale: _DEFAULT.scale.smt
        }
        var settings = $.extend(defaults, options);


        // LOAD 2D
        smt_avatar_2d = settings.asset_dir + smt_code + "/" + smt_code + settings.model_suffix.twod

        $(avatar.layered_element).empty();
        $(avatar.layered_element).append(`
            <img src="${smt_avatar_2d}" alt="${smt_code}">
        `);

        // LOAD 3D

        const 
            fbxLoader = new FBXLoader(),
            texLoader = new THREE.TextureLoader();

        helper.loading(true, {rendered_element: avatar.rendered_element});
        helper.clean(scene);
        
        [smt_avatar_obj] = await Promise.all([
            fbxLoader.loadAsync(
                settings.asset_dir + smt_code + "/" + smt_code + settings.model_suffix.smt
            )
        ]);

        // LOAD TEXTURE 
        const skin_texture = {
            map: texLoader.load(settings.asset_dir + smt_code + "/" + smt_code + settings.texture_skin_suffix.base_color),
            metalnessMap: texLoader.load(settings.asset_dir + smt_code + "/" + smt_code + settings.texture_skin_suffix.metallic),
            normalMap: texLoader.load(settings.asset_dir + smt_code + "/" + smt_code + settings.texture_skin_suffix.normal),
            roughnessMap: texLoader.load(settings.asset_dir + smt_code + "/" + smt_code + settings.texture_skin_suffix.roughness),
            aoMap: texLoader.load(settings.asset_dir + smt_code + "/" + smt_code + settings.texture_skin_suffix.ambient_occlusion),
        }
        const outfit_texture = {
            map: texLoader.load(settings.asset_dir + smt_code + "/" + smt_code + settings.texture_suffix.base_color),
            metalnessMap: texLoader.load(settings.asset_dir + smt_code + "/" + smt_code + settings.texture_suffix.metallic),
            normalMap: texLoader.load(settings.asset_dir + smt_code + "/" + smt_code + settings.texture_suffix.normal),
            roughnessMap: texLoader.load(settings.asset_dir + smt_code + "/" + smt_code + settings.texture_suffix.roughness),
            aoMap: texLoader.load(settings.asset_dir + smt_code + "/" + smt_code + settings.texture_suffix.ambient_occlusion),
            emissiveMap: texLoader.load(settings.asset_dir + smt_code + "/" + smt_code + settings.texture_suffix.emissive) 
        }

        // LOAD ANIMATION
        mixer = new THREE.AnimationMixer (smt_avatar_obj);
        const action = mixer.clipAction(smt_avatar_obj.animations[ 0 ]);
        action.play();

        // SCALE, SHADOW, TEXTURE OPTIONS FOR MESHES
        smt_avatar_obj.scale.set(
            settings.scale.x,
            settings.scale.y,
            settings.scale.z,
        );

        smt_avatar_obj.receiveShadow = true;
        smt_avatar_obj.castShadow = true;

        var texture_skin = new THREE.MeshStandardMaterial({
            ...skin_texture,
            ...settings.texture_options.smt_skin
        });
        var texture_outfit = new THREE.MeshStandardMaterial({
            ...outfit_texture,
            ...settings.texture_options.smt_outfit
        });
        var texture_teeth = new THREE.MeshStandardMaterial({
            ...outfit_texture,
            ...settings.texture_options.smt_teeth
        });
        var texture_hair = new THREE.MeshStandardMaterial({
            ...outfit_texture,
            ...settings.texture_options.smt_hair
        });

        smt_avatar_obj.traverse((o) => {
 
            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
            }

            if (o.isMesh && ["mesh_6", "mesh_7", "mesh_8", "neck_low", "hand_low", "Face_low"].indexOf(o.name) > -1) {
                // skin                
                o.material = texture_skin;
            }
            else if (o.isMesh) {
                // outfit
                o.material = texture_outfit;
            } 

            if (o.isMesh && ["mesh_3", "Hair_low"].indexOf( o.name ) > -1) {
                o.material = texture_hair;
            }

            if (o.isMesh && o.name == "Teeth_low") {
                o.material = texture_teeth;
            }
        });
        
        // ADD SMT OBJ TO SCENE
        scene.add(smt_avatar_obj);
        
        helper.loading(false, {rendered_element: avatar.rendered_element});

    },

    loadST: async function(st_code, options) {
        var defaults = {
            asset_dir: avatar.asset_dir,
            texture_options: _DEFAULT.texture_options,
            model_suffix: _DEFAULT.model_suffix,
            texture_suffix: _DEFAULT.texture_suffix,
            texture_skin_suffix: _DEFAULT.texture_skin_suffix,
            scale: _DEFAULT.scale.st
        }
        var settings = $.extend(defaults, options); 

        // st_code job
        // {
        // 	"hair": "HM1",
        // 	"eyewear": "EM2",
        // 	"face": "FM3",
        // 	"outfit": "OM1",
        // 	"asset": "A2",
        // 	"background_text": "T6"
        // }

        var obj_st = {}  

        // console.log(typeof st_code);

        switch (typeof st_code) {
            case "object":
                obj_st = st_code;
                break;
            case "string":
            default:
                let array_st = st_code.split("-");
                obj_st = {
                    "hair": array_st[0],
                    "eyewear": array_st[1],
                    "face": array_st[2],
                    "outfit": array_st[3],
                    "asset": array_st[4],
                    "background_text": array_st[5]
                }; 
                break;
        }

        // LOAD 2D
        starter_background_2d = settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.model_suffix.twod;
        starter_face_2d = settings.asset_dir + obj_st["face"] + "/" + obj_st["face"] + settings.model_suffix.twod;
        starter_hair_2d = settings.asset_dir + obj_st["hair"] + "/" + obj_st["hair"] + settings.model_suffix.twod;
        starter_outfit_2d = settings.asset_dir + obj_st["outfit"] + "/" + obj_st["outfit"] + settings.model_suffix.twod;
        starter_asset_2d = settings.asset_dir + obj_st["asset"] + "/" + obj_st["asset"] + settings.model_suffix.twod;
        starter_eyewear_2d = settings.asset_dir + obj_st["eyewear"] + "/" + obj_st["eyewear"] + settings.model_suffix.twod;
        
        $(avatar.layered_element).empty();
        $(avatar.layered_element).append(`
            <img src="${starter_background_2d}" alt="background_text">
            <img src="${starter_face_2d}" alt="face">
            <img src="${starter_hair_2d}" alt="hair">
            <img src="${starter_outfit_2d}" alt="outfit">
            <img src="${starter_asset_2d}" alt="asset">
            <img src="${starter_eyewear_2d}" alt="eyewear">
        `);

        // LOAD 3D
        
        const 
            glbLoader = new GLTFLoader(),
            texLoader = new THREE.TextureLoader();

        helper.loading(true, {rendered_element: avatar.rendered_element});
        helper.clean(scene);
        
        [
            starter_background_data,
            starter_face_data, 
            starter_hair_data,
            starter_outfit_data,
            starter_asset_data,
            starter_eyewear_data        
        ] = await Promise.all([
            glbLoader.loadAsync(
                settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.model_suffix.st
            ),
            glbLoader.loadAsync(
                settings.asset_dir + obj_st["face"] + "/" + obj_st["face"] + settings.model_suffix.st
            ),
            glbLoader.loadAsync(
                settings.asset_dir + obj_st["hair"] + "/" + obj_st["hair"] + settings.model_suffix.st
            ),
            glbLoader.loadAsync(
                settings.asset_dir + obj_st["outfit"] + "/" + obj_st["outfit"] + settings.model_suffix.st
            ),
            glbLoader.loadAsync(
                settings.asset_dir + obj_st["asset"] + "/" + obj_st["asset"] + settings.model_suffix.st
            ),
            glbLoader.loadAsync(
                settings.asset_dir + obj_st["eyewear"] + "/" + obj_st["eyewear"] + settings.model_suffix.st
            ),
        ]);

        starter_background_obj = starter_background_data.scene.children[0];
        starter_face_obj = starter_face_data.scene.children[0];
        starter_hair_obj = starter_hair_data.scene.children[0];
        starter_outfit_obj = starter_outfit_data.scene.children[0];
        starter_asset_obj = starter_asset_data.scene.children[0];
        starter_eyewear_obj = starter_eyewear_data.scene.children[0];

        // LOAD TEXTURE
        const background_texture = {
            // map: texLoader.load(settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.texture_suffix.base_color),
            // metalnessMap: texLoader.load(settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.texture_suffix.metallic),
            // normalMap: texLoader.load(settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.texture_suffix.normal),
            // roughnessMap: texLoader.load(settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.texture_suffix.roughness),
            // aoMap: texLoader.load(settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.texture_suffix.ambient_occlusion),
        }
        const face_texture = {
            map: texLoader.load(settings.asset_dir + obj_st["face"] + "/" + obj_st["face"] + settings.texture_suffix.base_color),
            metalnessMap: texLoader.load(settings.asset_dir + obj_st["face"] + "/" + obj_st["face"] + settings.texture_suffix.metallic),
            normalMap: texLoader.load(settings.asset_dir + obj_st["face"] + "/" + obj_st["face"] + settings.texture_suffix.normal),
            roughnessMap: texLoader.load(settings.asset_dir + obj_st["face"] + "/" + obj_st["face"] + settings.texture_suffix.roughness),
            // aoMap: texLoader.load(settings.asset_dir + obj_st["face"] + "/" + obj_st["face"] + settings.texture_suffix.ambient_occlusion),
            // alphaMap: texLoader.load(settings.asset_dir + obj_st["face"] + "/" + obj_st["face"] + settings.texture_suffix.alpha),
        }
        const hair_texture = {
            map: texLoader.load(settings.asset_dir + obj_st["hair"] + "/" + obj_st["hair"] + settings.texture_suffix.base_color),
            metalnessMap: texLoader.load(settings.asset_dir + obj_st["hair"] + "/" + obj_st["hair"] + settings.texture_suffix.metallic),
            normalMap: texLoader.load(settings.asset_dir + obj_st["hair"] + "/" + obj_st["hair"] + settings.texture_suffix.normal),
            roughnessMap: texLoader.load(settings.asset_dir + obj_st["hair"] + "/" + obj_st["hair"] + settings.texture_suffix.roughness),
            // aoMap: texLoader.load(settings.asset_dir + obj_st["hair"] + "/" + obj_st["hair"] + settings.texture_suffix.ambient_occlusion),
            // alphaMap: texLoader.load(settings.asset_dir + obj_st["hair"] + "/" + obj_st["hair"] + settings.texture_suffix.alpha),
        }
        const outfit_texture = {
            map: texLoader.load(settings.asset_dir + obj_st["outfit"] + "/" + obj_st["outfit"] + settings.texture_suffix.base_color),
            metalnessMap: texLoader.load(settings.asset_dir + obj_st["outfit"] + "/" + obj_st["outfit"] + settings.texture_suffix.metallic),
            normalMap: texLoader.load(settings.asset_dir + obj_st["outfit"] + "/" + obj_st["outfit"] + settings.texture_suffix.normal),
            roughnessMap: texLoader.load(settings.asset_dir + obj_st["outfit"] + "/" + obj_st["outfit"] + settings.texture_suffix.roughness),
            // aoMap: texLoader.load(settings.asset_dir + obj_st["outfit"] + "/" + obj_st["outfit"] + settings.texture_suffix.ambient_occlusion),
            // alphaMap: texLoader.load(settings.asset_dir + obj_st["outfit"] + "/" + obj_st["outfit"] + settings.texture_suffix.alpha),
        }
        const asset_texture = {
            map: texLoader.load(settings.asset_dir + obj_st["asset"] + "/" + obj_st["asset"] + settings.texture_suffix.base_color),
            metalnessMap: texLoader.load(settings.asset_dir + obj_st["asset"] + "/" + obj_st["asset"] + settings.texture_suffix.metallic),
            normalMap: texLoader.load(settings.asset_dir + obj_st["asset"] + "/" + obj_st["asset"] + settings.texture_suffix.normal),
            roughnessMap: texLoader.load(settings.asset_dir + obj_st["asset"] + "/" + obj_st["asset"] + settings.texture_suffix.roughness),
            // aoMap: texLoader.load(settings.asset_dir + obj_st["asset"] + "/" + obj_st["asset"] + settings.texture_suffix.ambient_occlusion),
            // alphaMap: texLoader.load(settings.asset_dir + obj_st["asset"] + "/" + obj_st["asset"] + settings.texture_suffix.alpha),
        }
        const eyewear_texture = {
            map: texLoader.load(settings.asset_dir + obj_st["eyewear"] + "/" + obj_st["eyewear"] + settings.texture_suffix.base_color),
            metalnessMap: texLoader.load(settings.asset_dir + obj_st["eyewear"] + "/" + obj_st["eyewear"] + settings.texture_suffix.metallic),
            normalMap: texLoader.load(settings.asset_dir + obj_st["eyewear"] + "/" + obj_st["eyewear"] + settings.texture_suffix.normal),
            roughnessMap: texLoader.load(settings.asset_dir + obj_st["eyewear"] + "/" + obj_st["eyewear"] + settings.texture_suffix.roughness),
            // aoMap: texLoader.load(settings.asset_dir + obj_st["eyewear"] + "/" + obj_st["eyewear"] + settings.texture_suffix.ambient_occlusion),
            alphaMap: texLoader.load(settings.asset_dir + obj_st["eyewear"] + "/" + obj_st["eyewear"] + settings.texture_suffix.alpha),
        }

        // SCALE, SHADOW, TEXTURE OPTIONS FOR MESHES
        starter_background_obj.scale.set(
            settings.scale.x,
            settings.scale.y,
            settings.scale.z,
        );
        starter_background_obj.receiveShadow = true;
        starter_background_obj.castShadow = true;
        var texture_background = new THREE.MeshStandardMaterial({
            ...background_texture,
            ...settings.texture_options.st_background
        });
        starter_background_obj.traverse((o) => {
            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
                o.material = texture_background;
            }
        });
        console.log("BG/Text: ");
        console.log(starter_background_obj);
        //---
        starter_face_obj.scale.set(
            settings.scale.x,
            settings.scale.y,
            settings.scale.z,
        );
        starter_face_obj.receiveShadow = true;
        starter_face_obj.castShadow = true;
        var texture_face = new THREE.MeshStandardMaterial({
            ...face_texture,
            ...settings.texture_options.st_face
        });
        starter_face_obj.traverse((o) => {
            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
                o.material = texture_face;
            }
        });
        console.log("Face: ");
        console.log(starter_face_obj);
        //--- 
        starter_hair_obj.scale.set(
            settings.scale.x,
            settings.scale.y,
            settings.scale.z,
        );
        starter_hair_obj.receiveShadow = true;
        starter_hair_obj.castShadow = true;
        var texture_hair = new THREE.MeshStandardMaterial({
            ...hair_texture,
            ...settings.texture_options.st_hair
        });
        starter_hair_obj.traverse((o) => {
            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
                o.material = texture_hair;
            }
        });
        console.log("Hair: ");
        console.log(starter_hair_obj);
        //---
        starter_outfit_obj.scale.set(
            settings.scale.x,
            settings.scale.y,
            settings.scale.z,
        );
        starter_outfit_obj.receiveShadow = true;
        starter_outfit_obj.castShadow = true;
        var texture_outfit = new THREE.MeshStandardMaterial({
            ...outfit_texture,
            ...settings.texture_options.st_outfit
        });
        starter_outfit_obj.traverse((o) => {
            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
                o.material = texture_outfit;
            }
        });
        console.log("Outfit: ");
        console.log(starter_outfit_obj);
        //---
        starter_asset_obj.scale.set(
            settings.scale.x,
            settings.scale.y,
            settings.scale.z,
        );
        starter_asset_obj.receiveShadow = true;
        starter_asset_obj.castShadow = true;
        var texture_asset = new THREE.MeshStandardMaterial({
            ...asset_texture,
            ...settings.texture_options.st_asset
        });
        starter_asset_obj.traverse((o) => {
            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
                o.material = texture_asset;
            }
        });
        console.log("Asset: ");
        console.log(starter_asset_obj);
        //---
        starter_eyewear_obj.scale.set(
            settings.scale.x,
            settings.scale.y,
            settings.scale.z,
        );
        starter_eyewear_obj.receiveShadow = true;
        starter_eyewear_obj.castShadow = true;
        var texture_eyewear = new THREE.MeshStandardMaterial({
            ...eyewear_texture,
            ...settings.texture_options.st_eyewear
        });
        starter_eyewear_obj.traverse((o) => {
            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
                o.material = texture_eyewear;
            }
        });
        console.log("Eyewear: ");
        console.log(starter_eyewear_obj);
        
        // ADD ST OBJ TO SCENE
        scene.add(starter_background_obj);
        scene.add(starter_face_obj);
        scene.add(starter_hair_obj);
        scene.add(starter_outfit_obj);
        scene.add(starter_asset_obj);
        scene.add(starter_eyewear_obj);

        helper.loading(false, {rendered_element: avatar.rendered_element});

    },

    // ========

    loadDefaultBg: async function (options) {
        var defaults = {
        }
        var settings = $.extend(defaults, options);

        const glbLoader = new GLTFLoader();

        [test_background_data] = await Promise.all([
            glbLoader.loadAsync(avatar.default_bg)
        ]);

        test_background_obj = test_background_data.scene.children[0];
        scene.add(test_background_obj);

        test_background_obj.receiveShadow = false;
        test_background_obj.castShadow = true;

        test_background_obj.scale.set(10, 10, 10);
        test_background_obj.position.set(0, 5, 0);
        test_background_obj.material = new THREE.MeshLambertMaterial({
            emissive: 0x593b00
        });

        // const box_helper = new THREE.BoxHelper( obj_bg, 0xffff00 );
        // scene.add(box_helper);

        console.log(test_background_obj);
    },

    // ========

    setup: {
        all: function(options){
            var defaults = {
            }
            var settings = $.extend(defaults, options); 
            avatar.setup.scene();
            avatar.setup.camera();
            avatar.setup.renderer();
            avatar.setup.controls();
            avatar.setup.lights();
        },
        scene: function(options) {
            var defaults = {
            }
            var settings = $.extend(defaults, options);

            scene = new THREE.Scene();
            scene.background = new THREE.Color().setHSL(0, 0, 0);
            scene.fog = new THREE.Fog(scene.background, 1, 5000);
        },
        renderer: function(options) {
            var defaults = {
            }
            var settings = $.extend(defaults, options);
            renderer = new THREE.WebGLRenderer({
                antialias: true
            });
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize(avatar.dom_width, avatar.dom_height);
            $(avatar.rendered_element).append(renderer.domElement); 
        },
        camera: function(options) {
            var defaults = {
            }
            var settings = $.extend(defaults, options);
            camera = new THREE.PerspectiveCamera(
                75,
                avatar.dom_width / avatar.dom_height,
                0.1,
                1000);
            // camera.position.set(2, 4.1, 5.3);
            camera.position.set(0.6, 4.4, 5.9);
            // camera.position.set(15.7, 58.4, 60.5);
            camera.lookAt(0, 10, 0);
        },
        controls: function(options) {
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
                    x: 0, y: 2.3, z: 0
                } 
            }
            var settings = $.extend(defaults, options);
    
            controls = new THREE.OrbitControls(camera, renderer.domElement);
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
    
            controls.target.set(
                settings.target.x,
                settings.target.y,
                settings.target.z
            );
        },
        lights: function(options) {
            var defaults = {
                environment_light: {
                    enable: true,
                    options: {
                        dir: "assets/hdr/",
                        hdri_file: "provence_studio_1k_edit.hdr", 
                        enable_background: false,
                    }
                },
                hemisphere_light: {
                    enable: false,
                    options: {
                        skyColor: 0xffffff,
                        groundColor: 0xffffff,
                        intensity: 1,
                        position: {
                            x: 0, y: 50, z: 0
                        }
                    }
                },
                directional_light: {
                    enable: false,
                    options: {
                    }
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
                        angle: Math.PI/ 2,
                        penumbra: .8,
                        cast_shadow: true,
                        shadow_map_size_width: 512,
                        shadow_map_size_height: 512,
                        shadow_camera_near: 10,
                        shadow_camera_far: 200,
                        shadow_focus: .2,
                        position: {
                            x: 4, y: 3, z: 4
                        },
                        target: {
                            x: 0, y: 2, z: 0
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
                        angle: Math.PI/ 3,
                        penumbra: .8,
                        cast_shadow: true,
                        shadow_map_size_width: 512,
                        shadow_map_size_height: 512,
                        shadow_camera_near: 10,
                        shadow_camera_far: 200,
                        shadow_focus: .2,
                        position: {
                            x: -7, y: 3, z: 6
                        },
                        target: {
                            x: 0, y: 4, z: 0
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
                        angle: Math.PI/ 3,
                        penumbra: .8,
                        cast_shadow: true,
                        shadow_map_size_width: 512,
                        shadow_map_size_height: 512,
                        shadow_camera_near: 10,
                        shadow_camera_far: 200,
                        shadow_focus: .2,
                        position: {
                            x: 0, y: 2, z: -4
                        },
                        target: {
                            x: 0, y: 2, z: 0
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
                        angle: Math.PI/ 3,
                        penumbra: .8,
                        cast_shadow: true,
                        shadow_map_size_width: 512,
                        shadow_map_size_height: 512,
                        shadow_camera_near: 10,
                        shadow_camera_far: 200,
                        shadow_focus: .2,
                        position: {
                            x: 0, y: 8, z: 3
                        },
                        target: {
                            x: 0, y: 4, z: 1
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
                        angle: Math.PI/ 3,
                        penumbra: .8,
                        cast_shadow: true,
                        shadow_map_size_width: 512,
                        shadow_map_size_height: 512,
                        shadow_camera_near: 10,
                        shadow_camera_far: 200,
                        shadow_focus: .2,
                        position: {
                            x: 0, y: 1, z: 3
                        },
                        target: {
                            x: 0, y: 3, z: 0
                        }
                    }
                }
            }
            var settings = $.extend(defaults, options);
    
            if (settings.environment_light.enable) {

                new THREE.RGBELoader()
                    .setPath(settings.environment_light.options.dir)
                    .load(settings.environment_light.options.hdri_file, function (texture) {
                        texture.mapping = THREE.EquirectangularReflectionMapping;
                        if (settings.environment_light.options.enable_background) {
                            scene.background = texture;
                        }
                        scene.environment = texture;
                    });
            } 
            
            
            // helper.create_light.environment_light(settings.environment_light.options);
    
            light.key = helper.create_light.spot_light(settings.key_light);
            if (settings.key_light.enable) {
                scene.add( light.key);
                scene.add( light.key.target );
            }
    
            
            light.fill = helper.create_light.spot_light(settings.fill_light);
            if (settings.fill_light.enable) {
                scene.add( light.fill);
                scene.add( light.fill.target );
            }
            
            light.back = helper.create_light.spot_light(settings.back_light);
            if (settings.back_light.enable) {
                scene.add( light.back);
                scene.add( light.back.target );
            }
            
            light.top = helper.create_light.spot_light(settings.top_light);
            if (settings.top_light.enable) {
                scene.add( light.top);
                scene.add( light.top.target );
            }
            
            light.bottom = helper.create_light.spot_light(settings.bottom_light);
            if (settings.bottom_light.enable) {
                scene.add( light.bottom);
                scene.add( light.bottom.target );
            }

            if (settings.hemisphere_light.enable) {
                light.hemi = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
                light.hemi.color.setHSL(0.6, 1, 0.6);
                light.hemi.groundColor.setHSL(0.095, 1, 0.75);
                light.hemi.position.set(0, 50, 0);
                scene.add(light.hemi);
    
                if (avatar.helper) {
                    const light_hemi_helper = new THREE.HemisphereLightHelper(light.hemi, 10);
                    scene.add(light_hemi_helper);
                }
            }
    
            if (settings.directional_light.enable) {
                light.dir = new THREE.DirectionalLight(0xffffff, .8);
                light.dir.color.setHSL(0.1, 1, 0.95);
                light.dir.position.set(- 1, 1.75, 1);
                light.dir.position.multiplyScalar(100);
                if (settings.light.dir) {
                    scene.add(light.dir);
                }
    
                light.dir.castShadow = true;
    
                light.dir.shadow.mapSize.width = 2048;
                light.dir.shadow.mapSize.height = 2048;
    
                const d = 50;
    
                light.dir.shadow.camera.left = - d;
                light.dir.shadow.camera.right = d;
                light.dir.shadow.camera.top = d;
                light.dir.shadow.camera.bottom = - d;
    
                light.dir.shadow.camera.far = 3500;
                light.dir.shadow.bias = - 0.0001;
    
                if (settings.light.dir && avatar.helper) {
                    const light_dir_helper = new THREE.DirectionalLightHelper(light.dir, 10);
                    scene.add(light_dir_helper);
                }
            }

        },
        helpers: function(options){
            var defaults = {
                gridHelper: {
                    enable: false,
                    size : 100,
                    divisions : 100,
                    colorCenterLine : 0x0000ff,
                    colorGrid : 0x808080
                }
            }
            var settings = $.extend(defaults, options);
    
            if (settings.gridHelper.enable) {
                const gridHelper = new THREE.GridHelper( 
                    settings.gridHelper.size ,  
                    settings.gridHelper.divisions ,  
                    settings.gridHelper.colorCenterLine ,  
                    settings.gridHelper.colorGrid ,  
                );
                scene.add( gridHelper );
            }
        },
        post_renderer: function (options) {
            var defaults = {
            }
            var settings = $.extend(defaults, options);
            avatar.setup.animate();
            controls.addEventListener('change', function () {
                avatar.setup.render();
            });
            controls.update();
        },
        render: function(options) {
            var defaults = {
            }
            var settings = $.extend(defaults, options);
            renderer.render(scene, camera);
        },
        animate: function(options) {
            requestAnimationFrame( avatar.setup.animate );
            const delta = clock.getDelta();
    
            // if (obj_text) {
            //     avatar.lookAtObj();
            // }
            if ( mixer ) mixer.update( delta );
    
            avatar.callback();
            avatar.setup.render();
        }
    },
    callback: function(options){
        var defaults = {
        }
        var settings = $.extend(defaults, options);
    },

    // ======

    switch: function(current_status, options) {
        var defaults = {
            asset_dir: avatar.asset_dir,
            texture_options: _DEFAULT.texture_options,
            texture_suffix: _DEFAULT.texture_suffix,
            texture_skin_suffix: _DEFAULT.texture_skin_suffix,
        }
        var settings = $.extend(defaults, options);
    }
}

var debug = {
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
    getObject: (obj_name) => {
        switch (obj_name) {
            case 'smt_background_obj': return smt_background_obj;
            case 'smt_avatar_obj': return smt_avatar_obj;
            case 'starter_background_obj': return starter_background_obj;
            case 'starter_face_obj': return starter_face_obj;
            case 'starter_hair_obj': return starter_hair_obj;
            case 'starter_outfit_obj': return starter_outfit_obj;
            case 'starter_asset_obj': return starter_asset_obj;
            case 'starter_eyewear_obj': return starter_eyewear_obj;
            case 'light.hemi': return light.hemi;
            case 'light.dir': return light.dir;
            case 'light.key': return light.key;
            case 'light.fill': return light.fill;
            case 'light.back': return light.back;
            case 'light.top': return light.top;
            case 'light.bottom': return light.bottom;
        }
    },
    watch: (object_to_watch) => {
        avatar.callback = function() {
            console.log(object_to_watch);
        }
        return "[ debug watch started ]"
    },
    endWatch: () => {
        avatar.callback = function() {
        }
        return "[ debug watch ended ]"
    }
}


export {avatar, debug};