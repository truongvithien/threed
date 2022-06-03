import * as THREE from 'three';
import { OrbitControls } from 'three/examples/js/controls/OrbitControls';
import { LightProbeGenerator } from 'three/examples/js/lights/LightProbeGenerator';
import { RGBELoader } from 'three/examples/js/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

// var OrbitControls = require('three/examples/js/controls/OrbitControls'),
//     LightProbeGenerator = require('three/examples/js/lights/LightProbeGenerator');


// import simple_geometry_obj from "./web3d/_test";
import obj3d from "./web3d/_obj3d";

import helper from "./web3d/_helper";

// ROOT
var web3d, 
    debug;
var scene,
    camera,
    renderer,
    controls,
    mixer;

var light_hemi,
    light_dir,
    light_key,
    light_fill,
    light_back,
    light_top,
    light_bottom;

    // Object 3D
var data_bg,
    obj_bg;

var data_smt_01,
    obj_smt_01;

var data_bubble,
    obj_bubble;

var data_text,
    obj_text;

const clock = new THREE.Clock();

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

    //---
    setupRGBE: function (options) {
        var defaults = {
            dir: 'assets/hdr/',
            hdri_file: 'provence_studio_1k.hdr',
            enable_background: true 
        }
        var settings = $.extend(defaults, options);

        new THREE.RGBELoader()
            .setPath(settings.dir)
            .load(settings.hdri_file, function (texture) {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                if (settings.enable_background) {
                    scene.background = texture;
                }
                scene.environment = texture;
            });

    },
    //---
    setupScene: function(options) {
        var defaults = {
        }
        var settings = $.extend(defaults, options);
        scene = new THREE.Scene();
        scene.background = new THREE.Color().setHSL(0, 0, 0);
        scene.fog = new THREE.Fog(scene.background, 1, 5000);
    },
    setupRenderer: function(options) {
        var defaults = {
        }
        var settings = $.extend(defaults, options);
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        // renderer.antialias = true;
        // console.log(web3d.el.renderer.innerWidth(), web3d.el.renderer.innerHeight());

        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(web3d.el.renderer.innerWidth(), web3d.el.renderer.innerHeight());
        web3d.el.renderer.get(0).appendChild(renderer.domElement);

        console.log(renderer.antialias);
    },
    setupCamera: function(options) {
        var defaults = {
        }
        var settings = $.extend(defaults, options);
        camera = new THREE.PerspectiveCamera(
            75,
            web3d.el.renderer.innerWidth() / web3d.el.renderer.innerHeight(),
            0.1,
            1000);
        // camera.position.set(2, 4.1, 5.3);
        camera.position.set(0.6, 4.4, 5.9);
        // camera.position.set(15.7, 58.4, 60.5);
        camera.lookAt(0, 10, 0);
    },
    setupControls: function(options) {
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
    setupLights: function(options){
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

        if (settings.environment_light.enable) web3d.setupRGBE(settings.environment_light.options);

        light_key = helper.create_light.spot_light(settings.key_light);
        if (settings.key_light.enable) {
            scene.add( light_key);
            scene.add( light_key.target );
        }

        
        light_fill = helper.create_light.spot_light(settings.fill_light);
        if (settings.fill_light.enable) {
            scene.add( light_fill);
            scene.add( light_fill.target );
        }
        
        light_back = helper.create_light.spot_light(settings.back_light);
        if (settings.back_light.enable) {
            scene.add( light_back);
            scene.add( light_back.target );
        }
        
        light_top = helper.create_light.spot_light(settings.top_light);
        if (settings.top_light.enable) {
            scene.add( light_top);
            scene.add( light_top.target );
        }
        
        light_bottom = helper.create_light.spot_light(settings.bottom_light);
        if (settings.bottom_light.enable) {
            scene.add( light_bottom);
            scene.add( light_bottom.target );
        }
        
        // light_fill = helper.create_light.point_light(settings.fill_light);
        // scene.add(light_fill);
        
        // light_back = helper.create_light.point_light(settings.back_light);
        // scene.add(light_back);
        
        // light_top = helper.create_light.point_light(settings.top_light);
        // scene.add(light_top);
        
        // light_bottom = helper.create_light.point_light(settings.bottom_light);
        // scene.add(light_bottom);
        

        if (settings.hemisphere_light.enable) {
            light_hemi = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
            light_hemi.color.setHSL(0.6, 1, 0.6);
            light_hemi.groundColor.setHSL(0.095, 1, 0.75);
            light_hemi.position.set(0, 50, 0);
            scene.add(light_hemi);

            if (web3d.helper) {
                const light_hemi_helper = new THREE.HemisphereLightHelper(light_hemi, 10);
                scene.add(light_hemi_helper);
            }
        }

        if (settings.directional_light.enable) {
            light_dir = new THREE.DirectionalLight(0xffffff, .8);
            light_dir.color.setHSL(0.1, 1, 0.95);
            light_dir.position.set(- 1, 1.75, 1);
            light_dir.position.multiplyScalar(100);
            if (settings.light_dir) {
                scene.add(light_dir);
            }

            light_dir.castShadow = true;

            light_dir.shadow.mapSize.width = 2048;
            light_dir.shadow.mapSize.height = 2048;

            const d = 50;

            light_dir.shadow.camera.left = - d;
            light_dir.shadow.camera.right = d;
            light_dir.shadow.camera.top = d;
            light_dir.shadow.camera.bottom = - d;

            light_dir.shadow.camera.far = 3500;
            light_dir.shadow.bias = - 0.0001;

            if (settings.light_dir && web3d.helper) {
                const light_dir_helper = new THREE.DirectionalLightHelper(light_dir, 10);
                scene.add(light_dir_helper);
            }
        }

    },
    setupHelpers: function(options) {
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
        // const polarGridHelper = new THREE.PolarGridHelper( 100, 100, 8, 64, 0x0000ff, 0x808080 );
        // scene.add( polarGridHelper );
    },

    //--- 

    setupEnvironment: function (options) {
        var defaults = {
        }
        var settings = $.extend(defaults, options);
        web3d.setupScene();
        web3d.setupCamera();
        web3d.setupRenderer();
        web3d.setupControls();
        web3d.setupLights();
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
            // aoMap: null,
            aoMapIntensity: .1,
        });
        var outfitTexture = new THREE.MeshStandardMaterial({
            ...outfit_texture,
            // aoMap: null,
            aoMapIntensity: .1,
            emissiveIntensity: 2,
            normalScale: new THREE.Vector2(3, 3)
        });

        var hairTexture = new THREE.MeshStandardMaterial({
            ...outfit_texture,
            aoMap: null,
            aoMapIntensity: .1,
            emissiveIntensity: 2,
            normalScale: new THREE.Vector2(1, 1)
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

            if (o.isMesh && o.name == "mesh_3") {
                o.material = hairTexture;
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
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.VSMShadowMap;


        // console.log(obj_asset3);
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
        }
        var settings = $.extend(defaults, options);

        const fbxLoader = new FBXLoader();
        var data_fbx, obj_fbx;

        $(web3d.el.renderer.addClass("loading"));
        obj3d.cleanUp(scene, camera);
        [obj_fbx] = await Promise.all([
            fbxLoader.loadAsync(settings.smt_01.model)
        ]);
        
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

        
        mixer = new THREE.AnimationMixer( obj_fbx );
        const action = mixer.clipAction( obj_fbx.animations[ 0 ] );
        action.play();


        obj_fbx.scale.set(.1, .1, .1);
        scene.add(obj_fbx);
        

        obj_fbx.receiveShadow = true;
        obj_fbx.castShadow = true;


        
        var skinTexture = new THREE.MeshStandardMaterial({
            ...skin_texture,
            // aoMap: null,
            aoMapIntensity: .1,
        });
        var outfitTexture = new THREE.MeshStandardMaterial({
            ...outfit_texture,
            // aoMap: null,
            aoMapIntensity: .1,
            emissiveIntensity: 2,
            normalScale: new THREE.Vector2(1.5, 1.5)
        });
        var teethTexture = new THREE.MeshStandardMaterial({
            ...outfit_texture,
            // aoMap: null,
            aoMapIntensity: .1,
            emissiveIntensity: 2,
            normalScale: new THREE.Vector2(1.5, 1.5),
            roughness: 3
        });

        var hairTexture = new THREE.MeshStandardMaterial({
            ...outfit_texture,
            aoMap: null,
            aoMapIntensity: .1,
            normalScale: new THREE.Vector2(-1, -1)
        });

        console.log(obj_smt_01);

        obj_fbx.traverse((o) => {

            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
            }

            if (o.isMesh && ["mesh_6", "mesh_7", "mesh_8", "neck_low", "hand_low", "Face_low"].indexOf(o.name) > -1) {
                // skin                
                o.material = skinTexture;
            }
            else if (o.isMesh) {
                // outfit
                o.material = outfitTexture;
            } 

            if (o.isMesh && ["mesh_3", "Hair_low"].indexOf( o.name ) > -1) {
                o.material = hairTexture;
            }

            if (o.isMesh && o.name == "Teeth_low") {
                o.material = teethTexture;
            }
        });

        $(web3d.el.renderer.removeClass("loading"));

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.VSMShadowMap;

        console.log(obj_fbx);

    },

    loadBg: async function (options) {
        var defaults = {
            bg: "assets/bg-sphere.glb",
        }
        var settings = $.extend(defaults, options);
        const glbLoader = new GLTFLoader();
        [data_bg] = await Promise.all([
            glbLoader.loadAsync(settings.bg)
        ]);

        obj_bg = web3d.setupModel(data_bg);
        scene.add(obj_bg);

        obj_bg.receiveShadow = false;
        obj_bg.castShadow = false;

        obj_bg.scale.set(10, 10, 10);
        obj_bg.position.set(0, 5, 0);
        obj_bg.material = new THREE.MeshLambertMaterial({
            emissive: 0x593b00
        });

        // const box_helper = new THREE.BoxHelper( obj_bg, 0xffff00 );
        // scene.add(box_helper);

        console.log(obj_bg);
    },
    loadText: async function (options) {
        var defaults = {
            text: "assets/text.glb",
        }
        var settings = $.extend(defaults, options);
        const glbLoader = new GLTFLoader();
        [data_text] = await Promise.all([
            glbLoader.loadAsync(settings.text)
        ]);

        obj_text = web3d.setupModel(data_text);

        obj_text.receiveShadow = false;
        obj_text.castShadow = true;

        obj_text.scale.set(.06, .06, .06);
        // obj_text.position.set(1, 0, 2);
        obj_text.position.set(0, 0, 0);
        obj_text.material = new THREE.MeshLambertMaterial({
            emissive: 0x593b00,
            emissiveIntensity: .3
        });
        obj_text.name = "Bubble Text";


        // const box_helper = new THREE.BoxHelper( obj_bg, 0xffff00 );
        // scene.add(box_helper);

        console.log(obj_text);
        scene.add(obj_text);
    },
    loadBubble: function(options) {
        var defaults = {
        }
        var settings = $.extend(defaults, options);

        const geometry = new THREE.BoxGeometry( 1.4, .8, .1 );
        const material = new THREE.MeshLambertMaterial({
            emissive: 0xffffff,
            emissiveIntensity: 1
        });

        obj_bubble = new THREE.Mesh(geometry, material);
        obj_bubble.receiveShadow = true;
        obj_bubble.castShadow = true;
        obj_bubble.name = "Bubble";

        obj_bubble.position.set(-3, 5, 0);

        console.log(obj_bubble);
        scene.add(obj_bubble);
    },
    lookAtObj: function(options) {
        var defaults = {
            obj_to_lookat: obj_text 
        }
        var settings = $.extend(defaults, options);

        // const spherical = new THREE.Spherical();
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

        web3d.loadBg();
        // web3d.loadText(); 
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
        requestAnimationFrame( web3d.animate );
        const delta = clock.getDelta();

        if (obj_text) {
            web3d.lookAtObj();
        }
        if ( mixer ) mixer.update( delta );

        web3d.callback();
        web3d.render();
    },
    // Get
    callback: () => {}
}

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
    getObject: (obj_name) => {
        switch (obj_name) {
            case 'smt_01': return obj_smt_01;
            case 'obj_bubble': return obj_bubble;
            case 'obj_text': return obj_text;
            case 'light_hemi': return light_hemi;
            case 'light_dir': return light_dir;
            case 'light_key': return light_key;
            case 'light_fill': return light_fill;
            case 'light_back': return light_back;
            case 'light_top': return light_top;
            case 'light_bottom': return light_bottom;
        }
    },
    watch: (object_to_watch) => {
        web3d.callback = function() {
            console.log(object_to_watch);
        }
        return "[ debug watch started ]"
    },
    endWatch: () => {
        web3d.callback = function() {
        }
        return "[ debug watch ended ]"
    }
} 

export {web3d, debug};