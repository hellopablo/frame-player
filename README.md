# FramePlayer

[![Join the chat at https://gitter.im/hellopablo/frameplayer](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/hellopablo/frameplayer?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Project Status](http://stillmaintained.com/hellopablo/frameplayer.png)](https://stillmaintained.com/hellopablo/frameplayer)

A simple JavaScript player for playing frame-based animations. [Demo](http://hellopablo.github.io/frameplayer)

## How to use

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

I use Grunt to compile everything. Firstly, install `grunt-cli` tool globally. It's recommended to run the grunt client on a per-project basis.

    npm install -g grunt-cli

Install the dev dependancies in your project:

    npm install --dev

The following Grunt task is available for compiling the JS:

    grunt build

If you want to watch for changes in `src/*.js` files then simply call Grunt with no arguments:

    grunt

## RoadMap

- Add a jQuery wrapper
