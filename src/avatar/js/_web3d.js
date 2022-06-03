import * as THREE from 'three';
import { OrbitControls } from 'three/examples/js/controls/OrbitControls';
import { LightProbeGenerator } from 'three/examples/js/lights/LightProbeGenerator';
import { RGBELoader } from 'three/examples/js/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// var OrbitControls = require('three/examples/js/controls/OrbitControls'),
//     LightProbeGenerator = require('three/examples/js/lights/LightProbeGenerator');


// import simple_geometry_obj from "./web3d/_test";
import obj3d from "./web3d/_obj3d";

// ROOT
var web3d, 
    debug;
var scene,
    camera,
    renderer,
    controls;

var light_hemi,
    light_dir,
    light_key,
    light_fill,
    light_back,
    light_top;

    // Object 3D
var data_bg,
    obj_bg;

var data_smt_01,
    obj_smt_01;

var data_bubble,
    obj_bubble;

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
            enable_background: false
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
        camera.position.set(0.6, 2.4, 5.9);
        // camera.position.set(15.7, 58.4, 60.5);
        // camera.lookAt(0, 0, 0);
    },
    setupControls: function(options) {
        var defaults = {
            minDistance: 3,
            maxDistance: 10,
            zoomSpeed: 1,
            rotateSpeed: 1,
            enableDamping: true,
            enablePan: false,
            dampingFactor: 0.1,
            autoRotate: true,
            autoRotateSpeed: 0.5,
            maxPolarAngle: 1.6,
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
                    hdri_file: "provence_studio_1k.hdr",
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
                enable: true,
                show: false,
                options: {
                    color: 0xffffff,
                    decay: 1,
                    distance: 100,
                    intensity: .45,
                    physically_correct: 0.0,
                    power: 0.0,
                    shadow_bias: - 0.005,
                    map_size_width: 512, 
                    map_size_height: 512, 
                    camera_near: 0.5,
                    camera_far: 500,
                    position: {
                        x: 4, y: 2, z: 4
                    }
                }
            },
            fill_light: {
                enable: true,
                show: false,
                options: {
                    color: 0xffffff,
                    decay: 1,
                    distance: 100,
                    intensity: .3,
                    physically_correct: 0.0,
                    power: 0.0,
                    shadow_bias: - 0.003,
                    map_size_width: 512, 
                    map_size_height: 512, 
                    camera_near: 0.5,
                    camera_far: 500,
                    position: {
                        x: -4, y: 2, z: 6
                    }
                }
            },
            back_light: {
                enable: true,
                show: false,
                options: {
                    color: 0xffffff,
                    decay: 1,
                    distance: 100,
                    intensity: .1,
                    physically_correct: 0.0,
                    power: 0.0,
                    shadow_bias: - 0.001,
                    map_size_width: 512, 
                    map_size_height: 512, 
                    camera_near: 0.5,
                    camera_far: 500,
                    position: {
                        x: 4, y: 2, z: -4
                    }
                }
            },
            top_light: {
                enable: true,
                show: false,
                options: {
                    color: 0xffffff,
                    decay: 1,
                    distance: 100,
                    intensity: .1,
                    physically_correct: 0.0,
                    power: 0.0,
                    shadow_bias: - 0.001,
                    map_size_width: 512, 
                    map_size_height: 512, 
                    camera_near: 0.5,
                    camera_far: 500,
                    position: {
                        x: 0, y: 8, z: 0
                    }
                }
            }
        }
        var settings = $.extend(defaults, options);

        if (settings.environment_light.enable) web3d.setupRGBE(settings.environment_light.options);

        var sphere_light = new THREE.SphereGeometry(0.2, 32, 32);

        if (settings.key_light.enable) {
            light_key = new THREE.PointLight(
                settings.key_light.options.color, 
                settings.key_light.options.intensity, 
                settings.key_light.options.distance,
                settings.key_light.options.decay,
                settings.key_light.options.physically_correct,
            );
            if (settings.key_light.show) {
                light_key.add(new THREE.Mesh(
                    sphere_light, 
                    new THREE.MeshBasicMaterial({ color: settings.key_light.options.color })
                ));
            }
            light_key.castShadow = true;
            light_key.shadow.bias = settings.key_light.options.shadow_bias;
            light_key.position.set(
                settings.key_light.options.position.x, 
                settings.key_light.options.position.y, 
                settings.key_light.options.position.z, 
            );
            scene.add(light_key);
        }
        
        if (settings.fill_light.enable) {
            light_fill = new THREE.PointLight(
                settings.fill_light.options.color, 
                settings.fill_light.options.intensity, 
                settings.fill_light.options.distance,
                settings.fill_light.options.decay,
                settings.fill_light.options.physically_correct,
            );            
            if (settings.fill_light.show) {
                light_fill.add(new THREE.Mesh(
                    sphere_light, 
                    new THREE.MeshBasicMaterial({ color: settings.fill_light.options.color })
                ));
            }
            light_fill.castShadow = true;
            light_fill.shadow.bias = settings.fill_light.options.shadow_bias;
            light_fill.position.set(
                settings.fill_light.options.position.x, 
                settings.fill_light.options.position.y, 
                settings.fill_light.options.position.z, 
            );
            scene.add(light_fill);
        }
        
        if (settings.back_light.enable) {
            light_back = new THREE.PointLight(
                settings.back_light.options.color, 
                settings.back_light.options.intensity, 
                settings.back_light.options.distance,
                settings.back_light.options.decay,
                settings.back_light.options.physically_correct,
            );
            if (settings.back_light.show) {
                light_back.add(new THREE.Mesh(
                    sphere_light, 
                    new THREE.MeshBasicMaterial({ color: settings.back_light.options.color })
                ));
            }
            light_back.castShadow = true;
            light_back.shadow.bias = settings.back_light.options.shadow_bias;
            light_back.position.set(
                settings.back_light.options.position.x, 
                settings.back_light.options.position.y, 
                settings.back_light.options.position.z, 
            );
            scene.add(light_back);
        }
        
        if (settings.top_light.enable) {
            light_top = new THREE.PointLight(
                settings.top_light.options.color, 
                settings.top_light.options.intensity, 
                settings.top_light.options.distance,
                settings.top_light.options.decay,
                settings.top_light.options.physically_correct,
            );
            if (settings.top_light.show) {
                light_top.add(new THREE.Mesh(
                    sphere_light, 
                    new THREE.MeshBasicMaterial({ color: settings.top_light.options.color })
                ));
            }
            light_top.castShadow = true;
            light_top.shadow.bias = settings.top_light.options.shadow_bias;
            light_top.position.set(
                settings.top_light.options.position.x, 
                settings.top_light.options.position.y, 
                settings.top_light.options.position.z, 
            );
            scene.add(light_top);
        }

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
            },
            smt_02: {
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
        obj_bg.castShadow = true;

        obj_bg.scale.set(10, 10, 10);
        obj_bg.position.set(0, 5, 0);
        obj_bg.material = new THREE.MeshLambertMaterial({
            emissive: 0x593b00
        });

        // const box_helper = new THREE.BoxHelper( obj_bg, 0xffff00 );
        // scene.add(box_helper);

        console.log(obj_bg);
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
    bubbleAnim: function(options) {
        var defaults = {
        }
        var settings = $.extend(defaults, options);

        // const spherical = new THREE.Spherical();
        // const rotationMatrix = new THREE.Matrix4();
        // const targetQuaternion = new THREE.Quaternion();

        // if ( ! mesh.quaternion.equals( targetQuaternion ) ) {

        //     const step = speed * delta;
        //     mesh.quaternion.rotateTowards( targetQuaternion, step );

        // }

        obj_bubble.lookAt(camera.position);

    },


    //---
    init: function () {
        web3d.setupEnvironment();

        web3d.loadBg();
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
        const delta = clock.getDelta();

        if (obj_bubble) {
            web3d.bubbleAnim();
        }

        web3d.callback();
        requestAnimationFrame(web3d.animate);
        web3d.render();
    },
    // Get
    callback: () => {}
}

debug = {
    getCamera: () => camera,
    getControls: () => controls,
    getObject: (obj_name) => {
        switch (obj_name) {
            case 'bubble': return obj_bubble;
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