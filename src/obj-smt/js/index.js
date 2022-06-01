import config from "../../setup/config";
import bootstrap from 'bootstrap';
import web3d from "./_web3d";




$(function () {
    web3d.init();
    web3d.loadObj3d();
});

window.addEventListener("load", function(){

});


window.debug = {
    get: {
        camera: () => web3d.getCamera()
    }
}