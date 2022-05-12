import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

var obj3d; 

obj3d = { 
    addGround: function(scene, camera){
        const geometry = new THREE.PlaneGeometry( 100, 100 );
        const material = new THREE.MeshPhongMaterial( { color: 0xffffff, depthWrite: false } );				
        
        material.color.setHSL( 0.095, 1, 0.75 );

        const mesh = new THREE.Mesh( geometry, material );

        mesh.rotation.x = - Math.PI / 2;
        mesh.receiveShadow = true;
        scene.add( mesh );

        return mesh;
    },
    loadModel: function(scene, camera, path_to_model){
        
        var model;
        const loader = new GLTFLoader();

        loader.load( path_to_model, function ( gltf ) {

            console.log(gltf.scene);

            model = gltf.scene;

            model.castShadow = true;
            model.receiveShadow = true;

            scene.add( model );

            model.traverse( function ( object ) {

                if ( object.isMesh ) {
                    object.castShadow = true;
                    object.receiveShadow = true;
                };

            } );
        
        }, undefined, function ( error ) {
        
            console.error( error );
        
        } );

        return model;
    }
}


export default obj3d;