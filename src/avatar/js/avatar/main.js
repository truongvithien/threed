import * as THREE from 'three';
import { OrbitControls } from 'three/examples/js/controls/OrbitControls';
import { LightProbeGenerator } from 'three/examples/js/lights/LightProbeGenerator';

// LOADER

import { RGBELoader } from 'three/examples/js/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

// POST - PROCESSING

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { LUTPass } from 'three/examples/jsm/postprocessing/LUTPass.js';
import { LUTCubeLoader } from 'three/examples/jsm/loaders/LUTCubeLoader.js';
import { LUT3dlLoader } from 'three/examples/jsm/loaders/LUT3dlLoader.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';

// 

import helper from "./_helper";
import { TextureLoader } from 'three';

var avatar, debug;

var scene, camera, renderer, controls, 
    mixer, 
    composer, lutPass, lutMap;

var light = {
    hemi: {}, dir: {}, key: {}, fill: {},
    back: {}, top: {}, top2: {}, bottom: {}
}

const clock = new THREE.Clock();
const frustumSize = 600;

// OBJECT 3D

var test_background_data, test_background_obj;

var smt_background_data, smt_background_obj, smt_background_2d,
    smt_avatar_data, smt_avatar_obj, smt_avatar_2d;

var starter_all_obj, starter_anim_obj, 
    starter_background_data, starter_background_obj, starter_background_2d,
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
                normalScale: new THREE.Vector2(-1, -1),
                roughness: 1.5
            },
            st_background: {
                // emissiveIntensity: 2,
                // normalScale: new THREE.Vector2(-1, -1),
                // envMapIntensity: 0,
                // roughness: 0,
                // transparent: true
            },
            st_text: {
                emissiveIntensity: 0,
                normalScale: new THREE.Vector2(0, 0),
                // envMapIntensity: .5,
            },
            st_face: {
                aoMapIntensity: .1,
                // roughness: .8,
                // envMapIntensity: .5,
                // normalMapType: THREE.ObjectSpaceNormalMap
            },
            st_skin: {
                // aoMapIntensity: .1,
                // roughness: .8,
                envMapIntensity: .7,
                // normalMapType: THREE.ObjectSpaceNormalMap
                
            },
            st_hair: {
                aoMap: null,
                // aoMapIntensity: .2,
                // normalScale: new THREE.Vector2(.15, .15),
                normalScale: new THREE.Vector2(.5, .5),
                // envMapIntensity: .5,
                
                // roughness: 1.5,
                // envMapIntensity: 1.2
            },
            st_outfit: {
                // aoMapIntensity: .1,
                // emissiveIntensity: 1,
                // normalScale: new THREE.Vector2(1, 1),
                // envMapIntensity: .5,
                // normalMapType: THREE.ObjectSpaceNormalMap
            },
            st_asset: {
                // aoMapIntensity: .1,
                // emissiveIntensity: 1,
                // normalScale: new THREE.Vector2(1.5, 1.5),
                // envMapIntensity: .5,
            },
            st_eyewear: {
                // aoMapIntensity: .1,
                // emissiveIntensity: 1,
                // normalScale: new THREE.Vector2(1, 1),
                // envMapIntensity: .5,
                transparent: true
            }
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
        texture_text_suffix: {
            base_color: "_Text_SHD_BaseColor.png",
        },
        post_processing: {
            lut_asset: "assets/lut/",
            lut_file: "Apple_prores_422_6.A002_02161207_C015.cube",
            // lut_file: "Protect_Highlights_01.cube",
            lutPass_options: {
                enable: true,
                // intensity: .025,
                intensity: .55
            }
        },
        light_options: {
            environment_light: {
                enable: 1,
                options: {
                    dir: "assets/hdr/",
                    hdri_file: "provence_studio_1k_edit.hdr", 
                    enable_background: false,
                    intensity: .005,
                }
            },
            ambient_light: {
                enable: 0,
                options: {
                    color: 0xffffff,
                    intensity: .1
                }
            },
            hemisphere_light: { 
                enable: 1,
                options: {
                    skyColor: 0xffffff,
                    groundColor: 0xffffff,
                    intensity: .2,
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
                    decay: .2,
                    distance: 80,
                    intensity: 2.8,
                    angle: Math.PI/ 2,
                    penumbra: 0,
                    cast_shadow: true,
                    shadow_map_size_width: 512,
                    shadow_map_size_height: 512,
                    shadow_camera_near: 0,
                    shadow_camera_far: 500,
                    shadow_focus: 1,
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
                    decay: .2,
                    distance: 50,
                    intensity: .6,
                    angle: Math.PI/ 3,
                    penumbra: 0,
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
                    decay: .2,
                    distance: 50,
                    intensity: 1,
                    angle: Math.PI/ 3,
                    penumbra: 0,
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
                    decay: .2,
                    distance: 50,
                    intensity: .6,
                    angle: Math.PI/ 5,
                    penumbra: 0,
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
            top2_light: {
                enable: 1,
                helper: 0,
                options: {
                    debug_color: 0xff0000,
                    color: 0xffffff,               
                    decay: .2,
                    distance: 50,
                    intensity: .4,
                    angle: Math.PI/ 5,
                    penumbra: 0,
                    cast_shadow: true,
                    shadow_map_size_width: 512,
                    shadow_map_size_height: 512,
                    shadow_camera_near: 10,
                    shadow_camera_far: 200,
                    shadow_focus: .2,
                    position: {
                        x: 0, y: 8, z: -3
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
                    decay: .2,
                    distance: 50,
                    intensity: 1.2,
                    angle: Math.PI/ 3,
                    penumbra: 0,
                    cast_shadow: true,
                    shadow_map_size_width: 512,
                    shadow_map_size_height: 512,
                    shadow_camera_near: 10,
                    shadow_camera_far: 200,
                    shadow_focus: .2,
                    position: {
                        x: 0, y: -1, z: 2
                    },
                    target: {
                        x: 0, y: 3, z: 0
                    }
                }
            }
        }
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

    },

    // =======

    loadSMT: async function(smt_code, options = {}) {
        var defaults = {
            asset_dir: avatar.asset_dir,
            texture_options: _DEFAULT.texture_options,
            model_suffix: _DEFAULT.model_suffix,
            texture_suffix: _DEFAULT.texture_suffix,
            texture_skin_suffix: _DEFAULT.texture_skin_suffix,
            texture_text_suffix: _DEFAULT.texture_text_suffix,
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
            texture_text_suffix: _DEFAULT.texture_text_suffix,
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
            map: texLoader.load(settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.texture_suffix.base_color),
            metalnessMap: texLoader.load(settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.texture_suffix.metallic),
            normalMap: texLoader.load(settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.texture_suffix.normal),
            roughnessMap: texLoader.load(settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.texture_suffix.roughness),
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
            aoMap: texLoader.load(settings.asset_dir + obj_st["hair"] + "/" + obj_st["hair"] + settings.texture_suffix.ambient_occlusion),
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
        // outfit_texture.map.encoding = THREE.sRGBEncoding;

        // skin in outfit
        const skinin_texture = {
            map: texLoader.load(settings.asset_dir + "Bodybase/Bodybase" + settings.texture_suffix.base_color),
            metalnessMap: texLoader.load(settings.asset_dir + "Bodybase/Bodybase" + settings.texture_suffix.metallic),
            normalMap: texLoader.load(settings.asset_dir + "Bodybase/Bodybase" + settings.texture_suffix.normal),
            roughnessMap: texLoader.load(settings.asset_dir + "Bodybase/Bodybase" + settings.texture_suffix.roughness),
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
        const text_texture = {
            map: texLoader.load(settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.texture_text_suffix.base_color),
            metalnessMap: texLoader.load(settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.texture_suffix.metallic),
            normalMap: texLoader.load(settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.texture_suffix.normal),
            roughnessMap: texLoader.load(settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.texture_suffix.roughness),
            // aoMap: texLoader.load(settings.asset_dir + obj_st["outfit"] + "/" + obj_st["outfit"] + settings.texture_suffix.ambient_occlusion),
            // alphaMap: texLoader.load(settings.asset_dir + obj_st["outfit"] + "/" + obj_st["outfit"] + settings.texture_suffix.alpha),
        }

        // SCALE, SHADOW, TEXTURE OPTIONS FOR MESHES
        starter_background_obj.scale.set(
            settings.scale.x,
            settings.scale.y,
            settings.scale.z,
        );
        starter_background_obj.receiveShadow = false;
        starter_background_obj.castShadow = false;
        var texture_background = new THREE.MeshBasicMaterial({
            ...background_texture,
            ...settings.texture_options.st_background
        });
        var texture_text = new THREE.MeshStandardMaterial({
            ...text_texture,
            ...settings.texture_options.st_background
        });
        starter_background_obj.traverse((o) => {
            if (o.isMesh && o.name == "mesh_0") {
                o.castShadow = true;
                o.receiveShadow = true;
                o.material = texture_background;
            } else if (o.isMesh) {
                o.castShadow = false;
                o.receiveShadow = false;
                o.material = texture_text;
            }
        });
        console.log("BG/Text: ");
        console.log(starter_background_obj);
        //--- FACE
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
        //--- HAIR
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
        //--- OUTFIT
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
        var texture_skinin = new THREE.MeshStandardMaterial({
            ...skinin_texture,
            ...settings.texture_options.st_skin
        });
        starter_outfit_obj.children[1].traverse((o) => {
            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
                o.material = texture_outfit;
            }
        });
        starter_outfit_obj.children[0].traverse((o) => {
            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
                o.material = texture_skinin;
            }
        });
        console.log("Outfit: ");
        console.log(starter_outfit_obj);
        //--- ASSET
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
        var texture_skinin = new THREE.MeshStandardMaterial({
            ...skinin_texture,
            ...settings.texture_options.st_skin
        });
        starter_asset_obj.traverse((o) => {
            if (o.isMesh && ["mesh_1"].indexOf(o.name) > -1) {
                o.castShadow = true;
                o.receiveShadow = true;
                o.material = texture_asset;
            } else {
                o.castShadow = true;
                o.receiveShadow = true;
                o.material = texture_skinin;
            }
        });
        console.log("Asset: ");
        console.log(starter_asset_obj);
        //--- EYEWEAR
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

        starter_all_obj = new THREE.Object3D();
        starter_all_obj.add(starter_background_obj);
        starter_all_obj.add(starter_face_obj);
        starter_all_obj.add(starter_hair_obj);
        starter_all_obj.add(starter_outfit_obj);
        starter_all_obj.add(starter_asset_obj);
        starter_all_obj.add(starter_eyewear_obj);

        console.log("All: ");
        console.log(starter_all_obj);

        scene.add(starter_all_obj);

        // scene.add(starter_background_obj);
        // scene.add(starter_face_obj);
        // scene.add(starter_hair_obj);
        // scene.add(starter_outfit_obj);
        // scene.add(starter_asset_obj);
        // scene.add(starter_eyewear_obj);

        helper.loading(false, {rendered_element: avatar.rendered_element});

    },

    loadSTDEMO: async function(st_code, anim_code = "ST_Walk", options) {
        var defaults = {
            asset_dir: avatar.asset_dir,
            texture_options: _DEFAULT.texture_options,
            model_suffix: _DEFAULT.model_suffix,
            texture_suffix: _DEFAULT.texture_suffix,
            texture_skin_suffix: _DEFAULT.texture_skin_suffix,
            texture_text_suffix: _DEFAULT.texture_text_suffix,
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
            fbxLoader = new FBXLoader(),
            texLoader = new THREE.TextureLoader();

        helper.loading(true, {rendered_element: avatar.rendered_element});
        helper.clean(scene);
        
        [
            starter_background_data,
            starter_anim_obj        
        ] = await Promise.all([
            glbLoader.loadAsync(
                settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.model_suffix.st
            ),
            fbxLoader.loadAsync(
                settings.asset_dir + "DEMO/" + anim_code +  settings.model_suffix.smt
            ),
        ]);

        starter_background_obj = starter_background_data.scene.children[0];

        // LOAD TEXTURE
        const background_texture = {
            map: texLoader.load(settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.texture_suffix.base_color),
            metalnessMap: texLoader.load(settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.texture_suffix.metallic),
            normalMap: texLoader.load(settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.texture_suffix.normal),
            roughnessMap: texLoader.load(settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.texture_suffix.roughness),
            // aoMap: texLoader.load(settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.texture_suffix.ambient_occlusion),
        } 
        const body_texture = {
            map: texLoader.load(settings.asset_dir + "DEMO/Body" + settings.texture_suffix.base_color),
            metalnessMap: texLoader.load(settings.asset_dir + "DEMO/Body" + settings.texture_suffix.metallic),
            normalMap: texLoader.load(settings.asset_dir + "DEMO/Body" + settings.texture_suffix.normal),
            roughnessMap: texLoader.load(settings.asset_dir + "DEMO/Body" + settings.texture_suffix.roughness),
            // aoMap: texLoader.load(settings.asset_dir + "DEMO/Body" + settings.texture_suffix.ambient_occlusion),
            // alphaMap: texLoader.load(settings.asset_dir + "DEMO/Body" + settings.texture_suffix.alpha),
        }
        const hair_texture = {
            map: texLoader.load(settings.asset_dir + "DEMO/" + obj_st["hair"] + settings.texture_suffix.base_color),
            metalnessMap: texLoader.load(settings.asset_dir + "DEMO/" + obj_st["hair"] + settings.texture_suffix.metallic),
            normalMap: texLoader.load(settings.asset_dir + "DEMO/" + obj_st["hair"] + settings.texture_suffix.normal),
            roughnessMap: texLoader.load(settings.asset_dir + "DEMO/" + obj_st["hair"] + settings.texture_suffix.roughness),
            aoMap: texLoader.load(settings.asset_dir + "DEMO/" + obj_st["hair"] + settings.texture_suffix.ambient_occlusion),
            // alphaMap: texLoader.load(settings.asset_dir + "DEMO/" + obj_st["hair"] + settings.texture_suffix.alpha),
        }
        const outfit_texture = {
            map: texLoader.load(settings.asset_dir + "DEMO/" + obj_st["outfit"] + settings.texture_suffix.base_color),
            metalnessMap: texLoader.load(settings.asset_dir + "DEMO/" + obj_st["outfit"] + settings.texture_suffix.metallic),
            normalMap: texLoader.load(settings.asset_dir + "DEMO/" + obj_st["outfit"] + settings.texture_suffix.normal),
            roughnessMap: texLoader.load(settings.asset_dir + "DEMO/" + obj_st["outfit"] + settings.texture_suffix.roughness),
            // aoMap: texLoader.load(settings.asset_dir + "DEMO/" + obj_st["outfit"] + settings.texture_suffix.ambient_occlusion),
            // alphaMap: texLoader.load(settings.asset_dir + "DEMO/" + obj_st["outfit"] + settings.texture_suffix.alpha),
        }
        // outfit_texture.map.encoding = THREE.sRGBEncoding;

        const eyewear_texture = {
            map: texLoader.load(settings.asset_dir + "DEMO/" + obj_st["eyewear"] + settings.texture_suffix.base_color),
            metalnessMap: texLoader.load(settings.asset_dir + "DEMO/" + obj_st["eyewear"] + settings.texture_suffix.metallic),
            normalMap: texLoader.load(settings.asset_dir + "DEMO/" + obj_st["eyewear"] + settings.texture_suffix.normal),
            roughnessMap: texLoader.load(settings.asset_dir + "DEMO/" + obj_st["eyewear"] + settings.texture_suffix.roughness),
            // aoMap: texLoader.load(settings.asset_dir + "DEMO/" + obj_st["eyewear"] + settings.texture_suffix.ambient_occlusion),
            alphaMap: texLoader.load(settings.asset_dir + "DEMO/" + obj_st["eyewear"] + settings.texture_suffix.alpha),
        }
        const text_texture = {
            map: texLoader.load(settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.texture_text_suffix.base_color),
            metalnessMap: texLoader.load(settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.texture_suffix.metallic),
            normalMap: texLoader.load(settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.texture_suffix.normal),
            roughnessMap: texLoader.load(settings.asset_dir + obj_st["background_text"] + "/" + obj_st["background_text"] + settings.texture_suffix.roughness),
            // aoMap: texLoader.load(settings.asset_dir + obj_st["outfit"] + "/" + obj_st["outfit"] + settings.texture_suffix.ambient_occlusion),
            // alphaMap: texLoader.load(settings.asset_dir + obj_st["outfit"] + "/" + obj_st["outfit"] + settings.texture_suffix.alpha),
        }
        

        // LOAD ANIMATION
        mixer = new THREE.AnimationMixer (starter_anim_obj);
        const action = mixer.clipAction(starter_anim_obj.animations[ 0 ]);
        action.play();

        // SCALE, SHADOW, TEXTURE OPTIONS FOR MESHES


        starter_background_obj.scale.set(
            settings.scale.x,
            settings.scale.y,
            settings.scale.z,
        );
        starter_background_obj.receiveShadow = false;
        starter_background_obj.castShadow = false;
        var texture_background = new THREE.MeshBasicMaterial({
            ...background_texture,
            ...settings.texture_options.st_background
        });
        var texture_text = new THREE.MeshStandardMaterial({
            ...text_texture,
            ...settings.texture_options.st_background
        });
        starter_background_obj.traverse((o) => {
            if (o.isMesh && o.name == "mesh_0") {
                o.castShadow = true;
                o.receiveShadow = true;
                o.material = texture_background;
            } else if (o.isMesh) {
                o.castShadow = false;
                o.receiveShadow = false;
                o.material = texture_text;
            }
        });
        console.log("BG/Text: ");
        console.log(starter_background_obj);
        starter_background_obj.scale.set(.06, .06, .06)

        // ====
        starter_anim_obj.scale.set(
            settings.scale.x,
            settings.scale.y, 
            settings.scale.z,
        );
        starter_anim_obj.receiveShadow = true;
        starter_anim_obj.castShadow = true;

        var texture_background = new THREE.MeshBasicMaterial({
            ...background_texture,
            ...settings.texture_options.st_background
        });
        var texture_text = new THREE.MeshStandardMaterial({
            ...text_texture,
            ...settings.texture_options.st_background
        });

        var texture_skin = new THREE.MeshStandardMaterial({
            ...body_texture,
            ...settings.texture_options.st_skin
        });
        var texture_outfit = new THREE.MeshStandardMaterial({
            ...outfit_texture,
            ...settings.texture_options.st_outfit
        });
        var texture_hair = new THREE.MeshStandardMaterial({
            ...hair_texture,
            ...settings.texture_options.st_hair
        });
        var texture_eyewear = new THREE.MeshStandardMaterial({
            ...eyewear_texture,
            ...settings.texture_options.st_eyewear
        });

        starter_anim_obj.traverse((o) => {
            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
                // console.log(o.name);
                switch (o.name) {
                    case "Body": 
                    case "Body_low": 
                    case "Head_low": 
                    case "eye_low": 
                        o.material = texture_skin;
                        break;
                    case "OM2dsdas": 
                        o.material = texture_outfit;
                        break;
                    case "E3_low": 
                    case "eyewear": 
                        o.material = texture_eyewear;
                        break;
                    case "H3": 
                    case "hair01_low": 
                    case "hair02_low":  
                        o.material = texture_hair;
                        break;
                    default:
                        o.material = texture_skin;
                        break;
                }
            } 
        });
        console.log("Anim ST: "); 
        console.log(starter_anim_obj);   
        
        // ADD ST OBJ TO SCENE

        // starter_all_obj = new THREE.Object3D();
        // starter_all_obj.add(starter_background_obj);
        // starter_all_obj.add(starter_face_obj);
        // starter_all_obj.add(starter_hair_obj);
        // starter_all_obj.add(starter_outfit_obj);
        // starter_all_obj.add(starter_asset_obj); 
        // starter_all_obj.add(starter_eyewear_obj);

        // console.log("All: ");
        // console.log(starter_all_obj);

        scene.add(starter_background_obj);
        scene.add(starter_anim_obj);
        // scene.add(starter_face_obj);
        // scene.add(starter_hair_obj);
        // scene.add(starter_outfit_obj);
        // scene.add(starter_asset_obj);
        // scene.add(starter_eyewear_obj);

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
        // test_background_obj.material = new THREE.MeshLambertMaterial({
        //     emissive: 0x593b00,
        //     emissiveIntensity: .8
        // });
        test_background_obj.material = new THREE.MeshLambertMaterial({
            color: 0x0083ad,
            emissive: 0x0083ad,
            emissiveIntensity: 1
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
            avatar.setup.renderer(); // => renderer
            avatar.setup.post_processing(); // => composer
            avatar.setup.controls();
            avatar.setup.lights(_DEFAULT.light_options);
        },
        lights: function(options) {
            var defaults = {
                environment_light: {
                    enable: true,
                    options: {
                        dir: "assets/hdr/",
                        hdri_file: "provence_studio_1k_edit.hdr", 
                        enable_background: false,
                        intensity: 1,
                    }
                },
                ambient_light: {
                    enable: true,
                    options: {
                        color: 0xffffff,
                        intensity: .1
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
                        decay: 0,
                        distance: 100,
                        intensity: 1.95,
                        angle: Math.PI/ 2,
                        penumbra: 0,
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
                        color: 0xffe0a9,
                        decay: 0,
                        distance: 50,
                        intensity: .5,
                        angle: Math.PI/ 3,
                        penumbra: 0,
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
                        decay: 0,
                        distance: 50,
                        intensity: .9,
                        angle: Math.PI/ 3,
                        penumbra: 0,
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
                        decay: 0,
                        distance: 50,
                        intensity: .4,
                        angle: Math.PI/ 5,
                        penumbra: 0,
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
                        decay: 0,
                        distance: 50,
                        intensity: .4,
                        angle: Math.PI/ 3,
                        penumbra: 0,
                        cast_shadow: true,
                        shadow_map_size_width: 512,
                        shadow_map_size_height: 512,
                        shadow_camera_near: 10,
                        shadow_camera_far: 200,
                        shadow_focus: .2,
                        position: {
                            x: 0, y: -1, z: 2
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

            // 

            light.ambient = helper.create_light.amb_light(settings.ambient_light);
            if (settings.ambient_light.enable) {
                scene.add(light.ambient);

            }
            
            
            // helper.create_light.environment_light(settings.environment_light.options);
    
            light.key = helper.create_light.spot_light(settings.key_light);
            if (settings.key_light.enable) {
                scene.add( light.key);
                scene.add( light.key.target );
                if (settings.key_light.helper) {
                    console.log(light.key);
                }
            }
    
            
            light.fill = helper.create_light.spot_light(settings.fill_light);
            if (settings.fill_light.enable) {
                scene.add( light.fill);
                scene.add( light.fill.target );
                if (settings.fill_light.helper) {
                    console.log(light.fill);
                }
            }
            
            light.back = helper.create_light.spot_light(settings.back_light);
            if (settings.back_light.enable) {
                scene.add( light.back);
                scene.add( light.back.target );
                if (settings.back_light.helper) {
                    console.log(light.back);
                }
            }
            
            light.top = helper.create_light.spot_light(settings.top_light);
            if (settings.top_light.enable) {
                scene.add( light.top);
                scene.add( light.top.target );
                if (settings.top_light.helper) {
                    console.log(light.top);
                }
            }
            
            light.top2 = helper.create_light.spot_light(settings.top2_light);
            if (settings.top2_light.enable) {
                scene.add( light.top2);
                scene.add( light.top2.target );
                if (settings.top2_light.helper) {
                    console.log(light.top2);
                }
            }
            
            light.bottom = helper.create_light.spot_light(settings.bottom_light);
            if (settings.bottom_light.enable) {
                scene.add( light.bottom);
                scene.add( light.bottom.target );
                if (settings.bottom_light.helper) {
                    console.log(light.bottom);
                }
            }

            if (settings.hemisphere_light.enable) {
                light.hemi = new THREE.HemisphereLight(0xffffff, 0xffffff, settings.hemisphere_light.options.intensity);
                // light.hemi.color.setHSL(0.6, 1, 0.6);
                // light.hemi.groundColor.setHSL(0.095, 1, 0.75);
                light.hemi.position.set(0, 50, 0);
                scene.add(light.hemi);
    
                if (avatar.helper) {
                    const light_hemi_helper = new THREE.HemisphereLightHelper(light.hemi, 10);
                    scene.add(light_hemi_helper);
                }
            }

            // if (settings.ambient_light.enable) {
            //     light.hemi = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
            //     light.hemi.color.setHSL(0.6, 1, 0.6);
            //     light.hemi.groundColor.setHSL(0.095, 1, 0.75);
            //     light.hemi.position.set(0, 50, 0);
            //     scene.add(light.hemi);
    
            //     if (avatar.helper) {
            //         const light_hemi_helper = new THREE.HemisphereLightHelper(light.hemi, 10);
            //         scene.add(light_hemi_helper);
            //     }
            // }
    
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
        scene: function(options) {
            var defaults = {
            }
            var settings = $.extend(defaults, options);

            scene = new THREE.Scene();
            scene.background = new THREE.Color().setHSL(0, 0, 0);
            // scene.fog = new THREE.Fog(scene.background, 1, 5000);
            scene.fog = new THREE.FogExp2( 0xffffff, .0 );
        },
        renderer: function(options) {
            var defaults = {
            }
            var settings = $.extend(defaults, options);
            renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true
            });
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize(avatar.dom_width, avatar.dom_height);

            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;

            renderer.physicallyCorrectLights = true;
            renderer.outputEncoding =  THREE.sRGBEncoding;
            // renderer.toneMapping = THREE.ACESFilmicToneMapping;
            // renderer.toneMappingExposure = .5;
            renderer.gammaOutput = true;
            // renderer.gammaFactor = -.1;
            // renderer.toneMappingExposure = 1.02;

            // composer = new EffectComposer(renderer);

            $(avatar.rendered_element).append(renderer.domElement); 
            window.addEventListener( 'resize', avatar.setup.onWindowResize );

        },
        post_processing: function(options) {
            var defaults = {
                lut_asset: _DEFAULT.post_processing.lut_asset,
                lut_file: _DEFAULT.post_processing.lut_file,
            }
            var settings = $.extend(defaults, options); 

            // ======
            
            const target = new THREE.WebGLRenderTarget( {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat,
                encoding: THREE.sRGBEncoding
            } );

            composer = new EffectComposer( renderer, target );
            composer.setPixelRatio( window.devicePixelRatio );
            composer.setSize( avatar.dom_width, avatar.dom_height );
            
            const renderPass = new RenderPass( scene, camera ),
                fxaaPass = new ShaderPass( FXAAShader ),
                shaderPass = new ShaderPass( GammaCorrectionShader );

            // renderPass.clearColor = new THREE.Color( 0, 0, 0 );
            // renderPass.clearAlpha = 0;


            composer.addPass( renderPass );
            composer.addPass( fxaaPass );
            composer.addPass( shaderPass );

            lutPass = new LUTPass();
            composer.addPass( lutPass );

            // LOADER
            const 
                LUTCUBELoader = new LUTCubeLoader(),
                LUT3DLLOADER = new LUT3dlLoader();

            if ( /\.CUBE$/i.test( settings.lut_file ) ) {
                LUTCUBELoader.load( settings.lut_asset + settings.lut_file, function ( result ) {
                    lutMap = result;
                    // console.log(lutMap);
                });
            } else {
                LUT3DLLOADER.load( settings.lut_asset + settings.lut_file, function ( result ) {
                    lutMap = result;
                    // console.log(lutMap);
                });
            }
            

             
        },
        onWindowResize: function (options) {
            var defaults = {
            }
            var settings = $.extend(defaults, options);

            camera.aspect = avatar.dom_width / avatar.dom_height;
            camera.updateProjectionMatrix();

            renderer.setSize(avatar.dom_width, avatar.dom_height );
            if (composer) {
                composer.setSize(avatar.dom_width, avatar.dom_height );
            }

            avatar.setup.animate();
        },
        camera: function(options) {
            var defaults = {
            }
            var settings = $.extend(defaults, options);
            camera = new THREE.PerspectiveCamera(
                85,
                avatar.dom_width / avatar.dom_height,
                0.01,
                1000);
            // camera.position.set(2, 4.1, 5.3);
            // camera.position.set(0.6, 4.4, 5.9);
            camera.position.set(1.42, 1.47, 5.05);

            // camera.position.set(15.7, 58.4, 60.5);
            camera.lookAt(0, 12, 0);

            // ========


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
                    x: 0, y: 3.0, z: 0
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
            if (composer) {
                composer.render(scene, camera); 
            } else {
                renderer.render(scene, camera);
            }
        },
        animate: function(options) {
            requestAnimationFrame( avatar.setup.animate );
            const delta = clock.getDelta();
    
            if (starter_background_obj) {
                starter_background_obj.lookAt(
                    camera.position.x ,
                    camera.position.y - 2,
                    camera.position.z
                    
                    );
            } 

            if ( mixer ) mixer.update( delta );
    
            avatar.callback();
            avatar.setup.render();            
            
            


            // console.log()
            // console.log(lutMap);
 
            if (lutMap) {
                // console.log(lutMap);
                lutPass.enable = _DEFAULT.post_processing.lutPass_options.enable,
                lutPass.lut = lutMap.texture;
                lutPass.intensity = _DEFAULT.post_processing.lutPass_options.intensity;
            }

            // console.log(composer);
        }
    },
    callback: function(options){
        var defaults = {
        }
        var settings = $.extend(defaults, options);
    },

    // ======

    switch: function(options) {
        var defaults = {
            asset_dir: avatar.asset_dir,
            texture_options: _DEFAULT.texture_options,
            texture_suffix: _DEFAULT.texture_suffix,
            texture_skin_suffix: _DEFAULT.texture_skin_suffix,
        }
        var settings = $.extend(defaults, options);

        $("body").append(`
        <div class="controls">
			<input type="checkbox" id="switch_avatar" class="switch_avatar">
			<label for="switch_avatar">Switch to <span class="dim">3</span>D</label>
		</div>
        `)

        var url = new URL(window.location.href);
        var dim = url.searchParams.get("dim");

        // if ($(avatar.switch_element).prop('checked', true)) {
        //     $(avatar.rendered_element).removeClass("active");
        //     $(avatar.layered_element).addClass("active");
        //     $(avatar.switch_element + " + label .dim").html(2);
        // } else {
        //     $(avatar.layered_element).removeClass("active");
        //     $(avatar.rendered_element).addClass("active");
        //     $(avatar.switch_element + " + label .dim").html(3);
        // }

        if ($(avatar.switch_element).length > 0) {

        }
        
        $(avatar.switch_element).on("click", function(){
            if ($(avatar.switch_element).is(':checked')) {
                console.log("A");
                $(avatar.rendered_element).removeClass("active");
                $(avatar.layered_element).addClass("active");
                $(avatar.switch_element + " + label .dim").html(3);
            } else {
                console.log("B");
                $(avatar.layered_element).removeClass("active");
                $(avatar.rendered_element).addClass("active");
                $(avatar.switch_element + " + label .dim").html(2);
            }
        })
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
            case 'fake_cam_obj': return fake_cam_obj;
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

///filter: saturate(1.4) contrast(1.2);
//
// - ST di chuyen duoc (giong SMT) 
//   -> FBX (Anh Dat)
//   -> BG (Anh Dung)
// - LookDev 
// 
//
