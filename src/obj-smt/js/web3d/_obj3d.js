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
    addRoom: function(scene, camera) {
        const geometry = new THREE.SphereGeometry( 30, 32, 32 );
        const material = new THREE.MeshLambertMaterial( { color: 0x50c5e6 , depthWrite: false } );				

        const roomMesh = new THREE.Mesh(geometry, material);
        roomMesh.material.side = THREE.BackSide;

        roomMesh.castShadow = true;
        roomMesh.receiveShadow = true;

        scene.add(roomMesh);
        meshs.push(roomMesh);

        return roomMesh;


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
    
                model.position.set(0 , 0, 0);
    
                meshs.push(model);
                scene.add( model );
                // console.log("load obj");
                resolve("loaded obj");
            
            }, undefined, function ( error ) {
            
                console.error( error );

                reject(error);
            
            } );
        });

        




    },
    addBoxes: function(scene, camera) {
        const geometry_1 = new THREE.SphereGeometry(.2, 32, 32);
        const geometry_2 = new THREE.SphereGeometry(.6, 32, 32);
        const material = new THREE.MeshLambertMaterial({
            color: 0xffffff
        });

        const boxMesh_1 = new THREE.Mesh(geometry_1, material);
        boxMesh_1.castShadow = true;
        boxMesh_1.receiveShadow = true;
        boxMesh_1.position.set(0, 2, 2);

        const boxMesh_2 = new THREE.Mesh(geometry_1, material);
        boxMesh_2.castShadow = true;
        boxMesh_2.receiveShadow = true;
        boxMesh_2.position.set(0, 2, -2);  

        // const lightSphere = new THREE.SphereGeometry(0.06, 32, 32);
        // const testLight = new THREE.PointLight(0xffffff, .5, 20);
        // testLight.add(new THREE.Mesh(lightSphere, new THREE.MeshBasicMaterial({ color: 0xffffff })));
        // testLight.castShadow = true;
        // testLight.shadow.bias = - 0.005;
        // testLight.position.set(0, 2, 3)

        scene.add(boxMesh_1);
        scene.add(boxMesh_2);
        // scene.add(testLight);

    }
}


export default obj3d;