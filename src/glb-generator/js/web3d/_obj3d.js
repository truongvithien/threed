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
        const material = new THREE.MeshPhongMaterial( { color: 0xffffff, depthWrite: false } );				
        
        material.color.setHSL( 0.095, 1, 0.75 );

        const mesh = new THREE.Mesh( geometry, material );

        mesh.rotation.x = - Math.PI / 2;
        mesh.receiveShadow = true;
        scene.add( mesh );

        meshs.push(mesh);

        return mesh;
    },
    loadModel: function(scene, camera, path_to_model, name){
        
        var model;
        const loader = new GLTFLoader();

        loader.load( path_to_model, function ( gltf ) {

            // console.log(gltf.scene);

            model = gltf.scene;

            model.castShadow = true;
            model.receiveShadow = true;
            model.name = name;

            scene.add( model );

            model.traverse( function ( object ) {

                if ( object.isMesh ) {
                    object.castShadow = true;
                    object.receiveShadow = true;
                };

            } );

            meshs.push(model);
        
        }, undefined, function ( error ) {
        
            console.error( error );
        
        } );

        return model;
    }
}


export default obj3d;