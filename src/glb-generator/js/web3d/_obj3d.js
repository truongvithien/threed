import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

var obj3d;

var meshs = [];

obj3d = { 
    cleanUp: function(scene, camera) {
        for( var i = scene.children.length - 1; i >= 0; i--) { 
            var obj = scene.children[i];

            if (["obj3d_body", "obj3d_head", "obj3d_asset"].indexOf(obj.name) > -1) {
                scene.remove(obj); 
            }

       }
    },
    addGround: function(scene, camera){
        const geometry = new THREE.PlaneGeometry( 100, 100 );
        const material = new THREE.MeshPhongMaterial( { color: 0x00ff00, depthWrite: false } );				
        
        material.color.setHSL( 0.095, 1, 0.75 );

        const mesh = new THREE.Mesh( geometry, material );

        mesh.rotation.x = - Math.PI / 2;
        mesh.receiveShadow = true;
        scene.add( mesh );

        meshs.push(mesh);

        return mesh;
    },
    loadModel: async function(scene, camera, path_to_model, name){
        

        var model;
        const loader = new GLTFLoader();

        return new Promise((resolve, reject) => {
            loader.load( path_to_model, function ( gltf ) {

                // console.log(gltf.scene);
    
                model = gltf.scene;
    
                model.name = name;
                if (model.isMesh) {
                    model.castShadow = true;
                    model.receiveShadow = true;
                }
    
                var shadowJob = function(arrModel, isGoUp){
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
                            } else {
                                // console.log("st wrong again!");
                            }
                        });
                        console.log(childModel);
                    });
                    
                };

                shadowJob([model], false);

                // if (model.isMesh) {
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
    
    
                meshs.push(model);
                scene.add( model );
                // console.log("load obj");
                resolve("loaded obj");
            
            }, undefined, function ( error ) {
            
                console.error( error );

                reject(error);
            
            } );
        });

        




    }
}


export default obj3d;