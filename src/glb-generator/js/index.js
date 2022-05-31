import config from "../../setup/config";
import bootstrap from 'bootstrap';
import web3d from "./_web3d";

$(function () {
    web3d.init();
    controlButtons(); 
});

window.addEventListener("load", function(){
    generateObj3d();
    generatePossibility();
    pickMeARandomSet();
    exportMetadataAsJSON();
    switchDisplay();
});


var generateObj3d = function(){
    var attrBody = $('input[name="selectBody"]:checked').attr("value"),
        attrHead = $('input[name="selectHead"]:checked').attr("value"),
        attrAsset = $('input[name="selectAsset"]:checked').attr("value");
    web3d.loadObj3d({
        head: attrHead,
        body: attrBody,
        asset: attrAsset
    });
}

var controlButtons = function() {
    if (
        $('input[name="selectBody"]').length > 0 &&
        $('input[name="selectHead"]').length > 0 &&
        $('input[name="selectAsset"]').length > 0
    ) {
        $('input[name="selectBody"], input[name="selectHead"], input[name="selectAsset"]').on("change", function(){
            generateObj3d();
        });
    }
}

var generatePossibility = function() {
    if ($("#possibilityList").length > 0) {
        $("#possibilityList").empty();

        var possibility = {
            "Body" : [],
            "Head" : [],
            "Asset" : []
        };

        if ($('.btn-group[aria-label="Body"]').length > 0) {
            $('.btn-group[aria-label="Body"] input[type="radio"]').each(function(){
                let radioId = $(this).attr("id")
                possibility["Body"].push(radioId);
            })
        }

        if ($('.btn-group[aria-label="Head"]').length > 0) {
            $('.btn-group[aria-label="Head"] input[type="radio"]').each(function(){
                let radioId = $(this).attr("id")
                possibility["Head"].push(radioId);
            })
        }

        if ($('.btn-group[aria-label="Asset"]').length > 0) {
            $('.btn-group[aria-label="Asset"] input[type="radio"]').each(function(){
                let radioId = $(this).attr("id")
                possibility["Asset"].push(radioId);
            })
        }

        // console.log(possibility);

        var possibilityTotal = possibility["Body"].length * possibility["Head"].length * possibility["Asset"].length;

        if ($("#possibilityTotal").length > 0) {
            $("#possibilityTotal").html(possibilityTotal);
        }

        for (let i_body = 0, n_body = possibility["Body"].length; i_body < n_body; i_body++) {
            for (let i_head = 0, n_head = possibility["Head"].length; i_head < n_head; i_head++) {
                for (let i_asset = 0, n_asset = possibility["Asset"].length; i_asset < n_asset; i_asset++) {
                    $("#possibilityList").append(`    
						<div class="col-3">
                            <button 
                                type="button" 
                                class="btn btn-secondary w-100 possibilityItem"
                                data-objthreed-body="#${possibility["Body"][i_body]}"
                                data-objthreed-head="#${possibility["Head"][i_head]}"
                                data-objthreed-asset="#${possibility["Asset"][i_asset]}"
                            >${i_body + 1}_${i_head + 1}_${i_asset + 1}</button>
                        </div>
                    `);
                }
            }
        }

        $("#possibilityList").on("click", ".possibilityItem", function(){
            let selectBody = $(this).attr("data-objthreed-body"), 
                selectHead = $(this).attr("data-objthreed-head"), 
                selectAsset = $(this).attr("data-objthreed-asset");

            console.log(selectBody, selectHead, selectAsset);

            $(selectBody).prop("checked", true);
            $(selectHead).prop("checked", true);
            $(selectAsset).prop("checked", true);

            generateObj3d();
        })
    }
}

var pickMeARandomSet = function() {
    if ($("#pickMeARandomSet").length > 0) {
        $("#pickMeARandomSet").on("click", function(){
            let total = parseInt($("#possibilityTotal").html());
            let randomItemId = Math.floor(Math.random() * total);

            console.log(randomItemId);

            console.log($(".possibilityItem").eq(randomItemId).html());

            $(".possibilityItem").eq(randomItemId).trigger("click");

        });
    }
}

var exportMetadataAsJSON = function() {
    if ($("#exportMetadataAsJSON").length > 0) {
        $("#exportMetadataAsJSON").on("click", function(){
            var jsonData = JSON.parse($("#metadata").html());
            var jsonHtml = $("#metadata").html();

            var fileName = "metadata_";

            fileName += Date.parse(jsonData.date);

            function download(content, fileName, contentType) {
                var a = document.createElement("a");
                var file = new Blob([content], {type: contentType});
                a.href = URL.createObjectURL(file);
                a.download = fileName;
                a.click();
            }
            download(jsonHtml, `${fileName}.txt`, 'text/plain');

        });
    } 
}

var switchDisplay = function(){
    if ($("#switchDisplay").length > 0) {
        $("#switchDisplay").on("change", function(){
            if ($('#switchDisplay').prop('checked')) {
                $("#rendered_twod").removeClass("active");
                $("#rendered_threed").addClass("active");
                generateObj3d();
            } else {
                $("#rendered_twod").addClass("active");
                $("#rendered_threed").removeClass("active");
            }
        });
    }
}