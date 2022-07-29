import * as THREE from 'three';

var helper = {
    create_light: {
        environment_light: function (options) {
            var defaults = {
                enable: true,
                options: {
                    dir: "assets/hdr/",
                    hdri_file: "provence_studio_1k_edit.hdr",
                    enable_background: false,
                    intensity: 1,
                }
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
                    shadow_bias: - 0.01,
                    map_size_width: 1000, 
                    map_size_height: 2000, 
                    camera_near: 0.5,
                    camera_far: 500,
                    position: {
                        x: 4, y: 4, z: 4
                    }
                }
            }
            var settings = $.extend(defaults, options);

            var sphere_light = new THREE.SphereGeometry(0.2, 32, 32);

            if (settings.options) {
                var obj_light = new THREE.PointLight(
                    settings.options.color, 
                    settings.options.intensity, 
                    settings.options.distance,
                    settings.options.decay,
                    settings.options.physically_correct,
                );
                if (settings.helper) {
                    obj_light.add(new THREE.Mesh(
                        sphere_light, 
                        new THREE.MeshBasicMaterial({ color: settings.options.debug_color })
                    ));
                }
                obj_light.castShadow = true;
                obj_light.shadow.bias = settings.options.shadow_bias;
                obj_light.position.set(
                    settings.options.position.x, 
                    settings.options.position.y, 
                    settings.options.position.z, 
                );
    
                return obj_light
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
                    shadow_bias: - 0.01,
                    map_size_width: 1000, 
                    map_size_height: 2000, 
                    camera_near: 0.5,
                    camera_far: 500,
                    position: {
                        x: 4, y: 4, z: 4
                    }
                }
            }
            var settings = $.extend(defaults, options);


            if (settings.enable) {
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
        amb_light: function(options) {
            var defaults = {
                enable: true,
                helper: false,
                options: {
                    color: 0x404040,
                    intensity: 0.1
                }
            }
            var settings = $.extend(defaults, options);

            if (settings.enable) {
                var obj_light = new THREE.AmbientLight(settings.options.color, settings.options.intensity);
                return obj_light;
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
                    angle: Math.PI/ 3,
                    penumbra: 0,
                    cast_shadow: false,
                    shadow_map_size_width: 512,
                    shadow_map_size_height: 512,
                    shadow_camera_near: 10,
                    shadow_camera_far: 200,
                    shadow_focus: 1,
                    position: {
                        x: 4, y: 4, z: 4
                    },
                    target: {
                        x: 4, y: 4, z: 4
                    }
                }
            }
            var settings = $.extend(defaults, options);
            
            if (settings.enable) {
                var obj_light = new THREE.SpotLight( 
                    settings.options.color,  
                    settings.options.intensity, 
                    settings.options.distance, 
                    settings.options.angle, 
                    settings.options.penumbra,  
                    settings.options.decay
                );

                obj_light.position.set(
                    settings.options.position.x, 
                    settings.options.position.y, 
                    settings.options.position.z, 
                );
                
                obj_light.angle = settings.options.angle;
                obj_light.penumbra = settings.options.penumbra;
                obj_light.decay = settings.options.decay;
                obj_light.distance = settings.options.distance;
    
                obj_light.castShadow = settings.options.cast_shadow;
                // obj_light.shadow.mapSize.width = settings.options.shadow_map_size_width;
                // obj_light.shadow.mapSize.height = settings.options.shadow_map_size_height;
                obj_light.shadow.camera.near = settings.options.shadow_camera_near;
                obj_light.shadow.camera.far = settings.options.shadow_camera_far;
                obj_light.shadow.focus = settings.options.shadow_focus;

                obj_light.receiveShadow = true;
                obj_light.castShadow = true;

                obj_light.target.position.set(
                    settings.options.target.x, 
                    settings.options.target.y, 
                    settings.options.target.z
                )

                // obj_light.target.x =  settings.options.target.x; 
                // obj_light.target.y =  settings.options.target.y; 
                // obj_light.target.z =  settings.options.target.z; 
                //     settings.options.target.y, 
                //     settings.options.target.z, 
                // ;

                // console.log(obj_light);
                
                if (settings.helper) {
                    var lightHelper = new THREE.SpotLightHelper( obj_light );
                    var shadowCameraHelper = new THREE.CameraHelper( obj_light.shadow.camera );
                    obj_light.add(lightHelper);
                    obj_light.add(shadowCameraHelper);
                }

                return obj_light;
    
            }



        }
    },

    loading: function(enableLoading, options) {
        var defaults = {
            rendered_element: "#rendered_avatar",
            className: "loading"
        }
        var settings = $.extend(defaults, options);

        if (enableLoading) {
            $(settings.rendered_element).addClass(settings.className);
            $(settings.rendered_element + " canvas").css({
                opacity: 0
            });
        } else {
            $(settings.rendered_element).removeClass(settings.className);
            $(settings.rendered_element + " canvas").css({
                opacity: 1
            });
        }
    },

    clean: function(scene, options) {
        var defaults = {
        }
        var settings = $.extend(defaults, options);

        // CLEAN 2D


        // CLEAN 3D
        
    },



}

export default helper;