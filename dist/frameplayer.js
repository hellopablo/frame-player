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
 * This class represents an individual frame.
 * @return {Object}
 */
window.frameplayer.frame = function() {
    /**
     * Prevent scope issues by using `base` in callbacks instead of `this`
     * @type {Object}
     */
    var base = this;
    // --------------------------------------------------------------------------
    base.__construct = function() {
        return base;
    };
    // --------------------------------------------------------------------------
    return base.__construct();
};

/**
 * This class represents an individual player.
 * @return {Object}
 */
window.frameplayer.frame = function() {
    /**
     * Prevent scope issues by using `base` in callbacks instead of `this`
     * @type {Object}
     */
    var base = this;
    // --------------------------------------------------------------------------
    base.__construct = function() {
        return base;
    };
    // --------------------------------------------------------------------------
    return base.__construct();
};
//# sourceMappingURL=frameplayer.js.map