"use strict";

require.config({
	paths: { // other paths we want to access
		jquery: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-beta1/jquery.min",
		underscore: "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.2/underscore-min",
		color: "color/index",
		'color-convert': "color-convert/index",
		'color-string': "color-string/index",
	},
	shim: { // allows us to bind variables to global (with exports) and show dependencies without using define()
		underscore: { exports: "_" },
	},
})

require( [
	"jquery",
	"underscore",
	"check-types",
	"color",
], function(
	$,
	_,
	is,
	color
){

class HumanDataPoint {
	constructor(color_point, sign) {
		// verify that color_point comes from class ColorPoint
		if( false ){
			this._point = point
		}else{
			die('First parameter should be a ColorPoint')
		}

		if( sign === 1 ){
			this._sign = 1
		}else if( sign === -1 || sign === 0 ){
			this._sign = -1
		}else{
			die('Bad sign input.  Should be 1 (for true), or -1 or 0 for false.')
		}
	}
	point() { // returns the point (location)
		return this._point
	}
	sign() { // returns 1 if the human liked the combination, or -1 if they didn't
		return this._sign
	}
}




$('#bg').keyup(function(e){ if( e.keyCode === 13 /*Enter*/ ){
	var color = $('#bg').val()
	$('body').css('background-color', color)
}})
$('#fg').keyup(function(e){ if( e.keyCode === 13 /*Enter*/ ){
	var color = $('#fg').val()
	$('body').css('color', color)
}})
// var c = color('green')



}) // end define
