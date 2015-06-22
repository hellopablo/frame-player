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
        'frameRate': 12,
        'frameWidth': 600,
        'frameHeight': 300,
        'domElement': null,
        'mode': 'background',
        'debug': {
            'enabled': false
        },
        'loader': {

        },
    };

    // --------------------------------------------------------------------------

    base.__construct = function() {

        base.options = $.extend(true, base.options, options);

        //  Are we turning debugging on?
        if (base.options.debug) {
            $FP.debug.enabled = true;
        }

        base.log('Constructing');

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

        $FP.debug.log('FP [Player]:', arguments);
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

        $FP.debug.error('FP [Player]:', arguments);
        return base;
    };

    // --------------------------------------------------------------------------

    return base.__construct();
};
