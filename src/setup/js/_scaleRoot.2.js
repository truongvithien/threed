// SCALE PLATFORM 
// | Especially use for Web Platform 3.0
// | Although WP3.2.3 is preventing non-responsive design, there still have some
// | unexpected input PSD from outsource, out-dated designers.

import config from "../../setup/config";

$.fn.scalePlatform = function (options) {
    var defaults = {
        obj: $(this),
        designSafe: {
            // if width of device smaller safe zone, then init scale. 
            desktop: config.widthTriggerScale,
            mobile: config.widthTriggerScale
        },
        designWidth: {
            desktop: config.widthDesktop,
            mobile: config.widthMobile
        },
        designHeight: {
            desktop: config.heightDesktop,
            mobile: config.heightMobile
        },
        mode: '', //scaleForWidth
        elScale: {
            desktop: ".scaleDesktop",
            mobile: ".scaleMobile"
        },
        dataScale: "data-scale-ratio",
        dataDevice: "data-device-type",
        dataOrigin: {
            desktop: "data-desktop-origin",
            mobile: "data-mobile-origin",
        },
        rescaleForParent: true,
        deviceHeightStyleTag: {
            fix: "fixDeviceHeight",
            max: "maxDeviceHeight"
        }
    }
    var settings = $.extend(defaults, options);

    
    var setToDefault = function(){
        $(settings.obj).attr("style", "");
        $(settings.obj).parent().attr("style", "");
        $(settings.elScale.desktop + " , " + settings.elScale.mobile).each(function(){
            $(this).attr("style", "");
        });
        $(settings.obj).attr(settings.dataScale, 1);   
    }();

    var device = {
        width: $(window).innerWidth(),
        height: $(window).innerHeight()
    };

    
    // console.log(device);

    var isMobile = (width = device.width, height = device.height) => ((width <= 700) || (width < height));

    var scaleRatio = (isMobile()) ? 
                    device.width / settings.designWidth.mobile : 
                    device.width / settings.designWidth.desktop,
        marginLeft = 0;
    
    $(settings.elScale.desktop + " , " + settings.elScale.mobile).each(function(){

        var scaleOrigin = (isMobile = isMobile()) => {
            if (isMobile && ($(this).attr(settings.dataOrigin.mobile) != undefined)) {
                return $(this).attr(settings.dataOrigin.mobile);
            } else if  ($(this).attr(settings.dataOrigin.desktop) != undefined) {
                return $(this).attr(settings.dataOrigin.desktop);
            }
            return 'top left';
        }
        
        $(this).css({
            transform: "scale(" + scaleRatio + ")",
            marginLeft: marginLeft + "px",
            transformOrigin: scaleOrigin 
        });
    });

    if (settings.rescaleForParent) {
        var obj = {
            height: settings.obj.outerHeight()
        }
        var scaleHeight = obj.height * scaleRatio;

        $(settings.obj).parent().css({
            height: scaleHeight+"px",
            // width: device.width+"px"
        })
    }

    if (settings.deviceHeightStyleTag != false) {
        var rescaledHeight = "calc(100vh * " + 1/scaleRatio + ")"
        var styleTag = $(`
            <style>
                .${settings.deviceHeightStyleTag.max} {
                    max-height: ${rescaledHeight}
                }
                .${settings.deviceHeightStyleTag.fix} {
                    height: ${rescaledHeight}
                }
            </style>
        `);
        $('html > head').append(styleTag);
    }

    $(settings.obj).parent().attr(settings.dataScale, scaleRatio);
    $(settings.obj).parent().attr(settings.dataDevice, (isMobile()) ? "mobile" : "desktop");
}
