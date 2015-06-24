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
        'domElement': null,
        'canvasClass': '.canvas',
        'scrubberClass': '.scrubber',
        'coverImg': null,
        'renderMode': 'background',
        'bufferSize': '30%',
        'loop': false,
        'debug': false,
        'autoPlay': false,
        'autoLoad': false,
        'frames': [],

        //  Events
        'onReady': function() {},
        'onLoadStart': function() {},
        'onLoadStop': function() {},
        'onLoadProgress': function(lastFrameLoaded, totalFrames, percentageLoaded) {},
        'onLoadComplete': function() {},
        'onPlay': function() {},
        'onBufferStart': function() {},
        'onBufferStop': function() {},
        'onStop': function() {},
        'onEnterFrame': function(currentFrame) {},
        'onExitFrame': function(currentFrame) {},
        'onLoop': function() {},
        'onReset': function() {}

        /**
         * Also possible to specify onEnterFrameX or onExitFrameX, where X is
         * the frame number.
         */
    };

    // --------------------------------------------------------------------------

    /**
     * Whether the player is ready or not
     * @type {Boolean}
     */
    base.ready = false;

    // --------------------------------------------------------------------------

    /**
     * Stores all the frame instances
     * @type {Array}
     */
    base.frames = [];

    // --------------------------------------------------------------------------

    /**
     * The player's current state. Will be either STOPPED, PLAYING, BUFFERING or COMPLETE.
     * @type {String}
     */
    base.playerState = 'STOPPED';

    // --------------------------------------------------------------------------

    /**
     * The loaders current state. Will be either STOPPED, LOADING or COMPLETE.
     * @type {String}
     */
    base.loaderState = 'STOPPED';

    // --------------------------------------------------------------------------

    /**
     * The numebr of the frame which the player is currently on
     * @type {Number}
     */
    base.currentFrame = null;

    // --------------------------------------------------------------------------

    /**
     * The number of the last frame which the player loaded
     * @type {Number}
     */
    base.lastFrameLoaded = null;

    // --------------------------------------------------------------------------

    /**
     * The DOM element which contains the player
     * @type {Object}
     */
    base.element = null;

    // --------------------------------------------------------------------------

    /**
     * The DOM element which contains the player canvas
     * @type {Object}
     */
    base.canvas = null;

    // --------------------------------------------------------------------------

    /**
     * The DOM element which contains the player scrubber
     * @type {Object}
     */
    base.scrubber = null;

    // --------------------------------------------------------------------------

    base.playerTimeout = null;

    // --------------------------------------------------------------------------

    /**
     * Constructs the player
     * @return {Object}
     */
    base.__construct = function() {

        //  Merge passed options with the defaults
        base.options = $.extend(true, base.options, options);

        //  Are we turning debugging on?
        if (base.options.debug) {
            $FP.debug.enabled = true;
        }

        base.log('Constructing');

        // --------------------------------------------------------------------------

        //  Do we have any frames which need added?
        if (base.options.frames.length) {
            base.setFrames(base.options.frames);
        }

        // --------------------------------------------------------------------------

        //  Prep the domElements
        if (typeof base.options.domElement === 'string') {
            base.element = $(base.options.domElement).first();
        } else {
            base.element = $(base.options.domElement).first();
        }

        //  Look for the canvas and the scrubber
        base.canvas   = base.element.find(base.options.canvasClass).first();
        base.scrubber = base.element.find(base.options.scrubberClass).first();

        // --------------------------------------------------------------------------

        //  Player is ready
        base.ready = true;
        base.playerState = 'STOPPED';
        if (base.options.coverImg) {
            base.log('Rendering Cover Image: ' + base.options.coverImg);
            base.renderUrl(base.options.coverImg);
        } else if (frames.length) {
            base.goToFrame(0);
        }
        base.options.onReady.call(base);

        // --------------------------------------------------------------------------

        if (base.frames.length && base.options.autoPlay) {

            base.play();

        } else if (base.frames.length && base.options.autoLoad) {

            base.load();
        }

        // --------------------------------------------------------------------------

        return base;
    };

    // --------------------------------------------------------------------------

    /**
     * Reset frames to the supplied array
     * @param {Array} frames The frames to set
     * @return {Object}
     */
    base.setFrames = function(frames) {

        base.log('Setting frames; ' + frames.length + ' frames');

        //  Reset
        base.clearFrames();

        //   Add all the frames
        base.addFrames(frames);

        return base;
    };

    // --------------------------------------------------------------------------

    /**
     * Clear all frames
     * @return {Object}
     */
    base.clearFrames = function() {

        base.log('Clearing frames');
        base.frames = [];
        return base;
    };

    // --------------------------------------------------------------------------

    /**
     * Append frames to the player
     * @param  {Array} frames the frames to append
     * @return {Object}
     */
    base.addFrames = function(frames) {

        base.log('Appending ' + frames.length + ' frames');
        for (var i = 0; i < frames.length; i++) {
            base.addFrame(frames[i]);
        }
        return base;
    };

    // --------------------------------------------------------------------------

    /**
     * Create a new frame instance and append it to the stack
     * @param  {String} frameUrl The frame's URL
     * @return {Object}
     */
    base.addFrame = function(frameUrl) {

        base.log('Adding Frame: ' + frameUrl);
        base.frames.push(new $FP.frame(frameUrl));

        //  Update the loader state. New frames will need to be loaded.
        base.loaderState = 'STOPPED';

        return base;
    };

    // --------------------------------------------------------------------------

    /**
     * Go to a particular frame
     * @param  {Number} frameNumber The frame number to go to
     * @return {Object}
     */
    base.goToFrame = function(frameNumber) {

        if (base.ready) {
            base.log('Going to frame ' + frameNumber);
            base.currentFrame = frameNumber;
            base.renderFrame(frameNumber);
        } else {
            base.warn('goToFrame(): Player is not ready');
        }

        return base;
    };

    // --------------------------------------------------------------------------

    /**
     * Extracts the URL from a frame and passes it to renderUrl();
     * @param  {Number} frameNumber The frame number to render
     * @return {Object}
     */
    base.renderFrame = function(frameNumber) {

        if (typeof base.frames[frameNumber] === 'object') {

            var frame = base.frames[frameNumber];

            base.log('Rendering frame number ' + frameNumber);
            base.renderUrl(frame.getUrl());

        } else {
            base.error('Invalid Frame Number');
        }

        return base;
    };

    // --------------------------------------------------------------------------

    /**
     * Renders a URL to the canvas
     * @param  {String} url the URL to render
     * @return {Object}
     */
    base.renderUrl = function(url) {

        if (base.options.renderMode === 'background') {

            base.canvas.css('background-image', 'url(' + url + ')');

        } else if (base.options.renderMode === 'img') {

            base.canvas.html('<img src="' + url + '">');

        } else {

            base.error('Invalid Render Mode (' + base.options.renderMode + ')');
        }

        return base;
    };

    // --------------------------------------------------------------------------

    /**
     * checks to see if the playhead needs to buffer
     * @return {Boolean}
     */
    base.requiresBuffer = function() {

        //  If everything is laoded then no buffering required
        if (base.loaderState !== 'COMPLETE') {

            var currentFrame = base.currentFrame || 0;
            var actualBufferSize = base.lastFrameLoaded - currentFrame;
            var configuredBufferSize;

            if (typeof base.options.bufferSize == 'string' && base.options.bufferSize.substr(-1) === '%') {

                //  A percentage of frames (relative to the whole movie) must be loaded
                configuredBufferSize = Math.ceil(base.frames.length * (parseInt(base.options.bufferSize)/100));

            } else {

                //  Assume a number of frames to load
                configuredBufferSize = parseInt(base.options.bufferSize, 10);
            }


            return actualBufferSize < configuredBufferSize;
        }

        return false;
    };

    // --------------------------------------------------------------------------

    /**
     * Begin playback
     * @return {Object}
     */
    base.play = function() {

        if (base.ready) {

            if (base.playerState === 'STOPPED') {

                if (base.getNumFrames()) {

                    //  Set the state
                    base.log('Playing...');
                    base.playerState = 'PLAYING';

                    //  Fire the event
                    base.options.onPlay.call(base);

                    //  If any frames need loaded then continue loading
                    if (base.loaderState === 'STOPPED') {
                        base.load();
                    }

                    /**
                     * Check the buffer, if it's full enough then start playback immediately,
                     * if not then begin to buffer some frames.
                     */

                    if (!base.requiresBuffer()) {

                        base.doPlay();

                    } else {

                        base.buffer();
                    }
                } else {
                    base.warn('No Frames to play');
                }
            }

        } else {

            base.warn('play(): Player is not ready');
        }

        return base;
    };

    // --------------------------------------------------------------------------

    /**
     * Renders a frame and then sets up the next frame
     * @return {Object}
     */
    base.doPlay = function() {

        if (base.playerState !== 'STOPPED') {

            if (base.currentFrame === null) {
                base.currentFrame = 0;
            }

            var frameNumber = base.currentFrame;

            base.options.onEnterFrame.call(base, base.currentFrame);

            //  Call the specific frame callback if exists
            if (typeof base.options['onEnterFrame' + base.currentFrame] === 'function') {
                base.options['onEnterFrame' + base.currentFrame].call(base, base.currentFrame);
            }

            base.renderFrame(base.currentFrame);

            //  Update the scrubber to show which frame we're on
            var totalFrames      = base.frames.length-1;
            var percentagePlayed = (base.currentFrame / totalFrames)*100;

            base.scrubber.find('.current').width(percentagePlayed + '%');

            //  Trigger the next frame
            var frameDelay = 1000/base.options.frameRate;

            clearTimeout(base.playerTimeout);
            base.playerTimeout = setTimeout(function() {

                base.options.onExitFrame.call(base, base.currentFrame);

                //  Call the specific frame callback if exists
                if (typeof base.options['onExitFrame' + base.currentFrame] === 'function') {
                    base.options['onExitFrame' + base.currentFrame].call(base, base.currentFrame);
                }

                if (typeof base.frames[base.currentFrame+1] === 'object') {

                    //  More frames, continue
                    base.currentFrame++;

                    //  But is the next frame loaded? If not then begin buffering
                    if (!base.frames[base.currentFrame].isLoaded()) {

                        base.buffer();

                    } else {

                        base.doPlay();
                    }

                } else {

                    //  No more frames
                    base.currentFrame = 0;
                    if (base.options.loop) {

                        base.options.onLoop.call(base);
                        base.doPlay();

                    } else {

                        base.stop();
                    }
                }

            }, frameDelay);
        }

        return base;
    };

    // --------------------------------------------------------------------------

    /**
     * Hangs around waiting for the loader to load some more
     * @return {Object}
     */
    base.buffer = function() {

        base.log('Buffering');

        //  Set the player state
        base.playerState = 'BUFFERING';

        //  Update the element's class
        base.element.addClass('buffering');

        //  Call the buffer event
        base.options.onBufferStart.call(base);

        //  Periodically check the buffer size
        base.doBuffer();

        return base;
    };

    // --------------------------------------------------------------------------

    /**
     * Checks the buffer, if complete resumes playback
     * @return {Object}
     */
    base.doBuffer = function() {

        //  Only continue if we're not stopped
        if (base.playerState !== 'STOPPED') {

            if (base.requiresBuffer()) {

                setTimeout(function() {
                    base.doBuffer();
                }, 500);

            } else {

                base.log('Buffer full');

                //  Set the player state
                base.playerState = 'PLAYING';

                //  Buffer has filled up, continue playback
                base.bufferStop();
                base.doPlay();
            }

        } else {

            base.bufferStop();
        }

        return base;
    };

    // --------------------------------------------------------------------------

    /**
     * Starts the loading process
     * @return {Object}
     */
    base.load = function() {

        if (base.ready) {

            if (base.loaderState === 'STOPPED') {

                var startFrame = null;

                if (base.lastFrameLoaded === null) {

                    base.log('No frames loaded, looking for first frame.');
                    //  Find the first unloaded frame
                    for (var i = 0; i < base.frames.length; i++) {
                        if (!base.frames[i].isLoaded()) {
                            startFrame = i;
                            break;
                        }
                    }

                } else {

                    //  Test to see if the next frame exists
                    if (typeof base.frames[base.lastFrameLoaded+1] === 'object') {
                        startFrame = base.lastFrameLoaded+1;
                    }
                }

                if (startFrame !== null) {

                    base.log('Loading...');
                    base.loaderState = 'LOADING';
                    base.options.onLoadStart.call(base);
                    base.doLoad(startFrame);

                } else {

                    base.log('No frames to load.');
                }
            }

        } else {
            base.warn('play(): Player is not ready');
        }

        return base;
    };

    // --------------------------------------------------------------------------

    /**
     * Loads the next frame
     * @param  {Number} frameNumber The frame number to load
     * @return {Object}
     */
    base.doLoad = function(frameNumber) {

        base.log('Loading frame ' + frameNumber);
        base.calcPercentLoaded();
        base.frames[frameNumber].load()
        .done(function() {

            base.log('Loaded frame ' + frameNumber);
            base.lastFrameLoaded = frameNumber;

            //  Update the scrubber to show the number of loaded frames
            var percentageLoaded = base.calcPercentLoaded();

            //  Are we still loading?
            if (base.loaderState === 'LOADING') {
                //  Load next frame, if it exists
                if (typeof base.frames[base.lastFrameLoaded+1] === 'object') {
                    base.doLoad(base.lastFrameLoaded+1);
                } else {
                    //  Loading finished
                    base.log('Loading complete');
                    base.loaderState = 'COMPLETE';
                    base.options.onLoadComplete.call(base);
                }
            }
        });

        return base;
    };

    // --------------------------------------------------------------------------

    /**
     * Calculates what percentage of the frames have loaded and calls the onLoadProgress event
     * @return {Number}
     */
    base.calcPercentLoaded = function() {

        var totalFrames      = base.frames.length-1;
        var lastFrameLoaded  = base.lastFrameLoaded || 0;
        var percentageLoaded = (lastFrameLoaded / totalFrames)*100;

        base.scrubber.find('.loaded').width(percentageLoaded + '%');

        //  Call the onLoadProgress event, the +1 to account for zero-index
        base.options.onLoadProgress.call(base, lastFrameLoaded+1, base.frames.length, percentageLoaded);

        return percentageLoaded;
    };

    // --------------------------------------------------------------------------

    /**
     * Stop playback
     * @return {Object}
     */
    base.stop = function() {

        if (base.ready) {
            if (base.playerState !== 'STOPPED') {
                base.log('Stopping playback...');
                base.playerState = 'STOPPED';
                base.options.onStop.call(base);
                base.loadStop();
            }
        } else {
            base.warn('stop(): Player is not ready');
        }

        return base;
    };

    // --------------------------------------------------------------------------

    /**
     * Calls the onBufferStop event
     * @return {Object}
     */
    base.bufferStop = function() {
        base.options.onBufferStop.call(base);
        base.element.removeClass('buffering');
        return base;
    };

    // --------------------------------------------------------------------------

    /**
     * Stop the load process if it's running
     * @return {Object}
     */
    base.loadStop = function() {

        if (base.loaderState === 'LOADING') {
            base.log('Stopping load...');
            base.loaderState = 'STOPPED';
            base.options.onLoadStop.call(base);
        }

        return base;
    };

    // --------------------------------------------------------------------------

    /**
     * Returns the player's current state
     * @return {String}
     */
    base.getPlayerState = function() {
        return base.playerState;
    };

    // --------------------------------------------------------------------------

    /**
     * Returns the loaders's current state
     * @return {String}
     */
    base.getLoaderState = function() {
        return base.loaderState;
    };

    // --------------------------------------------------------------------------

    /**
     * Returns the player's current frame
     * @return {Number}
     */
    base.getCurrentFrame = function() {
        return base.currentFrame;
    };

    // --------------------------------------------------------------------------

    /**
     * Returns the number of frames in the player
     * @return {Number}
     */
    base.getNumFrames = function() {
        return base.frames.length;
    };

    // --------------------------------------------------------------------------

    /**
     * Reset the player
     * @param  {Boolean} clearFrames Whether to clear frames
     * @return {Object}
     */
    base.reset = function(clearFrames) {

        base.log('Resetting player');
        base.stop();

        if (clearFrames) {

            base.currentFrame = null;
            base.lastFrameLoaded = null;
            base.options.coverImg = null;
            base.frames = [];

            base.scrubber.find('.current').width('0%');
            base.scrubber.find('.loaded').width('0%');

            if (base.options.renderMode === 'background') {

                base.canvas.removeAttr('style');

            } else if (base.options.renderMode === 'img') {

                base.canvas.empty();
            }

        } else {

            base.currentFrame = 0;

            if (base.options.coverImg) {
                base.renderUrl(base.options.coverImg);
            } else if (frames.length) {
                base.goToFrame(0);
            }
        }

        base.options.onReset.call(base);
        base.options.onReady.call(base);

        return base;
    };

    // --------------------------------------------------------------------------

    /**
     * Sends an item to the log, prefixing it with a string so that the class
     * making the log is easily identifiable
     * @return {Object}
     */
    base.log = function() {

        $FP.debug.log('FP [Player]:', arguments);
        return base;
    };

    // --------------------------------------------------------------------------

    /**
     * Sends an item to the error log, prefixing it with a string so that the class
     * making the log is easily identifiable
     * @return {Object}
     */
    base.error = function() {

        $FP.debug.error('FP [Player]:', arguments);
        return base;
    };

    // --------------------------------------------------------------------------

    /**
     * Sends an item to the error log, prefixing it with a string so that the class
     * making the log is easily identifiable
     * @return {Object}
     */
    base.warn = function() {

        $FP.debug.warn('FP [Player]:', arguments);
        return base;
    };

    // --------------------------------------------------------------------------

    return base.__construct();
};
