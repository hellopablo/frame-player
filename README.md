# FramePlayer

[![Project Status](http://stillmaintained.com/hellopablo/frameplayer.png)](https://stillmaintained.com/hellopablo/frameplayer)

A simple JavaScript player for playing frame-based animations. [Demo](http://hellopablo.github.io/frameplayer)


## How to use

### Basic Usage

The easiest way to install frameplayer.js is via [Bower](http://bower.io).

    bower install frameplayer

Include the JS in your page, rememebring to include the dependencies.

    <script type="text/javascript" src="assets/bower_components/jquery/dist/jquery.min.js"></script>
    <script type="text/javascript" src="assets/bower_components/frameplayer/dist/frameplayer.min.js"></script>

Instantiate frameplayer like so:

	[@todo]

## Options

The following options are available to you:

	[@todo]

## How to Contribute

I welcome contirbutions to frameplayer. Fork the repo and submit a pull request. Please ensure that frameplayer.js compiles and that any relevant documentation is updated before sending the pull request.

### Compiling the JS

I use Grunt to compile everything. Firstly, install `grunt-cli` globally. It's recommended to run the grunt client on a per-project basis, so if you have it installed globally, remove it.

    npm install -g grunt-cli

Install the dev dependancies

    npm install

Calling `grunt` in the project root will start the watcher causing changes to the JS to be compiled automatically.

    grunt

## RoadMap

- Add a jQuery wrapper