var config = {
    widthTriggerScale: 9999,
    widthDesktopSafe: 1620,
    widthDesktop: 2000,
    widthMobile: 768,
    heightDesktop: 1000,
    heightMobile: 1000,
    func: {
        isMobile: function(){
            var device = {
                width: $(window).innerWidth(),
                height: $(window).innerHeight()
            };

            return ((device.width <= config.widthMobile) || (device.width < device.height));
        }
    }
}

export default config;