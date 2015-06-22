/**
 * This file simply ensures that the frameplayer namespace is properly declared.
 */
//  Ensure that the main object is defined
if (typeof window.frameplayer === "undefined") {
    window.frameplayer = {};
    //  Alias
    window.FP = window.frameplayer;
}

/**
 * This class provides debugging functionality to StreetView Animator
 * @return {Object}
 */
window.frameplayer.debug = {
    /**
     * Whether debugging is enabled or not
     * @type {Boolean}
     */
    enabled: false,
    // --------------------------------------------------------------------------
    /**
     * Renders a `log` call to the console
     * @param  {String} caller The calling class
     * @param  {Mixed}  items  The item(s) to log
     * @return {Object}
     */
    log: function(caller, items) {
        return this.execConsoleFunc("log", caller, items);
    },
    // --------------------------------------------------------------------------
    /**
     * Renders an `info` call to the console
     * @param  {String} caller The calling class
     * @param  {Mixed}  items  The item(s) to log
     * @return {Object}
     */
    info: function(caller, items) {
        return this.execConsoleFunc("info", caller, items);
    },
    // --------------------------------------------------------------------------
    /**
     * Renders a `warn` call to the console
     * @param  {String} caller The calling class
     * @param  {Mixed}  items  The item(s) to log
     * @return {Object}
     */
    warn: function(caller, items) {
        return this.execConsoleFunc("warn", caller, items);
    },
    // --------------------------------------------------------------------------
    /**
     * Renders an `error` call to the console
     * @param  {String} caller The calling class
     * @param  {Mixed}  items  The item(s) to log
     * @return {Object}
     */
    error: function(caller, items) {
        return this.execConsoleFunc("error", caller, items);
    },
    // --------------------------------------------------------------------------
    /**
     * Prepares the arguments and executes the console method
     * @param  {String} method The console method to call
     * @param  {String} caller The calling class
     * @param  {Mixed}  items  The item(s) to log
     * @return {Object}
     */
    execConsoleFunc: function(method, caller, items) {
        if (this.enabled && typeof console !== "undefined") {
            var methods = [ "log", "info", "warn", "error" ];
            for (var i = methods.length - 1; i >= 0; i--) {
                if (methods[i] === method && typeof console[methods[i]] === "function") {
                    var args = [ caller ];
                    for (var x = 0; x < items.length; x++) {
                        args.push(items[x]);
                    }
                    console[methods[i]].apply(console, args);
                    break;
                }
            }
        }
        return this;
    }
};

/**
 * This class represents an individual player.
 * @param  {Object} options The global options object
 * @return {Object}
 */
window.frameplayer.player = function(options) {
    /**
     * Prevent scope issues by using `base` in callbacks instead of `this`
     * @type {Object}
     */
    var base = this;
    // --------------------------------------------------------------------------
    /**
     * Alias to main namespace
     * @type {Object}
     */
    var $FP = window.frameplayer;
    // --------------------------------------------------------------------------
    /**
     * The default options object
     * @type {Object}
     */
    base.options = {
        frameRate: 12,
        frameWidth: 600,
        frameHeight: 300,
        domElement: null,
        mode: "background",
        debug: {
            enabled: false
        },
        loader: {}
    };
    // --------------------------------------------------------------------------
    base.__construct = function() {
        base.options = $.extend(true, base.options, options);
        //  Are we turning debugging on?
        if (base.options.debug) {
            $FP.debug.enabled = true;
        }
        base.log("Constructing");
        // --------------------------------------------------------------------------
        return base;
    };
    // --------------------------------------------------------------------------
    /**
     * Sends an item to the log, prefixing it with a string so that the class
     * making the log is easily identifiable
     * @param  {Mixed} item The item to log
     * @return {Object}
     */
    base.log = function(item) {
        $FP.debug.log("FP [Player]:", arguments);
        return base;
    };
    // --------------------------------------------------------------------------
    /**
     * Sends an item to the error log, prefixing it with a string so that the class
     * making the log is easily identifiable
     * @param  {Mixed} item The item to log
     * @return {Object}
     */
    base.error = function(item) {
        $FP.debug.error("FP [Player]:", arguments);
        return base;
    };
    // --------------------------------------------------------------------------
    return base.__construct();
};
//# sourceMappingURL=frameplayer.js.map