import config from "../../setup/config";
import bootstrap from 'bootstrap';
import {web3d, debug} from "./_web3d";


window.debug = debug;


$(function () {
    web3d.init();

    // debug.freeCamera();
});

window.addEventListener("load", function(){
    var url = new URL(window.location.href);
    var param_type = url.searchParams.get("type");

    switch (param_type) {
        case "fbx":
            web3d.loadFbx();
            break;
        case "glb": 
        default: 
            web3d.loadObj3d();
            break;
    }
});

