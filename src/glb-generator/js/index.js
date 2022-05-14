import config from "../../setup/config";
import bootstrap from 'bootstrap';
import web3d from "./_web3d";

$(function () {
    web3d.init();
    controlButtons();
 
});

window.addEventListener("load", function(){
    
    
});


var controlButtons = function() {
    if (
        $('input[name="selectBody"]').length > 0 &&
        $('input[name="selectHead"]').length > 0 &&
        $('input[name="selectAsset"]').length > 0
    ) {
        $('input[name="selectBody"], input[name="selectHead"], input[name="selectAsset"]').on("change", function(){
            var attrBody = $('input[name="selectBody"]:checked').attr("value"),
                attrHead = $('input[name="selectHead"]:checked').attr("value"),
                attrAsset = $('input[name="selectAsset"]:checked').attr("value");
            web3d.loadObj3d({
                head: attrHead,
                body: attrBody,
                asset: attrAsset
            });
        });
    }
}