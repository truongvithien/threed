import * as THREE from 'three';

var simple_geometry_obj; 

simple_geometry_obj = { 
    test: function(scene, camera){
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );

        scene.add( cube );

        camera.position.z = 5;
        // camera.rotation.x = 0.1;
        // camera.rotation.z = 0.1;

        return cube;
    }
}


export default simple_geometry_obj;