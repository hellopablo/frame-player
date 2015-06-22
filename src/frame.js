/**
 * This class represents an individual frame.
 * @param  {String} frameUrl The URL of the frame
 * @return {Object}
 */
window.frameplayer.frame = function(frameUrl) {

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
     * The URLof the frame
     * @type {String}
     */
    base.url = null;

    // --------------------------------------------------------------------------

    /**
     * Whether the frame has been loaded or not
     * @type {Boolean}
     */
    base.loaded = null;

    // --------------------------------------------------------------------------

    /**
     * Cosntruct the frame object
     * @return {Object}
     */
    base.__construct = function() {

        base.url = frameUrl;
        base.loaded = false;
        return base;
    };

    // --------------------------------------------------------------------------

    /**
     * Loads the current frame
     * @return {Object} A jQuery promise
     */
    base.load = function() {

        base.log('Loading frame', base.url);
        var deferred = new $.Deferred();

        var img = new Image();

        img.onload = function() {

            base.loaded = true;
            deferred.resolve();
        };

        img.src = base.url;

        return deferred.promise();
    };

    // --------------------------------------------------------------------------

    /**
     * Returns the frame's URL
     * @return {String}
     */
    base.getUrl = function() {
        return base.url;
    };

    // --------------------------------------------------------------------------

    /**
     * Returns whether the frame has been loaded or not
     * @return {Boolean}
     */
    base.isLoaded = function() {

        return base.loaded;
    };

    // --------------------------------------------------------------------------

    /**
     * Sends an item to the log, prefixing it with a string so that the class
     * making the log is easily identifiable
     * @return {Object}
     */
    base.log = function() {

        $FP.debug.log('FP [Frame]:', arguments);
        return base;
    };

    // --------------------------------------------------------------------------

    /**
     * Sends an item to the error log, prefixing it with a string so that the class
     * making the log is easily identifiable
     * @return {Object}
     */
    base.error = function() {

        $FP.debug.error('FP [Frame]:', arguments);
        return base;
    };

    // --------------------------------------------------------------------------

    return base.__construct();
};
