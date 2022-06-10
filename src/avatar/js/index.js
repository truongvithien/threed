import config from "../../setup/config";
import bootstrap from 'bootstrap';
import {avatar, debug} from "./avatar/main";

$(function () {
    avatar.init();
    avatar.switch();

    // debug.freeCamera();
});

window.addEventListener("load", function(){
    // avatar.loadSMT("SMT1");

    var url = new URL(window.location.href);
    var smt_code = url.searchParams.get("load_smt");
    if (typeof smt_code != "undefined" && smt_code != null) {
        if (smt_code.length == 0) smt_code = "SMT1";
        // avatar.loadDefaultBg();
        avatar.loadSMT(smt_code);
    }

    var st_code = url.searchParams.get("load_st");
    // console.log(st_code);
    if (typeof st_code != "undefined" && st_code != null) {
        // if (st_code.length == 0) st_code = "HM3-EM3-FM3-OM2-A1-T3";
        if (st_code.length == 0) st_code = "HM3-EM3-FM3-OM2-A1-T1";
        // avatar.loadDefaultBg();
        // avatar.loadST(st_code); 

        var anim = url.searchParams.get("anim");
        if (typeof anim != "undefined" && anim != null) {
            avatar.loadSTDEMO(st_code);             
        } else {
            avatar.loadST(st_code); 
        }
    }
    
    var stdemo_code = url.searchParams.get("load_stdemo");
    // console.log(st_code);
    if (typeof stdemo_code != "undefined" && stdemo_code != null) {
        // if (st_code.length == 0) st_code = "HM3-EM3-FM3-OM2-A1-T3";
        if (stdemo_code.length == 0) stdemo_code = "HM3-EM3-FM3-OM2-A1-T1";
        // avatar.loadDefaultBg();
        avatar.loadSTDEMO(stdemo_code); 
    }

    var dim = url.searchParams.get("dim");
    // console.log(dim);
    switch (dim) {
        case "2": 
            if ($("#layered_avatar").length > 0) {
                $("#layered_avatar").addClass("active");
                $("#switch_avatar").prop("checked", true);
                $("#switch_avatar + label .dim").html(3);
            }
            break;
        case "3": default: 
            if ($("#rendered_avatar").length > 0) {
                $("#rendered_avatar").addClass("active");
                $("#switch_avatar").prop("checked", false);
                $("#switch_avatar + label .dim").html(2);
            }
            
            break;
    }
});

 
window.debug = debug;