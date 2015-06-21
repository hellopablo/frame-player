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